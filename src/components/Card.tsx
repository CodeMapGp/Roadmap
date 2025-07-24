import { Clock8, Download, Star, Video } from "lucide-react";
import Button from "../Ui/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clickedIdAction } from "@/app/features/clickedIdSlice";



interface Iprops {
  url?: string;
  alt?: string;
  title: string;
  requirments: string;
  _id?: string;
}



const Card = ({ url, alt, title, _id }: Iprops) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (_id) {
      dispatch(clickedIdAction(_id));
    }
  };

  return (
    <>
      <div className="bg-[#F9F9F9] sm:w-72 md:w-[380px] lg:w-[400px] h-auto md:h-[400px] p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-3xl">
        <img
          className="h-44 md:w-[400px] w-[300px] rounded-lg"
          src={url}
          alt={alt}
        />
        <div className="flex justify-between pt-5">
          <h3 className="text-lg font-bold">{title}</h3>
          <div className="flex">
            <Star className="transition-transform duration-300 hover:rotate-12 w-5" />
            <Star className="transition-transform duration-300 hover:rotate-12 w-5" />
            <Star className="transition-transform duration-300 hover:rotate-12 w-5" />
            <Star className="transition-transform duration-300 hover:rotate-12 w-5" />
            <Star className="transition-transform duration-300 hover:rotate-12 w-5" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between">
            <p className="text-[#a69d9d] md:w-auto font-bold">Let's Learn Now</p>
            <h3 className="text-blue-500 text-lg">Free</h3>
          </div>
          <hr className="w-full" />
          <div className="flex lg:w-auto md:w-[400px] w-auto gap-3 pb-8">
            <div className="flex gap-1">
              <Clock8 className="w-4 md:w-3 lg:w-4" />
              <p className="text-[#a69d9d] md:text-sm text-auto lg:text-auto">
                22hr30min
              </p>
            </div>
            <div className="flex gap-1">
              <Video className="w-4" />
              <p className="text-[#a69d9d] md:text-sm text-auto lg:text-auto">
                34 Courses
              </p>
            </div>
            <div className="flex gap-1">
              <Download className="w-4" />
              <p className="text-[#a69d9d] md:text-sm text-auto lg:text-auto">
                250 Sales
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/tracks/InfoOfFrontend`}
          onClick={handleClick}
          className="block"
        >
          <Button className="bg-[#28A745] w-[180px] text-lg text-white mx-auto block h-11 text-center transition-all duration-300  hover:bg-[#0e1710] rounded-full">
            Join Course
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Card;
