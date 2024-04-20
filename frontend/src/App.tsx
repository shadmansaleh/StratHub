import { useEffect, useContext } from "react";
import { useRoutes } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import { SnackbarProvider } from "notistack";
import { Role, ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContext } from "./contexts/AuthProvider";

// components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// General-pages
import LandingPage from "./pages/General/Landing";
import LoginPage from "./pages/General/Auth/Login";
import SignUpPage from "./pages/General/Auth/SignUp";
import ResetPasswordPage from "./pages/General/Auth/ResetPassword";
import HomePage from "./pages/General/Home";
import NotFound404 from "./pages/General/NotFound404";

// User-pages
import UserAppointmentsPage from "./pages/User/Appointments";
import UserConsultantPage from "./pages/User/Consultant";
// import UserDashboardPage from "./pages/User/Dashboard";
import UserFavoritesPage from "./pages/User/Favorites";
import UserHistoryPage from "./pages/User/History";
import UserMeetPage from "./pages/User/Meet";
import UserProfilePage from "./pages/User/Profile";
import UserSearchPage from "./pages/User/Search";
import UserSettingsPage from "./pages/User/Settings";

// Expert-pages
import ExpertDashboardPage from "./pages/Expert/Dashboard";
import ExpertClientsPage from "./pages/Expert/Clients";
import ExpertMeetPage from "./pages/Expert/Meet";
import ExpertProfilePage from "./pages/Expert/Profile/Profile";
import ExpertRecentPage from "./pages/Expert/Recent";
import ExpertSettingsPage from "./pages/Expert/Settings";

// Admin-pages
import AdminDashboardPage from "./pages/Admin/Dashboard";
import AdminExpertsPage from "./pages/Admin/Experts";
import AdminReportsPage from "./pages/Admin/Reports";
import AdminSettingsPage from "./pages/Admin/Settings";
import AdminUsersPage from "./pages/Admin/Users";
import AdminVerifyPage from "./pages/Admin/Verify";

function App() {
  // force set to light mode until we get toggle
  const [_, setDarkMode] = useDarkMode();
  const { auth } = useContext(AuthContext);
  const user_logged_in = auth?.token ? true : false;

  const AppRoutes = useRoutes([
    {
      path: "/",
      element: <ProtectedRoute role={Role.NOAUTH} />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignUpPage /> },
        { path: "forgot_password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute role={Role.USER}>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <UserProfilePage /> },
        // { path: "dashboard", element: <UserDashboardPage /> },
        { path: "profile", element: <UserProfilePage /> },
        { path: "search", element: <UserSearchPage /> },
        { path: "appointments", element: <UserAppointmentsPage /> },
        { path: "favorites", element: <UserFavoritesPage /> },
        { path: "history", element: <UserHistoryPage /> },
        { path: "settings", element: <UserSettingsPage /> },
        { path: "consultant/:id", element: <UserConsultantPage /> },
        { path: "meet/:id", element: <UserMeetPage /> },
      ],
    },
    {
      path: "/expert",
      element: (
        <ProtectedRoute role={Role.EXPERT}>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ExpertDashboardPage /> },
        { path: "dashboard", element: <ExpertDashboardPage /> },
        { path: "profile", element: <ExpertProfilePage /> },
        { path: "clients", element: <ExpertClientsPage /> },
        { path: "recent", element: <ExpertRecentPage /> },
        { path: "settings", element: <ExpertSettingsPage /> },
        { path: "meet/:id", element: <ExpertMeetPage /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role={Role.ADMIN}>
          <HomePage />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: "dashboard", element: <AdminDashboardPage /> },
        { path: "users", element: <AdminUsersPage /> },
        { path: "experts", element: <AdminExpertsPage /> },
        { path: "verify", element: <AdminVerifyPage /> },
        { path: "reports", element: <AdminReportsPage /> },
        { path: "settings", element: <AdminSettingsPage /> },
      ],
    },
    { path: "*", element: <NotFound404 /> },
  ]);

  return (
    <>
      <div className="bg-base-100">
        <SnackbarProvider autoHideDuration={2000}>
          {!user_logged_in && <NavBar />}
          {AppRoutes}
          {!user_logged_in && <Footer />}
        </SnackbarProvider>
      </div>
    </>
  );
}

export default App;
