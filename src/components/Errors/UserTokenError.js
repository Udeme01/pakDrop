import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const UserTokenErrorContainer = styled(View)`
  /* border: 1px solid red; */
  width: 139px;
  height: 18px;
  margin-top: 6px;
`;

const UserTokenErrorText = styled(Text)`
  color: ${(props) => props.theme.colors.error[500]};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: 12px;
  line-height: 18px;
  width: 139px;
`;

const UserTokenError = ({ errorMessage }) => {
  return (
    <UserTokenErrorContainer>
      <UserTokenErrorText>{errorMessage}</UserTokenErrorText>
    </UserTokenErrorContainer>
  );
};

export default UserTokenError;
