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
import Tasks from "@/Pages/Tasks";
import TrackLayout from "@/Pages/TrackLayout/TrackLayout";
import RoadmapLayout from "@/Pages/TrackLayout/roadmapLayout/RoadmapLayout";
import SecondPageOfRoadMap from "@/Pages/TrackLayout/roadmapLayout/SecondPageOfRoadMap";
import CoursePage from "@/Pages/TrackLayout/roadmapLayout/CoursePage";
import Setting from "@/Pages/Setting";

import RecoverPassword from "@/Pages/RecoverPassword";

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

        {/* Tracks and Roadmaps nested here */}
        <Route path="Tracks" element={<TrackLayout />}>
          <Route index element={<Tracks />} />
          <Route path="InfoOfFrontend" element={<InfoOfFrontend />} />
          <Route
            path="InfoOfFrontend/SecondPageOfRoadMap"
            element={<RoadmapLayout />}
          >
            <Route index element={<SecondPageOfRoadMap />} />
            <Route path="coursefrontend" element={<CoursePage />} />
          </Route>
        </Route>

        {/* Auth routes inside main layout */}
        <Route
          path="SignUp"
          element={
            <ProtectedRoute
              isAllowed={!userData?.jwt}
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
              isAllowed={!userData?.jwt}
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
              isAllowed={!!userData?.jwt}
              redirectPath="/login"
              data={userData}
            >
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<p>error</p>} />
      </Route>
    </>
  )
);

export default router;
