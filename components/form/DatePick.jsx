import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePi from '../../components/svg/DatePi';
import moment from 'moment';
const DatePick = ({value,setValue,lable}) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    setValue(moment(date).format("MMMM D, YYYY"));
    hideDatePicker();
  };

  return (
    <View style={{
        gap:5,marginTop:20
    }}>
    <Text>{lable}</Text>
    <Pressable style={
        {
            flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    height:60,
    backgroundColor:'#F5F6F6',
    paddingHorizontal:5,
    borderRadius:12
        }
    } onPress={showDatePicker} >
         <View style={{width:"10%",alignItems:'center'}}><DatePi/></View>
        <Text style={{marginLeft:10}}>{value}</Text>
    </Pressable>
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
    />
    </View>
  )
}

export default DatePick
