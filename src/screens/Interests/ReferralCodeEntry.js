import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import OTPInputField from "../../components/Inputs/OTPInputField";
import { DarkText } from "../../components/Texts/Text";
// import UserTokenError from "../../components/Errors/UserTokenError";

const ReferralCodeEntry = ({ onReferralCodeChange }) => {
  // code input length...
  const MAX_CODE_LENGTH = 6;
  const [code, setCode] = useState("");
  const [otpInputError] = useState(false);

  useEffect(() => {
    onReferralCodeChange(code);
  }, [code]);

  // console.log("referral code:", code);

  return (
    <View>
      <DarkText style={styles.paragraph}>
        Enter your referral code if you have any
      </DarkText>
      <OTPInputField
        code={code}
        setCode={setCode}
        maxLength={MAX_CODE_LENGTH}
        otpInputError={otpInputError}
        errorMessage="Invalid Code. Try again."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 16,
  },
});

export default ReferralCodeEntry;
