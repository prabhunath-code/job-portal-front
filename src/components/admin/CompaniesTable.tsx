import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";

interface Company {
  _id: string;
  name: string;
  description: string;
  website?: string;
  location?: string;
  logo?: string;
  userId: string;
  file?: File;
  createdAt: string;
}

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store: RootState) => store.company
  );
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useGetAllCompanies();

  useEffect(() => {
    console.log("Companies from Redux:", companies);
    console.log("SearchCompanyByText:", searchCompanyByText);

    const companiesList: Company[] = companies || [];
    const filtered: Company[] = searchCompanyByText?.trim()
      ? companiesList.filter((company: Company) =>
          company.name
            ?.toLowerCase()
            .includes(searchCompanyByText.toLowerCase())
        )
      : companiesList;

    setFilteredCompanies(filtered);
  }, [companies, searchCompanyByText]);

  if (companies === undefined) {
    return <div>Loading companies...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full table-auto">
        <TableCaption>List of recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {companies.length === 0
                  ? "No Companies registered"
                  : "No matching companies found"}
              </TableCell>
            </TableRow>
          ) : (
            filteredCompanies.map((company, index) => (
              <TableRow key={company._id || index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name || "Unnamed Company"}</TableCell>
                <TableCell>
                  {new Date(company.createdAt).toLocaleDateString() || "N/A"}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;