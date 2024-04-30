import { StatusBar } from 'expo-status-bar';
import  { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { airportsRef, auth, db } from "../firebase.config";
import { doc, getDoc, onSnapshot, query, setDoc } from "firebase/firestore";


export const AuthContext =createContext();

export const AuthContextProvider = ({children}) => {

  const [user,setUser]=useState(null);
  const [isAuthenticated,setIsAuthenticated]=useState(undefined);

  useEffect(()=>{
    const unsub= onAuthStateChanged(auth,(user)=>{
        // console.log('got the user:',user);
        if(user){
            setIsAuthenticated(true);
            setUser(user);
            updateUserData(user.uid);
        }else{
            setIsAuthenticated(false);
            setUser(null);
        }
    })
    return unsub;
},[]);

const updateUserData=async(userId)=>{
  const  docRef=doc(db,'users',userId);
  const docSnap=await getDoc(docRef);
  if(docSnap.exists()){
      let data=docSnap.data();
      setUser({...user,username:data.username,userId:data.userId})
  }
}

const  register=async(email,password,username)=>{
  try{
      const response= await createUserWithEmailAndPassword(auth,email,password);
      console.log('response.user:',response?.user);

      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db,"users",response?.user?.uid),{
          username,
          userId:response?.user?.uid
      })
      return {success: true,data:response?.user,msg:"Successfully Register, Please Sign In"};
  }catch(e){
      let msg=e.message;
      if(msg.includes('(auth/invalid-email)')) msg='Inavalid email'
      if(msg.includes('(auth/email-already-in-use)')) msg='This email is already in use'
      return {success: false,msg:msg};
  }
}

const  logout=async()=>{
  try{
      await signOut(auth);
      return {success: true};
  }catch(e){
      return {success: false,msg:e.message};
  }
}

const  login=async(email,password)=>{
  try{
      const response = await signInWithEmailAndPassword(auth,email,password);
      return {success:true};
  }catch(e){
      let msg=e.message;
      if(msg.includes('(auth/invalid-email)')) msg='Inavalid email'
      if(msg.includes('(auth/invalid-credential)')) msg="Invalid Credential"
      return {success: false,msg:msg};
  }
}

const [airports,setAirports]=useState([]);
const getAirports=async()=>{
    const q=query(airportsRef);
    let unsub=onSnapshot(q,(snapshot)=>{
      let allAirport=snapshot.docs.map(doc=>{
        return doc.data();
    });
    setAirports([...allAirport]);
    console.log("Airports:",allAirport);
  })
  return unsub;
}

  return (
    <AuthContext.Provider 
    value={{ user,isAuthenticated,register,logout,login,getAirports,airports}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>{
    const value=useContext(AuthContext);
    if(!value){
      throw new Error("useAuth must be wrapped inside AuthContextProvider");
    }
    return value;
}


