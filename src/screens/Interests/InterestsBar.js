import { View, StyleSheet } from "react-native";
import React from "react";

const InterestsBar = ({ currentSlide }) => {
  const steps = [1, 2];

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {steps.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentSlide === index && {
              backgroundColor: "#eab008",
              width: 30,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: "#D9D9D9",
    width: 8,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 3,
  },
});

export default InterestsBar;
