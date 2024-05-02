import React from 'react'
import { Text, View } from 'react-native'
import {Stack, Tabs} from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

export default function _layout(){
  return (
    <Tabs screenOptions={{ 
    tabBarActiveTintColor: 'blue',
    tabBarActiveBackgroundColor:'#ffffff',
    tabBarInactiveBackgroundColor:'#ffffff' }}>
         <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          header:()=>""
        }}
      />
       <Tabs.Screen
        name="booking"
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color }) => <Entypo name="aircraft" size={24} color={color} />,
          header:()=>""
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          header:()=>""
        }}
      />
     
    </Tabs>
  )
}
