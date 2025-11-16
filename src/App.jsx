import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Assignment from "./Component/Dashboard/UserSidebar/Assignment/Assignment";
import AssignmentReport from "./Component/Dashboard/UserSidebar/Assignment/AssignmentReport";
import BlockedUser from "./Component/Dashboard/Blocked User/BlockedUser";
//import Cancel from "./Component/Dashboard/Cancel/Cancel";
import Dashboard from "./Component/Dashboard/Dashboard";
import DashboardOverview from "./Component/Dashboard/DashboardOverview/DashboardOverview";
import EmployeeForm from "./Component/Dashboard/Employees/EmployeeForm";
import EmployeeProfileEdit from "./Component/Dashboard/Employees/EmployessProfileEdit";
import Employees from "./Component/Dashboard/Employees/Employees";
import ForgetPassword from "./Component/Login/ForgetPasssword";
import Login from "./Component/Login/Login";
import LoginAdmin from "./Component/Login/LoginAdmin";
import NewAssignment from "./Component/Dashboard/UserSidebar/Assignment/Newassignment";
import Pending from "./Component/Dashboard/Pending/Pending";

import Plan from "./Component/Dashboard/Plan/Plan";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import Recovery from "./Component/Dashboard/Recovery/Recovery";
import RecoveryProfile from "./Component/Dashboard/Recovery/RecoveryProfile";
import Registration from "./Component/Dashboard/Registration/Registration";
import RegistrationForm from "./Component/Dashboard/Registration/RegistrationForm";
import Report from "./Component/Dashboard/Report/Report";
import ReportForm from "./Component/Dashboard/Report/ReportForm";
import RootLayout from "./Component/Layout/RootLayout";
import SignUp from "./Component/Login/SignUP";
import User from "./Component/Dashboard/User/User";
import UserDashBoard from "./Component/Dashboard/UserSidebar/UserDashBoard";
import UserLogin from "./Component/Login/UserLogin";
import UserOutlet from "./Component/Dashboard/User/UserOutlet";
import UserSidebar from "./Component/Dashboard/UserSidebar/UserSidebar";
import EditRegistration from "./Component/Dashboard/Registration/EditRegistration";
import RegisterUserDetail from "./Component/Dashboard/Registration/RegisterUserdetails";
import StampPaper from "./Component/StampPaper/StampPaper";
import UserAgreement from "./Component/Dashboard/UserAgreement/UserAgreement";
import StampPaperView from "./Component/StampPaper/StampPaperView123";
import QcCheck from "./Component/Login/QcCheck";
import PendingDetails from "./Component/Dashboard/Pending/PendingDetails";
import { StayPrimaryLandscape } from "@mui/icons-material";
import SetPassword from "./Component/Login/SetPassword";
// import RecoveryProfile from "./Component/Dashboard/Recovery/RecoveryProfile";
import ActiveUser from "./Component/ActiveUser/ActiveUser";
import FrezzUser from "./Component/FrezzUser/FrezzUser";
import FrezzUserForm from "./Component/FrezzUser/FrezzUserForm";
import { useEffect } from "react";
import UserRegisterView from "./Component/Dashboard/Registration/UserRegisterView";
import SystemUserView from "./Component/Dashboard/SystemUser/SystemUserView";
import TotalUserView from "./Component/Dashboard/User/TotalUserView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/employmentform" element={<StampPaper />} />
      <Route
        path="employmentformdetails/:id"
        element={<StampPaperView />}
      />
      <Route path="qccheck" element={<QcCheck />} />
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />       <Route path="/admin" element={<LoginAdmin />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="/ForgetPassword" element={<ForgetPassword />} />
      <Route path="/setPassword" element={<SetPassword />} />
      <Route path="/" element={<RootLayout />}>
        {/* {/ ADMIN PART /} */}
        <Route
          path="dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}  //OUTLET
        >
          <Route index element={<DashboardOverview />} />
          <Route path="user_registration_view" element={<UserRegisterView />} />
          <Route path="total_user__view" element={<TotalUserView />}/>

        </Route>

        <Route
          path="user"
          element={<ProtectedRoute element={<UserOutlet />} />}

        >
          <Route index element={<User />} />
          <Route path="activeUser" element={<ActiveUser />} />
          <Route path="frezzuser" element={<FrezzUser />} />
          <Route path="registration" element={<Registration />} />
          <Route path="registrationform" element={<RegistrationForm />} />
          <Route
            path="editregistration/:userId"
            element={<EditRegistration />}
          />

          <Route
            path="freezeuserform/:userId"
            element={< FrezzUserForm />}
          />
          <Route
            path="registeruserdetail/:userId"
            element={<RegisterUserDetail />}
          />
          <Route path="pending" element={<Pending />} />

          <Route path="pendingformDetails/:userId" element={< PendingDetails />} />
          <Route path="plan" element={<Plan />} />
          <Route path="userAgreement" element={<UserAgreement />} />
        </Route>
        <Route path="blockeduser" element={<BlockedUser />} />
        <Route path="report" element={<Report />} />
        <Route path="reportform/:userId" element={<ReportForm />} />
        <Route path="recovery" element={<Recovery />} />
        <Route path="recoveryprofile/:userId" element={<RecoveryProfile />} />
        <Route path="system_user" element={<SystemUserView />} />
        <Route path="employees" element={<Employees />} />
        <Route
          path="employeeprofileedit/:userId"
          element={<EmployeeProfileEdit />}
        />
        <Route path="employeeform" element={<EmployeeForm />} />
        <Route index element={<UserDashBoard />} />
        <Route path="assignment" element={<Assignment />} />
        <Route path="newassignment" element={<NewAssignment />} />
        <Route path="assignmentreport" element={<AssignmentReport />} />

        {/* <Route
        path="usersidebar"
        element={<ProtectedRoute element={<Dashboard />} />}
      > */}
        {/* {/ Add routes specific to the user dashboard /} */}
      </Route>

      {/* {/ <Route path="" element={<UserSidebar />} /> /} */}
    </Route>
  )
);

function App() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Are you sure you want to leave?";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;