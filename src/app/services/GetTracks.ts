
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";



interface Iheader{
    title:string
    subTitle:string
    
}

interface Iglabel{
    name:string
    icon:string
}



export interface ITracks {
    _id: string;
    title: string;
    requirments: string;
    target_audience: string;
    assignedTo:string
    user:string[]
    image:string
    header:Iheader[]
    description:string
    core_languages:Iglabel[]
    popular_frameworks:Iglabel[]
    development_tools:Iglabel[]
    career_opportunities:string
    advanced_topics:string
    project_based_learning:string
    testimonials:string
}


export type IInfoResponeResponse =ITracks;


export type ITracksResponse =ITracks[];

export const TracksApiSlice=createApi({
    reducerPath:'ApiTracks',
    tagTypes:['Getstatges'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
             // Get =>get
        getTracks:builder.query<ITracksResponse, void>({
            query:()=>{
                return{
                    url:"/roadmaps"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'Getstatges' as const,
                        id: _id,
                        })),
                        { type: 'Getstatges', id: 'LIST' },
                    ]
                    : [{ type: 'Getstatges', id: 'LIST' }],
        }),
        getInfoTrack:builder.query<IInfoResponeResponse, string | null>({
                    query:(_id)=>{
                        return{
                            url:`/roadmaps/${_id}`
                        }
                    },
            
                }),
            
    })

})

export const {useGetTracksQuery,useGetInfoTrackQuery}=TracksApiSlice


