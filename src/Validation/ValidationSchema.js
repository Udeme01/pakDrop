import * as Yup from "yup";

const passwordRules =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  // /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[!@#$%^&*()_+-=[]{};':"\|,.<>?]).{8,}$/;

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "enter a valid name")
    .required("First Name is Required"),
  lastName: Yup.string()
    .min(2, "enter a valid name")
    .required("Last Name is Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
    .required("Password is Required"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions. It's required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
    .required("Password is Required"),
});

export const PasswordEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
    .required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required(),
});
