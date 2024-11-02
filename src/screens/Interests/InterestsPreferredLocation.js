import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { BigDark, DarkText } from "../../components/Texts/Text";
import InterestsContainer from "./InterestsContainer";
import {
  useFonts as useMedium,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { ArrowBack } from "../../components/svgs";
import { CustomButton } from "../../components/Buttons/Buttons";
import { Formik } from "formik";
import DropdownInterests from "./DropdownInterests";
import InterestsBar from "./InterestsBar";

const FormHeader = styled(View)`
  align-items: flex-start;
  width: 100%;
`;

const Form = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  padding-top: 32px;
`;

const Form2 = styled(View)`
  flex: 1;
  gap: 24px;
  width: 100%;
`;

const SlideBtnWrapper = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 32px;
`;

const InterestsPreferredLocation = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const handlePrev = () => {
    setCurrentSlide(0);
    navigation.replace("interests screen");
  };

  const [MediumLoaded] = useMedium({
    Montserrat_500Medium,
  });

  if (!MediumLoaded) {
    return null;
  }

  const handleNext = () => {
    navigation.replace("homescreen");
  };

  return (
    <InterestsContainer>
      <Form>
        {/* drop-down */}
        <Formik initialValues={{ state: "" }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Form2>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    alignItems: "flex-start",
                  }}
                >
                  <ArrowBack onPress={handlePrev} />
                </TouchableOpacity>
                <FormHeader>
                  <BigDark style={styles.title}>
                    Where is your most preferred location?
                  </BigDark>
                  <DarkText>
                    Pick 3 preferred location that you will love to see on your
                    interest tab.
                  </DarkText>
                </FormHeader>
                <DropdownInterests />
              </Form2>

              <SlideBtnWrapper>
                <InterestsBar currentSlide={currentSlide} />
                <CustomButton variant="contained" onPress={handleNext}>
                  Next
                </CustomButton>
              </SlideBtnWrapper>
            </>
          )}
        </Formik>
        {/* drop-down */}
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

export default InterestsPreferredLocation;
