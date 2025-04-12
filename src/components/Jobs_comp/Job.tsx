import { Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

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
  company: Company | null; // Allow null to reflect possible data
  created_By: string;
  application: string[];
  createdAt: string;
  updatedAt: string;
}

interface JobProps {
  job: Job;
}

const Job: React.FC<JobProps> = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime: string) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date(); // Fixed typo: "currrentTime" -> "currentTime"
    const timeDifference = currentTime.getTime() - createdAt.getTime();
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:scale-105 transition-all">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6 rounded-2xl border border-gray-200" size="icon">
          <Avatar>
            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">
            {job.company?.name || "Unknown Company"}
          </h1>
          <p className="text-gray-400 text-sm">{job.location || "N/A"}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title || "Untitled Job"}</h1>
        <p className="text-sm text-gray-600">{job.description || "No description available"}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="outline">
          {job.position || "N/A"}
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="outline">
          {job.jobType || "N/A"}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="outline">
          {job.salary ? `${job.salary} LPA` : "N/A"}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          className="border border-gray-300 rounded-xl"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] rounded-xl text-white">
          Save for later
        </Button>
      </div>
    </div>
  );
};

export default Job;