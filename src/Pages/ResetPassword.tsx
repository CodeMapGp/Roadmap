import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { axiosInstanceNew } from "@/config/axios.config";
import Image from "@/components/Image";
import { NEWPASSWORD } from "@/data"; // Ensure this data structure matches your needs
import { IErrorResponse } from "@/interfaces";
import Button from "@/Ui/Button";
import Input from "@/Ui/Input";
import InputErrorMessage from "@/Ui/InputErrorMessage";
import { NewPasswordSchema } from "@/Validation"; // Ensure this schema matches your password rules
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Ellipsis } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Define the expected shape of the form data
interface IFormInput {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  // --- ADDED: Get token from URL parameter ---
  // Assumes your route is defined like '/reset-password/:token'
  const { token } = useParams<{ token: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(NewPasswordSchema), // Use your password validation schema
  });

  // ** Handler for form submission
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Form Data:", data);
    console.log("Token from URL:", token);
    setIsLoading(true);
    try {
      // --- CORRECTED API CALL ---
      const { status, data: resData } = await axiosInstanceNew.post(
        // Construct the URL with the token from useParams
        // Adjust '/auth' prefix if it's already in your axiosInstanceNew baseURL
        `reset-password/${token}`,
        // Send the new password in the format expected by the backend
        { password: data.newPassword }
      );
      // --- END CORRECTION ---

      console.log("API Response:", resData);
      if (status === 200) {
        toast.success("Password reset successfully! Redirecting...", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        // Redirect to login page or home page after success
        setTimeout(() => {
          location.replace("/"); // Adjust redirect destination if needed
        }, 2000);
      }
    } catch (error) {
      console.error("API Error:", error); // Log the full error for debugging
      const errorObj = error as AxiosError<IErrorResponse>;
      // Attempt to extract a meaningful error message from the response
      const errorMessage =
        errorObj.response?.data?.error?.message ||
        errorObj.message ||
        "An unexpected error occurred";
      toast.error(`${errorMessage}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render the form fields based on your NEWPASSWORD configuration
  const renderNewPasswordForm = NEWPASSWORD.map(
    ({ name, Label, placeholder, type }, idx) => (
      <div key={idx} className="flex flex-col gap-2 ">
        <label className="text-gray-700 font-medium">{Label}</label>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name as keyof IFormInput)} // Register the input field
        />
        {/* Display validation errors */}
        {errors[name as keyof IFormInput] && (
          <InputErrorMessage msg={errors[name as keyof IFormInput]?.message} />
        )}
      </div>
    )
  );

  // JSX for the component layout
  return (
    <div className="flex flex-col md:flex-row justify-between sm:gap-5 md:justify-around items-center min-h-screen pt-[60px] my-6 py-10">
      {/* Left decorative section */}
      <div className="hidden lg:flex flex-col items-center gap-7">
        <span className="text-3xl font-bold text-[#2F174E] text-left">
          Welcome to
          <br />
          Code Map Online
          <br />
          Learning Platform
        </span>
        <Image
          imageurl="src/assets/SignUp/mainImage.png" // Verify this image path
          alt="Platform illustration"
          className="w-[400px] md:w-[460px]"
        />
        <Ellipsis color="#C2CEFF" size={50} />
      </div>
      {/* Separator */}
      <span className="hidden lg:block md:hidden bg-[#5D5A6F] w-1 h-96 rounded-2xl"></span>
      {/* Right form section */}
      <div className="flex flex-col w-full md:w-[550px] lg:w-[550px] bg-white p-10 shadow-md rounded-md gap-4 mt-6">
        <h2 className="text-2xl font-semibold text-center text-[#2F174E]">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {renderNewPasswordForm}
          <Button
            className="bg-[#2F174E] text-white py-2 rounded-md hover:bg-[#3C1765]"
            isLoading={isLoading}
            type="submit" // Ensure button triggers form submission
          >
            <p>Reset Password</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
