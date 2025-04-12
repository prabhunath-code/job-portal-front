import { ArrowLeft } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, ChangeEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetCompanyById from "@/hooks/useGetCompanyById";

interface InputState {
  name: string;
  description: string;
  website: string;
  location: string;
  file: File | null;
}

const toastStyles = {
  backgroundColor: "white",
  color: "black",
  border: "1px solid #e2e8f0",
};

const CompanySetup: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const companyId = params.id;
  useGetCompanyById(companyId);

  const [input, setInput] = useState<InputState>({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();
  const { singleCompany } = useSelector((store: RootState) => store.company);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInput({ ...input, file: e.target.files[0] });
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) {
      toast.error("Company ID is missing", { style: toastStyles });
      return;
    }
    if (loading) {
      console.log("Request already in progress");
      return;
    }

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    setLoading(true);
    console.time("Update Request");
    console.log("Sending FormData:", Object.fromEntries(formData));

    try {
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          timeout: 10000,
        }
      );
      console.timeEnd("Update Request");
      console.log("Response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message, { style: toastStyles });
        navigate("/admin/companies");
      }
    } catch (error) {
      console.timeEnd("Update Request");
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error("Update Error:", axiosError);
      toast.error(
        axiosError.response?.data?.message || "An error occurred during update",
        { style: toastStyles }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      console.log("Single Company Loaded:", singleCompany);
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
      setIsDataLoaded(true);
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto my-10 px-4">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex items-center gap-5 p-4 border-b">
            <Button
              onClick={() => navigate("/admin/companies")}
              className="flex items-center gap-2 text-gray-500 font-semibold border rounded-xl px-3 py-1"
              disabled={loading}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="Enter your company name"
                disabled={loading || !isDataLoaded}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                value={input.description}
                onChange={handleChange}
                placeholder="Describe your company"
                className="border rounded-md p-2 w-full"
                disabled={loading || !isDataLoaded}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                type="url"
                id="website"
                name="website"
                value={input.website}
                onChange={handleChange}
                placeholder="https://example.com"
                disabled={loading || !isDataLoaded}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={input.location}
                onChange={handleChange}
                placeholder="Enter your location"
                disabled={loading || !isDataLoaded}
              />
            </div>
            <div>
              <Label htmlFor="file">Logo</Label>
              <div className="flex items-center justify-center">
                <Input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 file:mx-auto"
                  disabled={loading || !isDataLoaded}
                />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            disabled={loading || !isDataLoaded}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;