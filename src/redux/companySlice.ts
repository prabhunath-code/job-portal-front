import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single company
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

// Define the initial state type
interface CompanyState {
  singleCompany: Company | null;
  companies: Company[];
  searchCompanyByText: string;  // ✅ Change "" to string
}

// Initial state
const initialState: CompanyState = {
  singleCompany: null,
  companies: [],
  searchCompanyByText: "",  // ✅ Set a default empty string
};

// Create the slice
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSingleCompany: (state, action: PayloadAction<Company>) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action: PayloadAction<string>) => {  // ✅ Explicitly define type
      state.searchCompanyByText = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;
