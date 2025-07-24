import Image from "../components/Image";
import Button from "../Ui/Button";
import Card from "../components/Card";
import CardWithoutImageInHome from "@/components/CardWithoutImageInHome/CardWithoutImageInHome";
import MorphingText from "@/components/eldoraui/morphingtext";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Search from "@/components/Search/Search";
import { useGetTracksQuery } from "@/app/services/GetTracks";
import CardTrackSkeleton from "@/components/CardTrackSkeleton";
import Hero from "@/components/Hero";

const HomePage = () => {
  const texts = ["Course", "Video", "Track"];

  const controlsTracks = useAnimation();
  const { ref: refTracks, inView: inViewTracks } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const controlsTestimonials = useAnimation();
  const { ref: refTestimonials, inView: inViewTestimonials } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const controlsPremium = useAnimation();
  const { ref: refPremium, inView: inViewPremium } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // Add missing controls for stats section
  const controlsStats = useAnimation();
  const { ref: refStats, inView: inViewStats } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inViewTracks) {
      controlsTracks.start("visible");
    }
  }, [inViewTracks, controlsTracks]);

  useEffect(() => {
    if (inViewTestimonials) {
      controlsTestimonials.start("visible");
    }
  }, [inViewTestimonials, controlsTestimonials]);

  useEffect(() => {
    if (inViewPremium) {
      controlsPremium.start("visible");
    }
  }, [inViewPremium, controlsPremium]);

  useEffect(() => {
    if (inViewStats) {
      controlsStats.start("visible");
    }
  }, [inViewStats, controlsStats]);

  // Fetch tracks data
  const { data, isLoading } = useGetTracksQuery();
  const firstThreeTracks = data?.slice(0, 3);
  console.log(firstThreeTracks)

  const staticTrackImages = [
  "public/frontend.jpg",
  "public/backend.jpg",
  "public/MachineLearning.jpg",
];

  return (
    <div className="">
      <div className="bg-[#CFD8FF] rounded-b-xl ">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-around px-8 py-16 mt-10">
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-left max-w-lg flex flex-col gap-0"
          >
            <h6 className="text-3xl  md:text-4xl font-bold text-gray-900 leading-snug">
              Let's Find The Right{" "}
              <span className="text-[#545BE8]">
                <MorphingText texts={texts} />
              </span>{" "}
              For You
            </h6>
            <div className="flex justify-between ">
              <Image
                imageurl="src/assets/Home/Group7.png"
                alt="error"
                className="w-10"
              />
              <Image
                imageurl="src/assets/Home/Group8.png"
                alt="error"
                className="w-10"
              />
            </div>
            <Search />
          </motion.div>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-80 md:w-[450px]"
          >
            <Image
              imageurl="src/assets/Home/OBJECTS.png"
              alt="error"
              className="w-full"
            />
          </motion.div>
        </div>
        <div className=" flex justify-between px-2 pb-2">
          <Image
            imageurl="src/assets/Home/casual-life-3d-orange-planet-with-disk 1.png"
            alt="error"
            className="w-10"
          />
          <Image
            imageurl="src/assets/Home/Group12.png"
            alt="error"
            className="w-10"
          />
        </div>
      </div>

      {/* Chatbot section */}
      <div className="bg-gradient-to-r from-[#2F174E] to-[#4A2B6B] flex justify-center -mt-5 md:-mt-10 mx-auto w-5/6 md:w-4/6 py-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white flex items-center justify-between md:justify-around w-11/12 mx-auto p-6 md:p-8 rounded-xl shadow-lg flex-wrap gap-6 min-h-[80px] backdrop-blur-sm">
          <div className="w-16 h-16 md:w-24 md:h-24 relative">
            <div className="absolute inset-0 bg-[#545BE8]/20 rounded-full animate-ping"></div>
            <Image
              imageurl="src/assets/Home/chat.png"
              alt="AI Chatbot Assistant"
              className="w-full h-full relative z-10 hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Not sure where to start?
            </h2>
            <p className="text-gray-600 font-medium">
              Get personalized recommendations from our AI assistant
            </p>
          </div>

          <Link to="/chatbot">
            <Button className="bg-gradient-to-r from-[#2F174E] to-[#545BE8] text-white px-6 md:px-8 py-3 rounded-full flex items-center justify-center font-semibold text-sm md:text-base hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Start Chatting
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>

      {/* Success Statistics */}
      <motion.div
        ref={refStats}
        initial="hidden"
        animate={controlsStats}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
        className="my-10 py-12"
      >
        <div className="flex justify-between mx-10 px-10 w-auto h-11">
          <Image
            imageurl="src/assets/Home/Group3.png"
            alt="error"
            className="w-8 h-8"
          />
          <Image
            imageurl="src/assets/Home/lamb.png"
            alt="error"
            className="w-[80px] h-auto"
          />
        </div>

        <h3 className="text-center font-semibold text-4xl">Our Impact</h3>
        <p className="text-center">Real numbers from our learning community</p>

        <div className="mt-10 pb-7 flex flex-col lg:flex-row items-center gap-10 justify-between overflow-hidden flex-wrap w-full">
          <div className="hidden lg:flex flex-col justify-between h-full gap-10">
            <Image
              imageurl="src/assets/Home/Group2.png"
              alt="error"
              className="w-[40px] h-auto mb-20 ml-5"
            />
            <Image
              imageurl="src/assets/Home/Group4.png"
              alt="error"
              className="w-[50px] h-auto"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10 justify-center items-center flex-wrap">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-64 h-48 flex flex-col justify-center border-2 border-[#CFD8FF]">
              <h4 className="text-4xl font-bold text-[#545BE8] mb-2">50K+</h4>
              <h5 className="text-xl font-semibold text-gray-900 mb-2">
                Students
              </h5>
              <p className="text-slate-400">Active learners worldwide</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-64 h-48 flex flex-col justify-center border-2 border-[#CFD8FF]">
              <h4 className="text-4xl font-bold text-[#545BE8] mb-2">95%</h4>
              <h5 className="text-xl font-semibold text-gray-900 mb-2">
                Success Rate
              </h5>
              <p className="text-slate-400">Complete their chosen tracks</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-64 h-48 flex flex-col justify-center border-2 border-[#CFD8FF]">
              <h4 className="text-4xl font-bold text-[#545BE8] mb-2">200+</h4>
              <h5 className="text-xl font-semibold text-gray-900 mb-2">
                Companies
              </h5>
              <p className="text-slate-400">Hire our graduates</p>
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-between h-full gap-10">
            <Image
              imageurl="src/assets/Home/Group2.png"
              alt="error"
              className="w-[40px] h-auto"
            />
            <Image
              imageurl="src/assets/Home/Group4.png"
              alt="error"
              className="w-[50px] h-auto"
            />
          </div>
        </div>
      </motion.div>
      {/* seaction learn without limits */}
      <Hero />
      {/* Our Tracks section */}
      <motion.div
        ref={refTracks}
        initial="hidden"
        animate={controlsTracks}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0, transition: { duration: 1 } },
        }}
        className="mt-5"
      >
        <div className="flex justify-between mx-10 px-10 w-auto h-11">
          <Image
            imageurl="/assets/Home/lamb.png"
            alt="error"
            className="w-[80px] h-auto"
          />
          <Image
            imageurl="/assets/Home/Group3.png"
            alt="error"
            className="w-8 h-8 "
          />
        </div>
        <h3 className="text-center font-semibold text-4xl">Our Tracks</h3>
        <p className="text-center">Most popular tracks suggested for you</p>
        <div className="mt-10 pb-7 flex flex-col lg:flex-row items-center gap-10 justify-between overflow-hidden flex-wrap w-full">
          <div className="hidden lg:flex flex-col justify-between h-full gap-10">
            <Image
              imageurl="src/assets/Home/Group2.png"
              alt="error"
              className="w-[40px] h-auto mb-20 ml-5"
            />
            <Image
              imageurl="src/assets/Home/Group4.png"
              alt="error"
              className="w-[50px] h-auto"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10 justify-center  items-center flex-wrap">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CardTrackSkeleton key={index} />
                ))
              : firstThreeTracks?.map((track,index) => (
                <Card
    key={track._id}
    url={staticTrackImages[index % staticTrackImages.length]
    }
    alt={track.title}
    requirments={track.requirments}
    title={track.title}
    _id={track._id}
  />

                ))}
          </div>

          <div className="hidden lg:flex flex-col justify-between h-full gap-10">
            <Image
              imageurl="src/assets/Home/Group2.png"
              alt="error"
              className="w-[40px] h-auto"
            />
            <Image
              imageurl="src/assets/Home/Group4.png"
              alt="error"
              className="w-[50px] h-auto"
            />
          </div>
        </div>
      </motion.div>

      {/* Premium Learning section */}
      <motion.section
        ref={refPremium}
        initial="hidden"
        animate={controlsPremium}
        variants={{
          hidden: { x: 100, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 1 } },
        }}
        className="my-16 p-8 flex flex-col md:flex-row md:min-h-[500px] bg-gradient-to-br from-[#CFD8FF] to-[#E8EFFF] lg:justify-around gap-8 rounded-3xl mx-4 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={controlsPremium}
          variants={{
            hidden: { x: -100, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 1 } },
          }}
          className="hidden w-full lg:w-[450px] min-h-[500px] lg:flex justify-center items-center relative z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#545BE8]/10 to-transparent rounded-full blur-3xl"></div>
          <img
            src="src/assets/Home/OBJECTS2.png"
            alt="Premium Learning Experience Illustration"
            className="w-full max-w-[450px] h-auto object-contain relative z-10"
          />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={controlsPremium}
          variants={{
            hidden: { x: 100, opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 1 } },
          }}
          className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-8 relative z-10"
        >
          <div>
            <h2 className="font-bold text-3xl md:text-5xl text-gray-900 leading-tight">
              Premium <span className="text-[#545BE8]">Learning</span>
              <br /> Experience
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Unlock your potential with our comprehensive learning ecosystem
              designed for success
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              className="flex items-start space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-gradient-to-r from-[#545BE8]/10 to-[#7C3AED]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Image
                  imageurl="src/assets/Home/hearts 1.png"
                  alt="Structured Learning Icon"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">
                  Structured Learning Path
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Follow our carefully designed roadmaps to master programming
                  skills step by step, from basics to advanced concepts with
                  clear milestones and checkpoints.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <img
                  src="src/assets/Home/hearts 1.png"
                  className="w-8 h-8"
                  alt="Interactive Learning Icon"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">
                  Interactive Learning
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Engage with practical exercises, real-world projects, and
                  community support to enhance your learning journey with
                  hands-on experience and peer collaboration.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start space-x-4 group"
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 bg-gradient-to-r from-[#F59E0B]/10 to-[#D97706]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-[#F59E0B]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">
                  Instant Feedback & Support
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get immediate feedback on your progress with AI-powered
                  assessments and 24/7 access to expert mentors and community
                  support when you need help.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Testimonials section */}
      <motion.div
        ref={refTestimonials}
        initial="hidden"
        animate={controlsTestimonials}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="py-12"
      >
        <h3 className="text-center font-semibold text-4xl">
          What Our Students Say
        </h3>
        <p className="text-center">
          Join thousands of successful developers who transformed their careers
          with our learning platform
        </p>
        <div className="mt-10 mb-10 flex flex-col items-center lg:gap-0 gap-5 space-y-2 sm:flex-row sm:justify-center md:justify-around flex-wrap">
          <Image
            imageurl="src/assets/Home/Group12.png"
            alt="error"
            className="hidden lg:flex w-20 h-20"
          />

          <CardWithoutImageInHome
            title="Frontend Developer"
            description="The structured learning path helped me transition from a complete beginner to a professional developer. The roadmaps are incredibly well-organized and practical!"
          />
          <CardWithoutImageInHome
            title="Full Stack Developer"
            description="I love how the platform combines theory with practical projects. The community support and interactive learning made my journey much easier and more engaging.Real-world tasks boosted my growth."
          />
          <CardWithoutImageInHome
            title="Web Developer"
            description="The step-by-step approach and real-world projects gave me the confidence to start my career in web development. The platform's resources are comprehensive and up-to-date."
          />

          <Image
            imageurl="src/assets/Home/casual-life-3d-orange-planet-with-disk 1.png"
            alt="error"
            className="w-11 h-11 hidden lg:flex"
          />
        </div>
      </motion.div>

      
    </div>
  );
};

export default HomePage;
