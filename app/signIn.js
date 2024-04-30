import React, { useRef, useState } from 'react'
import CustomKeyboardView from '../components/Keyboard/CustomKeyboardView'
import { StatusBar } from 'expo-status-bar'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import H1 from '../components/Text/H1'
import P from '../components/Text/P'
import CustomeInput from '../components/Input/CustomeInput'
import CustomeAuthButton from '../components/Button/CustomeAuthButton'
import SocialAuthButton from '../components/Button/SocialAuthButton'
import { useRouter } from 'expo-router'
import { useAuth } from "@/context/authContext";


const signIn = () => {

  const router=useRouter();
  const [loading,setLoading]=useState(false);
  const {login}=useAuth();
  const emailRef=useRef("");
  const passwordRef=useRef("");

  const handleLogin=async()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Sign In',"please fill all the fields");
    }

    //login process
    setLoading(true);
    let response=await login(emailRef.current,passwordRef.current);
    setLoading(false);

    console.log('got result:',response);
    if(!response.success){
      Alert.alert('Sign In',response.msg);
    }
  }

  return (
    <CustomKeyboardView>
        <StatusBar style='dark'/>
        <View style={styleFile.container}>
           <H1 style={{marginTop:100}}>Sign In</H1>
           <P style={{marginBottom:30}}>Start Your Journey with affordable price</P>
           <CustomeInput
           placeholder={"Enter Your Email"}
           lable="EMAIL"
           onChangeText={value=>emailRef.current=value}
           />
           <CustomeInput
           placeholder={"Enter Your Password"}
           lable="PASSWORD"
           secureTextEntry={true}
           onChangeText={value=>passwordRef.current=value}
           />
           <CustomeAuthButton text={"Sign In"} onPress={handleLogin} />
           <View style={{alignItems:'center'}}>
           <P style={{marginTop:20}}>Or Sign In With</P>
           </View>
           <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <SocialAuthButton icon="facebook"/>
            <SocialAuthButton icon="google"/>
            <SocialAuthButton icon="apple"/>
           </View>
           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',}}>
           <P style={{marginTop:20}}>Don't Have an Account?</P>
           <Pressable onPress={()=>router.push('signUp')}><P style={{color:"#0064D2"}}>Sign Up</P></Pressable>
           </View>
        </View>
    </CustomKeyboardView>
  )
}

export default signIn


const styleFile=StyleSheet.create({
  container:{
    paddingHorizontal:30,
    paddingTop:30,
    flex:1,
    gap:5,
    textAlign:'center'
  }
})
