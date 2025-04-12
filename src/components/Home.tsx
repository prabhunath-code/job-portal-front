import useGetAllJobs from "@/hooks/useGetAllJobs"
import CategoryCarousel from "./CategoryCarousel"
import Footer from "./Footer"
import HeroSection from "./HeroSection"
import LatestJob from "./LatestJob"
import Navbar from "./shared/Navbar"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


 const Home = () => {
  useGetAllJobs()
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate=useNavigate()
  useEffect(()=>{
    if(user?.role=='recruiter'){
      navigate("/admin/companies")
    }
  },[]);
  return (
    <div className="flex flex-col justify-center">
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJob/>
        <Footer/>
        
        </div>
  )
}
export  default Home;




