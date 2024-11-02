import { View } from "react-native";
import styled from "styled-components";
import { BigDark, DarkText, EmailVerified } from "../../components/Texts/Text";
import {
  BtnContainerExtend,
  BtnTextExtend,
} from "../../components/Buttons/Buttons";
import KeyboardAvoidingContainer from "../KeyboardAvoidingContainer";
import { CelebrationSvg } from "../svgs";

const Form = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 56px 0px;
  gap: 16px;
`;

const Congratulations = ({ navigation, successMsg, verifyMe, resetMe }) => {
  const handlePress = () => {
    if (verifyMe === "signup screen") {
      navigation.replace("login screen");
    } else if (resetMe === "login screen") {
      navigation.replace("login screen");
    }
  };
  return (
    <KeyboardAvoidingContainer>
      <Form>
        <CelebrationSvg />
        <BigDark>Congratulations</BigDark>
        <EmailVerified>{successMsg}</EmailVerified>
        <DarkText>Thank you for choosing us</DarkText>
        <BtnContainerExtend onPress={handlePress}>
          <BtnTextExtend>Continue</BtnTextExtend>
        </BtnContainerExtend>
      </Form>
    </KeyboardAvoidingContainer>
  );
};

export default Congratulations;
