import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components";
import { BigDark, DarkText } from "../../components/Texts/Text";
import InterestsContainer from "./InterestsContainer";
import {
  useFonts as useMedium,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import RadioBtn from "../../components/Inputs/RadioBtns";
import { PlusIcon, MinusIcon } from "../../components/svgs";
import {
  CustomButton,
  BtnDisabled,
  BtnTextDisabled,
} from "../../components/Buttons/Buttons";
import ReferralCodeEntry from "./ReferralCodeEntry";
import InterestsBar from "./InterestsBar";
import { fetchAccessToken } from "../../auth/AuthService";

const FormHeader = styled(View)`
  align-items: flex-start;
  width: 100%;
  padding-bottom: 32px;
`;

const Form = styled(View)`
  flex: 1;
  padding: 16px 0;
`;

const Form2 = styled(View)`
  flex: 1;
  width: 100%;
  padding: 80px 0;
`;

const ReferalWrapper = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 0;
`;

const ReferralText = styled(Text)`
  color: ${(props) => props.theme.colors.primary[500]};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.medium};
  line-height: 24px;
`;

const SlideBtnWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
`;

const Interests = ({ navigation }) => {
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRadioOption, setSelectedRadioOption] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const toggleReferralCode = () => {
    setShowReferralCode(!showReferralCode);
  };

  const handleNext = () => {
    setCurrentSlide(1);
    navigation.replace("InterestsPreferredLocation screen");
  };

  // const handleNext = async () => {
  //   try {
  //     // fetch the access token
  //     const accessToken = await fetchAccessToken();

  //     // data to be sent to backend based on user's selection
  //     const userDataToSend = {
  //       selectedRadioOption,
  //       referralCode,
  //     };

  //     // URL for backend endpoint
  //     const interestsURL =
  //       "https://your-backend.example.com/api/submit-user-data";

  //     // make the authenticated request
  //     const response = await fetch(interestsURL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(userDataToSend),
  //     });

  //     // handle the response from the server
  //     if (response.ok) {
  //       console.log("User response data submitted successfully", response);
  //       alert("User response data submitted successfully");
  //       setCurrentSlide(1);
  //       navigation.replace("InterestsPreferredLocation screen");
  //     } else {
  //       console.log("Failed to submit user data", response);
  //       alert("Failed to submit user data");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting user data:", error);
  //   }
  // };

  const [MediumLoaded] = useMedium({
    Montserrat_500Medium,
  });

  if (!MediumLoaded) {
    return null;
  }

  return (
    <InterestsContainer>
      <Form>
        <Form2>
          <FormHeader>
            <BigDark style={styles.title}>How did you get to know us?</BigDark>
            <DarkText>Congratulations! your email account.</DarkText>
          </FormHeader>

          <RadioBtn onSelectRadioOption={setSelectedRadioOption} />
          <ReferalWrapper onPress={toggleReferralCode}>
            {showReferralCode ? <MinusIcon /> : <PlusIcon />}
            <ReferralText>Add Referral Code</ReferralText>
          </ReferalWrapper>

          {showReferralCode && (
            <ReferralCodeEntry onReferralCodeChange={setReferralCode} />
          )}
        </Form2>

        <SlideBtnWrapper>
          <>
            <InterestsBar currentSlide={currentSlide} />
            <CustomButton variant="contained" onPress={handleNext}>
              Next
            </CustomButton>
          </>
        </SlideBtnWrapper>
      </Form>
    </InterestsContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    letterSpacing: -1,
    // marginTop: 35,
  },
});

export default Interests;
