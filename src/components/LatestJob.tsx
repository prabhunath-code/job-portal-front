// components/LatestJob.tsx
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { RootState } from "@/redux/store";

const LatestJob = () => {
  const { allJobs } = useSelector((store: RootState) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-5 gap-4">
        {allJobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJob;
