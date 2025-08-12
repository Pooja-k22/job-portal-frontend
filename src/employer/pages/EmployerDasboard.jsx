import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployerSidebar from "../components/EmployerSidebar";
import PostJob from "../components/PostJob";
import { getMyJobs, newJobAdd } from "../../contex/ContextShare";
import Footer from "../../components/Footer";

function EmployerDasboard() {
  const { jobStatus } = useContext(newJobAdd);

  const { jobs,getJob } = useContext(getMyJobs);

  const [stats, setStats] = useState({
    totalJobs: 6,
    activeJobs: 7,
    applications: 88,
  });




  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getJob();
  }, [jobStatus, jobs]);

  return (
    <>
      <div className="md:grid grid-cols-[1fr_4fr] min-h-screen">
        {/* Sidebar */}
        <EmployerSidebar />

        {/* Main Content */}
        <div className="p-8 bg-gray-50 flex flex-col gap-8">
          {/* Header with Post Job button */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Employer Dashboard
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-800 hover:bg-blue-600 text-white px-2 md:px-4 py-2 rounded"
            >
              + Post New Job
            </button>
            {/* model for add */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-[#1515157c] bg-opacity-50">
                <div className="bg-white p-6 rounded w-[500px] relative">
                  <PostJob onClose={() => setIsModalOpen(false)} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#0b012f] text-white rounded mb-5 font-semibold">
            Welcome to Employer Panel !!
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-blue-100 text-blue-800 p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Total Jobs</h3>
              <p className="text-2xl font-bold">{stats.totalJobs}</p>
            </div>
            <div className="bg-green-100 text-green-800 p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Active Jobs</h3>
              <p className="text-2xl font-bold">{stats.activeJobs}</p>
            </div>
            <div className="bg-purple-100 text-purple-800 p-6 rounded shadow">
              <h3 className="text-lg font-semibold">Applications</h3>
              <p className="text-2xl font-bold">{stats.applications}</p>
            </div>
          </div>

          {/* My Jobs Section */}
          <div className="md:bg-[#f4f4ff] md:p-10">
            <h2 className="text-xl font-bold text-gray-600 mb-4">My Jobs</h2>
            {jobs.length === 0 ? (
              <p className="text-gray-500">You haven't posted any jobs yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 rounded-lg shadow p-5 flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">
                        {job.title}
                      </h2>
                      <p className="text-md text-gray-500">{job.location}</p>

                      <p className="text-xs text-[#57a0ff] mt-1">
                        Posted on: {job.updatedAt.slice(0, 10)}
                      </p>
                      <p className="text-xs text-[#bfbf00] mt-1">
                        Expire on: {job.expirationDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default EmployerDasboard;
