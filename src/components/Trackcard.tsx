import { Link } from "react-router-dom";
import Image from "./Image";
import { Clock8, Heart, Users, Star, ArrowRight } from "lucide-react";
import { clickedIdAction } from "@/app/features/clickedIdSlice";
import { useDispatch } from "react-redux";

interface Iprops {
  url: string;
  alt: string;
  title: string;
  path: string;
  _id: string;
}

const Trackcard = ({ url, alt, title, path, _id }: Iprops) => {
  const Dispatch = useDispatch();

  const navigate_to_roadmap = () => {
    Dispatch(clickedIdAction(_id));
  };

  return (
    <>
      <Link to={path}>
        <div
          className="group relative bg-white/95 backdrop-blur-xl border border-[#CFD8FF]/30 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#6F44AF]/20 hover:border-[#6F44AF]/50"
          onClick={navigate_to_roadmap}
        >
          {/* Animated border gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#6F44AF]/0 via-[#371F5A]/0 to-[#6F44AF]/0 group-hover:from-[#6F44AF]/20 group-hover:via-[#371F5A]/20 group-hover:to-[#6F44AF]/20 rounded-2xl transition-all duration-500 -m-px"></div>
          
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <Image 
              imageurl={url} 
              alt={alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#371F5A]/80 via-[#371F5A]/20 to-transparent"></div>
            
            {/* Status badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-[#6F44AF]/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                POPULAR
              </div>
            </div>
            
            {/* Rating */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#371F5A]/70 backdrop-blur-sm rounded-full px-2 py-1">
              <Star size={12} className="text-[#CFD8FF] fill-[#CFD8FF]" />
              <span className="text-white text-xs font-medium">4.9</span>
            </div>
            
            {/* Hover arrow */}
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-[#6F44AF] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              <ArrowRight size={16} className="text-white" />
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <h3 className="text-[#371F5A] font-bold text-lg leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6F44AF] group-hover:to-[#371F5A] transition-all duration-300">
              {title}
            </h3>

            {/* Stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-[#6F44AF]/70 group-hover:text-[#6F44AF] transition-colors duration-300">
                  <Users size={14} />
                  <span className="text-xs font-medium">700</span>
                </div>
                <div className="flex items-center gap-1 text-[#6F44AF]/70 group-hover:text-[#371F5A] transition-colors duration-300">
                  <Clock8 size={14} />
                  <span className="text-xs font-medium">2h 20m</span>
                </div>
              </div>
              
              <button className="p-2 rounded-full bg-[#CFD8FF]/20 hover:bg-red-500/20 border border-[#CFD8FF]/50 hover:border-red-500/50 transition-all duration-300 group">
                <Heart size={14} className="text-[#6F44AF] group-hover:text-red-400 group-hover:fill-red-400 transition-all duration-300" />
              </button>
            </div>

            {/* Instructor */}
            <div className="flex items-center justify-between pt-2 border-t border-[#CFD8FF]/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                  imageurl={url} 
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-[#CFD8FF]"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#6F44AF] rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-[#371F5A] text-sm font-medium">Alexander</p>
                  <p className="text-[#6F44AF]/70 text-xs">Expert Instructor</p>
                </div>
              </div>
              
            </div>

            {/* Progress bar */}
            <div className="w-full bg-[#CFD8FF]/30 rounded-full h-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#6F44AF] to-[#371F5A] rounded-full transform scale-x-0 group-hover:scale-x-full transition-transform duration-700 origin-left"></div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6F44AF]/0 via-[#371F5A]/0 to-[#6F44AF]/0 group-hover:from-[#6F44AF]/5 group-hover:via-[#371F5A]/5 group-hover:to-[#6F44AF]/5 transition-all duration-500 pointer-events-none"></div>
        </div>
      </Link>
    </>
  );
};

export default Trackcard;