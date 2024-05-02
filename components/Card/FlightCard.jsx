import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Airoplan from '../svg/Airoplan';
import Qatar from '../svg/Qatar';

const FlightCard = ({options,onPress}) => {

  const dateObj = new Date(options.item.details.departure_time.toDate());
  const dateObjar = new Date(options.item.details.arrival_time.toDate());
  const ddate=dateObj.toISOString().substring(0, 10);
  const adate=dateObjar.toISOString().substring(0, 10);
  const dhour = dateObj.getUTCHours();
  const dminute = dateObj.getUTCMinutes();
  const ahour = dateObjar.getUTCHours();
  const aminute = dateObjar.getUTCMinutes();

  return (
    <TouchableOpacity onPress={onPress}>
    <View style={{height:200,marginHorizontal:20,borderRadius:20,alignItems:'center'}}>
    <View style={{backgroundColor:"white",height:"40%",borderRadius:20,padding:10,
  flexDirection:'row',
  justifyContent:'space-between',
  width:'100%'
  }}>
      <View style={{width:"40%"}}>
        <Text style={{width:"100%",flexWrap:'wrap',fontFamily:"SpaceMono",fontSize:16,fontWeight:700}}>{options.departure.name}</Text>
        <Text style={{width:"100%",flexWrap:'wrap',fontFamily:"SpaceMono",fontSize:14,fontWeight:600}}>{options.departure.address}</Text>
       
      </View>  
      <View style={{width:"10%"}}>
          <Airoplan/>
      </View>
      <View style={{width:"40%"}}>
      <Text style={{width:"100%",flexWrap:'wrap',fontFamily:"SpaceMono",fontSize:16,fontWeight:700}}>{options.arrival.name}</Text>
      <Text style={{width:"100%",flexWrap:'wrap',fontFamily:"SpaceMono",fontSize:14,fontWeight:600}}>{options.arrival.address}</Text>
      </View>
    </View>
    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:"white",
      borderRadius:10,
      height:"30%",
      width:'97%',
      justifyContent:'center'
     }}>
         <View style={{width:"50%",alignItems:"center"}}>
         <Text style={{fontFamily:"SpaceMono",fontSize:20,fontWeight:900,marginTop:10}}>{dhour+":"+dminute}</Text>
         <Text style={{fontFamily:"SpaceMono",fontSize:10,fontWeight:600,marginTop:10}}>{ddate}</Text>
         </View>
         <View style={{width:"50%",alignItems:"center"}}>
         <Text style={{fontFamily:"SpaceMono",fontSize:20,fontWeight:900,marginTop:10}}>{ahour+":"+aminute}</Text>
         <Text style={{fontFamily:"SpaceMono",fontSize:10,fontWeight:600,marginTop:10}}>{adate}</Text>
         </View>
    </View>
    <View style={{width:'100%',
    backgroundColor:"white",
    height:"30%",
    borderRadius:20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:20,
    flexDirection:'row',
    justifyContent:'space-between'
    }}>
      <Qatar/>
      <Text style={{fontFamily:"SpaceMono",fontSize:18,fontWeight:800}}>₹{options.item.details.ticket_price}</Text>
    </View>
    </View>
   </TouchableOpacity>
  )
}

export default FlightCard


