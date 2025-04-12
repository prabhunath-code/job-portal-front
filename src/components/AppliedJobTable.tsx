import { Badge } from "./ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const AppliedJobTable = () => {
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Wrapping the table in a scrollable container */}
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableCaption>A list of applied Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4].map(( index) => (
              <TableRow key={index}>
                <TableCell>17-09-2024</TableCell>
                <TableCell>Frontend Developer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-right">
                  <Badge>Selected</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;



// will end later
