import React, { useEffect, useState } from 'react'
import { getAJobApi } from '../../services/allApi';


function EditJob({onClose,id}) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salaryRange: "",
        jobType: "Full-Time",
        expirationDate: "",
      });
    
      // fun to post job
      const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Job Posted:", form);
        //api call
        const result = await UpdateJobApi(form);
        console.log(result.data);
    
        if (result.status == 200) {
          alert("job post successfully");
        } else {
          alert("Something went wrong");
        }
      };

    //   get a job 
    const getAJob = async()=>{
        const result = await getAJobApi(id)
        console.log(result.data);
         if (result.status == 200) {
          setForm(result.data)
        } 
        
    }

    useEffect(()=>{
        getAJob()
    },[id])
  return (
      <>
        <div className="  bg-white ">
        <h2 className="text-xl font-bold mb-4">Edit Job Post</h2>
        <form className="space-y-4" onSubmit={handleUpdate}>
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
            <option>Contract</option>
          </select>
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
              Submit
            </button>
          </div>
        </form>
      </div>
      
      </>
  )
}

export default EditJob