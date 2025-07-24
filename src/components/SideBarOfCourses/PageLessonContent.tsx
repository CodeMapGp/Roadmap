import LargeLoadingSpinner from "@/Ui/LargeLoadingSpinner/LargeLoadingSpinner";
import { Clock, Globe, Play, CheckCircle2, Calendar, BookOpen } from "lucide-react";
import YouTube from "react-youtube";
import { useMarkLessonCompletedMutation } from "@/app/services/userOperations";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setTaskForCategory } from "@/app/features/taskSlice";

interface Iprops {
  videoUrl: string;
  title: string;
  titleofStatge: string;
  duration: number;
  titleofLesson: string;
  description: string;
  LastEdit: string;
  isloading: boolean;
  currentLessonId: string;
  userId: string;
}

interface ICompletedLesson {
  _id: string;
  completedby: string[];
}

export type ICompletedLessonResponse = ICompletedLesson[];

// استخراج الـ videoId من أي رابط يوتيوب
const extractVideoId = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    
    if (hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1); // remove leading slash
    }

    if (hostname.includes("youtube.com")) {
      const idFromParams = parsedUrl.searchParams.get("v");
      if (idFromParams) return idFromParams;

      const parts = parsedUrl.pathname.split("/");
      return parts[parts.length - 1];
    
    }

   

  

    return "";
  } catch (err) {
    console.log(err)
    console.error("Invalid YouTube URL:", url);
    return "";
  }
};


const ContentOfPage = ({
  videoUrl,
  duration,
  titleofStatge,
  titleofLesson,
  description,
  LastEdit,
  isloading,
  currentLessonId,
  userId,
}: Iprops) => {

  // states
  const [MarkLessonCompleted ] = useMarkLessonCompletedMutation();
  const Dispatch=useDispatch()


 


  // if the user watch video
  const queryClient = useQueryClient();
  const onPlayerEnd = async () => {
    // Send API request to backend to mark lesson as completed
  const response = await MarkLessonCompleted(currentLessonId);
    // Log full structure
    console.log("Full response from mutation:", response);

    // Just data
    console.log("Completed lesson data:", response?.data);

  if (response?.data?.taskGenerated && response.data.task?._id) {
  console.log(response.data.task?._id);
  Dispatch(
    setTaskForCategory({
      userId: userId, 
      categoryId: response.data.task.category,
      taskId: response.data.task._id,
    })
  );
}


    //  Update React Query cache manually without refetch
    queryClient.setQueryData<ICompletedLessonResponse>(
      ["userCompletedLessons"],
      (old) => {
        if (!old) return [];

        // If the lesson is already marked as completed, don't add it again
        const alreadyExists = old.some(
          (lesson) => lesson._id === currentLessonId
        );
        if (alreadyExists) return old;

        // 4. Append the newly completed lesson to the cache
        return [
          ...old,
          {
            _id: currentLessonId,
            completedby: [userId],
          },
        ];
      }
    );
  };

  if (isloading)
    return (
      <div className="min-h-screen bg-gradient-to-br  to-indigo-50/30 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto  rounded-2xl shadow-xl flex items-center justify-center">
              <LargeLoadingSpinner />
            </div>
          </div>
        </div>
      </div>
    );

  const videoId = extractVideoId(videoUrl);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

console.log("Extracted video ID:", videoId);
  return (
    <div className="min-h-screen mt-3 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Clean Header Section */}
        <div className="mb-12 pt-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1e1927] to-[#371F5A] p-2 lg:p-4 text-white relative">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {titleofStatge}
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {titleofLesson}
                </h1>
                
                <p className="text-white/90 text-lg max-w-3xl leading-relaxed">
                  Master new skills with our expertly crafted video lessons designed for effective learning
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Video Section */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="aspect-video bg-slate-900 relative">

                
                {videoId ? (
                  <YouTube
                    videoId={videoId}
                    onEnd={onPlayerEnd}
                    className="w-full h-full"
                    iframeClassName="w-full h-full"
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: 0,
                        controls: 1,
                        modestbranding: 1,
                        rel: 0,
                      },
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white space-y-4">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold">Video Unavailable</p>
                        <p className="text-white/70 text-sm">Unable to load video content</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">About This Lesson</h2>
                  <p className="text-slate-600">Comprehensive overview and learning objectives</p>
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none mb-8">
                <p className="text-slate-700 leading-relaxed text-lg">
                  {description}
                </p>
              </div>

              {/* Progress Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">Complete this lesson to progress</h3>
                    <p className="text-slate-600 text-sm">Watch the entire video to unlock your next lesson</p>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
                    <span className="text-sm font-medium text-green-700">Watch to end</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Lesson Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-6 bg-indigo-600 rounded-full"></div>
                  Lesson Details
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Duration */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Duration</p>
                    <p className="text-xl font-bold text-slate-800">{duration}h</p>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Language</p>
                    <p className="text-xl font-bold text-slate-800">Arabic</p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Updated</p>
                    <p className="text-lg font-bold text-slate-800">{formatDate(LastEdit)}</p>
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

export default ContentOfPage;