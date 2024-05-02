import { StatusBar } from "expo-status-bar";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { airportsRef, auth, bookingsRef, db, flightsRef } from "../firebase.config";
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      // console.log('got the user:',user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({ ...user, username: data.username,email:data.email,userId: data.userId });
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response.user:", response?.user);

      // setUser(response?.user);
      // setIsAuthenticated(true);

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        userId: response?.user?.uid,
        email:email
      });
      return {
        success: true,
        data: response?.user,
        msg: "Successfully Register, Please Sign In",
      };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Inavalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      return { success: false, msg: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Inavalid email";
      if (msg.includes("(auth/invalid-credential)")) msg = "Invalid Credential";
      return { success: false, msg: msg };
    }
  };

  const [airports, setAirports] = useState([]);
  const getAirports = async () => {
    const q = query(airportsRef);
    let unsub = onSnapshot(q, (snapshot) => {
      let allAirport = snapshot.docs.map((doc) => {
        // console.log(doc.id);  //-- get the documentID
        return doc.data();
      });
      setAirports([...allAirport]);
      console.log("Airports:", allAirport);
    });
    return unsub;
  };

  // get the flights
  const [flights, setFlights] = useState([]);
  const [seats,setSeats]=useState([]);
  const getFlights = async(departure_date = null, form = null, to = null) => {
    let q = query(flightsRef);
    if (departure_date != null && form != null && to != null) {
      q = query(flightsRef, 
        // where("departure_time", "<=", departure_date),
      where("departure_city", "==", form),
      where("arrival_city", "==", to)
    );
    }
    let unsub = onSnapshot(q, (snapshot) => {
      let allFlights = snapshot.docs.filter((doc)=>{
        const date=new Date(doc.data().departure_time.toDate());
        if(departure_date != null){
        if(date >= new Date(departure_date) ){
         return doc;
        }}
        else{
          return doc;
        }
      }).map((doc) => {
        let data={details:doc.data(),doc_id:doc.id};
        return data;
       
      });
      setFlights([...allFlights]);
      console.log("Flights:", allFlights);
    });
    return unsub;
  };

 
  const getSeats=async(id,callback=(s)=>{})=>{
    const refDoc=doc(db,'flights',id);
    const seatRef=collection(refDoc,'seat');
    const sql=query(seatRef);
    let seatData=[];
    onSnapshot(sql,(snapshot)=>{
      let allSeats=snapshot.docs.map((docx)=>{
          seatData.push(docx.data());
          return docx.data();
      });
      console.log("Seat",allSeats)
      setSeats([...allSeats]);
      callback(seatData);
    });
    
  }

  useEffect(() => {
    // getFlights(new Date());
  }, []);

  const razorpayOptionProvider=(total,email,contact,name)=>{
    let  RazorpayOptions = {
      description: "Thanks for Booking...",
      image: "https://media.istockphoto.com/id/1137971264/vector/airplane-fly-out-logo-plane-taking-off-stylized-sign.jpg?s=612x612&w=0&k=20&c=TH1vDs4wmGnfWapq_e1XYxqzQV_qxaF4_aJWoDJyKNI=",
      currency: "INR",
      key: "rzp_test_JLTuuIgp1lMSD8",
      amount: Math.round(total) * 100,
      name: "FlySky",
      order_id: "",
      prefill: {
        email: email,
        contact: contact,
        name: name,
      },
      theme: { color: '#0064D2' }
    };
    return RazorpayOptions;
  }

  const bookingOnline=async(userId,flightId,name,email,mob,idcard,gender,travelers)=>{
    try {
     await addDoc(bookingsRef, {
        userId: userId,
        flightId:flightId,
        name,
        email,
        mob,
        idcard,
        gender,
        travelers,
        createAt:Timestamp.fromDate(new Date())
      });
      return {
        success: true,
        msg: "Successfully Booked Flight"
      };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Inavalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      return { success: false, msg: msg };
    }
  }

  const updateFlight=async (flightId,data,selectedFlight)=>{
        await setDoc(doc(db, "flights", flightId), {
          arrival_city:selectedFlight.item.details.arrival_city,
          arrival_time:selectedFlight.item.details.arrival_time,
          departure_city:selectedFlight.item.details.departure_city,
          departure_time:selectedFlight.item.details.departure_time,
          flight_no:selectedFlight.item.details.flight_no,
          flight_status:selectedFlight.item.details.flight_status,
          id:selectedFlight.item.details.id,
          seat_capacity:selectedFlight.item.details.seat_capacity,
          ticket_price:selectedFlight.item.details.ticket_price,
          booked_seats: data,
        });
  }

  const [bookings,setBookings]=useState([]);
  const getBooking=async(userId)=>{
    const q = query(bookingsRef,where("userId", "==", userId));
    let unsub = onSnapshot(q, (snapshot) => {
      let allBooking = snapshot.docs.map((doc) => {
        // console.log(doc.id);  //-- get the documentID
        const data={doc_id:doc.id,
                    data:doc.data()
        }
        return data;
      });
      setBookings([...allBooking]);
      console.log("Bookings:", allBooking);
    });
    return unsub;
  }
 

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        register,
        logout,
        login,
        getAirports,
        airports,
        getFlights,
        flights,
        razorpayOptionProvider,
        bookingOnline,
        updateFlight,
        getBooking,
        bookings
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
