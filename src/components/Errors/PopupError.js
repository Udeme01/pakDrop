import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

import { InfoLight } from "../svgs";

const InfoErrorContainer = styled(View)`
  border: 0.5px ${(props) => props.theme.colors.error[200]} solid;
  border-radius: 20px;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.error[50]};
  margin: 0 auto;
  gap: 3px;
`;
const InfoErrorText = styled(Text)`
  color: ${(props) => props.theme.colors.error[500]};
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const PopupError = ({ errorMessage }) => {
  return (
    <InfoErrorContainer>
      <InfoLight />
      <InfoErrorText>{errorMessage}</InfoErrorText>
    </InfoErrorContainer>
  );
};

export default PopupError;
