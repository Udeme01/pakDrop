import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components";
import { height } from "../../shared";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.shades[100]};
  margin-top: ${StatusBar.currentHeight}px;
`;

const InterestsContainer = ({ children }) => {
  return (
    <SafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" && 24}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 16,
            minHeight: height,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default InterestsContainer;
