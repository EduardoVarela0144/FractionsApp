import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Keyboard,
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

    Keyboard.dismiss(); // Oculta el teclado
  };

  const handleAddFraction = () => {
    setFractions([...fractions, { numerator: 0, denominator: 1 }]);
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
  return (
    <View>
      {fractions.map((fraction, index) => (
        <View
          key={index}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text>Fraction {index + 1}: </Text>
          <TextInput
            style={{ width: 50, height: 30, borderWidth: 1, marginRight: 5 }}
            keyboardType="numeric"
            value={fraction.numerator.toString()}
            onChangeText={(numerator) =>
              handleFractionChange(index, numerator, fraction.denominator)
            }
          />
          <Text>/</Text>
          <TextInput
            style={{ width: 50, height: 30, borderWidth: 1, marginRight: 10 }}
            keyboardType="numeric"
            value={fraction.denominator.toString()}
            onChangeText={(denominator) =>
              handleFractionChange(index, fraction.numerator, denominator)
            }
          />
          <TouchableOpacity onPress={() => handleRemoveFraction(index)}>
            <Text style={{ color: "red" }}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Add Fraction" onPress={handleAddFraction} />

      <View style={{ marginTop: 10 }}>
        <Button title="Sum" onPress={() => handleCalculate("sum")} />
        <Button title="Subtract" onPress={() => handleCalculate("subtract")} />
        <Button title="Multiply" onPress={() => handleCalculate("multiply")} />
        <Button title="Divide" onPress={() => handleCalculate("divide")} />
      </View>

      {result && (
        <View style={{ marginTop: 10 }}>
          <Text>
            Result: {result.numerator}/{result.denominator}
          </Text>
        </View>
      )}
    </View>
  );
}
