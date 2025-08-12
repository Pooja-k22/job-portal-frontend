import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Search, Briefcase, Calendar, Filter, IndianRupee } from "lucide-react";
import { getJobApi } from "../../services/allApi";
import { searchKeyContext, tokenContext } from "../../contex/ContextShare";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

function FindJob() {
  // contex
  const { searchKey, setsearchKey } = useContext(searchKeyContext);
  const jobType = ["Full-time", "Part-time", "Remote","Hybrid","Contract", "Internship"];
  const [selectedType, setSelectedType] = useState(null);
   const {token, setToken} = useContext(tokenContext)

  const salaryRanges = [
    "< ₹3Lpa",
    "₹3Lpa - ₹6Lpa",
    "₹6Lpa - ₹12Lpa",
    "₹12Lpa +",
  ];

  const [selectedSalary, setSelectedSalary] = useState(null);
  const [jobList, setjobList] = useState([]);
  const [jobListTemp, setjobListTemp] = useState([]);

  //    filter

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    if (type) {
      setjobList(jobListTemp.filter((job) => job.jobType?.toLowerCase() === type.toLowerCase()));
    } else {
      setjobList(jobListTemp);
    }
  };

  const handleSalaryFilter = (range) => {
    setSelectedSalary(range);
    if (range) {
      setjobList(jobListTemp.filter((job) => job.salaryRange === range));
    } else {
      setjobList(jobListTemp);
    }
  };

  //   get all job api
  const getAllJob = async () => {
    const result = await getJobApi(searchKey);
    console.log(result);
    if (result.status == 200) {
      setjobList(result.data);
      setjobListTemp(result.data);
    }
  };

  useEffect(() => {
    getAllJob();
  }, [searchKey]);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <>
      <Header />

      {/* Hero Search */}
      <div className="flex flex-col justify-center items-center py-9 md:py-12 px-5 md:px-0">
        <div className="font-bold text-4xl">
          Let's Find You A<span className="text-blue-800"> New Job</span>
        </div>

        {/* Search Bar */}
        <div className="bg-white shadow-lg rounded-full p-2 flex gap-4 mt-8 max-w-xl border border-gray-200 w-full ">
          <input
            type="text"
            onChange={(e) => setsearchKey(e.target.value)}
            placeholder="Search by title | location"
            className="outline-none px-4 border-r border-gray-400 w-full"
            value={searchKey}
          />
          <button className="bg-black text-white p-3 rounded-full flex items-center gap-2 hover:bg-gray-800">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Filters + Listings */}
      <div className="md:grid grid-cols-[1fr_3fr] min-h-screen mt-5 bg-gray-50">
        {/* Sidebar Filters */}
        <div className=" bg-white p-5 shadow-2xl  ">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Filter size={18} /> Filters
          </h2>

          <div
            onClick={() => {
              setSelectedType(null);
              setSelectedSalary(null);
              setjobList(jobListTemp);
            }}
            className="p-2 w-auto border font-semibold rounded-md cursor-pointer transition bg-black text-white hover:bg-gray-800 mb-2"
          >
            All
          </div>

          {/* Job Type */}
          <div className="mb-4">
            <label className="text-sm font-medium">Job Type</label>
            <div className="flex flex-wrap gap-4 mt-4">
              {jobType.map((d) => (
                <div
                  key={d}
                  onClick={() => handleTypeFilter(d)}
                  className={`p-2 border font-semibold rounded-md cursor-pointer transition ${
                    selectedType === d
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          {/* <div className="mb-4">
            <label className="text-sm font-medium">Salary Range</label>
            <div className="flex flex-wrap gap-4 mt-4">
              {salaryRanges.map((range) => (
                <div
                  key={range}
                  onClick={() => handleSalaryFilter(range)}
                  className={`p-2 border font-semibold rounded-md cursor-pointer transition ${
                    selectedSalary === range
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {range}
                </div>
              ))}
            </div>
          </div> */}
        </div>

        {/* Job Listings */}
        {token ? (
          <section className=" py-6 px-6 md:px-16">
            <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
            <div className="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
              {jobList?.length > 0 ? (
                jobList?.map((job) => (
                  <div
                    key={job.id}
                    className="bg-[#020105] p-5 rounded-xl shadow-md border hover:shadow-lg transition duration-300"
                    hidden={job.status == "inactive"}
                  >
                    {/* Top section */}
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

                    {/* Bottom section */}
                    <div className="flex justify-end items-center mt-5">
                      <Link
                        to={`/job-detail/${job?._id}`}
                        className="bg-[#00005d] text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loding...</p>
              )}
            </div>
          </section>
        ) : (
          <h2 className="py-6 px-6 md:px-16 font-bold text-xl text-gray-500">
            Please Login
          </h2>
        )}
      </div>
       <Footer/>
    </>
  );
}

export default FindJob;
