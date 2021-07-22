import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
} from "react-native";

export default function ejercicio1() {
  const [punto, setPunto] = useState([0, 0]);
  return (
    <View style={{ margin: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <TextInputComponent
          text={"Numero de filas"}
          value={`${punto[0] || ""}`}
          onChangeText={(value) => {
            const nuevoPunto = [...punto];
            const n = parseInt(value);
            nuevoPunto[0] = isNaN(n) ? 0 : n;
            setPunto(nuevoPunto);
          }}
        />
        <TextInputComponent
          text={"Numero de columnas"}
          value={`${punto[1] || ""}`}
          onChangeText={(value) => {
            const nuevoPunto = [...punto];
            const n = parseInt(value);
            nuevoPunto[1] = isNaN(n) ? 0 : n;
            setPunto(nuevoPunto);
          }}
        />
      </View>

      <Tabla filas={punto[0]} columnas={punto[1]} />
    </View>
  );
}

const TextInputComponent = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text>{props.text}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={"number-pad"}
        style={{
          width: "90%",
          height: 40,
          borderWidth: 0.5,
          borderRadius: 5,
          paddingHorizontal: 10,
        }}
      />
    </View>
  );
};

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[
        {
          padding: 10,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          backgroundColor: "white",
          elevation: 5,
        },
        props.style,
      ]}
    >
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
};

const Tabla = (props) => {
  const datosFila = new Array(props.filas)
    .fill(0)
    .map((_, index) => `f${index}`);
  const datosColumna = new Array(props.columnas)
    .fill(0)
    .map((_, index) => `c${index}`);
  const [pared, setPared] = useState({});
  const [inicioFin, setInicioFin] = useState(["", ""]);
  const listaPared = Object.keys(pared);
  console.log(`pared`, listaPared);
  console.log(`inicio fin`, inicioFin);
  const dimension = useWindowDimensions();
  return (
    <ScrollView style={{ marginTop: 30, marginBottom: 50 }}>
      {datosFila.map((keyF, i) => {
        return (
          <View key={keyF} style={{ flexDirection: "row" }}>
            {datosColumna.map((keyC, j) => {
              const key = `${i},${j}`;
              let color =
                inicioFin[0] === key || inicioFin[1] === key
                  ? "yellow"
                  : pared[key]
                  ? "black"
                  : "white";

              const pintar = () => {
                setPared({ ...pared, [key]: true });
              };

              const despintar = () => {
                const nuevaPared = { ...pared };
                delete nuevaPared[key];
                console.log(`nuevaPAreds`, nuevaPared);
                setPared(nuevaPared);
              };

              return (
                <TouchableOpacity
                  onLongPress={() => {
                    if (!pared[key]) {
                      const aux = [...inicioFin];
                      aux[0] = key;
                      ToastAndroid.show("Seleccione Fin ", 300);
                      setInicioFin(aux);
                    }
                  }}
                  key={keyC}
                  onPress={() => {
                    if (inicioFin[0] && inicioFin[1]) {
                      setInicioFin(["", ""]);
                    } else if (inicioFin[0]) {
                      const aux = [...inicioFin];
                      aux[1] = key;
                      setInicioFin(aux);
                    } else {
                      if (pared[key]) {
                        despintar();
                      } else {
                        pintar();
                      }
                    }
                  }}
                  style={{
                    width: (dimension.width - 40) / props.columnas,
                    height: (dimension.width - 40) / props.filas,
                    borderWidth: 1,
                    backgroundColor: color,
                  }}
                ></TouchableOpacity>
              );
            })}
          </View>
        );
      })}
      <Text style={{ fontWeight: "bold", textAlign: "center" }}>
        Lista de paredes
      </Text>
      {/* <FlatList
        data={listaPared}
        renderItem={({ item }) => (
          <Text style={{ marginRight: "20%" }}>{item}</Text>
        )}
        numColumns={2}
        keyExtractor={(item) => item}
      /> */}
      <ScrollView style={{ height: 150 }}>
        {listaPared.map((item) => (
          <Text>{item}</Text>
        ))}
      </ScrollView>
    </ScrollView>
  );
};
