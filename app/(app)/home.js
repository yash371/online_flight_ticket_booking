import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/context/authContext";
import CustomKeyboardView from '../../components/Keyboard/CustomKeyboardView'
import { Image } from "expo-image";
import GlobalMap from "../../components/svg/GlobalMap";
import HeadLine from "../../components/Text/HeadLine";
import H2 from "../../components/Text/H2";
import H1 from "../../components/Text/H1";
import CheckBoxCustome from "../../components/form/CheckBoxCustome";
import RadioButtonCustome from "../../components/form/RadioButtonCustome";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { Picker } from "@react-native-picker/picker";
import FlightTakeOff from "../../components/svg/FlightTakeOff";
import FlightLand from "../../components/svg/FlightLand";
import Input from "../../components/form/Input";
import DatePick from "../../components/form/DatePick";
import Person from "../../components/svg/Person";
import CustomeAuthButton from "../../components/Button/CustomeAuthButton";
import moment from "moment";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import FlightCard from "../../components/Card/FlightCard";
import CustomeInput from "../../components/Input/CustomeInput";
import RazorpayCheckout from "react-native-razorpay";

const home = () => {
  const { user, logout, getAirports, airports, getFlights, flights,razorpayOptionProvider,bookingOnline,updateFlight } =
    useAuth();

  const router = useRouter();
  const [currentCheckBox, setCurrentCheckBox] = useState(1);
  const [currentPicker, setCurrentPicker] = useState(1);
  const [currentPicker2, setCurrentPicker2] = useState(1);
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format("MMMM D, YYYY")
  );
  const [currentDatePing, setCurrentDatePing] = useState(new Date());
  const [currentTravels, setCurrentTravels] = useState(1);

  useEffect(() => {
    getAirports();
  }, []);

  const [screenState, setScreen] = useState(1);

  const handleSearch = () => {
    setScreen(2);
    console.log(currentDatePing);
    getFlights(currentDatePing, currentPicker, currentPicker2);
  };

  // screen 3 states
  const [genderCheck, setGender] = useState("Male");

  const [selectedFlight, setSelectedFlight] = useState({});

  const emailRef = useRef("");
  const nameRef = useRef("");
  const codeRef = useRef("");
  const mobRef = useRef("");
  const idcardRef = useRef("");

  //

  const handlePayment= async(total)=>{

    if(nameRef.current != "" && emailRef.current != "" && codeRef.current != "" && mobRef.current != "" && idcardRef.current){

   

    var options = {
      description: "Thanks for Booking...",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3VBEc1bupQCQYByCox-z89D2Ev3PhSrjXnMn3fC3t0g&s",
      currency: "INR",
      key: "rzp_test_JLTuuIgp1lMSD8",
      amount: Math.round(total) * 100,
      name: "SkyFly",
      order_id: "",
      prefill: {
        email:emailRef.current,
        contact: codeRef.current+mobRef.current,
        name: nameRef.current,
      },
      theme: { color: 'white' },
    };
    RazorpayCheckout.open(options)
    .then(async(data) => {
      console.log("ROZER:",data);
      console.log();
      let response= await bookingOnline(
        user?.userId,
        selectedFlight.item.doc_id,
        nameRef.current,
        emailRef.current,
        mobRef.current,
        idcardRef.current,
        genderCheck,
        currentTravels,
      );

      await updateFlight(selectedFlight.item.doc_id, parseInt(currentTravels) +
        parseInt(selectedFlight?.item.details.booked_seats),selectedFlight);
      console.log('got resultBooking:',response);
    if(response.success){
      Alert.alert('Booking',response.msg);
    }
    setScreen(1);
    })
    .catch((error) => {
      console.log("Payment Error:",error)
    });
   }
   else{
    Alert.alert('Info','All Details Required');
   }
  }

  switch (screenState) {
    case 1:
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
              icon={<FlightTakeOff />}
              list={airports}
              removeID={currentPicker2}
            />

            <Input
              currentPicker={currentPicker2}
              setCurrentPicker={setCurrentPicker2}
              lable="To"
              icon={<FlightLand />}
              list={airports}
              removeID={currentPicker}
            />

            <DatePick
              value={currentDate}
              setValue={(x, y) => {
                setCurrentDate(x);
                setCurrentDatePing(y);
              }}
              lable="Departure Date"
            />

            <Input
              currentPicker={currentTravels}
              setCurrentPicker={setCurrentTravels}
              lable="Travelers"
              icon={<Person />}
              list={[]}
              notList={[1, 2, 3, 4, 5]}
            />

            <CustomeAuthButton
              text={"Search flights"}
              onPress={handleSearch}
              iconFlag={false}
            />
          </View>
        </ScrollView>
      );
    case 2:
      return (
        <View style={[styleFile.container]}>
          <GlobalMap />
          <View
            style={[
              styleFile.abslouteContainer,
              { justifyContent: "flex-start", top: 50 },
            ]}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                paddingHorizontal: 30,
              }}
            >
              <Pressable
                onPress={() => {
                  setScreen(1);
                }}
              >
                <FontAwesome5 name="backward" size={24} color="white" />
              </Pressable>
              <View style={{ width: "90%", alignItems: "center" }}>
                <H2>Search Flights</H2>
              </View>
            </View>
          </View>
          <SafeAreaView>
            <FlatList
              data={flights}
              renderItem={({ item }) => (
                <FlightCard
                  onPress={() => {
                    setSelectedFlight({
                      item: item,
                      departure: airports.filter(
                        (item) => item.id == currentPicker
                      )[0],
                      arrival: airports.filter(
                        (item) => item.id == currentPicker2
                      )[0],
                    });
                    setScreen(3);
                  }}
                  options={{
                    item: item,
                    departure: airports.filter(
                      (item) => item.id == currentPicker
                    )[0],
                    arrival: airports.filter(
                      (item) => item.id == currentPicker2
                    )[0],
                  }}
                />
              )}
            />
          </SafeAreaView>
        </View>
      );
    case 3:
      return (
        <CustomKeyboardView>
        <View style={[styleFile.container]}>
          <View
            style={[
              { justifyContent: "flex-start", marginTop: 50, marginBottom: 30 },
            ]}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                paddingHorizontal: 30,
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setScreen(2);
                }}
              >
                <FontAwesome5 name="backward" size={24} color="white" />
              </Pressable>
              <View style={{ width: "90%", alignItems: "center" }}>
                <H2>
                  {selectedFlight?.departure.name +
                    "->" +
                    selectedFlight?.arrival.name}
                </H2>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: "white", height: 700, padding: 10 }}>
            <H1 style={{ fontSize: 24, marginTop: 10 }}>
              Contact Person Details
            </H1>
            <View style={{ marginTop: 10 }}>
              <RadioButtonGroup
                containerStyle={{ flexDirection: "row", gap: 10 }}
                selected={genderCheck}
                onSelected={(value) => setGender(value)}
                radioBackground="#0064D2"
              >
                <RadioButtonItem value="Male" label="Male" />
                <RadioButtonItem value="Female" label="Female" />
              </RadioButtonGroup>
              <CustomeInput
                placeholder={"Dharmendra Singh"}
                lable="Full Name"
                onChangeText={(value) => (nameRef.current = value)}
                style={{ borderWidth: 1, borderRadius: 8, padding: 3 }}
                bottomBar={false}
              />

              <CustomeInput
                placeholder={"dharmendra@gmail.com"}
                lable="Email Address"
                onChangeText={(value) => (emailRef.current = value)}
                style={{ borderWidth: 1, borderRadius: 8, padding: 3 }}
                bottomBar={false}
              />
              <CustomeInput
                placeholder={"+91"}
                lable="Country Code"
                onChangeText={(value) => (codeRef.current = value)}
                style={{ borderWidth: 1, borderRadius: 8, padding: 3 }}
                bottomBar={false}
              />
              <CustomeInput
                placeholder={"9876543210"}
                lable="Phone Number"
                onChangeText={(value) => (mobRef.current = value)}
                style={{ borderWidth: 1, borderRadius: 8, padding: 3 }}
                bottomBar={false}
              />
              <CustomeInput
                placeholder={"125634789012"}
                lable="ID card Number"
                onChangeText={(value) => (idcardRef.current = value)}
                style={{ borderWidth: 1, borderRadius: 8, padding: 3 }}
                bottomBar={false}
              />
              <View>
                <Text>Booking Seat: {currentTravels}</Text>
                <Text>
                  Avaliable Seat:{" "}
                  {parseInt(selectedFlight?.item.details.seat_capacity) -
                    parseInt(selectedFlight?.item.details.booked_seats)}
                </Text>
              </View>
              <CustomeAuthButton
                text={
                  "₹" +
                  parseInt(currentTravels) *
                  parseFloat(selectedFlight?.item.details.ticket_price) +
                  "  Book"
                }
                onPress={() => {handlePayment(parseInt(currentTravels) *
                  parseFloat(selectedFlight?.item.details.ticket_price))}}
                // disabled={parseInt(selectedFlight?.item.details.seat_capacity) -
                //   parseInt(selectedFlight?.item.details.booked_seats) >= parseInt(currentTravels)}
              />
            </View>
          </View>
        </View>
        </CustomKeyboardView>
      );
  }
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
