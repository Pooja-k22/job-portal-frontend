import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { getUserApi, profileEditApi } from "../../services/allApi";
import { tokenContext } from "../../contex/ContextShare";
import Footer from "../../components/Footer";

function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [editMode, setEditMode] = useState(false);
   const {token, setToken} = useContext(tokenContext)


  
// profile edit
  const handleSave = async() => {
    
    const reqHeader ={
        "Authorization": `Bearer ${token}`
    }
    const result = await profileEditApi(user,reqHeader)
    console.log(result.data);
    if(result.status == 200){
    alert("Profile updated successfully!");
    setUser(result.data)
   
    setEditMode(false);
    }else{
        alert('something went wrong')
    }
    

  };

  const handleCancel = () => {
    setEditMode(false);
  };

//   get user
const getUser = async(token)=>{
     const reqHeader ={
        "Authorization": `Bearer ${token}`
    }
    const result = await getUserApi(reqHeader)
    //console.log(result.data);
    if(result.status == 200){
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
    }
    
}

  useEffect(()=>{
    
    const userD = JSON.parse(sessionStorage.getItem('existingUser'))
    setUser({name: userD.name,
    email:userD.email,
    
    bio: userD.bio })
    const token = sessionStorage.getItem('token')
    setToken(token)
    getUser(token)
  },[])

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto mt-16 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center tracking-wide  pb-3">
          My Profile
        </h2>

        <div className="flex flex-col items-center mb-8">
          <img
            src={"/image.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-2 border-gray-300  shadow-md hover:scale-105 transition-transform cursor-pointer"
          />
        </div>

        {editMode ? (
          <>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={(e)=>setUser({...user,name:e.target.value})}
                placeholder="Full Name"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition shadow-sm"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="Email Address"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition shadow-sm"
              />
            
              <textarea
                name="bio"
                value={user.bio}
                onChange={(e)=>setUser({...user,bio:e.target.value})}
                rows={2}
                placeholder="About you"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none transition shadow-sm resize-none"
              />
            </div>

            <div className="flex justify-end gap-5 mt-10">
              <button
                onClick={handleCancel}
                className="px-7 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-7 text-gray-800">
              {["Name", "Email", "About Me"].map((label, i) => {
                const key = label.toLowerCase().replace(" ", "");
                const value =
                  label === "About Me"
                    ? user.bio
                    : user[key] || user[label.toLowerCase()];
                return (
                  <div key={i}>
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wide">
                      {label}
                    </p>
                    <p className="text-xl font-medium">{value}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end mt-12">
              <button
                onClick={() => setEditMode(true)}
                className="px-10 py-3 bg-indigo-600 rounded-xl text-white font-semibold hover:bg-indigo-700 transition shadow-lg"
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
       <Footer/>
    </>
  );
}

export default UserProfile;
