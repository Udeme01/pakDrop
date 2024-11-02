import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import {
  useFonts as useMontserrat,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import styled from "styled-components";

// styled components...
const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const ImageContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ParkdropLogo = styled(Image)`
  width: 20%;
  height: 80px;
  max-width: 200px;
  max-height: 80px;
`;

const Label = styled(Text)`
  text-transform: uppercase;
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
`;

const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimePassed(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (timePassed) {
      navigation.replace("onboarding screen");
    }
  }, [timePassed, navigation]);

  //  custom font...
  let [montserratLoaded] = useMontserrat({
    Montserrat_600SemiBold,
  });

  if (!montserratLoaded) {
    return null;
  }
  return (
    <SafeArea>
      <StatusBar style="auto" />
      <Gradient
        colors={
          Platform.OS === "android"
            ? ["rgba(255,255,255,0)", "rgba(255,191,0,0.05)"]
            : ["rgba(255, 255, 255,0)", "rgba(234, 176, 8, 0.1)"]
        }
        start={{ x: 0.5, y: Platform.OS === "ios" ? 0.01 : 0.3 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.gradientColor]}
      >
        <ImageContainer>
          <ParkdropLogo
            source={require("../../../assets/Images/parkdrop.png")}
            resizeMode="contain"
          />
          <Label style={styles.label}>parkdrop</Label>
        </ImageContainer>
      </Gradient>
    </SafeArea>
  );
};

// css stylesheet styles
const styles = StyleSheet.create({
  label: {
    letterSpacing: -1,
    paddingHorizontal: 10,
    fontSize: Platform.OS === "ios" ? 20 : 20,
    fontFamily: Platform.select({
      android: "Montserrat_600SemiBold",
      ios: "Montserrat-SemiBold",
    }),
  },
});

export default SplashScreen;
