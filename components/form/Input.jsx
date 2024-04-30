import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Text, View } from 'react-native'

const Item  = Picker.Item;

const Input = ({lable,icon,currentPicker,setCurrentPicker,list=[],removeID=0,notList=[]}) => {
  return (
    <View style={{gap:5,marginTop:20}}>
    <Text>{lable}</Text>
  <View style={{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:60,
    backgroundColor:'#F5F6F6',
    paddingHorizontal:5,
    borderRadius:12
    }}>
    <View style={{width:"10%",alignItems:'center'}}>{icon}</View>
  <Picker
  style={{width:"90%"}}
    testID="basic-picker"
    selectedValue={currentPicker}
    onValueChange={(v) => setCurrentPicker(v)}
    accessibilityLabel="Basic Picker Accessibility Label">
        {list.filter((i)=>i.id !== removeID ).map((i)=><Item key={i.id} label={i.name+","+i.address} value={i.id} />)}
        {notList.map((i)=><Item key={i} label={i} value={i} />)}

  </Picker>
  </View>
  </View>
  )
}

export default Input
