import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";

interface Option {
  text: string;
  id: string;
}

interface QuestionType {
  questionText: string;
  options: Option[];
  correctAnswers: string[];
  questionId:string
}

interface ITasks {
  _id: string;
  title: string;
  description: string;
  questions: QuestionType[];
}

interface IAnswers {
  questionId: string;
  selectedOptionIds: string[];
}

interface IsubmitQuiz {
  answers: IAnswers[];
}


export type ITasksResponse = ITasks; // 

export const TaskApiSlice = createApi({
    reducerPath: "ApiTask",
    tagTypes: ["TaskForm"],
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    getTasks: builder.query<ITasksResponse, string | null>({
        query: (_id) => ({
        url: `/tasks/${_id}`,
        }),
        providesTags: (result) =>
        result
            ? [{ type: "TaskForm", id: result._id }]
            : [{ type: "TaskForm", id: "LIST" }],
    }),

        //Create=>post
                StartQuize: builder.mutation({
                query: (_id:string|null) => ({
                    url: `/tasks/start/${_id}`,
                    method: "POST",
                }),
                    invalidatesTags: [{ type: "TaskForm", id: "LIST" }]
            }),
            
        //Create=>post
            //--------------------------update--------------------

            submitQuiz: builder.mutation({
                    query: ({ _id, body }: { _id:string|null; body:IsubmitQuiz }) => ({
                    url: `/submissions/submit-quiz/${_id}`,
                        method: "POST",
                        body: body
                        }),
                        invalidatesTags: [{ type: "TaskForm", id: "LIST" }]
                    }),
    }),
});

export const { useGetTasksQuery,useStartQuizeMutation,useSubmitQuizMutation} = TaskApiSlice;
