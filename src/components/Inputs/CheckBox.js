import Checkbox from "expo-checkbox";
import { TouchableOpacity, Text, View } from "react-native";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";

const CheckboxTextContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 0px 16px 0px 0px;
`;
const CheckboxText = styled(Text)`
  width: 100%;
  font-size: 14px;
  line-height: 16.8px;
  color: ${(props) => props.theme.colors.neutral[500]};
  font-family: ${(props) => props.theme.fonts.regular};
`;
const CheckboxLink = styled(Text)`
  font-family: ${(props) => props.theme.fonts.medium};
  text-decoration: underline;
`;

const CheckBox = ({ value, onValueChange }) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          zIndex: 0,
          marginTop: -5,
        }}
      >
        {value && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "white",
            }}
          >
            <MaterialIcons
              name={value ? "check-box" : "check-box-outline-blank"}
              size={24}
              color={value ? "#EAB008" : "#C0C5C7"}
            />
          </View>
        )}
        <View
          style={{
            width: 24,
            height: 24,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: value ? "#EAB008" : "#D3D7D8",
            borderRadius: 4,
            position: "relative",
          }}
        />
      </View>

      <CheckboxTextContainer>
        <CheckboxText>
          I agree with Parkdrops <CheckboxLink>Terms of service</CheckboxLink>,{" "}
          <CheckboxLink>privacy</CheckboxLink> and different{" "}
          <CheckboxLink>notification settings.</CheckboxLink>
        </CheckboxText>
      </CheckboxTextContainer>
    </TouchableOpacity>
  );
};

export default CheckBox;

{
  /* <Checkbox
        style={{
          width: 24,
          height: 24,
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 4,
        }}
        value={value}
        onValueChange={onValueChange}
        color={value ? "#EAB008" : "#C0C5C7"}
      /> */
}
