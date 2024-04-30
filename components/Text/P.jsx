import React from 'react'
import { Text } from 'react-native'

const P = ({children,style}) => {
  return (
    <Text style={[{
        fontFamily:'SpaceMono',
        fontSize:14,
        fontWeight:400
    },style]}>
      {children}
    </Text>
  )
}

export default P
