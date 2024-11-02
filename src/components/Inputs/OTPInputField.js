import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Text, Pressable, View, TextInput } from "react-native";
import UserTokenError from "../Errors/UserTokenError";

export const OTPInputContainer = styled.View`
  /* align-items: center; */
  /* justify-content: center; */
`;

export const HiddenTextInput = styled(TextInput)`
  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  padding: 12px;
  margin-top: 15px;
  width: 100%;
  color: white;
  border-radius: 12px;

  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const CodeInputContainer = styled(Pressable)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const CodeInput = styled(View)`
  min-width: 15%;
  padding: 12px;
  border-radius: 12px;
  margin: 0 auto;
  border: 1px solid
    ${(props) =>
      props.otpInputError
        ? props.theme.colors.error[500]
        : props.theme.colors.neutral[200]};
`;

const CodeInputFocused = styled(CodeInput)`
  border-color: ${(props) => props.theme.colors.primary[500]};
`;

const CodeInputText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.semibold};
  font-size: 18px;
  text-align: center;
  line-height: 21.94px;
  color: ${(props) => props.theme.colors.shades[0]};
`;

const OTPInputField = ({
  code,
  setCode,
  maxLength,
  otpInputError,
  errorMessage,
}) => {
  // we wanna display each digits of the input received as a separate box filled with zeros. with a length of maxLength.
  const codeDigitsArr = new Array(maxLength).fill(0);

  // state for managing OTP input when IN and OUT of focus...
  const [otpInputFocus, setOtpInputFocus] = useState(false);

  // created a textInputRef to reference my text input field.
  const textInputRef = useRef(null);

  //   focus on input field when input container is pressed...targetted by the textInputRef.
  const handleOnPress = () => {
    setOtpInputFocus(true);
    textInputRef?.current?.focus();
  };

  const handleOnSubmitEditing = () => {
    setOtpInputFocus(false);
  };

  const codeDigitsInput = (value, index) => {
    // I initialized an emptyInputChar with an empty string...
    const emptyInputChar = "";
    const digit = code[index] || emptyInputChar;

    // formatting...
    const isCurrentDigit = index === code.length; //  determines whether the current digit is the last digit in the input
    const isLastDigit = index === maxLength - 1; //  whether it is the last digit of the maximum length
    const isCodeFull = code.length === maxLength; //  whether the input code is full

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull); //  calculates whether the current digit input field should be focused based on the conditions of being the current digit or the last digit when the code is full.
    const StyledCodeInput =
      otpInputFocus && isDigitFocused ? CodeInputFocused : CodeInput;

    return (
      <StyledCodeInput key={index} otpInputError={otpInputError}>
        <CodeInputText>{digit}</CodeInputText>
      </StyledCodeInput>
    );
  };

  return (
    <OTPInputContainer>
      <CodeInputContainer onPress={handleOnPress}>
        {/* in order to avoid code repition for the code digits, we map through... */}
        {codeDigitsArr.map(codeDigitsInput)}
      </CodeInputContainer>
      <HiddenTextInput
        value={code}
        onChangeText={setCode}
        maxLength={maxLength}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        onSubmitEditing={handleOnSubmitEditing}
        ref={textInputRef}
      />
      {otpInputError && <UserTokenError errorMessage={errorMessage} />}
    </OTPInputContainer>
  );
};

export default OTPInputField;
