import { addCurrentTaskIdAction } from "@/app/features/CurrentTaskIdSlice";
import { useStartQuizeMutation } from "@/app/services/crudTasks";
import { RootState } from "@/app/store";
import GlobalModal from "@/components/DeleteModal";
import { axiosInstance } from "@/config/axios.config";
import GlobelLoading from "@/Ui/LoadingGlable/LoadingGlable";
import Spinner from "@/Ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { BookOpenCheck, Clock, CheckCircle2, Circle, PlayCircle, GraduationCap, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IUser {
  roadmap: string[];
  task: string[];
}

interface IRoadmap {
  _id: string;
  title: string;
}

interface ITask {
  _id: string;
  title: string;
  description?: string;
  duration?: string;
  status: string;
  category: {
    _id: string;
    title: string;
    roadmap: string;
  };
}

const Tasks = () => {
  const [openModal, setIsOpenModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState<IRoadmap | null>(null);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const {  CurrentTaskId } = useSelector((state: RootState) => state.CurrentTaskId);
  const Distatch = useDispatch();
  const Navigate = useNavigate();
  const [StartQuiz, { isLoading: isloadingStartQuiz, isSuccess }] = useStartQuizeMutation();
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const IdUser = userData?.id;
  
  //get user by id
  const getUserById = async (): Promise<IUser> => {
    if (!IdUser) throw new Error("No User ID Provided");
    const { data } = await axiosInstance.get(`users/${IdUser}`);
    return data;
  };

  const { data: user ,isLoading:isloadinggetuser } = useQuery({
    queryKey: ["oneUser", IdUser],
    queryFn: getUserById,
    enabled: !!IdUser,
  });

  // get roadmaps of user

  const getRoadmapsByIds = async (ids: string[]): Promise<IRoadmap[]> => {
    const promises = ids.map((id) =>
      axiosInstance.get<IRoadmap>(`roadmaps/${id}`).then((res) => res.data)
    );
    return Promise.all(promises);
  };

  const { data: roadmaps ,isLoading:getroadmaploading } = useQuery({
    queryKey: ["roadmaps", user?.roadmap],
    queryFn: () => getRoadmapsByIds(user?.roadmap || []),
    enabled: !!user?.roadmap?.length,
  });

  // get tasks all of user

  const getTasksByIds = async (ids: string[]): Promise<ITask[]> => {
    const results = await Promise.allSettled(
      ids.map((id) => axiosInstance.get<ITask>(`tasks/${id}`))
    );

    return results
      .filter((r): r is PromiseFulfilledResult<AxiosResponse<ITask>> => r.status === "fulfilled")
      .map((r) => r.value.data);
  };

  const { data: allTasks } = useQuery({
    queryKey: ["userTasks", user?.task],
    queryFn: () => getTasksByIds(user?.task || []),
    enabled: !!user?.task?.length,
  });
  //filter each task to each each roadmap
  
  const filteredTasks = allTasks?.filter(
    (task) =>
      selectedRoadmap?._id &&
      typeof task?.category?.roadmap === "string" &&
      task.category.roadmap.trim().toLowerCase() === selectedRoadmap._id.trim().toLowerCase()
  );

  // Animation
  useEffect(() => {
    if (selectedTask) {
      const element = document.getElementById("taskDetails");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedTask]);

  useEffect(() => {
    setSelectedTask(null);
  }, [selectedRoadmap]);

  // isSuccess to request ta start task
  useEffect(() => {
    if (isSuccess) {
      Navigate("/taskform");
      setIsOpenModal(false);
    }
  }, [isSuccess]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if(getroadmaploading||isloadinggetuser)  
      return (
    <div className='flex items-center justify-center w-full h-screen'>
      <GlobelLoading />
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 ">
        {/* Header Section */}
        <div className="text-center mt-10  mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-[#371F5A] to-[#6f44af] rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Learning Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your skills through structured learning paths and interactive assessments
          </p>
        </div>

        {/* Current Path Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#371F5A] to-[#6f44af] px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="w-6 h-6" />
              {selectedRoadmap?.title || "Choose Your Learning Path"}
            </h2>
            <p className="text-blue-100 mt-2">
              {selectedRoadmap 
                ? "Continue your journey to excellence" 
                : "Select a roadmap to begin your educational journey"
              }
            </p>
          </div>
          {/* Roadmap Navigation */}
          <div className="px-8 py-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {roadmaps?.map((roadmap) => (
                <button
                  key={roadmap._id}
                  onClick={() => setSelectedRoadmap(roadmap)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedRoadmap?._id === roadmap._id
                      ? "bg-gradient-to-r from-[#371F5A] to-[#6f44af] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {roadmap.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        {selectedRoadmap && Array.isArray(filteredTasks) && filteredTasks.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BookOpenCheck className="w-6 h-6 text-[#6f44af]" />
              Available Assessments
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  onClick={() => setSelectedTask(task)}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        MCQ
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {task.title}
                    </h4>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>60 minutes</span>
                    </div>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-sm text-gray-600 font-medium">
                      Category: {task.category.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Selected Task Details */}
        {selectedTask && (
          <div
            id="taskDetails"
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#371F5A] to-[#6f44af] px-8 py-6">
              <h3 className="text-2xl font-bold text-white">
                Assessment Details: {selectedTask.category.title}
              </h3>
              <p className="text-indigo-100 mt-2">
                Ready to test your knowledge? Click below to begin your assessment.
              </p>
            </div>
            <div
              className="p-8 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                Distatch(addCurrentTaskIdAction(selectedTask._id));
                setIsOpenModal(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-blue-100 rounded-xl">
                    <BookOpenCheck className="w-8 h-8 text-[#371F5A]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {selectedTask.title}
                    </h4>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>30 minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedTask.status)}
                        <span className="font-medium">{selectedTask.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {
                }
               {
  selectedTask.status === "completed" ? (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedTask.status)}`}>
      {selectedTask.status}
    </span>
  ) : (
    <div className="text-right">
      <div className="px-4 py-2 bg-gradient-to-r from-[#371F5A] to-[#6f44af] text-white rounded-lg font-medium hover:from-[#442770] hover:to-[#7e4dc6] transition-all">
        Start Assessment
      </div>
    </div>
  )
}

                
              </div>
            </div>
          </div>
        )}
        {/* Modal */}
        {openModal && (
          <GlobalModal
            title="Start Assessment"
            description="Are you ready to begin this assessment? Make sure you have enough time to complete it."
            isOpen={openModal}
            setIsOpen={setIsOpenModal}
          >
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpenModal(false)}
                className="px-6 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={isloadingStartQuiz || !CurrentTaskId}
                onClick={() => {
                  StartQuiz(CurrentTaskId);
                }}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                  isloadingStartQuiz 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#371F5A] to-[#6f44af] hover:from-[#442770] hover:to-[#7e4dc6] shadow-lg hover:shadow-xl'
                }`}
              >
                {isloadingStartQuiz ? (
                  <div className="flex gap-2 items-center justify-center">
                    <Spinner />
                    <span>Starting...</span>
                  </div>
                ) : (
                  "Begin Assessment"
                )}
              </button>
            </div>
          </GlobalModal>
        )}
      </div>
    </div>
  );
};

export default Tasks;