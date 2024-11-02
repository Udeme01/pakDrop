import Congratulations from "../Inputs/Congratulations";

const PasswordReset = ({ navigation }) => {
  return (
    <Congratulations
      successMsg="Password successfully Reset"
      resetMe="login screen"
      navigation={navigation}
    />
  );
};

export default PasswordReset;
