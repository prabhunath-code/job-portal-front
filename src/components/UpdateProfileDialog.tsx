import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

// Define the interface for the user's profile data
interface Profile {
  bio?: string;
  skills?: string[];
  resume?: File | null; 
// Update to store the actual file
}

interface UserProfile {
  fullname?: string;
  email?: string;
  phoneNumber?: string; // Change to string for better handling
  profile?: Profile;
}

// Define props for the UpdateProfileDialog component
interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  open,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);

  // Extract user from the Redux store
  const { user } = useSelector((store: RootState) => store.auth);

  // Set input state with initial values from user profile
  const [input, setInput] = useState<UserProfile>({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber?.toString() || "", // Ensure this is a string
    profile: {
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills || [],
      resume: user?.profile?.resume || null, // Initial resume set to null
    },
  });

  const dispatch=useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("fullname", input.fullname || "");
    formData.append("email", input.email || "");
    formData.append("phoneNumber", input.phoneNumber || "");
    
    if (input.profile?.bio) formData.append("bio", input.profile.bio);
    if (input.profile?.skills) {
      formData.append("skills", input.profile.skills.join(", "));
    }
    if (input.profile?.resume) {
      
      formData.append("file", input.profile.resume);
    }
  
    // Log formData to check if it's correct
  
  
    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
  
      // Log the response to see if it's successful
      console.log("API Response:", res.data);
  
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message, {
          style: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid #e2e8f0",
          },
        });
        console.log("Updated user:", res.data.user);
        console.log("Updated user:", res.data.user?.profile?.resume);
        // Log updated user
         // Log updated user
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("An error occurred", {
        style: {
          backgroundColor: "white",
          color: "black",
          border: "1px solid #e2e8f0",
        },
      });
    } finally {
      setLoading(false);
      setOpen(false); // Close the dialog after form submission
    }
  };
  
 
  
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="bg-white rounded-2xl"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="sm:col-span-3 rounded-2xl"
                  value={input.fullname || ""}
                  onChange={(e) =>
                    setInput({ ...input, fullname: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-left">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  className="sm:col-span-3 rounded-2xl"
                  value={input.email || ""}
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-left">
                  Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  className="sm:col-span-3 rounded-2xl"
                  value={input.phoneNumber || ""}
                  onChange={(e) =>
                    setInput({ ...input, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-left">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  className="sm:col-span-3 rounded-2xl"
                  value={input.profile?.bio || ""}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      profile: { ...input.profile, bio: e.target.value },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-left">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  className="sm:col-span-3 rounded-2xl"
                  value={input.profile?.skills?.join(", ") || ""}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      profile: {
                        ...input.profile,
                        skills: e.target.value.split(", ").filter(Boolean), // Handle empty inputs
                      },
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-left">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      profile: {
                        ...input.profile,
                        resume: e.target.files?.[0] || null, // Store the actual file
                      },
                    })
                  }
                  className="sm:col-span-3 rounded-2xl"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-black text-white border rounded-xl"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 

export default UpdateProfileDialog;
