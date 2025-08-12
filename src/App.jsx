import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/pages/AdminDashboard";
import "./App.css";
import ManageJob from "./admin/pages/ManageJob";
import EmployerDasboard from "./employer/pages/EmployerDasboard";
import MyJobs from "./employer/pages/MyJobs";
import ApplicantsList from "./employer/pages/ApplicantsList";
import HomePage from "./jobSeekers/pages/HomePage";
import FindJob from "./jobSeekers/pages/FindJob";
import Register from "./pages/Register";
import JobDetail from "./jobSeekers/pages/JobDetail";
import UserProfile from "./jobSeekers/pages/UserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/findjob" element={<FindJob />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/employerDasboard" element={<EmployerDasboard />} />
        <Route path="/myjob" element={<MyJobs />} />
        <Route path="/job-detail/:id" element={<JobDetail />} />

        <Route path="/applicants" element={<ApplicantsList />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/managejob" element={<ManageJob />} />
      </Routes>
    </>
  );
}

export default App;
