import styled from "styled-components";
import { Text } from "react-native";
import { height } from "../../shared";

const BigText = styled(Text)`
  color: ${(props) => props.theme.colors.brand.primary};
  font-family: ${(props) => props.theme.fonts.semibold};
  font-size: ${(props) => props.theme.fontSizes.title};
  line-height: ${(props) => props.theme.lineHeights.title};
`;

export const OnboardTitleText = styled(BigText)`
  margin-top: ${(props) =>
    props.variant === "onboarding" && `${props.theme.space[10]}`};
`;

export const BigDark = styled(BigText)`
  color: ${(props) => props.theme.colors.neutral[600]};
`;

export const ExploreTitle = styled(BigDark)`
  margin-top: ${(props) =>
    props.variant === "onboarding" && `${props.theme.space[10]}`};
`;

const RegularText = styled(Text)`
  color: ${(props) => props.theme.colors.brand.primary};
  font-family: ${(props) => props.theme.fonts.regular};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  line-height: ${(props) => props.theme.lineHeights.paragraph};
`;

export const OnboardCaptionText = styled(RegularText)`
  margin-top: ${(props) => props.theme.space[5]};
  margin-bottom: ${(props) =>
    props.variant === "onboarding"
      ? `${height * 0.04}px`
      : `${height * 0.04}px`};
`;

export const DarkText = styled(RegularText)`
  color: ${(props) => props.theme.colors.neutral[400]};
`;

export const ExploreCaption = styled(DarkText)`
  margin-top: ${(props) => props.theme.space[5]};
  margin-bottom: ${(props) =>
    props.variant === "onboarding"
      ? `${height * 0.04}px`
      : `${height * 0.04}px`};
`;

export const EmailVerified = styled(RegularText)`
  color: ${(props) => props.theme.colors.neutral[700]};
  font-family: ${(props) => props.theme.fonts.semibold};
`;

export const TitleText = ({ children, ...rest }) => {
  return <BigText {...rest}>{children}</BigText>;
};

export const ParagraphText = ({ children, ...rest }) => {
  return <RegularText {...rest}>{children}</RegularText>;
};
