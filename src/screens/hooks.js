import { useState, useRef, useEffect } from 'react';
import { ToastAndroid } from 'react-native';

const FPS = 50;

const TIPOS = {
  vacio: { valor: 0, color: 'white' },
  inicio: { valor: 1, color: 'yellow' },
  fin: { valor: 2, color: 'pink' },
  muro: { valor: 3, color: 'black' },
  abierto: { color: 'red' },
  cerrado: { color: 'skyblue' },
  camino: { color: 'green' },
};

function Casilla({ x, y, escenario, filas, columnas, refInicioFin }) {
  this.callback = () => {};

  this.listenUpdate = (callback) => {
    this.callback = callback;
  };

  //POSICIÓN
  this.x = x;
  this.y = y;

  //TIPO (puntofinal=3, puntoInicio=2, muro=1, vacío=0, )
  this.tipo = TIPOS.vacio.valor;

  //PESOS
  this.f = 0; //coste total (g+h)
  this.g = 0; //pasos dados
  this.h = 0; //heurística (estimación de lo que queda)

  this.vecinos = [];
  this.padre = null;

  //CALCULA SUS VECNIOS
  this.addVecinos = () => {
    if (this.x > 0) this.vecinos.push(escenario[this.y][this.x - 1]); //vecino izquierdo

    if (this.x < filas - 1) this.vecinos.push(escenario[this.y][this.x + 1]); //vecino derecho

    if (this.y > 0) this.vecinos.push(escenario[this.y - 1][this.x]); //vecino de arriba

    if (this.y < columnas - 1) this.vecinos.push(escenario[this.y + 1][this.x]); //vecino de abajo
  };

  //PINTA LOS ABIERTOS
  this.pintarLA = () => {
    this.callback(TIPOS.abierto.color);
  };

  //PINTA LOS CERRADOS
  this.ointarLC = () => {
    this.callback(TIPOS.cerrado.color);
  };

  //PINTA CAMINO
  this.pintarCamino = () => {
    this.callback(TIPOS.camino.color);
  };

  const setTipo = (tipo) => {
    const { color, valor } = tipo;
    this.tipo = valor;
    this.callback(color);
  };

  //SELECCIONA INICIO o FIN
  this.seleccionaInicioFin = () => {
    if (!refInicioFin.current[0]) {
      setTipo(TIPOS.inicio);
      refInicioFin.current[0] = this;
    } else if (refInicioFin.current[0] && !refInicioFin.current[1]) {
      setTipo(TIPOS.fin);
      refInicioFin.current[1] = this;
    }
  };

  //selecciona y pinta el muro
  this.seleccionarMuro = () => {
    if (this.tipo === TIPOS.muro.valor) {
      setTipo(TIPOS.vacio);
    } else if (this.tipo === TIPOS.vacio.valor) {
      setTipo(TIPOS.muro);
    }
  };

  this.limpiar = () => {
    setTipo(TIPOS.vacio);
  };
}

function heuristica(a, b) {
  let x = Math.abs(a.x - b.x);
  let y = Math.abs(a.y - b.y);

  let dist = x + y;

  return dist;
}

function borraDelArray(array, elemento) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] == elemento) {
      array.splice(i, 1);
    }
  }
}

export function creaArray2D(f, c) {
  const obj = new Array(f);
  for (let a = 0; a < f; a++) {
    obj[a] = new Array(c).fill(0);
  }
  return obj;
}

export function useAlgoritmo() {
  const [escenario, setEscenario] = useState([]);
  const refTerminado = useRef(false);
  const refin = useRef([]);
  const refListaAbiertos = useRef([]);
  const refListaCerrados = useRef([]);
  const refCamino = useRef([]);
  const refInterval = useRef();
  const refInicioFin = useRef([]);
  const refMedidas = useRef({ filas: 0, columnas: 0 });

  const crearEscenario = ({ filas, columnas }) => {
    refMedidas.current.filas = filas;
    refMedidas.current.columnas = columnas;
    const currEscenario = creaArray2D(filas, columnas);
    //AÑADIMOS LOS OBJETOS CASILLAS
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (currEscenario[i]) {
          currEscenario[i][j] = new Casilla({
            x: j,
            y: i,
            filas,
            columnas,
            escenario: currEscenario,
            refInicioFin,
          });
        }
      }
    }
    //AÑADIMOS LOS VECINOS
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        if (currEscenario[i]?.[j]) {
          currEscenario[i][j].addVecinos();
        }
      }
    }
    console.log('reinit');
    setEscenario(currEscenario);
  };

  const marcarInicioFin = () => {
    refListaAbiertos.current = [refInicioFin.current[0]];
    refin.current = refInicioFin.current[1];
  };

  const finalizar = () => {
    refTerminado.current = false;
    refListaAbiertos.current = [];
    refListaCerrados.current = [];
    refCamino.current = [];
    refin.current = [];
    refInicioFin.current = [];
  };

  const reiniciar = () => {
    finalizar();
    setEscenario([]);
    setTimeout(() => {
      crearEscenario(refMedidas.current);
    }, 1);
  };

  const algoritmo = () => {
    const listaAbiertos = refListaAbiertos.current;
    const listaCerrados = refListaCerrados.current;
    const camino = refCamino.current;
    const fin = refin.current;

    if (!refTerminado.current) {
      //SEGUIMOS SI HAY AlGO EN LOS ABIERTOS
      if (listaAbiertos.length > 0) {
        let ganador = 0; //índie o posición dentro de la lista de abiertos del ganador

        //evaluamos la lista de abiertos que tiene un menor coste / esfuerzo
        for (i = 0; i < listaAbiertos.length; i++) {
          if (listaAbiertos[i].f < listaAbiertos[ganador].f) {
            ganador = i;
          }
        }

        //Analizamos la casilla ganadora
        let actual = listaAbiertos[ganador];

        //SI HEMOS LLEGADO AL FINAL BUSCAMOS EL CAMINO DE VUELTA
        if (actual === fin) {
          let temporal = actual;
          camino.push(temporal);

          while (temporal.padre != null) {
            temporal = temporal.padre;
            camino.push(temporal);
          }
          refTerminado.current = true;
          clearInterval(refInterval.current);
        }

        //SI NO HEMOS LLEGADO AL FINAL, SEGUIMOS
        else {
          borraDelArray(listaAbiertos, actual);
          listaCerrados.push(actual);

          let vecinos = actual.vecinos;

          //RECORRO LOS VECINOS DE MI GANADOR
          for (let i = 0; i < vecinos.length; i++) {
            let vecino = vecinos[i];

            //SI EL VECINO NO ESTÁ EN LOS CERRADOS Y NO ES UNA PARED, HACEMOS LOS CÁLCULOS
            if (
              !listaCerrados.includes(vecino) &&
              vecino.tipo !== TIPOS.muro.valor
            ) {
              let tempG = actual.g + 1;

              //si el vecino está en la lista abierta y su peso es mayor
              if (listaAbiertos.includes(vecino)) {
                if (tempG < vecino.g) {
                  vecino.g = tempG; //camino más corto
                }
              } else {
                vecino.g = tempG;
                listaAbiertos.push(vecino);
              }

              //ACTUALIZAMOS VALORES
              vecino.h = heuristica(vecino, fin);
              vecino.f = vecino.g + vecino.h;

              //GUARDAMOS EL PADRE (DE DÓNDE VENIMOS)
              vecino.padre = actual;
            }
          }
        }
      } else {
        ToastAndroid.show('No hay un camino posible', ToastAndroid.SHORT);
        console.log('No hay un camino posible');
        refTerminado.current = true; //el algoritmo ha terminado
        clearInterval(refInterval.current);
      }
    }
  };

  const dibujaEscenario = () => {
    const listaAbiertos = refListaAbiertos.current;
    const listaCerrados = refListaCerrados.current;
    const camino = refCamino.current;

    //PINTA LOS ABIERTOS
    for (let i = 0; i < listaAbiertos.length; i++) {
      listaAbiertos[i].pintarLA();
    }

    //PINTA LOS CERRADOS
    for (let i = 0; i < listaCerrados.length; i++) {
      listaCerrados[i].ointarLC();
    }

    for (let i = 0; i < camino.length; i++) {
      camino[i].pintarCamino();
    }

    if (refTerminado.current) {
      finalizar();
    }
  };

  const iniciar = () => {
    if (!refInicioFin.current[0]) {
      ToastAndroid.show('Seleccione un punto de inicio', ToastAndroid.SHORT);
      return;
    } else if (!refInicioFin.current[1]) {
      ToastAndroid.show('Seleccione un punto de fin', ToastAndroid.SHORT);
      return;
    }
    marcarInicioFin();

    refInterval.current = setInterval(() => {
      algoritmo();
      dibujaEscenario();
    }, 1000 / FPS);
  };

  useEffect(() => {
    return () => {
      clearInterval(refInterval.current);
    };
  }, []);

  return { iniciar, reiniciar, escenario, crearEscenario };
}