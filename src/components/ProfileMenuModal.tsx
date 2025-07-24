import { resetIdLessonSlice } from "@/app/features/clickedIdLessonSlice";
import { resetclickedId } from "@/app/features/clickedIdSlice";
import { resetCurrentTaskId } from "@/app/features/CurrentTaskIdSlice";
import { resetwatchedLessons } from "@/app/features/WatchedLesson";
import { axiosInstance } from "@/config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, Settings, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";

type IProfileMenuModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void; // Optional logout handler from parent
};

interface IUser {
  profile_image: string;
}

const ProfileMenuModal = ({ isOpen, onClose, onLogout }: IProfileMenuModalProps) => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const IdUser = userData?.id;
  const dispatch = useDispatch();
  const isLoggingOut = useRef(false);

  const getUserById = async (): Promise<IUser> => {
    if (!IdUser) throw new Error("No User ID Provided");
    const { data } = await axiosInstance.get(`users/${IdUser}`);
    return data;
  };

  // fetch image from database
  const { data } = useQuery({
    queryKey: ["oneUser", IdUser],
    queryFn: getUserById,
    enabled: !!IdUser && !isLoggingOut.current && !!userData,
    retry: false,
  });

  const handleLogout = async () => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;

    try {
      // Reset Redux state first
      dispatch(resetwatchedLessons());
      dispatch(resetCurrentTaskId());
      dispatch(resetclickedId());
      dispatch(resetIdLessonSlice());

      // Close modal immediately
      onClose();

      // Use parent logout handler if provided, otherwise handle internally
      if (onLogout) {
        onLogout();
      } else {
        // Fallback logout logic
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("accessToken");
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('userLoggedOut'));
        
        // Try logout API call
        axiosInstance.post("/auth/logout").catch(err => {
          console.warn("Logout API call failed:", err);
        });

        setTimeout(() => {
          window.location.replace("/login");
        }, 100);
      }
    } catch (err) {
      console.error("Logout failed", err);
      // Ensure cleanup
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("accessToken");
      onClose();
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
      setTimeout(() => {
        window.location.replace("/login");
      }, 100);
    } finally {
      isLoggingOut.current = false;
    }
  };

  if (!isOpen) return null;

  // Check if user data is still valid
  if (!userData || !IdUser) {
    return null;
  }

  return (
    <div className="relative inline-block text-left">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Enhanced Modal Dropdown */}
      <div className="absolute right-[-50px] mt-3 w-72 z-50 animate-in slide-in-from-top-2 duration-200">
        <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-gray-200/50 border border-gray-100 overflow-hidden backdrop-blur-xl">
          {/* Header Section */}
          <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {data && data.profile_image ? (
                  <img
                    src={`https://codemap-wgjw.onrender.com/${data.profile_image.replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover ring-3 ring-white shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <CircleUserRound className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {userData?.name || userData?.email || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {userData?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/Profile"
              onClick={onClose}
              className="group flex items-center px-6 py-3.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ease-in-out"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mr-4 transition-colors duration-200">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">My Profile</p>
                <p className="text-xs text-gray-500">
                  View and edit your profile
                </p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            <Link
              to="/settings"
              onClick={onClose}
              className="group flex items-center px-6 py-3.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ease-in-out"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center mr-4 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Settings</p>
                <p className="text-xs text-gray-500">Preferences and account</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-gray-100"></div>

            <button
              className="group w-full flex items-center px-6 py-3.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 ease-in-out"
              onClick={handleLogout}
              disabled={isLoggingOut.current}
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center mr-4 transition-colors duration-200">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium">
                  {isLoggingOut.current ? "Signing out..." : "Sign Out"}
                </p>
                <p className="text-xs text-red-400">Sign out of your account</p>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <p className="text-xs text-gray-400 font-medium tracking-wide">
                © CODEMAP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenuModal;