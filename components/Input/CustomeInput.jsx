import React from 'react'
import { Text, TextInput, View } from 'react-native'

const CustomeInput = ({
    onChangeText,
    cutomeStyle,
    placeholder,
    lable,
    secureTextEntry,
    style,
    bottomBar=true
}) => {
  return (
    <View style={[{gap:4,marginTop:20},style]}>
        <Text style={{
            fontSize:14,
            color:"gray"
        }}>{lable}</Text>
    <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[{
            fontFamily:'SpaceMono',
            fontSize: 16
        },cutomeStyle]}
        secureTextEntry={secureTextEntry}
    />
   {bottomBar?<View style={{height:2,backgroundColor:'gray',opacity:0.5}}/>:("")}
    </View>
  )
}

export default CustomeInput
