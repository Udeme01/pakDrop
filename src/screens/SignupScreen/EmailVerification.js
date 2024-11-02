import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
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
import { VerificationSvg } from "../../components/svgs";
import { ActivityIndicator } from "react-native";
import { apiConfig } from "../../../config/apiConFig.js";

const FormHeader = styled(View)`
  align-items: flex-start;
  padding-bottom: 32px;
  width: 100%;
`;

const Form = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 16px;
  padding: 32px 0;
`;

const EmailVerification = ({ navigation, route }) => {
  const { email } = route.params;

  const [inputCode, setInputCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpInputError, setOtpInputError] = useState(false);

  // code input length...
  const MAX_CODE_LENGTH = 6;

  const [BoldLoaded] = useBold({
    Montserrat_700Bold,
  });

  if (!BoldLoaded) {
    return null;
  }

  const handleOTPInputChange = (otp) => {
    setInputCode(otp);
    if ((otpInputError && otp === "") || otp.length < MAX_CODE_LENGTH) {
      setOtpInputError(false);
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    setOtpInputError(false);

    try {
      const userData = {
        email: email,
        token: inputCode,
      };

      const confirmSignupMailUrl = `${apiConfig.api.baseUrl}${apiConfig.api.endpoints.confirmMail}`;
      // console.log("confirmSignupMail URL:", confirmSignupMailUrl);
      // console.log("User Data:", userData);

      const response = await fetch(confirmSignupMailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Signup Successful", responseData);
        navigation.replace("Verified Account");
      } else {
        const errResponse = await response.json();
        console.log("errMailResponse", errResponse);
        console.log("Mailresponse", response);
        alert(`alert mail err:, ${errResponse.message}`);
        setOtpInputError(true);
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      alert("An error occurred during email verification. Please try again.");
      setOtpInputError(true);
    } finally {
      setLoading(false);
    }
  };

  // console.log(
  //   `apiConfig, ${apiConfig.api.baseUrl}${apiConfig.api.endpoints.confirmMail}`
  // );

  return (
    <KeyboardAvoidingContainer
    // style={{
    //   flex: 1,
    // }}
    >
      <Form>
        <FormHeader>
          <BigDark style={styles.title}>Verify your email</BigDark>
          <DarkText style={styles.paragraph}>
            We’ve sent a code to <EmailVerified>{email}</EmailVerified>
          </DarkText>
        </FormHeader>

        <VerificationSvg />

        <OTPInputField
          code={inputCode}
          setCode={handleOTPInputChange}
          maxLength={MAX_CODE_LENGTH}
          otpInputError={otpInputError}
          errorMessage="Wrong Token."
        />

        <BtnCaptionContainer>
          <BtnCaptionText>Didn’t receive the email yet?</BtnCaptionText>
          <BtnCaption>Send Again</BtnCaption>
        </BtnCaptionContainer>

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
              <BtnContainerExtend onPress={handleEmailVerification}>
                <BtnTextExtend>Send</BtnTextExtend>
              </BtnContainerExtend>
            ) : (
              <BtnDisabled disabled={true}>
                <BtnTextDisabled>Send</BtnTextDisabled>
              </BtnDisabled>
            )}
          </>
        )}
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

export default EmailVerification;
