import * as React from "react";
import { RadioButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";
import { theme } from "../../infrastructure/theme";
import {
  useFonts as useMedium,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { width } from "../../shared";

const Container = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  padding-left: ${width * 0.03}px;
`;

const RadioBtn = ({ onSelectRadioOption }) => {
  const [value, setValue] = React.useState("Whatsapp");
  const { colors } = theme;

  const [MediumLoaded] = useMedium({
    Montserrat_500Medium,
  });

  if (!MediumLoaded) {
    return null;
  }

  // console.log(value);

  return (
    <Container>
      <RadioButton.Group
        onValueChange={(newValue) => {
          setValue(newValue);
          onSelectRadioOption(newValue);
        }}
        value={value}
        style={styles.radioButtonGroup}
      >
        <RadioButton.Item
          label="Whatsapp"
          value="Whatsapp"
          position="leading"
          color={colors.primary[500]}
          uncheckedColor={colors.neutral[200]}
          size={24}
          labelStyle={styles.label}
        />
        <RadioButton.Item
          label="Facebook"
          value="Facebook"
          position="leading"
          color={colors.primary[500]}
          uncheckedColor={colors.neutral[200]}
          labelStyle={styles.label}
        />
        <RadioButton.Item
          label="Instagram"
          value="Instagram"
          position="leading"
          color={colors.primary[500]}
          uncheckedColor={colors.neutral[200]}
          labelStyle={styles.label}
        />
        <RadioButton.Item
          label="Google"
          value="Google"
          position="leading"
          color={colors.primary[500]}
          uncheckedColor={colors.neutral[200]}
          labelStyle={styles.label}
        />
        <RadioButton.Item
          label="Self Employed"
          value="Self Employed"
          position="leading"
          color={colors.primary[500]}
          uncheckedColor={colors.neutral[200]}
          labelStyle={styles.label}
        />
      </RadioButton.Group>
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    textAlign: "left",
    width: "100%",
  },
});

export default RadioBtn;
