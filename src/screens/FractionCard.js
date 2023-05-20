import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

export default function FractionCard() {
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

    while (options.length < 8) {
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
      Alert.alert("Correct!");
    } else {
      Alert.alert("Incorrect!");
    }

    generateFractionsAndOperation();
  };
  return (
    <View>
      <Text>
        {fraction1 && `${fraction1.numerator}/${fraction1.denominator}`}
        {operation}
        {fraction2 && `${fraction2.numerator}/${fraction2.denominator}`}
      </Text>

      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleOptionSelect(option)}
          style={{ backgroundColor: "blue", padding: 16, marginTop: 8 }}
        >
          <Text style={{ color: "white" }}>
            {option.numerator}/{option.denominator}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
