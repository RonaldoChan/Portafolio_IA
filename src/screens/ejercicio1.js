import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { useAlgoritmo } from './hooks';

export default function ejercicio1() {
  const [punto, setPunto] = useState([0, 0]);
  return (
    <View style={{ margin: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <TextInputComponent
          text={'Numero de filas'}
          value={`${punto[0] || ''}`}
          onChangeText={(value) => {
            const nuevoPunto = [...punto];
            const n = parseInt(value);
            nuevoPunto[0] = isNaN(n) ? 0 : n;
            setPunto(nuevoPunto);
          }}
        />
        <TextInputComponent
          text={'Numero de columnas'}
          value={`${punto[1] || ''}`}
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
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text>{props.text}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={'number-pad'}
        style={{
          width: '90%',
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
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          backgroundColor: 'white',
          elevation: 5,
        },
        props.style,
      ]}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
};

const Muro = ({ item, style }) => {
  const [color, setColor] = useState('white');

  useEffect(() => {
    item.listenUpdate((col) => {
      setColor(col);
    });
  }, []);

  return (
    <TouchableOpacity
    onLongPress={()=>{
      item.seleccionaInicioFin()
    }}
      onPress={()=>{
        item.seleccionarMuro()
      }}
      style={[
        style,
        {
          backgroundColor: color,
        },
      ]}></TouchableOpacity>
  );
};

const Tabla = ({ filas, columnas }) => {
  const dimension = useWindowDimensions();

  const { iniciar,reiniciar, escenario, crearEscenario } = useAlgoritmo();

  return (
    <ScrollView style={{ marginTop: 30, marginBottom: 50 }}>
      {escenario.map((item, i) => {
        return (
          <View key={i.toString()} style={{ flexDirection: 'row' }}>
            {item.map((item, j) => {
              return (
                <Muro
                  key={`${i}${j}`}
                  item={item}
                  style={{
                    width: (dimension.width - 40) / columnas,
                    height: (dimension.width - 40) / filas,
                    borderWidth: 1,
                  }}
                />
              );
            })}
          </View>
        );
      })}
      <Text
        onPress={() => {
          crearEscenario({ filas, columnas})
        }}>
        crear
      </Text>
      <Text
        onPress={() => {
          ToastAndroid.show('press ', 300);
          iniciar();
        }}>
        iniciar
      </Text>
      <Text
        onPress={() => {
          reiniciar()
        }}>
        reiniciar
      </Text>
      <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
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
      {/* <ScrollView style={{ height: 150 }}>
        {listaPared.map((item) => (
          <Text>{item}</Text>
        ))}
      </ScrollView> */}
    </ScrollView>
  );
};
