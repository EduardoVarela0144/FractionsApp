import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { styles } from "../assets/styles";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ScoreData from "../assets/components/ScoreData";
import Men from "../assets/images/Men.png";
import Punk from "../assets/images/Punk.png";
import Female from "../assets/images/Female.png";
import Female2 from "../assets/images/Female2.png";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Scores() {
  const [documentos, setDocumentos] = useState([]);
  const [valoresAltos, setValoresAltos] = useState([]);

  useEffect(() => {
    const obtenerColeccion = async () => {
      try {
        const q = query(collection(db, "Scores"), orderBy("Score", "desc"));

        const querySnapshot = await getDocs(q);

        const documentosArray = [];
        querySnapshot.forEach((doc) => {
          documentosArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setDocumentos(documentosArray);
      } catch (error) {
        console.error("Error al obtener la colección:", error);
      }
    };

    obtenerColeccion();
  }, []);

  useEffect(() => {
    const obtenerTresValoresAltos = async () => {
      try {
        const q = query(
          collection(db, "Scores"),
          orderBy("Score", "desc"),
          limit(3)
        );

        const querySnapshot = await getDocs(q);

        const resultados = [];
        querySnapshot.forEach((doc) => {
          resultados.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setValoresAltos(resultados);
      } catch (error) {
        console.error("Error al obtener los tres valores más altos:", error);
      }
    };

    obtenerTresValoresAltos();
  }, []);

  const imageMap = {
    Men: Men,
    Punk: Punk,
    Female: Female,
    Female2: Female2,
  };

  const selectedImageUno = imageMap[valoresAltos[0]?.Avatar] || Men;
  const selectedImageDos = imageMap[valoresAltos[1]?.Avatar] || Punk;
  const selectedImageTres = imageMap[valoresAltos[2]?.Avatar] || Female;

  return (
    <View style={styles.container}>
      <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />
      <View
        style={{
          height: "30%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "50%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            Scores 🏆
          </Text>
        </View>
        <View
          style={{
            height: "50%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ height: "100%", width: "30%" }}>
            <View
              style={{
                height: "50%",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>2</Text>
            </View>
            <View
              style={{
                height: "50%",
                backgroundColor: "#CD7F32",
                justifyContent: "center",
                alignItems: "center",
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
              }}
            >
              <Image
                source={selectedImageDos}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ fontFamily: "Helvetica" }}>
                {valoresAltos[1]?.User}
              </Text>
            </View>
          </View>
          <View style={{ height: "100%", width: "30%" }}>
            <View
              style={{
                height: "30%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>1</Text>
            </View>
            <View
              style={{
                height: "70%",
                backgroundColor: "#FFD700",
                justifyContent: "flex-start",
                alignItems: "center",
                shadowOffset: {
                  width: 0,
                  height: -2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
              }}
            >
              <Image
                source={selectedImageUno}
                style={{ width: 40, height: 40, marginTop: 5 }}
              />
              <Text style={{ fontFamily: "Helvetica" }}>
                {valoresAltos[0]?.User}
              </Text>
            </View>
          </View>
          <View style={{ height: "100%", width: "30%" }}>
            <View
              style={{
                height: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>3</Text>
            </View>
            <View
              style={{
                height: "50%",
                backgroundColor: "#C0C0C0",
                justifyContent: "center",
                alignItems: "center",
                borderTopStartRadius: 10,
                borderTopEndRadius: 10,
              }}
            >
              <Image
                source={selectedImageTres}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{ fontFamily: "Helvetica" }}>
                {valoresAltos[2]?.User}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: "70%", paddingTop: 20 }}>
        <ScrollView>
          {documentos.map((documento) => (
            <ScoreData
              key={documento.id}
              id={documento.id}
              name={documento.User}
              points={documento.Score}
              avatar={documento.Avatar}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
