// components/LatestJobCards.tsx
import { Badge } from "./ui/badge";

// Define the Job and Company interfaces
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

interface LatestJobCardsProps {
  job: Job;
}

const LatestJobCards: React.FC<LatestJobCardsProps> = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl border border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="outline">
          {job.position}
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="outline">
          {job.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="outline">
          {job.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;


