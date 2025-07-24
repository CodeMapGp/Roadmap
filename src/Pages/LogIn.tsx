import { LOGIN_FORM } from "../data";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../Ui/InputErrorMessage";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { useState } from "react";
import Image from "../components/Image";
import { Ellipsis, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AccessTokenAction } from "@/app/features/AccessTokenSlice";

interface IFormInput {
  email: string;
  password: string;
}

const LogIn = () => {
  const Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const toggleShowPassword = (name: string) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  // ** Handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    setIsLoading(true); // fetch data is loading

    // Fullfiled
    try {
      const { status, data: resData } = await axios.post(
        "https://codemap-production.up.railway.app/auth/login",
        data,
        { withCredentials: true }
      ); // هنا انا بعمل اكونت وبخزنه عندي

      console.log(resData); // da eloutput elly bytl3
      if (status === 200) {
        toast.success("You will navigate to the home page after 1 seconds", {
          position: "bottom-center",
          duration: 1000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
        {
          /*loggedInUser =>name of key will saved  */
        }
        localStorage.setItem("loggedInUser", JSON.stringify(resData)); // kda ana bkhazen eldata elly rag3a men el reponse
        const accessToken = resData.accessToken;
        localStorage.setItem("accessToken", accessToken);
        Dispatch(AccessTokenAction(resData.accessToken));
        setTimeout(() => {
          //navigate("/",) مش هاينفع اعملها كده علشان هو مش بيعمل refresh ll pages
          location.replace("/");
        }, 2000);
      }
      //Reject =>field => optional
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false); // كده خلص تحميل
    }
  };
  const togoogle = () => {
    // navigate("/google")//?
  };
  {
    /**Render */
  }
  const renderLogInUpForm = LOGIN_FORM.map(
    ({ name, Label, placeholder, type, validation }, idx) => (
      <div key={idx} className="flex flex-col gap-2 relative">
        <label className="text-gray-700 font-medium">{Label}</label>

        <div className="relative">
          <Input
            type={type === "password" && showPassword[name] ? "text" : type}
            placeholder={placeholder}
            {...register(name, validation)}
            className="border-[1px] border-gray-300 shadow-lg focus:border-[#FFFFFF] focus:outline-none focus:ring-1 focus:ring-[#FFFFFF] rounded-lg px-3 py-3 text-md bg-[#FFFFFF] w-full"
          />

          {type === "password" && (
            <span
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => toggleShowPassword(name)}
            >
              {showPassword[name] ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          )}
        </div>

        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
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
      <div className="flex flex-col w-full md:w-[550px]  lg:w-[550px] bg-white p-10 shadow-md rounded-md gap-2 mt-6 ">
        <div className="border-2 rounded-lg flex gap-3 justify-start">
          <Image
            imageurl="src/assets/SignUp/icon.png"
            alt="error"
            className="cursor-pointer"
          />
          <p
            className="text-gray-700 font-medium py-4 cursor-pointer"
            onClick={togoogle}
          >
            Signin with google
          </p>
        </div>
        <h2 className="text-center text-gray-600 text-lg mb-4">
          -or signip with your email-
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {renderLogInUpForm}
          <Button
            className="bg-[#2F174E] text-white py-2 rounded-md hover:bg-[#3C1765]"
            isLoading={isLoading}
          >
            <p>Sign in</p>
          </Button>
          <Link to="/recoverpassword">
            <p className="text-center text-sm text-[#9C4DF4] mt-2 cursor-pointer">
              Forgot password?
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
