import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { Loader2 } from "lucide-react";

interface Login {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  
  const [input, setInput] = useState<Login>({
    email: "",
    password: "",
    role: "",
  });

  const { loading } = useSelector((store: RootState) => store.auth);

  console.log({ loading }, "loading");

  const dispatch = useDispatch();
 
  const navigate = useNavigate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(setLoading(true));
  
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(res.data,"data")
      if (res.data.success) {
        
        dispatch(setAuthUser(res.data.user))
        navigate("/");
        toast.success(res.data.message,{
          style: {
            backgroundColor: "white",
            color: "black",
            border: "1px solid #e2e8f0",
          },

        });
      }
    } catch (error) {
      console.log(error,"catch line 68 login.tsx")
      toast.error("An error occurred", {
        style: {
          backgroundColor: "white",
          color: "black",
          border: "1px solid #e2e8f0",
        },
      });
      
      } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex  items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className=" font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label className="">Email</Label>
            <Input
              type="email"
              placeholder=""
              name="email"
              onChange={onChangeHandler}
              value={input.email}
            />
          </div>

          <div className="my-2">
            <Label className="">Password</Label>
            <Input
              type="password"
              placeholder=""
              name="password"
              onChange={onChangeHandler}
              value={input.password}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex justify-center items-center gap-4 my-5 ">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role == "student"}
                  onChange={onChangeHandler}
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
                  onChange={onChangeHandler}
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
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
              Login
            </Button>
          )}

          <span className="text-sm">
            don't have a account ?{" "}
            <Link to="/signup" className="text-blue-600">
              signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
