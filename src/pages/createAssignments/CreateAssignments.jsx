import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

export default function CreateAssignments() {
  const { user } = useContext(AuthContext);

  const [dueDate, setDueDate] = useState(new Date());

  dueDate.setHours(23, 59, 59, 999);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const image = form.image.value;
    const description = form.description.value;
    const marks = +form.marks.value;
    const difficulty = form.difficulty.value;
    const date = dueDate;
    const userName = form.userName.value;
    const email = form.email.value;

    if (marks < 10) {
      toast.error("Input a full mark value of at least 10", {
        position: "top-center",
      });
      return;
    }

    const newAssignment = {
      title,
      image,
      description,
      marks,
      difficulty,
      date,
      userName,
      email,
    };

    fetch("https://study-buddy-server-nu.vercel.app/createAssignment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Assignment Created Successfully", {
          position: "top-center",
        });
        form.reset();
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 my-4">
        <h2 className="text-2xl font-semibold text-center pb-10">
          Create Assignment
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Title</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Solve the problem x"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Thumbnail Image URL</span>
            </label>
            <input
              name="image"
              type="text"
              placeholder="Image-URL-here"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              name="description"
              placeholder="Description of the assignment goes here ..."
              className="textarea textarea-bordered"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Marks</span>
            </label>
            <input
              name="marks"
              type="number"
              placeholder="Full mark here (e.g. 100 or 50)"
              className="input input-bordered"
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Difficulty Level</span>
              </label>
              <select
                name="difficulty"
                className="select select-bordered"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a difficulty level
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                customInput={
                  <input
                    type="text"
                    placeholder="Select a date"
                    className="input input-bordered"
                    required
                  />
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              name="userName"
              type="text"
              value={user?.displayName || ""}
              readOnly={true}
              placeholder="your name here"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={user?.email || ""}
              readOnly={true}
              placeholder="your email here"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral">
              Create Assignment
            </button>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
