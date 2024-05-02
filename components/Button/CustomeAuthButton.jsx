import React from 'react'
import {  Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const CustomeAuthButton = ({text,style,onPress,iconFlag=true,disabled=false}) => {
  return (
    <TouchableOpacity 
    disabled={disabled}
    onPress={onPress}
    style={[{
        flexDirection:'row',
        height:48,
        backgroundColor:'#0064D2',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        gap:5,
        marginTop:20
    },style]}
    >
      <Text style={{color:"#ffffff",fontWeight:600,fontSize:16}}>{text}</Text>
     {iconFlag?<AntDesign name="checkcircle" size={24} color="white" /> :''}
    </TouchableOpacity>
  )
}

export default CustomeAuthButton
