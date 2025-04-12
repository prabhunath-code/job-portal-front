import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="text-center px-4 md:px-0">
      <div className="flex flex-col gap-5 my-10">
        {/* Badge */}
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
          No 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          Search, Apply & <br className="hidden md:block" />
          Get your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base max-w-lg mx-auto">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique
          nesciunt, nostrum veniam ex ratione eius perferendis sed. Perspiciatis,
          delectus alias?
        </p>

        {/* Search Input */}
        <div className="flex w-full md:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full mx-auto gap-4">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full py-2 text-sm md:text-base"
          />
          <Button className="rounded-r-full bg-[#6A38C2] text-white px-4 md:px-6">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
