import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import styled from "styled-components";
import { IconOpen, IconHide } from "../svgs";

const FormInputContainer = styled(View)`
  gap: 8px;
`;

const Label = styled(Text)`
  text-align: center;
  align-self: center;
  justify-self: center;
  font-size: 14px;
  font-weight: 500;
  font-family: ${(props) => props.theme.fonts.medium};
  color: ${(props) => props.theme.colors.neutral[700]};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Input = styled(TextInput)`
  height: 52px;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: 16px;
  font-weight: ${(props) => props.theme.fontWeights.regular};
  position: relative;
  border: 1px solid
    ${(props) =>
      props.isFocused
        ? props.theme.colors.brand.primary
        : props.error
        ? props.theme.colors.error[500]
        : props.theme.colors.neutral[200]};
`;

const ForgotPasswordContainer = styled(TouchableOpacity)``;

const Viewer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-self: center;
  align-items: center;
  justify-content: space-between;
`;

const PasswordIcon = styled(View)`
  position: absolute;
  top: 50%;
  right: 16px;
`;

const InputField = ({
  label,
  passwordLabel,
  onPress,
  navigation,
  isPassword,
  onFocus,
  onBlur,
  hasError,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [focusedField, setFocusedField] = useState(false);

  const handleFieldFocus = () => {
    setFocusedField(true);
  };

  const handleFieldBlur = (e) => {
    setFocusedField(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const handleIconPress = (event) => {
    event.preventDefault();
    setHidePassword(!hidePassword);
  };

  return (
    <FormInputContainer>
      <Viewer>
        <Label>{label}</Label>
        {passwordLabel && (
          <ForgotPasswordContainer
            onPress={() => navigation.replace("forgot password screen")}
          >
            <Label>{passwordLabel}</Label>
          </ForgotPasswordContainer>
        )}
      </Viewer>

      <Input
        {...props}
        secureTextEntry={isPassword && hidePassword}
        isFocused={focusedField}
        onFocus={handleFieldFocus}
        onBlur={handleFieldBlur}
        error={hasError}
      />

      {isPassword && (
        <PasswordIcon>
          <Pressable onPress={handleIconPress}>
            <View>{hidePassword ? <IconHide /> : <IconOpen />}</View>
          </Pressable>
        </PasswordIcon>
      )}
    </FormInputContainer>
  );
};

export default InputField;
