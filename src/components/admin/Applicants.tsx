import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import axios, { AxiosError } from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import ApplicantsTable from "./ApplicantsTable";

// Define interfaces for nested data structures
interface Profile {
  resume?: string;
  resumeOriginalName?: string;
}

interface Applicant {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  profile: Profile;
  createdAt: string;
}

interface Application {
  _id: string;
  applicant: Applicant;
  // Add other properties if present in your API response
}

// Define the shape of the job object returned from the API
interface Job {
  applications: Application[];
}

// Define the application slice in Redux
interface ApplicationState {
  applicants: Job | null;
}

// Define the RootState for the Redux store
interface RootState {
  application: ApplicationState;
  // Add other slices if they exist
}

const Applicants: React.FC = () => {
  const params = useParams<{ id: string }>(); // Type params with id as string
  const dispatch = useDispatch();
  const { applicants } = useSelector((store: RootState) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get<{ job: Job }>(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Error fetching applicants:", axiosError);
      }
    };
    if (params.id) {
      fetchAllApplicants();
    }
  }, [params.id, dispatch]); // Add dependencies for safety

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.applications?.length || 0}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;