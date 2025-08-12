import { useContext, useEffect, useState } from "react";

import { PostJobApi } from "../../services/allApi";
import { newJobAdd } from "../../contex/ContextShare";

function PostJob({ onClose }) {
    const{setJobStatus}= useContext(newJobAdd)
      const [token, setToken] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salaryRange: "",
    jobType: "Full-Time",
    expirationDate: "",
  });

  // fun to post job
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Job Posted:", form);
    const reqHeader= {
      "Authorization": `Bearer ${token}`
    }
    //api call
    const result = await PostJobApi(form,reqHeader);
    console.log(result.data);

    if (result.status == 200) {
      alert("job post successfully");
      onClose()
      setJobStatus(result.data)
    } else {
      alert("Something went wrong");
    }
  };

    useEffect(() => {
     const token = sessionStorage.getItem("token");
     setToken(token)
      
    }, []);

  return (
    <div className="  ">
      <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
          rows="4"
          required
        ></textarea>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="salaryRange"
          placeholder="Salary Range"
          value={form.salaryRange}
          onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="jobType"
          value={form.jobType}
          onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Remote</option>
          <option>Internship</option>
          <option>Hybrid</option>
          <option>Contract</option>
        </select>
        <div>
          <label className="my-2 font-semibold text-gray-500">
            Expiration Date
            <input
              type="date"
              name="expirationDate"
              value={form.expirationDate}
              onChange={(e) =>
                setForm({ ...form, expirationDate: e.target.value })
              }
              className="w-full border p-2 rounded mt-2"
              required
            />
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border hover:border-dashed rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded "
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostJob;
