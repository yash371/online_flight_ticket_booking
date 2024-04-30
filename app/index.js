import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const StartPage = () => {
  return (
    <View style={styleFile.container}>
      <ActivityIndicator size={"large"} color={"gray"} />
    </View>
  )
}

export default StartPage


const styleFile=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'#000000'
    }
})