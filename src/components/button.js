import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Button = (props) => {
  const { onPress, text } = props;
  return (
    <View>
      <TouchableOpacity
        style={{
          marginTop: 40,
          marginHorizontal: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "skyblue",
          padding: 10,
          borderRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={onPress}
      >
        <View>
          <Text style={{ color: "white", fontWeight: "bold" }}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
