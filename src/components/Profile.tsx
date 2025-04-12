import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";








const Profile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSelector((store: RootState) => store.auth)  // Type the user state

  // Check if the user has a resume
  const hasResume = Boolean(user?.profile?.resume);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 p-4 sm:p-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Avatar and Info Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="font-medium my-2 text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            className="text-center rounded-2xl mx-auto w-1/5 border border-gray-400 text-gray-400 hover:text-black"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
            <span>Edit</span>
          </Button>
        </div>

        {/* Contact Info Section */}
        <div className="my-5">
          <div className="flex flex-col sm:flex-row items-start gap-3 my-2">
            <Mail className="text-gray-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <Contact className="text-gray-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h1 className="font-medium mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.map((skill, index) => (
              <Badge key={index} className="px-3 py-1.5 text-sm bg-black text-white">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-xm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {hasResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={typeof user?.profile?.resume === "string" ? user.profile.resume : "#"}
              className="text-blue-500 w-full cursor-pointer hover:underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>No resume available</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
