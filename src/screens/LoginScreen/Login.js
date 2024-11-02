import { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { BigDark, DarkText } from "../../components/Texts/Text";
import {
  BtnContainerExtend,
  BtnTextExtend,
  BtnCaptionContainer,
  BtnCaptionText,
  BtnCaption,
  BtnDisabled,
  BtnTextDisabled,
} from "../../components/Buttons/Buttons";
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingContainer";
import InputField from "../../components/Inputs/Input";
import { Formik } from "formik";
import { LoginSchema } from "../../Validation/ValidationSchema";
import { usePwdValidation } from "../../Validation/UsePwdValidation";
import PwdValidationUtils from "../../Validation/PwdValidation";
import { apiConfig } from "../../../config/apiConFig.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PopupError from "../../components/Errors/PopupError.js";

const FormHeader = styled(View)`
  align-items: flex-start;
  padding-top: 16px;
  padding-bottom: 32px;
`;

const Form = styled(View)`
  flex: 1;
  gap: 16px;
  justify-content: flex-start;
`;

const ErrorText = styled(Text)`
  color: red;
`;

const Login = ({ navigation }) => {
  const {
    isMinLengthValid: isPasswordMinLengthValid,
    isCapitalLetterValid: isPasswordCapitalLetterValid,
    isNumberValid: isPasswordNumberValid,
    isSpecialCharacterValid: isPasswordSpecialCharacterValid,
    handlePasswordChange,
  } = usePwdValidation("password");

  // handles form submission...
  // const handleSubmit = (values, { setSubmitting }) => {
  //   setSubmitting(true);
  //   setTimeout(() => {
  //     navigation.replace("interests screen");
  //   }, apiConfig.settings.delayDuration);
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const userData = {
        email: values.email,
        password: values.password,
      };

      const loginUrl = `${apiConfig.api.baseUrl}${apiConfig.api.endpoints.login}`;

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const accessToken = responseData.data.accessToken;
        const refreshToken = responseData.data.refreshToken;

        console.log("access:", accessToken, "refresh:", refreshToken);

        if (accessToken && refreshToken) {
          // Store the JWT token securely in AsyncStorage
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
          alert("Login Successful");
          navigation.replace("interests screen");
        } else {
          console.error(
            "Token is undefined in the response:",
            responseData.data
          );
          alert("Login failed. No token received.");
        }
      } else {
        const errResponse = await response.json();
        console.log("Login errResponse", errResponse);
        console.log("login response", response);
        alert(`login err, ${errResponse.message}`);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
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
              <FormHeader>
                <BigDark style={styles.title}>Explore the app</BigDark>
                <DarkText>Welcome back</DarkText>
              </FormHeader>

              {/* InfoLight Error Msg */}
              <PopupError errorMessage="Incorrect Username or Password" />

              <InputField
                name="emailAddress"
                label="Email"
                placeholder="Email"
                placeholderTextColor="#C0C5C7"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                inputMode="email"
                autoCorrect={false}
                textContentType="emailAddress"
                hasError={errors.email && touched.email}
              />
              {errors.email && touched.email && (
                <ErrorText>{errors.email}</ErrorText>
              )}

              <InputField
                name="password"
                label=" Password"
                passwordLabel="Forgot password?"
                placeholderTextColor="#C0C5C7"
                placeholder="Password"
                onChangeText={(value) => {
                  handleChange("password")(value);
                  handlePasswordChange(value);
                }}
                onBlur={handleBlur("password")}
                value={values.password}
                autoCorrect={false}
                isPassword={true}
                navigation={navigation}
                textContentType="password"
                hasError={errors.password && touched.password}
              />
              {errors.password && touched.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}
              <PwdValidationUtils
                isMinLengthValid={isPasswordMinLengthValid}
                isCapitalLetterValid={isPasswordCapitalLetterValid}
                isNumberValid={isPasswordNumberValid}
                isSpecialCharacterValid={isPasswordSpecialCharacterValid}
              />

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
                  {/*  If  isValid  is true, it means that all individual field validations have passed.  */}
                  {/* values.firstName ,  values.lastName ,  values.email ,  values.password ,  values.agreeToTerms : These conditions check if the values of the first name, last name, email, password, and agreement to terms fields are truthy (not empty or undefined) */}
                  {isValid && values.email && values.password ? (
                    <BtnContainerExtend
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <BtnTextExtend>Log In</BtnTextExtend>
                    </BtnContainerExtend>
                  ) : (
                    <BtnDisabled disabled={true}>
                      <BtnTextDisabled>Log In</BtnTextDisabled>
                    </BtnDisabled>
                  )}
                </>
              )}

              <BtnCaptionContainer>
                <BtnCaptionText>Don't have an account?</BtnCaptionText>
                <BtnCaption onPress={() => navigation.replace("signup screen")}>
                  Sign up
                </BtnCaption>
              </BtnCaptionContainer>
            </Form>
          </KeyboardAvoidingContainer>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    letterSpacing: -1,
    marginTop: 35,
  },
  focused: {
    borderColor: "green",
    borderWidth: 1,
    borderStyle: "solid",
  },
  notFocused: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
});

export default Login;
