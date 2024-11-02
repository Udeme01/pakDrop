import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

const SuccessMsgContainer = styled(View)``;
const SuccessMsgText = styled(Text)``;

const SuccessMsg = ({ successMessage }) => {
  return (
    <SuccessMsgContainer>
      <SuccessMsgText>{successMessage}</SuccessMsgText>
    </SuccessMsgContainer>
  );
};

export default SuccessMsg;
