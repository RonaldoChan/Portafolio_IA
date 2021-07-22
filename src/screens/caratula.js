import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "../components/button";

export const Caratula = () => {
  const inicio = { "3,1": true, "3,3": true };
  const [abierta, setAbierta] = useState();
  const add = Object.keys(inicio);
  const a = useEffect(() => {
    setAbierta(add);
  }, []);
  console.log(`abierta`, abierta);

  const navigation = useNavigation();
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ resizeMode: "contain", height: 300, width: 300 }}
          source={require("./../../assets/logo_UNT.png")}
        />
        <Text
          style={{
            marginTop: -40,
            fontSize: 20,
            fontWeight: "bold",
            color: "skyblue",
          }}
        >
          Inteligencia artificial
        </Text>
        <Image
          style={{ resizeMode: "contain", height: 200, width: 200 }}
          source={require("./../../assets/cerebro.png")}
        />
        <Button
          text={"Ingresar"}
          onPress={() => {
            console.log(`ingresar`, navigation.navigate("ListaComponent"));
            // navigation.navigate("Lista");
          }}
        ></Button>
      </View>
    </View>
  );
};

export default Caratula;
