import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";

import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

interface SignUpInput {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  file: File | null;
}

const SignUp = () => {
  const [input, setInput] = useState<SignUpInput>({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const dispatch=useDispatch();
  const {loading}=useSelector((store:RootState)=>store.auth)

  const navigate = useNavigate();

  const onChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInput({ ...input, file: e.target.files[0] });
    }
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true))

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message,{
          style: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid #e2e8f0",
          },

        });
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error has occurred");
      } else {
        toast.error("An unexpected error occurred",{
          style: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid #e2e8f0",
          },
        });
      }
      console.log(error,"signup line 85");
    }
    finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex  items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className=" font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="">Full Name</Label>
            <Input
              type="text"
              placeholder=""
              value={input.fullname}
              name="fullname"
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="">Email</Label>
            <Input
              type="email"
              placeholder=""
              value={input.email}
              name="email"
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label className="">Password</Label>
            <Input
              type="password"
              placeholder=""
              value={input.password}
              name="password"
              onChange={onChangeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex justify-center items-center gap-4 my-5 ">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={onChangeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role == "recruiter"}
                  onChange={onChangeEventHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2 ml-2  ">
            <Label className="">Profile</Label>
            <Input
              accept="image/"
              type="file"
              className="cursor-pointer sm:"
              onChange={fileHandler}
            />
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait{" "}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-black text-white border rounded-xl"
            >
              SignUp
            </Button>
          )}
          <span className="text-sm">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
