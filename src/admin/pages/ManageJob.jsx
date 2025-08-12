import React from "react";
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getEmployerJobApi,  UpdateJobstatusApi } from "../../services/allApi";
import Footer from "../../components/Footer";

function ManageJob() {
  const [jobs, setJobs] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState([]);
  //   get all job
  const getJob = async () => {
    const result = await getEmployerJobApi();
    //console.log(result.data);
    if (result.status == 200) {
      setJobs(result.data);
    }
  };

  //   toogle active / deactive
  const handleStatus = async (id, currentStatus) => {
    const status = currentStatus == "active" ? "inactive" : "active";
    //console.log(status);

    const result = await UpdateJobstatusApi(id, { status });
    //console.log(result.data);

    if (result.status == 200) {
      setUpdatedStatus(result.data);
    }
  };

  useEffect(() => {
    getJob();
  }, [updatedStatus]);

  return (
    <>
      <div className="md:grid grid-cols-[1fr_4fr] min-h-screen">
        <AdminSidebar />

        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Jobs</h1>

          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className=" border border-gray-200 bg-[#ded5fc] rounded-lg shadow p-5 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {job?.title}
                    </h2>
                    <p className="text-gray-600">{job?.employer}</p>
                    <p className="text-sm text-gray-500">{job?.location}</p>
                    <p className="mt-2 text-sm">
                      Status:{" "}
                      <span
                        className={`px-2 py-1 rounded  ${
                          job?.status === "active"
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
                    <p className="text-xs text-[#fd5d00] mt-1">
                      Expire on: {job.expirationDate}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleStatus(job?._id, job?.status)}
                      className={`px-4 py-2 rounded text-white ${
                        job.status === "active"
                          ? "bg-[#090803] hover:bg-red-600"
                          : "bg-[#da6d00] hover:bg-green-600"
                      }`}
                    >
                      {job.status === "active" ? "Deactivate" : "Approve"}
                    </button>
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

export default ManageJob;
