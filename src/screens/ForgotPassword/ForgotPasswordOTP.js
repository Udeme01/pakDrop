import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components";
import { BigDark, DarkText, EmailVerified } from "../../components/Texts/Text";
import {
  BtnContainerExtend,
  BtnTextExtend,
  BtnCaptionContainer,
  BtnCaptionText,
  BtnCaption,
  BtnDisabled,
  BtnTextDisabled,
} from "../../components/Buttons/Buttons";
import OTPInputField from "../../components/Inputs/OTPInputField";
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingContainer";
import {
  useFonts as useBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { EnterOtpSVG } from "../../components/svgs";
import { ArrowBack } from "../../components/svgs";
import PasswordBar from "./PasswordBar";

const FormHeader = styled(View)`
  align-items: flex-start;
  width: 100%;
`;

const Form = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding: 32px 0;
  margin-bottom: 32px;
`;

const ForgotPasswordOTP = ({ navigation, route }) => {
  // const { email } = route.params;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params?.email]);

  const [passwordSlides, setPasswordSlides] = useState(1);
  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpInputError, setOtpInputError] = useState(false);

  // code input length...
  const MAX_CODE_LENGTH = 6;

  const handleOTPInputChange = (otp) => {
    setInputCode(otp);
    if ((otpInputError && otp === "") || otp.length < MAX_CODE_LENGTH) {
      setOtpInputError(false);
    }
  };

  const backToForgotPasswordScreen = () => {
    navigation.replace("forgot password screen");
  };

  const handleForgotPwdOTP = async () => {
    setLoading(true);
    setOtpInputError(false);

    try {
      const data = {
        email: email,
        token: inputCode,
      };

      console.log("emailData:", data.email);
      console.log("tokenData:", data.token);

      if (data.token) {
        console.log("emailOk:", data.email);
        console.log("tokenOk:", data.token);

        setPasswordSlides(2);
        navigation.replace("ResetPassword", {
          email,
          token: inputCode,
        });
      } else {
        setOtpInputError(true);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      alert("An error occurred during OTP verification. Please try again.");
      setOtpInputError(true);
    } finally {
      setLoading(false);
    }
  };

  const [BoldLoaded] = useBold({
    Montserrat_700Bold,
  });

  if (!BoldLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingContainer>
      <Form>
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          <ArrowBack onPress={backToForgotPasswordScreen} />
        </TouchableOpacity>
        <FormHeader>
          <BigDark style={styles.title}>Enter OTP</BigDark>
          <DarkText style={styles.paragraph}>
            Enter 6 digit Verification code sent to{" "}
            <EmailVerified>{email}</EmailVerified>
          </DarkText>
        </FormHeader>

        <EnterOtpSVG />

        <OTPInputField
          code={inputCode}
          setCode={handleOTPInputChange}
          maxLength={MAX_CODE_LENGTH}
          otpInputError={otpInputError}
          errorMessage="Wrong Token."
          onClear={() => setOtpInputError(false)} // Reset the error state when the input field is cleared
        />

        {loading ? (
          <BtnContainerExtend>
            <View>
              <ActivityIndicator
                color="#4C6456"
                size="large"
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </View>
          </BtnContainerExtend>
        ) : (
          <>
            {inputCode.length === MAX_CODE_LENGTH ? (
              <BtnContainerExtend onPress={handleForgotPwdOTP}>
                <BtnTextExtend>Send</BtnTextExtend>
              </BtnContainerExtend>
            ) : (
              <BtnDisabled disabled={true}>
                <BtnTextDisabled>Send</BtnTextDisabled>
              </BtnDisabled>
            )}
          </>
        )}

        <BtnCaptionContainer>
          <BtnCaptionText>Didn’t get OTP?</BtnCaptionText>
          <BtnCaption>Resend OTP</BtnCaption>
        </BtnCaptionContainer>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <PasswordBar passwordSlides={passwordSlides} />
        </View>
      </Form>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    letterSpacing: -1,
    marginTop: 35,
  },
});

export default ForgotPasswordOTP;

// if you check my @ForgotPassword.js component, I want to send a request to backend to get a token sent from the backend to the entered email so that on the next screen which is the @ForgotPasswordOTP.js I can enter that token that was sent to email, but now the request endpoint for @ForgotPasswordOTP.js is hsving this format: {
//   "email": "string",
//   "token": "string",
//   "newPassword": "string"
// } in the backend and I'm supposed to save the email, token and newPassword in a state so i can use it in the next screen but mind you, this current screen @ForgotPasswordOTP.js does not have a field to enter a newPassword. but how can I include the email on the next screen @ResetPassword.js  so it can be sent along with my request to the request endpoint after user input password and confirms password?

// if you check my @ForgotPassword.js component, I want to send a request to backend to get a token sent from the backend to the entered email so that on the next screen which is the @ForgotPasswordOTP.js I can enter that token that was sent to email, but now the request endpoint for @ForgotPasswordOTP.js is hsving this format: {
//   "email": "string",
//   "token": "string",
//   "newPassword": "string"
// } in the backend and I'm supposed to save the email, token and newPassword in a state so when i make a request i can still use them on the next screen but mind you, this current screen @ForgotPasswordOTP.js does not have a field to enter a newPassword, so what do i do. but how can I also include the email on the next screen @ResetPassword.js  so it can be sent along with my request to the request endpoint for @ResetPassword.js  after user input password and confirms password?
