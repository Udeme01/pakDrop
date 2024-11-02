import React from "react";
import "react-native-gesture-handler";
import { ThemeProvider } from "styled-components";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen/SplashScreen";
import OnboardingScreen from "./src/screens/OnboardScreens/OnboardingScreen";
import ExploreScreen from "./src/screens/ExploreScreen/ExploreScreen";
import Signup from "./src/screens/SignupScreen/Signup";
import Login from "./src/screens/LoginScreen/Login";
import EmailVerification from "./src/screens/SignupScreen/EmailVerification";
import VerifiedAccount from "./src/components/Congratulations/VerifiedAccount";
import PasswordReset from "./src/components/Congratulations/PasswordReset";
import ForgotPassword from "./src/screens/ForgotPassword/ForgotPassword";
import ForgotPasswordOTP from "./src/screens/ForgotPassword/ForgotPasswordOTP";
import ResetPassword from "./src/screens/ForgotPassword/ResetPassword";
import Interests from "./src/screens/Interests/Interests";
import InterestsPreferredLocation from "./src/screens/Interests/InterestsPreferredLocation";
import { theme } from "./src/infrastructure/theme";
import HomeScreen from "./src/screens/HomepageScreen/HomeScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="splash screen"
        >
          <Stack.Screen name="splash screen" component={SplashScreen} />
          <Stack.Screen name="onboarding screen" component={OnboardingScreen} />
          <Stack.Screen name="explore screen" component={ExploreScreen} />
          <Stack.Screen name="signup screen" component={Signup} />
          <Stack.Screen name="login screen" component={Login} />
          <Stack.Screen name="interests screen" component={Interests} />
          <Stack.Screen
            name="InterestsPreferredLocation screen"
            component={InterestsPreferredLocation}
          />
          <Stack.Screen
            name="verify-email screen"
            component={EmailVerification}
          />
          <Stack.Screen name="Verified Account" component={VerifiedAccount} />
          <Stack.Screen
            name="forgot password screen"
            component={ForgotPassword}
          />
          <Stack.Screen
            name="ForgotPasswordOTP"
            component={ForgotPasswordOTP}
          />
          <Stack.Screen
            name="password congratulation screen"
            component={PasswordReset}
          />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="homescreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
