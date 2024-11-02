import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components";
import { BigDark, DarkText } from "../../components/Texts/Text";
import {
  BtnContainerExtend,
  BtnTextExtend,
  BtnDisabled,
  BtnTextDisabled,
} from "../../components/Buttons/Buttons";
import InputField from "../../components/Inputs/Input";
import { Formik } from "formik";
import { ArrowBack } from "../../components/svgs";
import { PasswordEmailSchema } from "../../Validation/ValidationSchema";
import PasswordBar from "./PasswordBar";
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingContainer";
import { apiConfig } from "../../../config/apiConFig";

const ImageContainer = styled(TouchableOpacity)`
  align-items: flex-start;
`;

const FormHeader = styled(View)`
  align-items: flex-start;
  padding: 32px 0px;
`;

const Form = styled(View)`
  flex: 1;
  gap: 16px;
  justify-content: flex-start;
  padding: 32px 0px;
  margin-bottom: 32px;
`;

const ErrorText = styled(Text)`
  color: red;
`;

const ForgotPassword = ({ navigation }) => {
  const [passwordSlides, setPasswordSlides] = useState(0);

  const backToLoginScreen = () => {
    navigation.replace("login screen");
  };

  // const handleSubmit = (values, { setSubmitting }) => {
  //   setSubmitting(true);

  //   setPasswordSlides(1);
  //   navigation.replace("ForgotPasswordOTP", {
  //     email: values.email,
  //   });
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const userData = {
        email: values.email,
      };

      const generatePwdTokenURL = `${apiConfig.api.baseUrl}${
        apiConfig.api.endpoints.generatePwdToken
      }?email=${encodeURIComponent(userData.email)}`; // Pwd stand for 'Password' where ever seen in my code.

      const response = await fetch(generatePwdTokenURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("GPTResData", responseData); // GPT stands for Generate Password Token.
        setPasswordSlides(1);
        navigation.replace("ForgotPasswordOTP", {
          email: values.email,
        });
      } else {
        const errResponse = await response.json();
        console.log("GPTerrResponse", errResponse);
        console.log("GPTresponse", response.data);
        alert(errResponse.message);
        return;
      }
    } catch (error) {
      console.error("Error during forgot password email verification:", error);
      alert(
        "An error occurred during forgot password email verification. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={PasswordEmailSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <KeyboardAvoidingContainer>
          <Form>
            <ImageContainer>
              <ArrowBack onPress={backToLoginScreen} />
            </ImageContainer>
            <FormHeader>
              <BigDark style={styles.title}>Forget Password</BigDark>
              <DarkText>
                It was popularised in the 1960s with the release of Let’s reset
                sheets containing Lorem Ipsum.
              </DarkText>
            </FormHeader>

            <InputField
              label="Email"
              placeholder="Email"
              placeholderTextColor="#C0C5C7"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              inputMode="email"
              keyboardType="email-address"
              hasError={errors.email && touched.email}
            />
            {errors.email && touched.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}

            {isSubmitting ? (
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
                {isValid && values.email ? (
                  <BtnContainerExtend
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <BtnTextExtend>Send</BtnTextExtend>
                  </BtnContainerExtend>
                ) : (
                  <BtnDisabled disabled={true}>
                    <BtnTextDisabled>Send</BtnTextDisabled>
                  </BtnDisabled>
                )}
              </>
            )}

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
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  title: {
    letterSpacing: -1,
  },
});

export default ForgotPassword;
