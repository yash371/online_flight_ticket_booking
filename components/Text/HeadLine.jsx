import React from 'react'
import { Text } from 'react-native'

const HeadLine = ({children,style}) => {
  return (
    <Text style={[{
        fontFamily:'SpaceMono',
        fontSize:34,
        fontWeight:900,
        color:'#ffffff',
        flexWrap: 'wrap'
    },style]}>
      {children}
    </Text>
  )
}

export default HeadLine
