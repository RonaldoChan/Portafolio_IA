import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Caratula from "./../screens/caratula";
import ListaEjercicios from "./../screens/listaEjercicios";
import EjercicioUno from "./../screens/ejercicio1";
import EjercicioDos from "./../screens/ejercicio2";
import EjercicioTres from "./../screens/ejercicio3";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ header: () => null }}
          name={"Caratula"}
          component={Caratula}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name={"ListaComponent"}
          component={ListaEjercicios}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name={"Ejercicio1"}
          component={EjercicioUno}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name={"Ejercicio2"}
          component={EjercicioDos}
        />
        <Stack.Screen
          options={{ header: () => null }}
          name={"Ejercicio3"}
          component={EjercicioTres}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
