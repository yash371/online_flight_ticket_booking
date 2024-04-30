import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/context/authContext";
import { Image } from "expo-image";
import GlobalMap from "../../components/svg/GlobalMap";
import HeadLine from "../../components/Text/HeadLine";
import H2 from "../../components/Text/H2";
import CheckBoxCustome from "../../components/form/CheckBoxCustome";
import RadioButtonCustome from "../../components/form/RadioButtonCustome";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Picker } from "@react-native-picker/picker";
import FlightTakeOff from "../../components/svg/FlightTakeOff";
import FlightLand from "../../components/svg/FlightLand";
import Input from "../../components/form/Input";
import DatePick from "../../components/form/DatePick";
import Person from '../../components/svg/Person';
import CustomeAuthButton from "../../components/Button/CustomeAuthButton";
import moment from "moment";


const home = () => {
  const { user, logout ,getAirports,airports} = useAuth();

  
  const [currentCheckBox, setCurrentCheckBox] = useState(1);
  const [currentPicker, setCurrentPicker] = useState(1);
  const [currentPicker2, setCurrentPicker2] = useState(1);
  const [currentDate, setCurrentDate] = useState(moment(new Date()).format("MMMM D, YYYY"));
  const [currentTravels, setCurrentTravels] = useState(1);
  

  useEffect(()=>{
    getAirports();
  },[])



  


  return (
    <ScrollView style={styleFile.container}>
      <View style={styleFile.topContainer}>
        <GlobalMap />
        <View style={styleFile.abslouteContainer}>
          <View style={{ alignItems: "center", width: "100%" }}>
            <H2>Search Flights</H2>
          </View>
          <HeadLine style={{ width: "70%", marginTop: 20 }}>
            Discover a new World
          </HeadLine>
        </View>
      </View>
      <View style={styleFile.bottomContainer}>
        <View>
          <RadioButtonGroup
            containerStyle={{ flexDirection: "row", gap: 10 }}
            selected={currentCheckBox}
            onSelected={(value) => setCurrentCheckBox(value)}
            radioBackground="#0064D2"
          >
            <RadioButtonItem value="1" label="One-Way" />
            <RadioButtonItem value="2" label="Round-trip" />
          </RadioButtonGroup>
        </View>

        <Input
        currentPicker={currentPicker}
        setCurrentPicker={setCurrentPicker}
        lable="Form"
        icon={<FlightTakeOff/>}
        list={airports}
        removeID={currentPicker2}
        />
        
        <Input
        currentPicker={currentPicker2}
        setCurrentPicker={setCurrentPicker2}
        lable="To"
        icon={<FlightLand/>}
        list={airports}
        removeID={currentPicker}
        />

      <DatePick
      value={currentDate} 
      setValue={setCurrentDate}
      lable="Departure Date"
      />

      <Input
        currentPicker={currentTravels}
        setCurrentPicker={setCurrentTravels}
        lable="Travelers"
        icon={<Person/>}
        list={[]}
        notList={[1,2,3,4,5]}
        />
       
       <CustomeAuthButton text={"Search flights"}  iconFlag={false} />

      </View>
    </ScrollView>
  );
};

export default home;

const styleFile = StyleSheet.create({
  container: { backgroundColor: "#0064D2", flex: 1 },
  topContainer: { marginTop: 40, marginHorizontal: 30 },
  abslouteContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
  },
  bottomContainer: {
    backgroundColor: "#ffffff",
    height: 600,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
});
