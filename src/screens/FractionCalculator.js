import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";

export default function FractionCalculator() {
  const [fractions, setFractions] = useState([]);
  const [result, setResult] = useState(null);

  const handleFractionChange = (index, numerator, denominator) => {
    const updatedFractions = [...fractions];
    updatedFractions[index] = {
      numerator: numerator,
      denominator: denominator,
    };
    setFractions(updatedFractions);
  };

  const handleAddFraction = () => {
    setFractions([...fractions, { numerator: 1, denominator: 1 }]);
  };

  const handleRemoveFraction = (index) => {
    const updatedFractions = [...fractions];
    updatedFractions.splice(index, 1);
    setFractions(updatedFractions);
  };

  const handleCalculate = (operation) => {
    if (fractions.length < 2) {
      setResult(null);
      return;
    }

    let calculatedResult;
    switch (operation) {
      case "sum":
        calculatedResult = fractions.reduce((acc, cur) =>
          addFractions(acc, cur)
        );
        break;
      case "subtract":
        calculatedResult = fractions.reduce((acc, cur) =>
          subtractFractions(acc, cur)
        );
        break;
      case "multiply":
        calculatedResult = fractions.reduce((acc, cur) =>
          multiplyFractions(acc, cur)
        );
        break;
      case "divide":
        calculatedResult = fractions.reduce((acc, cur) =>
          divideFractions(acc, cur)
        );
        break;
      default:
        break;
    }

    setResult(simplifyFraction(calculatedResult));
  };

  const addFractions = (fraction1, fraction2) => {
    const numerator =
      fraction1.numerator * fraction2.denominator +
      fraction2.numerator * fraction1.denominator;
    const denominator = fraction1.denominator * fraction2.denominator;
    return simplifyFraction({ numerator, denominator });
  };

  const subtractFractions = (fraction1, fraction2) => {
    const numerator =
      fraction1.numerator * fraction2.denominator -
      fraction2.numerator * fraction1.denominator;
    const denominator = fraction1.denominator * fraction2.denominator;
    return simplifyFraction({ numerator, denominator });
  };

  const multiplyFractions = (fraction1, fraction2) => {
    const numerator = fraction1.numerator * fraction2.numerator;
    const denominator = fraction1.denominator * fraction2.denominator;
    return simplifyFraction({ numerator, denominator });
  };

  const divideFractions = (fraction1, fraction2) => {
    const numerator = fraction1.numerator * fraction2.denominator;
    const denominator = fraction1.denominator * fraction2.numerator;
    return simplifyFraction({ numerator, denominator });
  };

  const simplifyFraction = (fraction) => {
    const gcd = greatestCommonDivisor(fraction.numerator, fraction.denominator);
    const simplifiedFraction = {
      numerator: fraction.numerator / gcd,
      denominator: fraction.denominator / gcd,
    };
    return simplifiedFraction;
  };

  const greatestCommonDivisor = (a, b) => {
    if (b === 0) {
      return a;
    }
    return greatestCommonDivisor(b, a % b);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <View style={{ backgroundColor: "#F7F8FB", height: "100%" }}>
      {result && (
        <View style={{ alignItems: "center", marginTop: 65 }}>
          <TouchableOpacity
            onPress={hideKeyboard}
            style={{ width: "100%", alignItems: "center" }}
          >
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#1BABFF",
                borderRadius: 30,
                alignItems: "flex-end",
                justifyContent: "center",
                height: "auto",
                width: "95%",
              }}
            >
              <View
                style={{
                  width: "auto",
                  marginRight: "4%",
                }}
              >
                <Text
                  style={{
                    fontSize: 50,
                    fontWeight: "500",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {result.numerator}
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    height: 6,
                    borderRadius: 60,
                  }}
                />
                <Text
                  style={{
                    fontSize: 50,
                    fontWeight: "500",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  {result.denominator}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {!result && (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ marginTop: 100, fontSize: 15, fontWeight: "bold" }}>
            Press the Add Fraction button to start 😅
          </Text>
        </View>
      )}
      <View
        style={{
          marginTop: (result && 30) || 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#ADE1FF",
            width: "20%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          onPress={() => handleCalculate("sum")}
        >
          <Text style={{ color: "#109DFF", fontSize: 14 }}>Sum</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ADE1FF",
            width: "20%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          onPress={() => handleCalculate("subtract")}
        >
          <Text style={{ color: "#109DFF", fontSize: 14 }}>Subtract</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ADE1FF",
            width: "20%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          onPress={() => handleCalculate("multiply")}
        >
          <Text style={{ color: "#109DFF", fontSize: 14 }}>Multiply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#ADE1FF",
            width: "20%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            height: 30,
          }}
          onPress={() => handleCalculate("divide")}
        >
          <Text style={{ color: "#109DFF", fontSize: 14 }}>Divide</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleAddFraction}
        style={{ alignItems: "center", marginBottom: 30 }}
      >
        <Icon name="plus" color={"#343838"} size={40} />
        <Text>Add Fraction</Text>
      </TouchableOpacity>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: 2.5,
          }}
        >
          {fractions.map((fraction, index) => (
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 5,
                marginRight: 10,
              }}
              key={index}
            >
              <View>
                <TextInput
                  style={{
                    width: 50,
                    height: 30,
                    marginRight: 5,
                    borderRadius: 50,
                    textAlign: "center",
                    backgroundColor: "#FBFCFD",
                    color: "#1BABFF",
                    fontWeight: "bold",
                  }}
                  keyboardType="numeric"
                  value={fraction.numerator.toString()}
                  onChangeText={(numerator) =>
                    handleFractionChange(index, numerator, fraction.denominator)
                  }
                />
                <View
                  style={{
                    height: 5,
                    backgroundColor: "#C9C9C9",
                    width: "85%",
                    borderRadius: 40,
                    marginVertical: 5,
                  }}
                />
                <TextInput
                  style={{
                    width: 50,
                    height: 30,
                    marginRight: 10,
                    borderRadius: 50,
                    textAlign: "center",
                    backgroundColor: "#FBFCFD",
                    color: "#1BABFF",
                    fontWeight: "bold",
                  }}
                  keyboardType="numeric"
                  value={fraction.denominator.toString()}
                  onChangeText={(denominator) =>
                    handleFractionChange(index, fraction.numerator, denominator)
                  }
                />
              </View>
              <TouchableOpacity onPress={() => handleRemoveFraction(index)}>
                <Icon name="times-circle" color={"red"} size={25} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
