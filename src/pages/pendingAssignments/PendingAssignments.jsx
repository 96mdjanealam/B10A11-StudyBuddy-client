import React, { useContext } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider'
import { toast, ToastContainer } from 'react-toastify'

export default function PendingAssignments() {

    const {user}=useContext(AuthContext)

    const navigate = useNavigate()

    const pendingAssignments=useLoaderData()
    console.log(pendingAssignments);

    const handleGiveMark = (id,email) => {

        if(user.email === email){
            toast.error("You cannot evaluate your submission!",{
                position:'top-center'
            })
            return;
        }
        navigate(`/assignmentSubmission/${id}`);
      };


  return (
    <div className=" w-11/12 md:w-4/5 my-10 mx-auto">
      <h2 className="text-2xl font-semibold text-center pb-10">
        Pending Assignments
      </h2>
      <div className='overflow-x-auto'>
      <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Full Mark</th>
        <th>Submitted By</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {pendingAssignments.map((assignment,index)=>
        <tr key={assignment._id}>
        <th>{index+1}</th>
        <td>{assignment.title}</td>
        <td>{assignment.marks}</td>
        <td>{assignment.nameSubmittedBy}</td>
        <td>
            <button
            onClick={() => handleGiveMark(assignment._id, assignment.submittedBy)}
            className={`px-4 py-2 rounded-lg border-2 border-yellow-500 font-bold   ${user.email === assignment.submittedBy?"opacity-40 cursor-not-allowed":"hover:bg-yellow-400 hover:text-orange-700"}`}>Give Mark</button>
        </td>
      </tr>
      )}
      
    </tbody>
  </table>
      </div>
      
      <ToastContainer></ToastContainer>
      </div>
  )
}
