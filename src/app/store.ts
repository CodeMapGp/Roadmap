
import { configureStore } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import AccessTokenSlice from './features/AccessTokenSlice'
import { ProfileApiSlice } from './services/crudeProfile';
import { DeleteAcountApiSlice } from './services/DeleteAccountForUser';
import { TaskApiSlice } from './services/crudTasks';
import { TracksApiSlice } from './services/GetTracks';
import { statgesApiSlice } from './services/GetStatges';
import clickedIdSlice from './features/clickedIdSlice';
import clickedIdLessonSlice from './features/clickedIdLessonSlice'
import { UserOperationApiSlice } from './services/userOperations';
import watchedLessonsSlice from './features/WatchedLesson'
import taskSlice from './features/taskSlice'
import currentTaskIdSlice from './features/CurrentTaskIdSlice'
import enrolledTracksSlice from './features/enrolledTracksSlice'
import completedTasksSlice from './features/CompetedTaskSlice' 

const persistAccessTokenConfig = {
    key: "accessToken",
    storage,
};
const persistclickedIdConfig = {
    key: "clickedId",
    storage,
};

const persistclickedIdLessonConfig = {
    key: "clickedIdLesson",
    storage,
};
const persistwatchedLessonsConfig = {
    key: "watchedLessons",
    storage,
};

const persistTasks = {
    key: "TaskId",
    storage,
};

const persistCuurentTaskId = {
    key: "CuurentTaskId",
    storage,
};

const persistenrolledTracks = {
    key: "enrolledTracks",
    storage,
};

const persistcompletedTasks = {
    key: "completedTasks",
    storage,
};

const persistedaccessToken=persistReducer(persistAccessTokenConfig,AccessTokenSlice)
const persistedclickedId=persistReducer(persistclickedIdConfig,clickedIdSlice)
const persistedclickedIdLesson=persistReducer(persistclickedIdLessonConfig,clickedIdLessonSlice)
const persistedwatchedLessons=persistReducer(persistwatchedLessonsConfig,watchedLessonsSlice)
const persistedTasks=persistReducer(persistTasks,taskSlice)
const persistedCurrentTaskId=persistReducer(persistCuurentTaskId,currentTaskIdSlice)
const persistedenrolledTracks=persistReducer(persistenrolledTracks,enrolledTracksSlice)
const persistedcompletedTasks=persistReducer(persistcompletedTasks,completedTasksSlice)



export const store = configureStore({
    reducer: {
        watchedLessons: persistedwatchedLessons,
        enrolledTracks:persistedenrolledTracks,
        tasks:persistedTasks,
        completedTasks:persistedcompletedTasks,
        accessToken:persistedaccessToken,
        clickedId:persistedclickedId,
        clickedIdLesson:persistedclickedIdLesson,
        CurrentTaskId:persistedCurrentTaskId,
        [ProfileApiSlice.reducerPath]:ProfileApiSlice.reducer,
        [DeleteAcountApiSlice.reducerPath]:DeleteAcountApiSlice.reducer,
        [TaskApiSlice.reducerPath]:TaskApiSlice.reducer,
        [TracksApiSlice.reducerPath]:TracksApiSlice.reducer,
        [statgesApiSlice.reducerPath]:statgesApiSlice.reducer,
        [UserOperationApiSlice.reducerPath]:UserOperationApiSlice.reducer
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(ProfileApiSlice.middleware)
        .concat(DeleteAcountApiSlice.middleware)
        .concat(TaskApiSlice.middleware)
        .concat(TracksApiSlice.middleware)
        .concat(statgesApiSlice.middleware)
        .concat(UserOperationApiSlice.middleware)
        , 
})



    export const persister=persistStore(store)  
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
