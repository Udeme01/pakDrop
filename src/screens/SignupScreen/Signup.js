import { View, Text, ActivityIndicator } from "react-native";
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
import { Formik } from "formik";
import InputField from "../../components/Inputs/Input";
import KeyboardAvoidingContainer from "../../components/KeyboardAvoidingContainer";
import CheckBox from "../../components/Inputs/CheckBox";
import { SignupSchema } from "../../Validation/ValidationSchema";
import { usePwdValidation } from "../../Validation/UsePwdValidation";
import PwdValidationUtils from "../../Validation/PwdValidation";
import { apiConfig } from "../../../config/apiConFig.js";
import PopupError from "../../components/Errors/PopupError.js";

const FormHeader = styled(View)`
  align-items: flex-start;
  padding-top: 56px;
  padding-bottom: 32px;
`;

const ErrorText = styled(Text)`
  color: red;
`;

const Signup = ({ navigation }) => {
  const {
    isMinLengthValid: isPasswordMinLengthValid,
    isCapitalLetterValid: isPasswordCapitalLetterValid,
    isNumberValid: isPasswordNumberValid,
    isSpecialCharacterValid: isPasswordSpecialCharacterValid,
    handlePasswordChange,
  } = usePwdValidation("password");

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        agreeToTerms: values.agreeToTerms,
        role: "",
      };

      const signupUrl = `${apiConfig.api.baseUrl}${apiConfig.api.endpoints.signup}`;

      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Signup Successful", responseData);
        navigation.replace("verify-email screen", { email: values.email });
      } else {
        const errResponse = await response.json();
        console.log("errResponse", errResponse);
        console.log("response", response);
        alert(errResponse.message);
        return;
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(
        "An error occurred during signup. Please try again.",
        error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        agreeToTerms: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        touched,
        errors,
        isSubmitting,
        isValid,
      }) => (
        <KeyboardAvoidingContainer>
          <FormHeader>
            <BigDark>Explore the app</BigDark>
            <DarkText>Setup your information</DarkText>
          </FormHeader>

          {/* InfoLight Error Msg */}
          <PopupError errorMessage="This user exist. Login" />

          <InputField
            label="First Name"
            onChangeText={handleChange("firstName")}
            onBlur={handleBlur("firstName")}
            value={values.firstName}
            placeholder="First Name"
            placeholderTextColor="#C0C5C7"
            inputMode="text"
            autoCompleteType="name"
            autoComplete="off"
            hasError={errors.firstName && touched.firstName}
          />
          {errors.firstName && touched.firstName && (
            <ErrorText>{errors.firstName}</ErrorText>
          )}

          <InputField
            label="Last Name"
            placeholder="Last Name"
            placeholderTextColor="#C0C5C7"
            onChangeText={handleChange("lastName")}
            onBlur={handleBlur("lastName")}
            value={values.lastName}
            inputMode="text"
            autoCompleteType="name"
            autoComplete="off"
            hasError={errors.lastName && touched.lastName}
          />
          {errors.lastName && touched.lastName && (
            <ErrorText>{errors.lastName}</ErrorText>
          )}

          <InputField
            label="Email"
            placeholder="Email"
            placeholderTextColor="#C0C5C7"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            inputMode="email"
            autoComplete="off"
            hasError={errors.email && touched.email}
          />
          {errors.email && touched.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}

          <InputField
            label=" Password"
            placeholder="Password"
            placeholderTextColor="#C0C5C7"
            onChangeText={(value) => {
              handleChange("password")(value);
              handlePasswordChange(value);
            }}
            onBlur={handleBlur("password")}
            value={values.password}
            isPassword={true}
            autoComplete="off"
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

          <CheckBox
            value={values.agreeToTerms}
            onValueChange={(value) => setFieldValue("agreeToTerms", value)}
          />
          {touched.agreeToTerms && errors.agreeToTerms && (
            <ErrorText>{errors.agreeToTerms}</ErrorText>
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
              {/*  If  isValid  is true, it means that all individual field validations have passed.  */}
              {/* values.firstName ,  values.lastName ,  values.email ,  values.password ,  values.agreeToTerms : These conditions check if the values of the first name, last name, email, password, and agreement to terms fields are truthy (not empty or undefined) */}
              {isValid &&
              values.firstName &&
              values.lastName &&
              values.email &&
              values.password &&
              values.agreeToTerms ? (
                <BtnContainerExtend
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <BtnTextExtend>Sign Up</BtnTextExtend>
                </BtnContainerExtend>
              ) : (
                <BtnDisabled disabled={true}>
                  <BtnTextDisabled>Sign Up</BtnTextDisabled>
                </BtnDisabled>
              )}
            </>
          )}

          {/* options... */}
          <BtnCaptionContainer>
            <BtnCaptionText>Already have an account?</BtnCaptionText>
            <BtnCaption onPress={() => navigation.replace("login screen")}>
              Log in
            </BtnCaption>
          </BtnCaptionContainer>
        </KeyboardAvoidingContainer>
      )}
    </Formik>
  );
};

export default Signup;
