import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
  import { MoreHorizontal } from "lucide-react";
  import { useSelector } from "react-redux";
  import { toast } from "sonner";
  import { APPLICATION_API_END_POINT } from "@/utils/constant";
  import axios, { AxiosError } from "axios";
  
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
  
  // Define the shape of the application slice in Redux
  interface ApplicationState {
    applicants: {
      applications: Application[];
    } | null;
  }
  
  // Define the RootState for the Redux store
  interface RootState {
    application: ApplicationState;
    // Add other slices if they exist
  }
  
  // Define possible shortlisting statuses
  const shortlistingStatus: ["Accepted", "Rejected"] = ["Accepted", "Rejected"];
  
  const ApplicantsTable: React.FC = () => {
    const { applicants } = useSelector((store: RootState) => store.application);
  
    const statusHandler = async (status: "Accepted" | "Rejected", id: string) => {
      console.log("called");
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post<{ success: boolean; message: string }>(
          `${APPLICATION_API_END_POINT}/status/${id}/update`,
          { status }
        );
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(
          axiosError.response?.data?.message || "An error occurred while updating status"
        );
      }
    };
  
    return (
      <div>
        <Table>
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants && applicants.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>
                    {item.applicant?.profile?.resume ? (
                      <a
                        className="text-blue-600 cursor-pointer"
                        href={item.applicant.profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.applicant.profile.resumeOriginalName || "Resume"}
                      </a>
                    ) : (
                      <span>NA</span>
                    )}
                  </TableCell>
                  <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="float-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item._id)}
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No applicants found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default ApplicantsTable;