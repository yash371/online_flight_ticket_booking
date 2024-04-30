import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from "@/context/authContext";

const account = () => {

  const {logout}=useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{backgroundColor:'#ffffff',flex:1}}>
      <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
      </TouchableOpacity>
     
     
      
    </View>
  )
}

export default account
