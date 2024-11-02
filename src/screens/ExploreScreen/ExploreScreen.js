import {
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { CustomButton } from "../../components/Buttons/Buttons";
import { ExploreTitle, ExploreCaption } from "../../components/Texts/Text";
import { width, height } from "../../shared";
import {
  BtnCaption,
  BtnCaptionText,
  BtnCaptionContainer,
} from "../../components/Buttons/Buttons";
import {
  useFonts as useMedium,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: ${StatusBar.currentHeight}px;
`;

const ExploreImage = styled(Image)`
  flex: 1;
  width: ${width / 1.7}px;
  height: ${height}px;
  position: absolute;
  margin: 0 auto;
  top: 50px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

const ExploreWrapper = styled(View)`
  flex: 1;
  justify-content: flex-end;
  width: ${width * 0.9}px;
  padding: 50px 20px;
`;

const ExploreScreen = ({ navigation }) => {
  const [MediumLoaded] = useMedium({
    Montserrat_500Medium,
  });

  if (!MediumLoaded) {
    return null;
  }

  return (
    <SafeArea>
      <ExploreImage
        source={require("../../../assets/Images/Onboarding4.png")}
        resizeMode="contain"
      />

      {/* Explore App Section */}
      <ExploreWrapper>
        <ExploreTitle variant="onboarding">Explore the app</ExploreTitle>
        <ExploreCaption variant="onboarding">
          Lorem Ipsum has been the industry's standard dummy text ever since.
        </ExploreCaption>

        {/* signup btn */}
        <CustomButton onPress={() => navigation.replace("signup screen")}>
          Sign Up
        </CustomButton>
        <BtnCaptionContainer variant="explore">
          <BtnCaptionText>Have an account?</BtnCaptionText>
          <BtnCaption onPress={() => navigation.replace("login screen")}>
            Sign In
          </BtnCaption>
        </BtnCaptionContainer>
      </ExploreWrapper>
    </SafeArea>
  );
};

export default ExploreScreen;
