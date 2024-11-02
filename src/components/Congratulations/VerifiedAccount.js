import Congratulations from "../Inputs/Congratulations";

const VerifiedAccount = ({ navigation }) => {
  return (
    <Congratulations
      successMsg="Account successfully Verified"
      verifyMe="signup screen"
      navigation={navigation}
    />
  );
};

export default VerifiedAccount;
