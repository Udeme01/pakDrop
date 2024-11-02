import React, { useState, useRef } from "react";
import { View, FlatList, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import ArrowrightBtn from "../../components/ArrowrightBtn";
import { slides } from "../../data";
import ProgressBar from "../../components/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { width, height } from "../../shared";
import {
  useFonts as useRegular,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import {
  OnboardTitleText,
  OnboardCaptionText,
} from "../../components/Texts/Text";

// styled components - css
const SafeArea = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary[100]};
  margin-top: ${StatusBar.currentHeight}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

const OnboardInfo = styled(View)`
  width: ${width}px;
  height: auto;
  background-color: ${(props) => props.theme.colors.darkMode[900]};
  border-top-right-radius: ${(props) => props.theme.space[9]};
  border-top-left-radius: ${(props) => props.theme.space[9]};
  padding: 0 18px;
`;

const OnboardImg = styled(Image)`
  flex: 1;
  width: ${width * 0.9}px;
`;

const ArrowDots = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${height * 0.025}px;
  margin-bottom: ${height * 0.05}px;
`;

const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // I used useState hook here to manage the current slide index.
  const ref = useRef(null); // I used useRef here to reference elements.

  const [Regular_Loaded] = useRegular({
    Montserrat_400Regular,
  });

  if (!Regular_Loaded) {
    return null;
  } // useFonts to load google fonts.

  const Slide = ({ itemProp }) => {
    // The slide component is used to render each individual slide.
    return (
      <SafeArea>
        <SafeAreaView style={{ flex: 1 }}>
          <OnboardImg source={itemProp.image} resizeMode="contain" />
        </SafeAreaView>
        <OnboardInfo>
          <OnboardTitleText
            variant="onboarding"
            style={[itemProp.id === 2 && { color: "white" }]}
          >
            {itemProp.title}
          </OnboardTitleText>
          <OnboardCaptionText
            variant="onboarding"
            style={[itemProp.id === 2 && { color: "white" }]}
          >
            {itemProp.subTitle}
          </OnboardCaptionText>

          <ArrowDots>
            {currentSlideIndex === slides.length - 1 ? (
              <>
                <ProgressBar currentSlideIndex={currentSlideIndex} />
                <ArrowrightBtn
                  navigation={navigation}
                  onPress={() => navigation.replace("explore screen")}
                />
              </>
            ) : (
              <>
                <ProgressBar currentSlideIndex={currentSlideIndex} />
                <ArrowrightBtn onPress={nextSlideArrow} />
              </>
            )}
          </ArrowDots>
        </OnboardInfo>
      </SafeArea>
    );
  };

  //   updateCurrentSlideIndex updates the current slide index based on the scroll position onScroll.
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  //   nextSlideArrow scrolls to the next slide and updates the current slide index.
  const nextSlideArrow = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  return (
    <>
      <StatusBar style="auto" />
      <FlatList
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
        pagingEnabled
        data={slides}
        contentContainerStyle={{ height: height * 1 }}
        horizontal={true}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide itemProp={item} />}
      />
    </>
  );
};

export default OnboardingScreen;
