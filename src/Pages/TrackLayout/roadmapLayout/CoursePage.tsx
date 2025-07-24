import { RootState } from "@/app/store";
import ContentOfPage from "@/components/SideBarOfCourses/PageLessonContent";
import Sidebar from "@/components/SideBarOfCourses/SideBar";
import { axiosInstance } from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface IStage {
  _id: string;
  title: string;
}

interface ILesson {
  title: string;
  description: string;
  link: string;
  lesson_duration: number;
  lecture_number: number;
  stage: IStage;
  updatedAt: string;
}

type ILessonResponse = ILesson;

const CoursePage = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const IdUser = userData.id;
  const { ClickedIdLesson } = useSelector(
    (state: RootState) => state.clickedIdLesson
  );

  const [selectedVideo, setSelectedVideo] = useState({
    videoUrl: "",
    title: "",
    duration: 0,
  });

  console.log(selectedVideo)

  const getLessonById = async (): Promise<ILessonResponse> => {
    if (!ClickedIdLesson) throw new Error("No Lesson ID Provided");
    const { data } = await axiosInstance.get(`/lesson/${ClickedIdLesson}`);
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["oneLesson", ClickedIdLesson],
    queryFn: getLessonById,
    enabled: !!ClickedIdLesson,
  });

  useEffect(() => {
    if (data && !isLoading && selectedVideo.videoUrl === "") {
      setSelectedVideo({
        videoUrl: data.link,
        title: data.title,
        duration: data.lesson_duration,
      });
    }
  }, [data, isLoading, selectedVideo.videoUrl]);

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full min-h-screen bg-gradient-to-br from-[#CFD8FF]/10 to-white">
      <Sidebar setSelectedVideo={setSelectedVideo} />
      <div className="flex-1 overflow-hidden">
        <ContentOfPage
          currentLessonId={ClickedIdLesson ?? ""}
          videoUrl={selectedVideo.videoUrl || data?.link || ""}
          title={selectedVideo.title || data?.title || ""}
          LastEdit={data?.updatedAt ?? ""}
          description={data?.description ?? ""}
          duration={selectedVideo.duration || data?.lesson_duration || 0}
          titleofLesson={selectedVideo.title || data?.title || ""}
          titleofStatge={data?.stage?.title ?? ""}
          isloading={isLoading}
          userId={IdUser}
        />
      </div>
    </div>
  );
};

export default CoursePage;