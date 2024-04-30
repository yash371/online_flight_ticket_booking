import React, { useState } from "react";
import { Text, View } from "react-native";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
export default function RadioButtonCustome() {
  const [current, setCurrent] = useState("test");

  return (
    <View style={{  }}>
      <RadioButtonGroup
        containerStyle={{ flexDirection:'row',gap:10 }}
        selected={current}
        onSelected={(value) => setCurrent(value)}
        radioBackground="#0064D2"
      >
        <RadioButtonItem value="test2" label="One-Way" />
        <RadioButtonItem
          value="test"
          label="Round-trip"
        />
      </RadioButtonGroup>
    </View>
  );
}