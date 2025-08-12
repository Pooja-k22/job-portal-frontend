import React, { useContext, useEffect, useState } from "react";
import { Star, Building2, MapPin, Briefcase, Search, IndianRupee, LocateIcon, LocationEdit, Calendar } from "lucide-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { searchKeyContext, tokenContext } from "../../contex/ContextShare";
import { getHomeJob } from "../../services/allApi";
import Footer from "../../components/Footer";

function HomePage() {
  // contex
  const { searchKey, setsearchKey } = useContext(searchKeyContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

//   get job
const getLatestJob = async()=>{
    const result = await getHomeJob()
    if(result.status == 200){
        setJobs(result.data)
    }
}
 

//   token state
   const {token, setToken} = useContext(tokenContext)
  const handleSearch = () => {
   

    if (searchKey == "") {
      alert("Please enter the job title or location");
    } else if (!token) {
      alert("Please login");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } else if (searchKey && token) {
      navigate("/findjob");
    } else {
      alert("Something went wrong");
    }
  };

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
    setToken(token)
    getLatestJob()
  },[])
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <Header />

      <section className="bg-gradient-to-t from-[#E3F2FD] via-[#BBDEFB] to-[#90CAF9] py-8 sm:py-25 relative overflow-hidden min-h-screen ">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 sm:px-12">
          {/* Left Content */}
          <div className="flex-1 space-y-10 mt-15 md:mt-0">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 ">
              Find the job that fits <br /> your life
            </h1>
            <p className="text-gray-600 max-w-lg">
              Discover thousands of opportunities from top companies around the
              world.
            </p>

            {/* Search Bar */}
            <div className="bg-white shadow-lg rounded-full p-4 flex gap-4  max-w-xl">
              <div className="flex items-center gap-2 flex-1 border-r border-gray-300 pr-4">
                <Briefcase className="text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Enter type of job"
                  className="outline-none w-full"
                  onChange={(e)=>setsearchKey(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-black text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800"
              >
                <Search size={20} /> Search
              </button>
            </div>
          </div>

          {/* Right Image + Stats */}
          <div className="flex-1 relative mt-12 md:mt-0 flex justify-center">
            <img
              src={"/ban3.png"}
              alt="Person"
              className="relative z-10 w-[350px] md:w-[450px]"
            />

            {/* Floating Cards */}
            <div className=" hidden md:block absolute -bottom-9 left-25  bg-white shadow-lg rounded-xl p-4 z-20">
              <p className="font-bold text-lg">10K+</p>
              <p className="text-gray-500 text-sm">People got hired</p>
            </div>

             <div className=" hidden md:block absolute -top-9 right-3 bg-white shadow-lg rounded-xl p-4 z-20">
              <p className="font-bold text-lg">50+</p>
              <p className="text-gray-500 text-sm">Jobs Available</p>
            </div>

            <div className=" hidden md:block absolute -top-19 left-0  bg-white shadow-lg rounded-xl p-4 z-20 ">
              {/* <span className="bg-blue-100 text-blue-600 p-2 rounded-full">
                📄
              </span> */}
              <p className="font-bold text-lg">200+</p>
              <p className="text-sm  text-gray-500">Total Applications</p>
            </div>
          </div>
        </div>
      </section>

     

      {/* Featured Jobs */}
      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Latest Jobs Opportunity
        </h2>
     <div className="md:flex items-center space-y-2 md:space-y-0 justify-center gap-10 ">
           {jobs?.length>0 ?
               jobs?.map((job) => (
                      <div
                        key={job.id}
                        className="bg-[#001c44] p-9 rounded-xl shadow-md border hover:shadow-2xl md:w-75  "
                        
                      >
                       
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">
                              {job.title}
                            </h3>
                            <p className="text-gray-500">
                              {job.company} • {job.location}
                            </p>
                            <div className="flex  items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Briefcase className="text-[#5d9efa]" size={14} />{" "}
                                {job.jobType}
                              </span>
                              <span className="flex items-center gap-1">
                                <IndianRupee className="text-[#5d9efa]" size={14} />{" "}
                                {job.salaryRange}
                              </span>
                            </div>
                            <div className="flex items-center text-sm mt-2 text-gray-500 gap-1">
                              <Calendar size={14} className="text-[#5d9efa]" />{" "}
                              {job.updatedAt.slice(0, 10)}
                            </div>
                          </div>
                        </div>
    
                        
                      </div>
                    )):
            <p>Loading...</p>}
     </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "Sign Up", desc: "Create your free account" },
            { step: "Search Jobs", desc: "Browse thousands of listings" },
            { step: "Apply", desc: "Submit applications easily" },
            { step: "Get Hired", desc: "Start your new career" },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg text-center">
              <h3 className="font-semibold">{item.step}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((t) => (
            <div key={t} className="bg-white p-6 rounded-lg shadow text-center">
              <Star className="text-yellow-500 mx-auto" />
              <p className="mt-3 italic">
                "I found my dream job in just 2 weeks!"
              </p>
              <p className="mt-2 font-semibold">Cera</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-6 text-center bg-indigo-600 text-white">
        <h2 className="text-2xl font-bold">Ready to take the next step?</h2>
        <p className="mt-2">
          Join thousands of professionals using our platform
        </p>
        <button className="mt-4 bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-200">
          Create Free Account
        </button>
      </section>

     <Footer/>
    </div>
  );
}

export default HomePage;
