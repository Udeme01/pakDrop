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
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingContainer";
import InputField from "../../components/Inputs/Input";
import { Formik } from "formik";
import { ArrowBack } from "../../components/svgs";
import { ResetPasswordSchema } from "../../Validation/ValidationSchema";
import PasswordBar from "./PasswordBar";
import { usePwdValidation } from "../../Validation/UsePwdValidation";
import PwdValidationUtils from "../../Validation/PwdValidation";
import { apiConfig } from "../../../config/apiConFig";

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

const ForgotPassword = ({ navigation, route }) => {
  const [passwordSlides] = useState(2);
  const { email, token } = route.params;

  const backToEnterOtp = () => {
    navigation.replace("ForgotPasswordOTP");
  };

  // PASSWORD
  const {
    isMinLengthValid: isPasswordMinLengthValid,
    isCapitalLetterValid: isPasswordCapitalLetterValid,
    isNumberValid: isPasswordNumberValid,
    isSpecialCharacterValid: isPasswordSpecialCharacterValid,
    handlePasswordChange,
  } = usePwdValidation("password");

  // CONFIRM PASSWORD
  const {
    isMinLengthValid: isConfirmPasswordMinLengthValid,
    isCapitalLetterValid: isConfirmPasswordCapitalLetterValid,
    isNumberValid: isConfirmPasswordNumberValid,
    isSpecialCharacterValid: isConfirmPasswordSpecialCharacterValid,
    handleConfirmPasswordChange,
  } = usePwdValidation("confirmPassword");

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const userData = {
        email,
        token,
        newPassword: values.password,
      };

      console.log("emailData:", userData.email);
      console.log("tokenData:", userData.token);
      console.log("newPwdData:", userData.newPassword);

      const resetPasswordURL = `${apiConfig.api.baseUrl}${apiConfig.api.endpoints.resetPwd}`;
      const response = await fetch(resetPasswordURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("resetPasswordResponse", responseData);

        console.log("emailOk:", userData.email);
        console.log("tokenOk:", userData.token);
        console.log("newPwdOk:", userData.newPassword);

        alert("password reset successfully");
        navigation.replace("password congratulation screen");
      } else {
        const errResponse = await response.json();
        console.log("resetPwdErr", errResponse.message);

        console.log("emailErr:", userData.email);
        console.log("tokenErr:", userData.token);
        console.log("newPwdErr:", userData.newPassword);

        alert("resetPwdErr:", errResponse.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred resetting password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={ResetPasswordSchema}
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
            <TouchableOpacity
              style={{
                alignItems: "flex-start",
              }}
            >
              <ArrowBack onPress={backToEnterOtp} />
            </TouchableOpacity>
            <FormHeader>
              <BigDark style={styles.title}>Reset Password</BigDark>
              <DarkText>
                It was popularised in the 1960s with the release of Let’s reset
                sheets containing Lorem Ipsum.
              </DarkText>
            </FormHeader>

            {/* PASSWORD */}
            <InputField
              label="Password"
              placeholder="Password"
              placeholderTextColor="#C0C5C7"
              onChangeText={(value) => {
                handleChange("password")(value);
                handlePasswordChange(value);
              }}
              onBlur={(e) => {
                handleBlur("password")(e);
              }}
              value={values.password}
              isPassword={true}
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

            {/* CONFIRM PASSWORD */}
            <InputField
              label="Confirm Password"
              placeholder="Confirm Password"
              placeholderTextColor="#C0C5C7"
              onChangeText={(value) => {
                handleChange("confirmPassword")(value);
                handleConfirmPasswordChange(value);
              }}
              onBlur={(e) => {
                handleBlur("confirmPassword")(e);
              }}
              value={values.confirmPassword}
              isPassword={true}
              textContentType="newPassword"
              hasError={errors.confirmPassword && touched.confirmPassword}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <ErrorText>{errors.confirmPassword}</ErrorText>
            )}

            <PwdValidationUtils
              isMinLengthValid={isConfirmPasswordMinLengthValid}
              isCapitalLetterValid={isConfirmPasswordCapitalLetterValid}
              isNumberValid={isConfirmPasswordNumberValid}
              isSpecialCharacterValid={isConfirmPasswordSpecialCharacterValid}
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
                {isValid && values.password && values.confirmPassword ? (
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
                // borderWidth: 1,
                // borderStyle: "solid",
                // borderColor: "red",
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
