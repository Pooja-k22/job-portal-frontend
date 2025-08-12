import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Briefcase, Calendar, IndianRupee, MapPin } from "lucide-react";
//import { getJobByIdApi, applyJobApi } from "../../services/allApi";
import Header from "../components/Header";
import { addapplicationApi, getAJobApi } from "../../services/allApi";
import Footer from "../../components/Footer";

function JobDetail() {
  const { id } = useParams(); // job id from route
  const [job, setJob] = useState({});
  const [showApply, setShowApply] = useState(false);

  const [ApplicationDetails, setApplicationDetails] = useState({
    fullname: "",
    email: "",
    phone: "",
    qualification: "",
    coverletter: "",
    resume: "",
  });

  const [jobtitle, setJobtitle] = useState("");

  //   get job details
  const getJobDetails = async (id) => {
    const result = await getAJobApi(id);
    console.log(result.data);
    if (result.status == 200) {
      setJob(result.data);
      setJobtitle(result.data.title);
    }
  };

  // apply job
  const handleApply = async () => {
    const { fullname, email, phone, qualification, coverletter, resume } =
      ApplicationDetails;
    if (
      !fullname ||
      !email ||
      !phone ||
      !qualification ||
      !coverletter ||
      !resume
    ) {
      alert("please fill the fields completely");
    } else {
      const reqBody = new FormData();

      for (let key in ApplicationDetails) {
        reqBody.append(key, ApplicationDetails[key]);
      }
      reqBody.append("jobtitle", jobtitle);
      reqBody.append("jobId", id);

      const result = await addapplicationApi(reqBody);
      console.log(result.data);
    }
  };

  //functiom to reset the form value
  const handleReset = () => {
    setApplicationDetails({
      fullname: "",
      email: "",
      phone: "",
      qualification: "",
      coverletter: "",
      resume: "",
    });

    document.getElementById("fileInput").value = "";
  };

  useEffect(() => {
    getJobDetails(id);
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto py-10">
        {/* Top Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <Link to={"/findjob"}>
              {" "}
              <button className="mt-4 bg-black text-white px-3 py-2 rounded-lg hover:bg-blue-700">
                Back
              </button>
            </Link>
          </div>
          {/* <p className="text-gray-600">{job.company}</p> */}
          <div className="flex gap-6 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {job.jobType}
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee size={14} /> {job.salaryRange}
            </span>
          </div>
          {/* <div className="mt-2 text-[#2727f3] "><span className="font-bold text-gray-500">Posted</span> :{ job?.updatedAt}</div> */}

          <div className="mt-2 text-[#f3ac27] ">
            <span className="font-bold text-gray-500">
              Application close :{" "}
            </span>{" "}
            : {job.expirationDate}
          </div>

          <button
            onClick={() => setShowApply(true)}
            className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>

        {/* Description */}
        <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {/* Apply Modal */}
        {showApply && (
          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              class="fixed inset-0 bg-gray-500/75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {/* title */}

                  <div class="bg-gray-900 p-4 flex sm:px-6 justify-between">
                    <h1 className="text-white text-2xl">Application form</h1>
                    <p
                      onClick={() => setShowApply(false)}
                      className="text-white fa-2x cursor-pointer"
                    >
                      x
                    </p>
                  </div>

                  {/* body */}
                  <div class="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                    <div className="grid grid-cols-2">
                      <div className="p-3">
                        <div className="mb-3">
                          <input
                            type="text"
                            value={ApplicationDetails.fullname}
                            onChange={(e) =>
                              setApplicationDetails({
                                ...ApplicationDetails,
                                fullname: e.target.value,
                              })
                            }
                            placeholder="Full Name"
                            className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            value={ApplicationDetails.email}
                            onChange={(e) =>
                              setApplicationDetails({
                                ...ApplicationDetails,
                                email: e.target.value,
                              })
                            }
                            placeholder="Email Id"
                            className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                          />
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="mb-3">
                          <input
                            type="text"
                            value={ApplicationDetails.qualification}
                            onChange={(e) =>
                              setApplicationDetails({
                                ...ApplicationDetails,
                                qualification: e.target.value,
                              })
                            }
                            placeholder="Qualification"
                            className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="text"
                            value={ApplicationDetails.phone}
                            onChange={(e) =>
                              setApplicationDetails({
                                ...ApplicationDetails,
                                phone: e.target.value,
                              })
                            }
                            placeholder="Phone"
                            className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3 px-3 w-full">
                      <textarea
                        name=""
                        value={ApplicationDetails.coverletter}
                        onChange={(e) =>
                          setApplicationDetails({
                            ...ApplicationDetails,
                            coverletter: e.target.value,
                          })
                        }
                        id=""
                        placeholder="Cover Letter"
                        className="p-2 border border-gray-400 rounded placeholder-gray-500 w-full"
                      ></textarea>
                    </div>
                    <div className="mb-3 px-3 w-full">
                      <p className="text-gray-400">resume</p>
                      <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            if (file.type !== "application/pdf") {
                              alert("Only PDF files are allowed.");
                              e.target.value = ""; // reset input
                              return;
                            }
                            setApplicationDetails({
                              ...ApplicationDetails,
                              resume: e.target.files[0],
                            });
                          }
                        }}
                        className="border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white"
                      />
                    </div>
                  </div>

                  {/* footer of modal */}
                  <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={handleApply}
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white sm:ml-3 sm:w-auto hover:text-black hover:border-gray-300"
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleReset}
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto hover:text-black"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
       <Footer/>
    </>
  );
}

export default JobDetail;
