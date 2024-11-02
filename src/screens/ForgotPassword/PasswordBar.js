import { View, StyleSheet } from "react-native";
import React from "react";

const PasswordBar = ({ passwordSlides }) => {
  const passwordSteps = [1, 2, 3];

  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {passwordSteps.map((_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            passwordSlides === index && {
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

export default PasswordBar;
