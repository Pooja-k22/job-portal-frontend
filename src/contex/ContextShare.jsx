import React, { createContext, useEffect, useState } from "react";
import { getEmployerJobApi } from "../services/allApi";

export const getMyJobs = createContext();
export const searchKeyContext = createContext();
export const loginRegModalContext = createContext();
export const newJobAdd = createContext();
export const tokenContext = createContext()

function ContextShare({ children }) {
  const [jobs, setJobs] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
   const [token, setToken] = useState("");
  const [jobStatus, setJobStatus] = useState("");

  //  get my job post
  const getJob = async () => {
    const userData = JSON.parse(sessionStorage.getItem("existingUser"));
    try {
      const result = await getEmployerJobApi();
      if (result.status === 200) {
        const userJobs = result.data.filter(
          (job) => job.userMail === userData.email
        );
        setJobs(userJobs);
      }
    } catch (err) {
      console.error("Error fetching jobs", err);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  return (
   <tokenContext.Provider value={{token, setToken}}>
        <newJobAdd.Provider value={{ jobStatus, setJobStatus }}>
          <loginRegModalContext.Provider
            value={{ showLogin, setShowLogin, showRegister, setShowRegister }}
          >
            <searchKeyContext.Provider value={{ searchKey, setsearchKey }}>
              <getMyJobs.Provider value={{ jobs, setJobs, getJob }}>
                {children}
              </getMyJobs.Provider>
            </searchKeyContext.Provider>
          </loginRegModalContext.Provider>
        </newJobAdd.Provider>
   </tokenContext.Provider>
  );
}

export default ContextShare;
