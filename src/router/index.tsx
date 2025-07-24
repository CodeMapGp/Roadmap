import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RoutLayout from "../Pages/Layout";
import HomePage from "../Pages";
import Tracks from "../Pages/TrackLayout/Tracks";
import AboutUs from "../Pages/AboutUs";
import ContectUs from "../Pages/ContectUs";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import ErrorHandler from "../errors/ErrorHandler";
import ProtectedRoute from "../auth/ProtectedRout";
import FAQFerMember from "../Pages/FAQFerMember";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsAndConditions from "../Pages/TermsAndConditions";
import CookiesPolicy from "../Pages/CookiesPolicy";
import InfoOfFrontend from "../Pages/TrackLayout/InfoOfFrontend";
import Profile from "@/Pages/Profile";
import Notification from "@/Pages/Notification";
import Tasks from "@/Pages/TasksPage";
import TrackLayout from "@/Pages/TrackLayout/TrackLayout";
import RoadmapLayout from "@/Pages/TrackLayout/roadmapLayout/RoadmapLayout";
import RoadMapOfFrontend from "@/Pages/TrackLayout/roadmapLayout/RoadMapOfFrontend";
import CoursePage from "@/Pages/TrackLayout/roadmapLayout/CoursePage";
import Setting from "@/Pages/Setting";
import RecoverPassword from "@/Pages/RecoverPassword";
import Test from "@/Pages/test";
import ChatbotLayout from "@/Pages/Chatbot/ChatbotLayout";
import Welcome from "@/Pages/Chatbot/Welcome";
import ServicesPage from "@/Pages/Chatbot/ServicesPage";
import TaskForm from "@/Pages/TaskForm";
import ResetPassword from "@/Pages/ResetPassword";
import PageNotFound from "@/components/PageNotFound/PageNotFound";


const storageKey = "loggedInUser";
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RoutLayout />} errorElement={<ErrorHandler />}>
        <Route index element={<HomePage />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="contactus" element={<ContectUs />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="notification" element={<Notification />} />
        <Route path="TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="CookiesPolicy" element={<CookiesPolicy />} />
        <Route path="FAQFerMember" element={<FAQFerMember />} />
        <Route path="PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="settings" element={<Setting />} />
        <Route path="recoverpassword" element={<RecoverPassword />} />
        <Route path="/test" element={<Test />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Tracks and Roadmaps nested here */}
        <Route path="Tracks" element={<TrackLayout />}>
          <Route index element={<Tracks />} />
          <Route path="InfoOfFrontend" element={
            
          <ProtectedRoute
              isAllowed={!!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
            <InfoOfFrontend />
            </ProtectedRoute>          
          } 
            />
          <Route
            path="InfoOfFrontend/roadMapoffrontend"
            element={<RoadmapLayout />}
          >
            <Route index element={
              <ProtectedRoute
              isAllowed={!!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
            <RoadMapOfFrontend />
            </ProtectedRoute>
              
              } />
            <Route path="coursefrontend" element={
                <ProtectedRoute
              isAllowed={!!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
                <CoursePage />         
              </ProtectedRoute>
              
              } 
              
              />
          </Route>
        </Route>

        {/* Auth routes inside main layout */}
        <Route
          path="SignUp"
          element={
            <ProtectedRoute
              isAllowed={!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute
              isAllowed={!userData?.accessToken}
              redirectPath="/"
              data={userData}
            >
              <LogIn />
            </ProtectedRoute>
          }
        />

        {/* Protected task route */}
        <Route
          path="tasks"
          element={
            <ProtectedRoute
              isAllowed={!!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
              <Tasks />
            </ProtectedRoute>
          }
        />

            <Route
          path="taskform"
          element={
            <ProtectedRoute
              isAllowed={!!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
              <TaskForm />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<p>error</p>} />
      </Route>
      {/*---------------- chatbot-------------- */}
      <Route path="chatbot" element={<ChatbotLayout />}>
        <Route index element={<Welcome />} />
        <Route path="services" element={
          <ProtectedRoute
              isAllowed={!!userData?.accessToken}
              redirectPath="/login"
              data={userData}
            >
            <ServicesPage />
            </ProtectedRoute>
          } />
      </Route>
      <Route path="" element={<PageNotFound/>} />
    </>
  )
);

export default router;
