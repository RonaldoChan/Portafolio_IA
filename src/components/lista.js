import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Lista = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.title}</Text>
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};
