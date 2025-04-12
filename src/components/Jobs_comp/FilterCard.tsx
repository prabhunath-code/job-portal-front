import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const filterData = [
  {
    filterType: "location",
    array: ["Delhi Ncr", "Banglore", "hyderabad", "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  return (
    <div className=" bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data) => (
          <div className="">
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item) => {
              return (
                <div className="flex items-center space-x-2 my-2 ">
                  <RadioGroupItem value={item} />
                  <label>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
