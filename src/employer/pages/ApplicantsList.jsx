import { useEffect, useState } from "react";
import EmployerSidebar from "../components/EmployerSidebar";
import { getEmpApplicationApi } from "../../services/allApi";
import Footer from "../../components/Footer";

function ApplicantsList() {
  const [applicants, setApplicants] = useState([]);

//   get application
const getApplication = async(token)=>{
     const reqHeader= {
      "Authorization": `Bearer ${token}`
    }
    const result = await getEmpApplicationApi(reqHeader)
    console.log(result.data);
    if(result.status == 200){
        setApplicants(result.data)
    }
    
}


  useEffect(() => {
     const token = sessionStorage.getItem("token");
      getApplication(token)
    }, []);

  return (
   <>
      <div className="md:grid grid-cols-[1fr_4fr] min-h-screen">
  
          <EmployerSidebar/>
  
  
  <div className="p-10 min-h-screen bg-[#e6f1fa]">
        <h2 className="text-xl font-bold mb-4 ">Applicants</h2>
        {applicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          <div className="space-y-3">
            {applicants.map((app) => (
              <div
                key={app.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold mb-2">{app.fullname}</h3>
                  <p className="text-sm text-gray-500 mb-2">{app.email}</p>
                  <p className="text-sm text-gray-700 mb-2">
                    Applied for: <span className="font-medium mb-2 mr-2">{app.jobtitle}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Applied on: {app.createdAt? new Date(app.createdAt).toLocaleDateString() : '11/8/2025'}
                  </p>
                </div>
                <a
                  href={`/${app.resume}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  download
                >
                  Resume
                </a>
              </div>
            ))}
          </div>
        )}
      </div> 
       
        </div>
        <Footer/> 
   </>
  );
};

export default ApplicantsList;
