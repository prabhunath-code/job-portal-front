
//  Need to fix this compnent in future 


// solution given in video is -https://youtu.be/F5EYXc91Cpo?t=31977

// he told to use .populatefuntion whith path applications












import { setSingleJob } from "@/redux/jobSlice";
import { RootState } from "@/redux/store";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Company {
  _id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}


interface Job {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: string;
  company: Company;
  created_By: string;
  application: string[];
  createdAt: string;
  updatedAt: string;
}

interface JobProps {
  job?: Job;
}

const JobDescription: React.FC<JobProps> = () => {
 
  const { singleJob } = useSelector((store: RootState) => store.job);
 
  const { user } = useSelector((store: RootState) => store.auth);

  const isInitiallyApplied =  false;
  console.log(singleJob)
  const [isApplied, setIsApplied] = useState<boolean>(isInitiallyApplied);

  const params = useParams<{ id: string }>();
  const jobId = params.id!;
  const dispatch = useDispatch();
 
  

//  Need to fix this compnent in future 

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true); // Update the local state
       
        // helps us to real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  
  
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-bold text-lg sm:text-xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold" variant="outline">
                {singleJob?.position}
              </Badge>
              <Badge className="text-[#f83002] font-bold" variant="outline">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="outline">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? () => {} : applyJobHandler}
            className={`rounded-2xl self-start sm:self-auto ${
              isApplied
                ? "bg-gray-600 text-white cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad] text-white"
            }`}
            disabled={isApplied}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-4 sm:mt-6">
          {singleJob?.description}
        </h1>

        <div className="space-y-3 text-sm sm:text-base md:text-lg">
          <h1 className="font-bold">
            Role:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold">
            Location:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold">
            Experience:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>
          <h1 className="font-bold">
            Salary:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.application.length}
            </span>
          </h1>
          <h1 className="font-bold">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">
              {new Date(singleJob?.createdAt || "").toLocaleDateString()}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default JobDescription;








