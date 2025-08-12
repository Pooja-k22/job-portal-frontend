import React, { useContext, useEffect, useState } from "react";
import EmployerSidebar from "../components/EmployerSidebar";
import {
  deleteJobApi,
  
} from "../../services/allApi";
import { getMyJobs } from "../../contex/ContextShare";
import EditJob from "../components/EditJob";
import Footer from "../../components/Footer";


function MyJobs() {
  const { jobs, setJobs,getJob } = useContext(getMyJobs);

  const [deleteStatus, setDeleteStatus] = useState({});
  const [id, setId] = useState("");

 

  //   delete job
  const handleDelete = async (id) => {
    const result = await deleteJobApi(id);
    if (result.status == 200) {
      alert("Delete job successfully");
      setDeleteStatus(result.data);
    }
  };

  useEffect(() => {
   
    getJob();
  }, [deleteStatus]);

  return (
    <>
      <div className="md:grid grid-cols-[1fr_4fr] min-h-screen">
        <EmployerSidebar />

        {/* My Jobs Section */}
        <div className="bg-[#f4f4ff] p-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">My Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job?.id}
                  className="bg-white border border-gray-200 rounded-lg shadow p-5 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {job.title}
                    </h2>
                    <p className="text-sm text-gray-500">{job?.location}</p>
                    <p className="text-sm my-3 text-gray-800">
                      {job?.description}
                    </p>
                    <p className="mt-2 text-sm mb-2">
                      Status:
                      <span
                        className={`px-2 py-1    ${
                          job.status === "active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {job?.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Posted on: {job?.updatedAt.slice(0, 10)}
                    </p>
                    {/* <p className="text-sm mt-2">Applicants: {job.applicants}</p> */}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => setId(job?._id)}
                      className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(job?._id)}
                      className="px-4 py-2 rounded bg-[#000074] text-white hover:bg-red-600"
                    >
                      Delete
                    </button>

                    {id && (
                      <div className="fixed inset-0 flex items-center justify-center bg-[#1515157c] bg-opacity-50">
                        <div className="bg-white p-6 rounded w-[500px] ">
                          <EditJob onClose={() => setId(null)} id={id} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer/> 
    </>
  );
}

export default MyJobs;
