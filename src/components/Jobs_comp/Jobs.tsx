import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { RootState } from "@/redux/store";

// const jobsArray = [1, 2,3,4,5,6,7,8];
 

const Jobs = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Sidebar for filters, responsive width */}
          <div className=" ">
            <FilterCard />
          </div>

          {/* Job listings */}
          {allJobs.length < 1 ? (
            <span>Job not Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
