import React from 'react'
import { View,Text, StyleSheet } from 'react-native'

const Booking = ({booking}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Flight Ticket</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Flight Number:</Text>
        <Text style={styles.value}>{booking.flightNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Departure:</Text>
        <Text style={styles.value}>{booking.departure}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Arrival:</Text>
        <Text style={styles.value}>{booking.arrival}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{booking.date}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{booking.passengerName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>No Passenger:</Text>
        <Text style={styles.value}>{booking.passengerNo}</Text>
      </View>
    </View>
  )
}

export default Booking


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    flexShrink: 1,
  },
});

