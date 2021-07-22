import React from "react";
import { View, Text } from "react-native";
import { Lista } from "../components/lista";
import { Button } from "../components/button";
const data = [
  {
    navegacion: "Ejercicio1",
    id: 1,
    title: "Ejercicio",
    body: "Elabore un programa (cualquier lenguaje) para el problema del laberinto para un robot móvil usando búsqueda informada (A*).",
  },
  {
    navegacion: "Ejercicio2",
    id: 2,
    title: "Ejercicio",
    body: "Elabore un programa (cualquier lenguaje) para el problema del laberinto para un robot móvil usando búsqueda informada (A*).",
  },
  {
    navegacion: "Ejercicio3",
    id: 3,
    title: "Ejercicio",
    body: "Elabore un programa (cualquier lenguaje) para el problema del laberinto para un robot móvil usando búsqueda informada (A*).",
  },
  {
    navegacion: "Ejercicio1",
    id: 4,
    title: "Ejercicio",
    body: "Elabore un programa (cualquier lenguaje) para el problema del laberinto para un robot móvil usando búsqueda informada (A*).",
  },
];

export const ListaEjercicos = (props) => {
  console.log(`props lista`, props);
  const { navigation } = props;
  return (
    <View style={{ marginHorizontal: 30, marginTop: 20 }}>
      {data.map((item, index) => {
        return (
          <Lista
            key={item.id}
            title={`${item.title}${item.id}`}
            text={item.body}
            onPress={() => {
              navigation.navigate(item.navegacion);
            }}
          />
        );
      })}
      <Button
        text={"Regresar"}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default ListaEjercicos;
