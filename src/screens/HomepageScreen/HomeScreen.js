import { View, Text, TouchableOpacity, Touchable } from "react-native";
import React from "react";
import styled from "styled-components";

const HomePageContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WelcomeText = styled(Text)`
  font-size: 22px;
  margin-top: auto;
  text-transform: uppercase;
`;

const RestartBtn = styled(TouchableOpacity)`
  /* border: 1px solid red; */
  padding: 10px;
  margin-top: auto;
  width: 90%;
  background-color: #eab008;
  border-radius: 8px;
`;
const RestartText = styled(Text)`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  color: #fff;
`;

const HomeScreen = ({ navigation }) => {
  const handleRestart = () => {
    navigation.replace("splash screen");
  };
  return (
    <HomePageContainer>
      <WelcomeText>Welcome To Parkdrop's HomePage!</WelcomeText>
      <RestartBtn onPress={handleRestart}>
        <RestartText>restart app</RestartText>
      </RestartBtn>
    </HomePageContainer>
  );
};

export default HomeScreen;
