import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust path to your Redux store
import Job from "../Jobs_comp/Job";
import Navbar from "../shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs"; // Adjust path to your hook

const Browse = () => {
  useGetAllJobs(); // Fetch jobs when component mounts
  const { allJobs } = useSelector((store: RootState) => store.job); // Access allJobs from Redux

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="mx-2 font-bold text-xl my-10">
          Search Results ({allJobs?.length || 0})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
          {!Array.isArray(allJobs) || allJobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            allJobs.map((job, index) => (
              <Job key={job._id || index} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;