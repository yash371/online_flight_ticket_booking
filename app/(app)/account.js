import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from "@/context/authContext";
import { StatusBar } from 'expo-status-bar';
import H2 from '../../components/Text/H2';
import ProfileCard from '../../components/Card/ProfileCard';

const account = () => {

  const {logout,user}=useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={{backgroundColor:'#ffffff',flex:1}}>
      <StatusBar style='dark'/>
      <View
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                paddingHorizontal: 30,
                gap: 10,
                backgroundColor:'#0064D2',
                marginTop:30,
                height:60
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <H2>
                  Profile
                </H2>
              </View>
            </View>
     
     <ProfileCard
      userDetails={{
        username:user?.username,
        email: user?.email,
        profilePicture: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg'
      }}
      onLogout={() => {
        handleLogout();
      }}
     />
      
    </View>
  )
}

export default account
