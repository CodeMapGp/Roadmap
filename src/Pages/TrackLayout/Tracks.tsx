import { LetterPullUp } from "@/components/eldoraui/letterpullup";
import Image from "../../components/Image";
import Trackcard from "../../components/Trackcard";
import Button from "../../Ui/Button";
import { useGetTracksQuery } from "@/app/services/GetTracks";
import CardTrackSkeleton from "@/components/CardTrackSkeleton";
import "@/index.css";




const Tracks = () => {
  const { data, isLoading } = useGetTracksQuery();
  const firstThreeTracks = data?.slice(0, 3);


  if (isLoading)
    return (
      <div className="pt-20 mt-5 mb-5 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-center max-w-screen-xl mx-auto">
        {Array.from({ length: 8 }).map((_, index) => (
          <CardTrackSkeleton key={index} />
        ))}
      </div>
    );

 
  const staticTrackImages = [
  "/frontend.jpg",
  "/backend.jpg",
  "/MachineLearning.jpg",
  "/ux.jpg",
  "/mobileApplication.jpg",
];
  const renderTracks = data?.map(({ title, _id, },i) => (
    <Trackcard
      key={_id}
      url={ staticTrackImages[i % staticTrackImages.length]}                         

      alt={title}
      title={title}
      path="InfoOfFrontend"
      _id={_id}
    />
  ));

  return ( 
    <div className="min-h-screen bg-gradient-to-br from-[#CFD8FF] via-white to-[#CFD8FF]/50  ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#6F44AF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-[#371F5A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#6F44AF]/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[#CFD8FF] rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#6F44AF] rounded-full animate-pulse"></div>
              <span className="text-[#371F5A] text-sm font-medium">Learning Tracks Available</span>
            </div>
            
            <LetterPullUp
              className="text-4xl text-center md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#371F5A] via-[#6F44AF] to-[#371F5A] mb-4"
              text="Choose your learning track"
            />
            
            <p className="text-[#6F44AF]/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover expertly crafted learning paths designed to accelerate your development journey
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 bg-gradient-to-r from-[#6F44AF] to-[#371F5A] rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 pm-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {renderTracks}
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Upcoming Courses Card */}
                <div className="bg-white/90 backdrop-blur-xl border border-[#CFD8FF]/50 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 bg-gradient-to-r from-[#6F44AF] to-[#371F5A] rounded-full"></div>
                    <h3 className="text-xl font-bold text-[#371F5A]">Upcoming Courses</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {firstThreeTracks?.map((track,i) => (
                      <div key={i} className="group flex items-center gap-4 p-3 rounded-xl bg-[#CFD8FF]/20 hover:bg-[#CFD8FF]/40 transition-all duration-300 cursor-pointer border border-[#CFD8FF]/30 hover:border-[#6F44AF]/40">
                        <div className="relative flex-shrink-0">
                          <Image
                          imageurl={ staticTrackImages[i % staticTrackImages.length]}                         
                          alt="error"
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#6F44AF] rounded-full border-2 border-white animate-pulse"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                          <p className="text-[#371F5A] font-semibold text-sm leading-tight group-hover:text-[#6F44AF] transition-colors truncate">
                            {track.title}
                          </p>
                          <p className="text-[#6F44AF]/70 text-xs mt-1">2h 15m • 847 enrolled</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Assistant Card */}
                <div className="relative bg-gradient-to-br from-[#371F5A]/10 to-[#6F44AF]/10 backdrop-blur-xl border border-[#6F44AF]/30 rounded-2xl p-6 shadow-2xl overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#371F5A]/5 to-[#6F44AF]/5 animate-pulse"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-[#6F44AF] rounded-full animate-ping"></div>
                      <span className="text-[#6F44AF] text-xs font-medium uppercase tracking-wider">AI Assistant</span>
                    </div>
                    
                    <h3 className="text-[#371F5A] font-bold text-lg mb-2 leading-tight">
                      Not sure where to start?
                    </h3>
                    <p className="text-[#6F44AF]/80 text-sm mb-4">
                      Get personalized learning recommendations from our AI
                    </p>
                    
                    <Button className="w-full bg-gradient-to-r from-[#6F44AF] to-[#371F5A] hover:from-[#371F5A] hover:to-[#6F44AF] text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#6F44AF]/25">
                      Start Chatting
                    </Button>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#6F44AF]/20 to-[#371F5A]/20 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-[#371F5A]/20 to-[#6F44AF]/20 rounded-full blur-xl"></div>
                  
                  <div className="absolute bottom-4 right-4 hidden md:block">
                    <Image
                      imageurl="src/assets/Home/chat.png"
                      alt="error"
                      className="w-16 h-16 object-contain opacity-60"
                    />
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white/90 backdrop-blur-xl border border-[#CFD8FF]/50 rounded-2xl p-6">
                  <h4 className="text-[#371F5A] font-semibold mb-4">Platform Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6F44AF]/70 text-sm">Active Learners</span>
                      <span className="text-[#6F44AF] font-bold">12,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6F44AF]/70 text-sm">Completion Rate</span>
                      <span className="text-[#371F5A] font-bold">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6F44AF]/70 text-sm">Avg. Rating</span>
                      <span className="text-[#6F44AF] font-bold">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;