import React, { useEffect, useState, useCallback } from "react";
import {
  useGetTasksQuery,
  useSubmitQuizMutation,
} from "@/app/services/crudTasks";
import ButtonTask from "@/components/TaskFormComponents/ButtonTask/ButtonTask";
import Question from "@/components/TaskFormComponents/Question";
import CountDown from "@/components/TaskFormComponents/countdown/CountDown";
import GlobelLoading from "@/Ui/LoadingGlable/LoadingGlable";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { addCurrentTaskIdAction } from "@/app/features/CurrentTaskIdSlice";
import Spinner from "@/Ui/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Award, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addcompletedTasks } from "@/app/features/CompetedTaskSlice";

// Types
interface IAnswers {
  questionId: string;
  selectedOptionIds: string[];
}

interface Option {
  text?: string;
  label?: string;
  id?: string;
  _id?: string;
  value?: string;
}

interface QuestionType {
  questionText: string;
  options: Option[];
  questionId?: string;
  _id?: string;
  correctAnswers: string[];
  questionType?: "single_choice" | "multiple_choice";
}

interface QuizResult {
  score: number;
  percentage: number;
  maxScore?: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent?: number;
  message: string;
  status: string;
  isLocked?: boolean;
  feedback?: string | null;
  startedAt?: string;
  completedAt?: string;
}

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const { CurrentTaskId } = useSelector(
    (state: RootState) => state.CurrentTaskId
  );

  // user id
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const IdUser = userData.id;
  // State Management
  const [userAnswers, setUserAnswers] = useState<IAnswers[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showValidationError, setShowValidationError] = useState(false);
  const [openModal, setIsOpenModal] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const Navigate = useNavigate();

  // RTK Query Hooks
  const { data, isLoading, error, refetch } = useGetTasksQuery(
    CurrentTaskId ?? skipToken
  );
  const [submitQuiz, { isLoading: isSubmittingQuiz }] = useSubmitQuizMutation();

  // Helper functions for modal
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getPerformanceColor = (
    percentage: number
  ): { bg: string; text: string; border: string } => {
    if (percentage >= 80)
      return {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
      };
    if (percentage >= 60)
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
      };
    return { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" };
  };

  // Reset state when task changes
  useEffect(() => {
    if (data && CurrentTaskId) {
      console.log("Quiz data loaded:", {
        title: data.title,
        questionsCount: data.questions?.length,
        questions: data.questions?.map((q) => ({
          id: q.questionId,
          text: q.questionText,
          optionsCount: q.options?.length,
        })),
      });

      setUserAnswers([]);
      setCurrentQuestionIndex(0);
      setShowValidationError(false);
      setQuizResult(null);
      setIsOpenModal(false); // Reset modal state
    }
  }, [CurrentTaskId, data]);

  // Form validation - check if all questions are answered
  const isFormValid =
    data?.questions?.every((question: QuestionType) => {
      const questionId = question.questionId || question._id;
      const userAnswer = userAnswers.find(
        (answer) => answer.questionId === questionId
      );
      return userAnswer && userAnswer.selectedOptionIds.length > 0;
    }) ?? false;

  // Progress calculation
  const answeredQuestionsCount =
    data?.questions?.filter((question: QuestionType) => {
      const questionId = question.questionId || question._id;
      const userAnswer = userAnswers.find(
        (answer) => answer.questionId === questionId
      );
      return userAnswer && userAnswer.selectedOptionIds.length > 0;
    }).length ?? 0;

  const totalQuestions = data?.questions?.length ?? 0;
  const progressPercentage =
    totalQuestions > 0 ? (answeredQuestionsCount / totalQuestions) * 100 : 0;

  // Handle answer change (single choice only) - FIXED: Now uses option _id instead of text
  const handleAnswerChange = useCallback(
    (questionId: string, selectedOptionId: string) => {
      console.log("Answer changing:", { questionId, selectedOptionId });

      setUserAnswers((prevAnswers) => {
        const existingAnswerIndex = prevAnswers.findIndex(
          (ans) => ans.questionId === questionId
        );

        if (existingAnswerIndex !== -1) {
          // Replace existing answer (single choice behavior)
          const newAnswers = [...prevAnswers];
          newAnswers[existingAnswerIndex] = {
            questionId,
            selectedOptionIds: [selectedOptionId],
          };
          return newAnswers;
        } else {
          // Add new answer
          return [
            ...prevAnswers,
            { questionId, selectedOptionIds: [selectedOptionId] },
          ];
        }
      });

      // Clear validation error when user starts answering
      if (showValidationError) {
        setShowValidationError(false);
      }
    },
    [showValidationError]
  );

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    if (!isFormValid) {
      setShowValidationError(true);
      return;
    }

    const requestData = {
      answers: userAnswers,
    };

    console.log("Submitting quiz:", {
      taskId: CurrentTaskId,
      answersCount: userAnswers.length,
      requestData,
    });

    try {
      const result = await submitQuiz({
        _id: CurrentTaskId!,
        body: requestData,
      }).unwrap();

      console.log("Submit result:", result);

      // Handle different response structures
      let resultData = null;
      if (result.success && result.data) {
        resultData = result.data;
      } else if (result.data) {
        resultData = result.data;
      } else if (result) {
        // If the result itself contains the quiz data
        resultData = result;
      }

      if (resultData) {
        console.log("Setting quiz result:", resultData);
        setQuizResult(resultData);
        setIsOpenModal(true); // Show modal immediately after setting result
      } else {
        console.error("No result data found in response:", result);
      }

      setShowValidationError(false);
    } catch (error) {
        console.error("Submit error:", error);

      // Check if error contains result data (sometimes RTK Query treats successful responses as errors)
      if (error && typeof error === "object" && "data" in error) {
        const errorData = error as any;
        if (errorData.data) {
          console.log("Found result in error response:", errorData.data);
          setQuizResult(errorData.data);
          setIsOpenModal(true);
          setShowValidationError(false);
        }
      }
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleCloseModal = () => {
    Navigate("/tasks");
    dispatch(
      addcompletedTasks({
        userId: IdUser,
        taskId: CurrentTaskId ?? "",
      })
    );

    setIsOpenModal(false);
    setQuizResult(null); // Clear result when closing
    dispatch(addCurrentTaskIdAction(null));
  };

  // Debug logging for modal state
  useEffect(() => {
    console.log("Modal state changed:", {
      openModal,
      quizResult: !!quizResult,
    });
  }, [openModal, quizResult]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <GlobelLoading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-800 mb-4">
            Failed to Load Quiz
          </h2>
          <p className="text-red-600 mb-6">
            There was an error loading the quiz. Please try again.
          </p>
          <ButtonTask onClick={() => refetch()}>Retry</ButtonTask>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || !data.questions || data.questions.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center w-full">
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            No Questions Available
          </h2>
          <p className="text-gray-600">
            This quiz doesn't contain any questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 pt-10 flex flex-col items-center gap-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Timer */}
      <div className="w-full max-w-4xl flex justify-end px-4">
        <CountDown />
      </div>

      {/* Main Quiz Container */}
      <div className="w-full max-w-4xl shadow-xl bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#371F5A] to-[#6f44af] text-white p-8">
          <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
          <p className="text-blue-100 text-lg">{data.description}</p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-100">
                Progress: {answeredQuestionsCount} of {totalQuestions} questions
                answered
              </span>
              <span className="text-sm font-medium text-blue-100">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-[#371F5A] rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Question
                  currentQuestionIndex={currentQuestionIndex}
                  questions={data.questions}
                  onAnswerChange={handleAnswerChange}
                  userAnswers={userAnswers}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Navigation & Submit */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            {/* Previous Button */}
            <div>
              {currentQuestionIndex > 0 && (
                <ButtonTask
                  onClick={handlePrevious}
                  className="bg-gray-600 hover:bg-gray-700"
                >
                  ← Previous
                </ButtonTask>
              )}
            </div>

            {/* Next/Submit Button */}
            <div className="flex items-center gap-4">
              {currentQuestionIndex === totalQuestions - 1 ? (
                <ButtonTask
                  onClick={handleSubmitQuiz}
                  disabled={isSubmittingQuiz}
                  className={`
                                        min-w-[120px] transition-all duration-300
                                        ${
                                          showValidationError
                                            ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
                                            : isSubmittingQuiz
                                            ? "opacity-50 cursor-not-allowed"
                                            : "bg-[#6f44af] hover:bg-[#6f44af] text-white border-[#6f44af]"
                                        }
                                    `}
                >
                  {isSubmittingQuiz ? (
                    <>
                      <Spinner />
                      <span className="ml-2">Submitting...</span>
                    </>
                  ) : (
                    "Submit Quiz"
                  )}
                </ButtonTask>
              ) : (
                <ButtonTask onClick={handleNext}>Next →</ButtonTask>
              )}
            </div>
          </div>

          {/* Validation Error */}
          <AnimatePresence>
            {showValidationError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-700 font-medium">
                    Please answer all questions before submitting the quiz.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Results Modal */}
      <AnimatePresence>
        {openModal && quizResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#5d3599] to-[#7c4dbd] p-8 text-white text-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 className="h-20 w-20 mx-auto mb-4 drop-shadow-lg" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold mb-2"
                >
                  Quiz Completed!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-purple-100 text-lg"
                >
                  {quizResult.message}
                </motion.p>

                {/* Close button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white hover:text-purple-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Score Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div
                    className={`text-center p-4 rounded-xl border-2 ${
                      getPerformanceColor(quizResult.percentage).bg
                    } ${getPerformanceColor(quizResult.percentage).border}`}
                  >
                    <div
                      className={`text-4xl font-bold ${
                        getPerformanceColor(quizResult.percentage).text
                      } mb-1`}
                    >
                      {quizResult.score}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Final Score
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      out of {quizResult.maxScore || quizResult.totalQuestions}
                    </div>
                  </div>

                  <div className="text-center p-4 bg-[#5d3599] bg-opacity-10 rounded-xl border-2 border-[#5d3599] border-opacity-20">
                    <div className="text-4xl font-bold text-[#5d3599] mb-1">
                      {Math.round(quizResult.percentage)}%
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Percentage
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      overall performance
                    </div>
                  </div>
                </motion.div>

                {/* Detailed Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="h-4 w-4" />
                        <span className="font-medium">Correct Answers</span>
                      </div>
                      <span className="font-bold text-green-600">
                        {quizResult.correctAnswers}/{quizResult.totalQuestions}
                      </span>
                    </div>

                    {quizResult.timeSpent && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Time Spent</span>
                        </div>
                        <span className="font-bold text-[#371F5A]">
                          {formatTime(quizResult.timeSpent)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="font-medium">Status</span>
                      </div>
                      <span
                        className={`font-bold capitalize px-3 py-1 rounded-full text-sm ${
                          quizResult.status === "graded"
                            ? "bg-green-100 text-green-700"
                            : quizResult.status === "locked"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {quizResult.status}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Performance Message */}
                {quizResult.percentage >= 80 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center"
                  >
                    <div className="text-green-700 font-semibold mb-1">
                      🎉 Excellent Work!
                    </div>
                    <div className="text-green-600 text-sm">
                      You've demonstrated strong understanding of the material.
                    </div>
                  </motion.div>
                )}

                {quizResult.percentage >= 60 && quizResult.percentage < 80 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 text-center"
                  >
                    <div className="text-yellow-700 font-semibold mb-1">
                      👍 Good Job!
                    </div>
                    <div className="text-yellow-600 text-sm">
                      You've passed with a solid understanding.
                    </div>
                  </motion.div>
                )}

                {quizResult.percentage < 60 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-4 text-center"
                  >
                    <div className="text-red-700 font-semibold mb-1">
                      📚 Keep Learning!
                    </div>
                    <div className="text-red-600 text-sm">
                      Consider reviewing the material and trying again.
                    </div>
                  </motion.div>
                )}

                {/* Feedback */}
                {quizResult.feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-4"
                  >
                    <div className="text-blue-800 font-medium mb-2">
                      Instructor Feedback:
                    </div>
                    <div className="text-blue-700 text-sm italic">
                      {quizResult.feedback}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="px-8 pb-8"
              >
                <button
                  onClick={handleCloseModal}
                  className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-base gap-2 bg-[#5d3599] text-white hover:bg-[#4a2b7a] focus:ring-[#5d3599] shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  End
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskForm;