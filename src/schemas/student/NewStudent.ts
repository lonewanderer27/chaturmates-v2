import { boolean, object, ref, string } from "yup";

export const formSchema = object().shape({
  email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@adamson\.edu\.ph$/, "Must be an Adamson mail"),
  // email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@protonmail\.ch$/, "Must be a ProtonMail"),
  fullName: string().required().label("Full Name"),
  password: string().required().label("Password"),
  passwordConfirmation: string().required("Confirm Password is a required field").oneOf([ref("password")], "Passwords must match"),
  agreeToTerms: boolean().required("You must agree to the terms and conditions")
})