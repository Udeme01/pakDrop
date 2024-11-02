import { Montserrat_500Medium, useFonts } from "@expo-google-fonts/montserrat";
import { CustomButton } from "./Buttons/Buttons";

const OnboardSignupBtn = ({ navigation }) => {
  //   Fonts
  let [fontsLoaded, fontError] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <CustomButton
      variant="contained"
      onPress={() => navigation.replace("explore screen")}
    >
      Sign Up
    </CustomButton>
  );
};

export default OnboardSignupBtn;
