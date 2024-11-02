import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";

const ButtonContainer = styled(TouchableOpacity)`
  width: ${(props) =>
    props.variant === "contained" ? props.theme.sizes[5] : "100%"};
  background-color: ${(props) =>
    props.variant === "contained"
      ? props.theme.colors.brand.primary
      : props.theme.colors.shades[0]};
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.space[5]};
  border-radius: ${(props) => props.theme.space[2]};
`;

export const BtnContainerExtend = styled(ButtonContainer)`
  background-color: ${(props) =>
    props.variant !== "contained"
      ? props.theme.colors.brand.primary
      : props.theme.colors.shades[0]};
`;

const ButtonText = styled(Text)`
  width: 100%;
  color: ${(props) =>
    props.variant === "contained"
      ? props.theme.colors.neutral[700]
      : props.theme.colors.brand.primary};
  line-height: ${(props) => props.theme.lineHeights.button};
  text-align: center;
  font-family: ${(props) => props.theme.fonts.medium};
  font-size: ${(props) => props.theme.fontSizes.button};
  margin: 0 auto;
`;

export const BtnTextExtend = styled(ButtonText)`
  color: ${(props) =>
    props.variant !== "contained"
      ? props.theme.colors.neutral[700]
      : props.theme.colors.brand.primary};
`;

const AccountSigninContainer = styled(View)`
  align-items: ${(props) =>
    props.variant === "explore" ? "flex-start" : "center"};
  justify-content: center;
`;

const AccountSigninWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const HaveAccountText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.neutral[700]};
  padding-right: 6px;
`;

const SigninTextContainer = styled(TouchableOpacity)`
  border: 2px solid transparent;
`;
const AccountSigninText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.semibold};
  font-size: ${(props) => props.theme.fontSizes.caption};
  line-height: ${(props) => props.theme.lineHeights.captionText};
  color: ${(props) => props.theme.colors.brand.primary};
  text-decoration: underline solid
    ${(props) => props.theme.colors.brand.primary};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[0]};
`;

// Enable && Disable Btn...
export const BtnDisabled = styled(BtnContainerExtend)`
  background-color: ${(props) => props.theme.colors.primary[300]};
`;
export const BtnTextDisabled = styled(BtnTextExtend)`
  color: ${(props) => props.theme.colors.neutral[700]};
`;

export const CustomButton = ({ variant, theme, children, ...rest }) => {
  return (
    <ButtonContainer variant={variant} {...rest}>
      <ButtonText variant={variant} {...rest} theme={theme}>
        {children}
      </ButtonText>
    </ButtonContainer>
  );
};

export const BtnCaptionContainer = ({ children, ...rest }) => {
  return (
    <>
      <AccountSigninContainer {...rest}>
        <AccountSigninWrapper>{children}</AccountSigninWrapper>
      </AccountSigninContainer>
    </>
  );
};

export const BtnCaptionText = ({ children }) => {
  return (
    <>
      <HaveAccountText>{children}</HaveAccountText>
    </>
  );
};

export const BtnCaption = ({ children, ...rest }) => {
  return (
    <>
      <SigninTextContainer {...rest}>
        <AccountSigninText>{children}</AccountSigninText>
      </SigninTextContainer>
    </>
  );
};
