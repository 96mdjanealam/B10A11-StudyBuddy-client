import React, { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

export default function Assignments() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const loaderAssignments = useLoaderData();
  const [allAssignments, setAllAssignments] = useState(loaderAssignments);
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleView = (id) => {
    navigate(`/viewAssignment/${id}`);
  };

  const handleUpdate = (id) => {
    const assignmentToUpdate = allAssignments.find(
      (assignment) => assignment._id === id
    );
    if (user?.email !== assignmentToUpdate?.email) {
      toast.error("You cannot update others' assignments", {
        position: "top-center",
      });
      return;
    }
    navigate(`/updateAssignment/${id}`);
  };

  const handleDelete = (id) => {
    const assignmentToDelete = allAssignments.find(
      (assignment) => assignment._id === id
    );

    if (user?.email !== assignmentToDelete?.email) {
      toast.error("You cannot delete others' assignments", {
        position: "top-center",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
    
        fetch(`https://study-buddy-server-nu.vercel.app/assignment-delete/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
           
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Assignment has been deleted.",
                icon: "success",
              });
            }

            const remainingAssignments = allAssignments.filter(
              (assignment) => assignment._id !== id
            );
            setAllAssignments(remainingAssignments);
          });
      }
    });
  };

  const handleFilterChange = (event) => {
    setDifficultyFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAssignments = allAssignments.filter((assignment) => {
    const matchesDifficulty =
      difficultyFilter === "" || assignment.difficulty === difficultyFilter;
    const matchesSearchQuery =
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearchQuery;
  });

  return (
    <div className="w-11/12 md:w-4/5 my-10 mx-auto">
      <h2 className="text-2xl font-semibold text-center pb-10">
        All Assignments
      </h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
        <select
          value={difficultyFilter}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title"
          className="border rounded p-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAssignments.map((assignment) => {
          const date = new Date(assignment.date);
          const formattedDate = date.toLocaleDateString("en-US");
          return (
            <div
              key={assignment._id}
              className="rounded overflow-hidden shadow-lg bg-white"
            >
              {assignment.image && (
                <img
                  className="w-full h-40 object-cover"
                  src={assignment.image}
                  alt={assignment.title}
                />
              )}
              <div className="px-6 py-4">
                <div className="">
                  <div className="font-bold text-xl mb-2 text-blue-500">
                    {assignment.title}
                  </div>
                  <p className="text-gray-700 text-base">
                    Total marks: {assignment.marks}
                  </p>
                  <p className="text-gray-700 text-base">
                    Difficulty: {assignment.difficulty}
                  </p>
                  <p className="text-gray-700 text-base">
                    Due date: {formattedDate}
                  </p>
                  <p className="text-gray-700 text-base">
                    Created by: {assignment.userName}
                  </p>
                </div>

                <div className="flex mt-5 gap-2">
                  <button
                    onClick={() => handleView(assignment._id)}
                    className="bg-blue-500 text-white font-bold h-10 px-4 rounded hover:bg-blue-600"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleUpdate(assignment._id)}
                    className={`bg-green-500 text-white font-bold h-10 px-4 rounded hover:bg-green-600 ${
                      user?.email !== assignment?.email ? "opacity-50" : ""
                    }`}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(assignment._id)}
                    className={`border-2 text-red-500 border-red-500 font-bold h-10 px-4 rounded ${
                      user?.email !== assignment?.email
                        ? "opacity-50"
                        : "hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
