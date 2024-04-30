import React from 'react'
import { Pressable, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';

const SocialAuthButton = ({icon}) => {
  return (
    <Pressable style={{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F2F3F6',
        borderRadius:8,
        height:100,
        width:"30%",
    }}>
      <FontAwesome5 name={icon} size={24} color="black" />
    </Pressable>
  )
}

export default SocialAuthButton
