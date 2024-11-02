import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";

const ArrowrightBtn = ({ navigation, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      // onPress={nextSlideArrow}
      // onPress={() => navigation.replace("explore screen")}
    >
      <Image
        style={styles.arrowRight}
        source={require("../../assets/Images/arrow-right.png")}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowRight: {
    width: 40,
    height: 40,
  },
});

export default ArrowrightBtn;
