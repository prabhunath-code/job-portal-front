import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

interface UserProfile {
    fullname?: string;
    email?: string;
    phoneNumber?: number;
    profile?:profile;
    _id?:string;
    role?:string;
  }
  interface profile{
    bio?: string;
    skills?: string[];
    resume?: File;
    resumeOriginalName?: string;
    profilePhoto:string;
  }
  


interface AuthState {
    loading: boolean;
    user: UserProfile | null;
}

const initialState: AuthState = {
    loading: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAuthUser: (state, action: PayloadAction<UserProfile | null>) => {
            state.user = action.payload;
        },
    }
});

export const { setLoading, setAuthUser } = authSlice.actions;

export default authSlice.reducer;


