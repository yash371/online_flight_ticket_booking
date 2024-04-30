import React from 'react'
import { Text } from 'react-native'

const H1 = ({children,style}) => {
  return (
    <Text style={[{
        fontFamily:'SpaceMono',
        fontSize:40,
        fontWeight:700
    },style]}>
      {children}
    </Text>
  )
}

export default H1
