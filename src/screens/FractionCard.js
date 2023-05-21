import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles } from "../assets/styles";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function FractionCard(props) {
  const {
    navigation,
    route: { params },
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [answer, setAnswer] = useState();
  const [points, setPoints] = useState(0);
  const [visible, setVisible] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
  const [tag, setTag] = useState("");

  var bar_styles = {
    backgroundColor: "#1BABFF",
    width: `${points}%`,
    height: 10,
    borderRadius: 10,
  };
  const [fraction1, setFraction1] = useState(null);
  const [fraction2, setFraction2] = useState(null);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    generateFractionsAndOperation();
  }, []);

  const generateFractionsAndOperation = () => {
    const numerator1 = Math.floor(Math.random() * 10) + 1;
    const denominator1 = Math.floor(Math.random() * 10) + 1;
    const numerator2 = Math.floor(Math.random() * 10) + 1;
    const denominator2 = Math.floor(Math.random() * 10) + 1;

    const randomOperation = Math.floor(Math.random() * 4);
    let operation;
    let result;

    switch (randomOperation) {
      case 0: // Sum
        operation = "+";
        result = {
          numerator: numerator1 * denominator2 + numerator2 * denominator1,
          denominator: denominator1 * denominator2,
        };
        break;
      case 1: // Subtraction
        operation = "-";
        result = {
          numerator: numerator1 * denominator2 - numerator2 * denominator1,
          denominator: denominator1 * denominator2,
        };
        break;
      case 2: // Multiplication
        operation = "×";
        result = {
          numerator: numerator1 * numerator2,
          denominator: denominator1 * denominator2,
        };
        break;
      case 3: // Division
        operation = "÷";
        result = {
          numerator: numerator1 * denominator2,
          denominator: denominator1 * numerator2,
        };
        break;
      default:
        break;
    }

    setFraction1({ numerator: numerator1, denominator: denominator1 });
    setFraction2({ numerator: numerator2, denominator: denominator2 });
    setOperation(operation);
    setResult(result);
    generateOptions(result);
  };

  const generateOptions = (correctResult) => {
    const options = [];
    options.push(correctResult);

    while (options.length < 20) {
      const numerator = Math.floor(Math.random() * 10) + 1;
      const denominator = Math.floor(Math.random() * 10) + 1;

      const option = {
        numerator,
        denominator,
      };

      const isDuplicate = options.some((existingOption) =>
        checkFractionsEquality(existingOption, option)
      );

      if (!isDuplicate) {
        options.push(option);
      }
    }

    shuffleArray(options);
    setOptions(options);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const checkFractionsEquality = (fraction1, fraction2) => {
    const product1 = fraction1.numerator * fraction2.denominator;
    const product2 = fraction2.numerator * fraction1.denominator;
    return product1 === product2;
  };

  const handleOptionSelect = (selectedOption) => {
    if (checkFractionsEquality(selectedOption, result)) {
      //Alert.alert("Correct!");
      setTag("good job");
      fetchRandomGif();
      setAnswer("Correct!");
      setVisible(true);
      setPoints(points + 10);
      setModalVisible(true);
    } else {
      //Alert.alert("Incorrect!");
      setTag("bad job");
      fetchRandomGif();
      setAnswer("Incorrect!");
      setModalVisible(true);
    }

    generateFractionsAndOperation();
  };

  const HideModal = () => {
    setModalVisible(!modalVisible);
    setVisible(false);
    if (points >= 1) {
      goToFinalScore();
    }
  };

  const fetchRandomGif = async () => {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/random", {
        params: {
          api_key: "9Iy1A9JDXyAgMKPDfxOudSSllG7k5j1g",
          tag: tag,
        },
      });

      const gifData = response.data.data;
      const gifUrl = gifData.images.fixed_height_downsampled.url;
      setGifUrl(gifUrl);
    } catch (error) {
      console.log("Error al obtener el GIF:", error);
    }
  };

  const color = {
    color: answer === "Correct!" ? "#21D589" : "red",
  };

  const goToFinalScore = () => {
    navigation.navigate("Final Score Screen", { score: points });
  };

  return (
    <View style={{ backgroundColor: "#F7F8FB", height: "100%" }}>
      <View style={{ marginTop: 70 }}>
        <Text
          style={{
            textAlign: "right",
            paddingRight: 10,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Welcome, {params.name} 👋{" "}
        </Text>
        <View
          style={{ alignItems: "flex-end", marginBottom: 50, paddingRight: 10 }}
        >
          {visible && (
            <Animatable.Text
              animation="zoomIn"
              duration={500}
              style={{ fontSize: 24, fontWeight: "bold", color: "#21D589" }}
            >
              +1
            </Animatable.Text>
          )}
          <View
            style={{
              backgroundColor: "#dedede",
              width: "70%",
              height: 10,
              borderRadius: 10,
            }}
          >
            <View style={bar_styles} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ textAlign: "center" }}>
            <Text
              style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
            >
              {fraction1 && `${fraction1.numerator}`}
            </Text>
            <View
              style={{
                backgroundColor: "black",
                height: 4,
                borderRadius: 10,
              }}
            />
            <Text
              style={{ fontSize: 30, textAlign: "center", fontWeight: "bold" }}
            >
              {fraction1 && `${fraction1.denominator}`}
            </Text>
          </View>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", marginHorizontal: 10 }}
          >
            {operation}
          </Text>
          <View style={{ textAlign: "center" }}>
            <Text
              style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
            >
              {fraction2 && `${fraction2.numerator}`}
            </Text>
            <View
              style={{
                backgroundColor: "black",
                height: 4,
                borderRadius: 10,
              }}
            />
            <Text
              style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}
            >
              {fraction2 && `${fraction2.denominator}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 15,
            justifyContent: "space-evenly",
          }}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={{
                marginTop: 8,
                width: "20%",
                alignItems: "center",
                borderRadius: 15,
                marginRight: 10,
                marginLeft: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#1BABFF",
                  borderRadius: 15,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {option.numerator}
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 6,
                    borderRadius: 60,
                    marginTop: 10,
                    marginBottom: 10,
                    width: "70%",
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {option.denominator}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, color]}>{answer}</Text>
            {gifUrl ? (
              <Image
                source={{ uri: gifUrl && gifUrl }}
                style={{ width: 250, height: 250 }}
              />
            ) : (
              <ActivityIndicator size="large" color="#1BABFF" />
            )}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={HideModal}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
