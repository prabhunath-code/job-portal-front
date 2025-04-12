import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreates = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState<string>();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
        const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        });
        if(res?.data?.success){
            dispatch(setSingleCompany(res.data.company));
            toast.success(res.data.message);
            const companyId = res?.data?.company?._id;
            navigate(`/admin/companies/${companyId}`);
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-10">
          <h1 className="font-bold text-2xl sm:text-3xl">Your Company Name</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            What would you like to name your company? You can change this later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Google, etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row items-center gap-2 my-10">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="w-full sm:w-auto bg-gray-400 text-white opacity-75"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="w-full sm:w-auto bg-black text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreates;
