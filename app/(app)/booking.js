import React, { useEffect } from 'react'
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from "@/context/authContext";
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import H2 from '../../components/Text/H2';
import Booking from '../../components/Card/Booking';

const booking = () => {

    const {
        user,
        getBooking,
        bookings,
        getFlights,
        flights,
        getAirports,
        airports,
    }=useAuth();

    useEffect(async()=>{
            await getFlights();
            await getAirports();
            await getBooking(user?.userId);
    },[])

    const fetchData=(id)=>{
        let OBJ=flights.filter((item)=>item.doc_id == id )[0];
        return OBJ;
    }

    const fetchAiro=(id)=>{
        let OBJ=airports.filter((item)=>item.id == id )[0];
        return OBJ;
    }

  return (
    <View style={{backgroundColor:'#ffffff',flex:1}}>
      <StatusBar style='dark'/>
      <View
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                paddingHorizontal: 30,
                gap: 10,
                backgroundColor:'#0064D2',
                marginTop:30,
                height:60
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <H2>
                  Booking Tickets
                </H2>
              </View>
            </View>
     <FlatList
     data={bookings}
     renderItem={({item})=><Booking 
     booking={{
        flightNumber: fetchData(item.data.flightId).details.flight_no,
        departure: fetchAiro(fetchData(item.data.flightId).details.departure_city).name,
        arrival: fetchAiro(fetchData(item.data.flightId).details.arrival_city).name,
        date: new Date(item.data.createAt.toDate()).toISOString().substring(0, 10),
        passengerName:item.data.name,
        passengerNo:item.data.travelers
      }} 
     />}
     />
      
    </View>
  )
}

export default booking