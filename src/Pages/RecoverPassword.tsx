import Image from "@/components/Image";
import { axiosInstanceNew } from "@/config/axios.config";
import { FORGETPASSWORD } from "@/data";
import { IErrorResponse } from "@/interfaces";
import Button from "@/Ui/Button";
import Input from "@/Ui/Input";
import InputErrorMessage from "@/Ui/InputErrorMessage";
import { ForgetPasswordSchema } from "@/Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface IFormInput {
  email: string;
}

const RecoverPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(ForgetPasswordSchema),
  });
  // ---------Handle Submit----------
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    setIsLoading(true); // fetch data is loading

    // Fullfiled
    try {
      const { status, data: resData } = await axiosInstanceNew.post(
        "reset-password",
        data
      );
      console.log(resData);
      if (status === 200) {
        localStorage.setItem("loggedInUser", JSON.stringify(resData)); // kda ana bkhazen eldata elly rag3a men el reponse
        setIsSuccess(true);
      }
      //Reject =>field => optional
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>; // elobject da haibqa fi reponse elly rag3 mn axios
      toast.error(`${errorObj.response?.data?.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false); // كده خلص تحميل
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between  sm:gap-5 md:justify-around  items-center min-h-screen pt-[60px]  my-6 py-10">
      {/**the left dev */}
      <div className="hidden  lg:flex flex-col items-center gap-7">
        <span className=" text-3xl font-bold text-[#2F174E] text-left ">
          Welcome to
          <br />
          Code Map Online
          <br />
          Learning Platform
        </span>
        <Image
          imageurl="src/assets/SignUp/mainImage.png"
          alt="error"
          className="w-[400px] md:w-[460px]"
        />
        <Ellipsis color="#C2CEFF" size={50} />
      </div>
      <span className="hidden lg:block md:hidden bg-[#5D5A6F] w-1 h-96 rounded-2xl"></span>
      {/**the right dev  (input section )*/}
      <div className="flex flex-col w-full md:w-[550px] lg:w-[550px] bg-white p-10 shadow-md rounded-md gap-2 mt-6 ">
        {!isSuccess ? (
          <>
            <p className="text-[#2F174E] mb-4">
              Please enter your email address. You will receive a link to create
              a new password via email.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {FORGETPASSWORD.map(
                ({ name, Label, placeholder, type, validation }, idx) => (
                  <div key={idx} className="flex flex-col gap-2 ">
                    <label className="text-gray-700 font-medium">{Label}</label>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      {...register(name, validation)}
                    />
                    {errors[name] && (
                      <InputErrorMessage msg={errors[name]?.message} />
                    )}
                  </div>
                )
              )}
              <Button
                className="bg-[#2F174E] text-white py-2 rounded-md hover:bg-[#3C1765]"
                isLoading={isLoading}
              >
                <p>Reset Password</p>
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center text-lg text-white bg-[#2F174E]  rounded-md px-10 py-6">
            A password reset email has been sent. Please check your inbox.
            <br />
            If you don’t see the email, please check your{" "}
            <strong>spam or junk folder</strong>.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecoverPassword;
