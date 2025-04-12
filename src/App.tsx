import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import  Home  from "./components/Home";
import Jobs from "./components/Jobs_comp/Jobs";
import  Browse  from "./components/Browse_component/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/Jobs_comp/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreates from "./components/admin/CompanyCreates";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path:"/jobs",
      element:<Jobs/>
    },
    {
      path:"/browse",
      element:<Browse/>
    },
    {
      path:"/profile",
      element:<Profile/>
    },
    {
      path:"/description/:id",
      element:<JobDescription />
    },
    
    {
      path:"/admin/companies",
      element: <ProtectedRoute><Companies/></ProtectedRoute>
    },
    {
      path:"/admin/companies/create",
      element: <ProtectedRoute><CompanyCreates/></ProtectedRoute> 
    },
    {
      path:"/admin/companies/:id",
      element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs",
      element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs/create",
      element:<ProtectedRoute><PostJob/></ProtectedRoute> 
    },
    {
      path:"/admin/jobs/:id/applicants",
      element:<ProtectedRoute><Applicants/></ProtectedRoute> 
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
