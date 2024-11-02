import { View, StyleSheet } from "react-native";
import React from "react";
import { slides } from "../data";

const ProgressBar = ({ currentSlideIndex }) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            currentSlideIndex === index && {
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

export default ProgressBar;
