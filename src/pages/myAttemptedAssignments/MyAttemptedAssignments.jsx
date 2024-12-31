import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer } from "react-toastify";
import axios from "axios";

export default function MyAttemptedAssignments() {
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://study-buddy-server-nu.vercel.app/assignments-submitted?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setAssignments(res.data);
      });
  }, [user?.email]);

  return (
    <div className=" w-11/12 md:w-4/5 my-10 mx-auto">
      <h2 className="text-2xl font-semibold text-center pb-10">
        My Submitted Assignments
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Given Mark</th>
              <th>Full mark</th>
              <th>Status</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {assignments.map((assignment, index) => (
              <tr key={assignment._id}>
                <th>{index + 1}</th>
                <td>{assignment.title}</td>
                <td>{assignment.givenMark}</td>
                <td>{assignment.marks}</td>
                <td>{assignment.pending ? "Pending" : "Completed"}</td>
                <td>{assignment.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer></ToastContainer>
    </div>
  );
}
