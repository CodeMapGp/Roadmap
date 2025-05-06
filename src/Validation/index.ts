import * as yup from "yup"



export const SignUpSchema = yup
    .object({
    first_name: yup.string().required('Username is required').min(5,'userName should be at least 5 character'),
    last_name: yup.string().required('Username is required').min(5,'userName should be at least 5 character'),
    email: yup.string()
    .required("Email is required.")
    .matches(/^[^@]+@[^@]+\.[^@.]{2,}$/,"Not a valide email address."),
    password: yup.string().required("Password is required").min(8, "Password should be at least 8 charachters."),
    // terms: yup.boolean().oneOf([true], "You must accept the terms and conditions")

})
.required()

export const loginSchema = yup
    .object({
    email: yup
    .string()
    .required("Email is required")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
    .string()
    .required("Password is required")
    .min(8, "Password should be at least 6 charachters."),
})
.required();

export const ForgetPasswordSchema = yup
    .object({
    email: yup
    .string()
    .required("Email is required")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
   
})
.required();
export const NewPasswordSchema = yup.object({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();
