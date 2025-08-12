import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { getUserListApi } from "../../services/allApi";
import Footer from "../../components/Footer";

function AdminDashboard() {

     const [stats, setStats] = useState({
    totalJobs: 0,
    totalEmployers: 0,
    totalUsers: 0,
  });

  const [users, setUsers] = useState([]);

//   get user list
const userlist = async(email)=>{
    const result = await getUserListApi()
    console.log(result.data);
    if(result.status == 200){
        const filtered = result.data.filter((d)=>d.email != email)
        setUsers(filtered)
    }
    
}

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"))
    userlist(user.email)

    
  }, []);
  return ( 
    <>
      <div className="md:grid grid-cols-[1fr_4fr] min-h-screen ">
      {/* Sidebar */}
      <AdminSidebar/>

      {/* Main Content */}
      <div className="p-8 bg-[#f2f2fc]">

        <div className="font-extrabold text-2xl mb-5 text-[#02024f]">
            Dashboard
        </div>
        <div className="p-4 bg-[#a7c804] rounded mb-5 font-semibold">
            Welcome to Admin Panel !!
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-100 text-blue-800 p-7 rounded font-semibold">
            Total Jobs: 9
          </div>
          <div className="bg-green-100 text-green-800 p-7 rounded font-semibold">
            Total Employers: 6
          </div>
          <div className="bg-purple-100 text-purple-800 p-7 rounded font-semibold">
            Total Users: 8
          </div>
        </div>

        {/* Users Table */}
        <div className=" rounded-2xl  min-h-screen ">
         <div className="bg-white rounded-2xl md:mr-8 md:p-10 ">
              <h2 className="text-xl font-bold  mb-4">All Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full  rounded">
        <thead className="bg-[#05053e] text-white shadow-lg text-left">
          <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Role</th>
            <th className="px-4 py-2 border-b">Joined</th>
          </tr>
        </thead>
        <tbody>
        {users?.length >0 ?
        users.map((item)=>(
             <tr className="hover:bg-gray-50 shadow-lg">
            <td className="px-4 py-2 border-b">{item.name}</td>
            <td className="px-4 py-2 border-b">{item.email}</td>
            <td className="px-4 py-2 border-b capitalize">{item.role}</td>
            <td className="px-4 py-2 border-b">{item.createdAt ? new Date(item.createdAt).toLocaleDateString():"6.08.2025"}</td>
          </tr>
        )):
        <tr className="hover:bg-gray-50 shadow-lg"><td>No Data</td></tr>}
        </tbody>
      </table>
              </div>
         </div>

        
        </div>
      </div>
    </div>
    <Footer/> 
    </>
  );
}

export default AdminDashboard;
