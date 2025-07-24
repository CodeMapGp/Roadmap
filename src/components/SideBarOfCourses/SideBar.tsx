import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { axiosInstance } from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import LargeLoadingSpinner from "@/Ui/LargeLoadingSpinner/LargeLoadingSpinner";
import CheckBox from "../TaskFormComponents/checkbox/CheckBox";
import { Youtube, Clock, BookOpen, BookOpenCheck, Lock, Play, CheckCircle2, Users, Award } from "lucide-react";
import { clickedIdLessonAction } from "@/app/features/clickedIdLessonSlice";
import { useNavigate } from "react-router-dom";
import { addCurrentTaskIdAction } from "@/app/features/CurrentTaskIdSlice";

interface SidebarProps {
  setSelectedVideo: (video: {
    videoUrl: string;
    title: string;
    duration: number;
  }) => void;
  currentVideo?: {
    videoUrl: string;
    title: string;
    duration: number;
  };
}

interface ILessons {
  _id: string;
  title: string;
  link: string;
  lesson_duration: number;
  lecture_number: number;
}

interface ICategoryWithLessons {
  _id: string;
  title: string;
  stage: {
    _id: string;
    title: string;
  };
  roadmap: {
    _id: string;
    title: string;
  };

  lesson: ILessons[];
  task: string[];
  user: string[];
  quizQuestionCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IRoadmap {
  _id: string;
  title: string;
}

interface IStage {
  _id: string;
  title: string;
  roadmap: IRoadmap;
}

interface IEnhancedStage extends IStage {
  categories: ICategoryWithLessons[];
}

interface ICompletedLesson {
  _id: string;
  lecture_number: number;
  completedby: string[];
}

export type ICompletedLessonResponse = ICompletedLesson[];
export type IStagesResponse = IStage[];
export type ICategoriesResponse = ICategoryWithLessons[];

const Sidebar = ({ setSelectedVideo }: SidebarProps) => {
  // user id
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const IdUser = userData.id;

  // states
  const { ClickedIdLesson } = useSelector(
    (state: RootState) => state.clickedIdLesson
  );
  const { ClickedId } = useSelector((state: RootState) => state.clickedId);
  const {categoryTasks} = useSelector((state: RootState) => state.tasks);
  const [open] = useState(true);
  const [expandedMainIds, setExpandedMainIds] = useState<string[]>([]);
  const [expandedLessonIds, setExpandedLessonIds] = useState<string[]>([]);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const completedTasks = useSelector(
    (state: RootState) => state.completedTasks[IdUser] || []
  );

  const toggleMain = (id: string) => {
    setExpandedMainIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const toggleLesson = (id: string) => {
    setExpandedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  // fetch all stages by roadmap ID
  const getStagesById = async (): Promise<IStagesResponse> => {
    if (!ClickedId) throw new Error("No stage ID Provided");
    const { data } = await axiosInstance.get(`/stages/roadmap/${ClickedId}`);
    return data;
  };

  // fetch categories for a specific stage
  const getCategoriesByStageId = async (stageId: string): Promise<ICategoriesResponse> => {
    const { data } = await axiosInstance.get(`/category/stage/${stageId}`);
    return data;
  };

  // fetch stages data
  const { data: stagesData, isLoading: isStagesLoading } = useQuery({
    queryKey: ["roadmapStages", ClickedId],
    queryFn: getStagesById,
    enabled: !!ClickedId,
  });

  // fetch categories for all stages
  const { data: enhancedStagesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["enhancedStages", stagesData],
    queryFn: async (): Promise<IEnhancedStage[]> => {
      if (!stagesData) return [];
      
      const enhancedStages = await Promise.all(
        stagesData.map(async (stage) => {
          try {
            const categories = await getCategoriesByStageId(stage._id);
            return {
              ...stage,
              categories: categories || []
            };
          } catch (error) {
            console.error(`Error fetching categories for stage ${stage._id}:`, error);
            return {
              ...stage,
              categories: []
            };
          }
        })
      );
      
      return enhancedStages;
    },
    enabled: !!stagesData && stagesData.length > 0,
  });

  const isLoading = isStagesLoading || isCategoriesLoading;

  // fetch Completed Lesson
  const getCompletedLessons = async (): Promise<ICompletedLessonResponse> => {
    const { data } = await axiosInstance.get(`/lesson/completed`);
    return data;
  };

  const { data: watchedLessonIds } = useQuery({
    queryKey: ["userCompletedLessons"],
    queryFn: getCompletedLessons,
  });

  // fetch completed lesson for user
  const completedLessonIds = watchedLessonIds
    ?.filter((lesson) => lesson.completedby.includes(IdUser))
    ?.map((lesson) => lesson._id);

  // Helper function to check if a lesson is unlocked
  const isLessonUnlocked = (lessons: ILessons[], currentIndex: number) => {
    if (currentIndex === 0) return true; // First lesson is always unlocked
    const previousLessonId = lessons[currentIndex - 1]._id;
    return completedLessonIds?.includes(previousLessonId) || false;
  };

  // Auto-select first lesson when data loads
  useEffect(() => {
    if (enhancedStagesData && !isLoading && !ClickedIdLesson) {
      // Find the first lesson in the first stage's first category
      const firstStage = enhancedStagesData[0];
      if (firstStage && firstStage.categories.length > 0) {
        const firstCategory = firstStage.categories[0];
        if (firstCategory.lesson.length > 0) {
          const firstLesson = firstCategory.lesson[0];
          
          // Set the selected video
          setSelectedVideo({
            videoUrl: firstLesson.link,
            title: firstLesson.title,
            duration: firstLesson.lesson_duration,
          });
          
          // Dispatch the lesson ID
          Dispatch(clickedIdLessonAction(firstLesson._id));
          
          // Auto-expand the first stage and its first category
          setExpandedMainIds([firstStage._id]);
          setExpandedLessonIds([firstCategory._id]);
        }
      }
    }
  }, [enhancedStagesData, isLoading, ClickedIdLesson, setSelectedVideo, Dispatch]);

  // Calculate progress statistics
  const getTotalStats = () => {
    const totalLessons = enhancedStagesData?.reduce((stageAcc, stage) => {
      return stageAcc + stage.categories.reduce((catAcc, category) => {
        return catAcc + category.lesson.length;
      }, 0);
    }, 0) || 0;
    
    const completedLessons = completedLessonIds?.length || 0;
    const totalSections = enhancedStagesData?.length || 0;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    return { totalLessons, completedLessons, totalSections, progressPercentage };
  };

  const stats = getTotalStats();

  return (
    <motion.nav
      layout
      className="sticky top-0 mt-12 h-screen shrink-0 pm-2 border-r border-slate-200 bg-white flex flex-col"
      style={{ width: open ? "400px" : "72px" }}
    >
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <LargeLoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            {open && (
              <div className="p-6 space-y-6">
                {/* Course Header */}
                <div className="bg-[#371F5A] rounded-xl p-5 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold leading-tight truncate">
                          {enhancedStagesData?.[0]?.roadmap?.title}
                        </h2>
                        <p className="text-white/70 text-sm">Learning Path</p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/80">Progress</span>
                        <span className="font-medium">{stats.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-[#371F5A] rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-white rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${stats.progressPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white/5 rounded-lg p-2">
                        <Users size={14} className="text-white mx-auto mb-1" />
                        <p className="text-lg font-semibold">{stats.totalSections}</p>
                        <p className="text-xs text-white/70">Stages</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <Play size={14} className="text-white mx-auto mb-1" />
                        <p className="text-lg font-semibold">{stats.totalLessons}</p>
                        <p className="text-xs text-white/70">Lessons</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2">
                        <Award size={14} className="text-white mx-auto mb-1" />
                        <p className="text-lg font-semibold">{stats.completedLessons}</p>
                        <p className="text-xs text-white/70">Done</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Course Content */}
                <div className="space-y-4">
                  {enhancedStagesData?.map((stage) => {
                    const totalLessonsInStage = stage.categories.reduce((acc, cat) => acc + cat.lesson.length, 0);
                    
                    return (
                      <div key={stage._id} className="border border-slate-200 rounded-lg overflow-hidden">
                        <div
                          className="flex justify-between items-center bg-slate-50 p-4 cursor-pointer hover:bg-slate-100 transition-colors duration-200"
                          onClick={() => toggleMain(stage._id)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 bg-[#371F5A] rounded-lg flex items-center justify-center flex-shrink-0">
                              <BookOpen size={16} className="text-white" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-slate-900 truncate">{stage.title}</h3>
                              <p className="text-slate-600 text-sm">{totalLessonsInStage} lessons</p>
                            </div>
                          </div>
                          <motion.span
                            animate={{
                              rotate: expandedMainIds.includes(stage._id) ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="text-slate-400 flex-shrink-0"
                          >
                            <FiChevronDown size={20} />
                          </motion.span>
                        </div>
                        
                        <AnimatePresence>
                          {expandedMainIds.includes(stage._id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 space-y-3">
                                {stage.categories.map((category) => (
                                  <div key={category._id} className="border border-slate-100 rounded-lg overflow-hidden">
                                    <motion.div
                                      className="flex justify-between items-center gap-2 p-3 cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                                      onClick={() => toggleLesson(category._id)}
                                    >
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-6 h-6 bg-slate-200 rounded-md flex items-center justify-center flex-shrink-0">
                                          <BookOpen size={12} className="text-slate-600" />
                                        </div>
                                        <div className="min-w-0">
                                          <h4 className="font-medium text-slate-900 truncate">{category.title}</h4>
                                          <p className="text-slate-500 text-sm">{category.lesson.length} videos</p>
                                        </div>
                                      </div>
                                      <motion.span
                                        animate={{
                                          rotate: expandedLessonIds.includes(category._id) ? 90 : 0,
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="text-slate-400 flex-shrink-0"
                                      >
                                        <FiChevronRight size={16} />
                                      </motion.span>
                                    </motion.div>
                                    
                                    <AnimatePresence>
                                      {expandedLessonIds.includes(category._id) && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: "auto" }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="px-3 pb-3 space-y-1">
                                            {category.lesson.map((lessonItem, index) => {
                                              const { _id: lessonId, title, lesson_duration, link } = lessonItem;
                                              const isActive = lessonId === ClickedIdLesson;
                                              const isCompleted = completedLessonIds?.includes(lessonId);
                                              const isUnlocked = isLessonUnlocked(category.lesson, index);
                                              
                                              return (
                                                <motion.div
                                                  key={lessonId}
                                                  initial={{ opacity: 0, y: 5 }}
                                                  animate={{ opacity: 1, y: 0 }}
                                                  transition={{ delay: index * 0.05 }}
                                                  className={`relative group ${!isUnlocked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                  onClick={() => {
                                                    if (isUnlocked) {
                                                      setSelectedVideo({
                                                        videoUrl: link,
                                                        title: title,
                                                        duration: lesson_duration,
                                                      });
                                                      Dispatch(clickedIdLessonAction(lessonId));
                                                    }
                                                  }}
                                                >
                                                  <div className={`relative p-3 rounded-lg border transition-all duration-200 ${
                                                    isActive 
                                                      ? "bg-blue-50 border-blue-200" 
                                                      : isCompleted
                                                        ? "bg-[#dde3ff] border-[#CFD8FF]"
                                                        : isUnlocked
                                                          ? "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                                          : "bg-slate-50 border-slate-200 opacity-60"
                                                  }`}>
                                                    
                                                    {/* Lock Overlay */}
                                                    {!isUnlocked && (
                                                      <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center z-10">
                                                        <div className="text-center">
                                                          <Lock size={16} className="text-slate-400 mx-auto mb-1" />
                                                          <p className="text-xs text-slate-500">Complete previous</p>
                                                        </div>
                                                      </div>
                                                    )}
                                                    <div className="flex items-center gap-3">
                                                      {/* Status Icon */}
                                                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                                        isCompleted 
                                                          ? "bg-[#CFD8FF]" 
                                                          : isActive
                                                            ? "bg-blue-100"
                                                            : isUnlocked
                                                              ? "bg-slate-100"
                                                              : "bg-slate-100"
                                                      }`}>
                                                        {isCompleted ? (
                                                          <CheckCircle2 size={16} className="text-[#371F5A]" />
                                                        ) : isActive ? (
                                                          <Play size={14} className="text-blue-600" />
                                                        ) : (
                                                          <Youtube size={14} className={isUnlocked ? "text-slate-600" : "text-slate-400"} />
                                                        )}
                                                      </div>
                                                      {/* Content */}
                                                      <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-2">
                                                          <h5 className={`text-sm font-medium truncate ${
                                                            isActive 
                                                              ? "text-blue-900" 
                                                              : isCompleted
                                                                ? "text-[#371F5A]"
                                                                : isUnlocked
                                                                  ? "text-slate-900"
                                                                  : "text-slate-400"
                                                          }`}>
                                                            {title}
                                                          </h5>
                                                          <span className={`text-xs px-2 py-1 rounded-full ${
                                                            isActive
                                                              ? "bg-blue-100 text-blue-700"
                                                              : isCompleted
                                                                ? "bg-[#CFD8FF] text-[#371F5A]"
                                                                : "bg-slate-100 text-slate-600"
                                                          } flex-shrink-0`}>
                                                            {index + 1}
                                                          </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-1">
                                                          <Clock size={12} className={isUnlocked ? "text-slate-500" : "text-slate-400"} />
                                                          <span className={`text-xs ${isUnlocked ? "text-slate-500" : "text-slate-400"}`}>
                                                            {lesson_duration}h
                                                          </span>
                                                          {isCompleted && (
                                                            <span className="text-xs text-[#371F5A] font-medium">Completed</span>
                                                          )}
                                                          {isActive && !isCompleted && (
                                                            <span className="text-xs text-blue-600 font-medium">Current</span>
                                                          )}
                                                        </div>
                                                      </div>
                                                      {/* Checkbox */}
                                                      <div className="flex-shrink-0">
                                                        <CheckBox
                                                          type="checkbox"
                                                          checked={isCompleted || false}
                                                          disabled
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </motion.div>
                                              );
                                            })}
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                    {/* Task Section */}
                                    {(() => {
                                      const taskId = categoryTasks[IdUser]?.[category._id];
                                      const isTaskCompleted = completedTasks.includes(taskId);
                                      return taskId && !isTaskCompleted;
                                    })() && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mx-3 mb-3"
                                      >
                                        <div
                                          className="flex gap-3 items-center bg-[#DE00A5] p-3 rounded-lg cursor-pointer hover:bg-[#f754ce] transition-colors duration-200 group"
                                          onClick={() => {
                                            Dispatch(addCurrentTaskIdAction(categoryTasks[IdUser]?.[category._id]));
                                            navigate("/tasks");
                                          }}
                                        >
                                          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <BookOpenCheck size={16} className="text-white" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-white">Practice Task</h4>
                                            <p className="text-white/80 text-sm">Complete assignment</p>
                                          </div>
                                          <FiChevronRight size={16} className="text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Sidebar;