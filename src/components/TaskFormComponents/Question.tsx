import React from "react";

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

interface IAnswers {
  questionId: string;
  selectedOptionIds: string[];
}

interface IProps {
  questions: QuestionType[];
  currentQuestionIndex: number;
  onAnswerChange: (questionId: string, selectedOptionId: string) => void;
  userAnswers: IAnswers[];
}

const Question: React.FC<IProps> = ({
  questions,
  currentQuestionIndex,
  onAnswerChange,
  userAnswers,
}) => {
  // FIXED: Now finds and passes the option _id instead of text
  const handleOptionChange = (questionId: string, optionId: string) => {
    if (!questionId || !optionId) {
      console.warn("Invalid questionId or optionId:", {
        questionId,
        optionId,
      });
      return;
    }
    onAnswerChange(questionId, optionId);
  };

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No question available</p>
      </div>
    );
  }

  // Get question ID with fallback
  const questionId = currentQuestion.questionId || currentQuestion._id;

  // Validate question data
  if (
    !questionId ||
    !currentQuestion.options ||
    !Array.isArray(currentQuestion.options)
  ) {
    console.warn("Invalid question data:", currentQuestion);
    return (
      <div className="flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600 text-lg">Invalid question data</p>
      </div>
    );
  }

  // Find user's answer for this question
  const userAnswer = userAnswers.find((ans) => ans.questionId === questionId);
  const selectedOptionId = userAnswer?.selectedOptionIds?.[0] || "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {/* Question Header */}
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#371F5A]">
          <h3 className="text-xl font-semibold text-gray-800 leading-relaxed">
            {currentQuestion.questionText}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            // CRITICAL FIX: Use option._id for the value instead of text
            const optionId = option._id || option.id;
            const optionText = option.text || option.label || option.value;
            
            if (!optionId) {
              console.warn("Option missing _id:", option);
              return null;
            }

            return (
              <label
                key={optionId}
                className={`
                  relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:border-[#371F5A] hover:bg-purple-50
                  ${
                    selectedOptionId === optionId
                      ? "border-[#371F5A] bg-purple-50 shadow-md"
                      : "border-gray-200 bg-white hover:shadow-sm"
                  }
                `}
              >
                <input
                  type="radio"
                  name={`question_${questionId}`}
                  value={optionId} // This is the key fix - using _id instead of text
                  checked={selectedOptionId === optionId}
                  onChange={() => handleOptionChange(questionId!, optionId)}
                  className="sr-only"
                />
                
                {/* Custom Radio Button */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200
                    ${
                      selectedOptionId === optionId
                        ? "border-[#371F5A] bg-[#371F5A]"
                        : "border-gray-300 bg-white"
                    }
                  `}
                >
                  {selectedOptionId === optionId && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>

                {/* Option Text */}
                <span
                  className={`
                    text-lg font-medium transition-colors duration-200
                    ${
                      selectedOptionId === optionId
                        ? "text-[#371F5A]"
                        : "text-gray-700"
                    }
                  `}
                >
                  {optionText}
                </span>

                {/* Selection Indicator */}
                {selectedOptionId === optionId && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg
                      className="w-6 h-6 text-[#371F5A]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;