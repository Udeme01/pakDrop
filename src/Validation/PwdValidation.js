import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

const PasswordCheckText = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.52px;
  color: ${(props) => props.theme.colors.neutral[500]};
  font-family: ${(props) => props.theme.fonts.medium};
`;

const Rules = styled(Text)``;

const PwdValidationUtils = ({
  isMinLengthValid,
  isCapitalLetterValid,
  isNumberValid,
  isSpecialCharacterValid,
}) => {
  const getColor = (isValid) => {
    if (isValid === null) return "#808C8F"; // unchecked default state
    return isValid ? "#10B981" : "#EF4444"; // Green is true, Red if false
  };

  // default color(gray) - #808C8F
  // green - #10B981
  // red - #EF4444

  return (
    <PasswordCheckText>
      Password must be at least{" "}
      <Rules style={{ color: getColor(isMinLengthValid) }}>8 Characters</Rules>{" "}
      and must contain at least a{" "}
      <Rules style={{ color: getColor(isCapitalLetterValid) }}>
        Capital Letter
      </Rules>
      , a <Rules style={{ color: getColor(isNumberValid) }}>Number</Rules> and a{" "}
      <Rules style={{ color: getColor(isSpecialCharacterValid) }}>
        Special Character
      </Rules>
      .
    </PasswordCheckText>
  );
};

export default PwdValidationUtils;
