import { Youtube } from "lucide-react";
import "./CardOfRoadMap.css";
import HeaderOfRoadCard from "./HeaderOfRoadCard";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Icategory {
  _id: string;
  title: string;
}

interface Iprops {
  numberOfStage: number;
  titleOfStage: string;
  category: Icategory[];
  setDotPosition?: (pos: number) => void; // جديدة
}

const CardOfRoadMap = ({
  numberOfStage,
  category,
  titleOfStage,
  setDotPosition,
}: Iprops) => {
  const [isOpen, setIsOpen] = useState(true);
  const Navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const NavigateToCourse = () => {
    Navigate("/tracks/InfoOfFrontend/roadMapoffrontend/coursefrontend");
  };

  const ToggleCard = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (ref.current && setDotPosition) {
      const isMobile = window.innerWidth < 768;
      const height = ref.current.offsetHeight;

      if (isMobile) {
        const dotPosition = height / 2;
        setDotPosition(dotPosition);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Header */}
      <div>
        <HeaderOfRoadCard
          ToggleCard={ToggleCard}
          numberOfStage={numberOfStage}
        />
      </div>
      <div>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="cardOfRoadMap"
          >
            <div className="bgOfRoadMap" />
            <div className="blobOfRoadMaap" />

            {/* Content wrapper with higher z-index */}
            <div className="relative z-[3] flex flex-col gap-4 w-full">
              <p className="text-[20px] fontcolor">
                Stage {numberOfStage}: {titleOfStage}
              </p>

              <div className="flex flex-col">
                {Object.entries(category)
                  .filter(([key]) => key !== "id" && key !== "StageName")
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex gap-1 items-center  cursor-pointer"
                      onClick={NavigateToCourse}
                    >
                      <Youtube size={30} color="#4388DD" />
                      <p>{value.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CardOfRoadMap;
