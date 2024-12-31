import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AssignmentSubmission() {
  const assignment = useLoaderData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const mark = +form.mark.value;
    const feedback = form.feedback.value;

    if (mark > marks || mark < 0) {
      toast.error("Mark should be positive and less than full mark", {
        position: "top-center",
      });
      return;
    }

    const markingInfo = {
      mark,
      feedback,
    };

    fetch(`https://study-buddy-server-nu.vercel.app/assignment-evaluate/${assignment._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(markingInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Mark given!", {
            position: "top-center",
          });
          form.reset();
        }
      });
  };

  const {
    _id,
    title,
    image,
    description,
    marks,
    difficulty,
    date,
    userName,
    email,
    submission,
    notes,
  } = assignment;

  return (
    <div className="my-14 w-11/12 mx-auto">
      <h2 className="text-center mb-8 text-xl">
        Assignment Submission Details
      </h2>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2 overflow-auto break-words">
            Submission Link:
            <br />
            <a
              className="font-bold hover:text-blue-500"
              href={submission}
              target="_blank"
            >
              {submission}
            </a>
          </p>
          <p className="text-gray-600 mt-2 overflow-auto break-words">
            Notes:
            <br />
            <span className="font-bold">{notes}</span>
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Full Mark:</span> {marks}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Difficulty:</span> {difficulty}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="flex gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Marks:
                </label>
                <input
                  type="number"
                  name="mark"
                  className="mt-1 p-2 border border-gray-300 rounded-md max-w-24"
                  required
                />
              </div>

              <div>
                <label
                  name="feedback"
                  className="block text-sm font-medium text-gray-700"
                >
                  Feedback:
                </label>
                <textarea
                  id="feedback"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  rows="2"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Assignment by:</span> {userName}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Email:</span> {email}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
