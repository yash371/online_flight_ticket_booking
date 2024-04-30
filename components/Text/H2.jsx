import React from 'react'
import { Text } from 'react-native'

const H2 = ({children,style}) => {
  return (
    <Text style={[{
        fontFamily:'SpaceMono',
        fontSize:20,
        fontWeight:700,
        color:'#ffffff'
    },style]}>
      {children}
    </Text>
  )
}

export default H2
