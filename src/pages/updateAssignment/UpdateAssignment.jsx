import { useContext, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { useLoaderData } from "react-router-dom";

export default function UpdateAssignment() {
  const { user } = useContext(AuthContext);

  const oldAssignmentData = useLoaderData();

  const [dueDate, setDueDate] = useState(new Date(oldAssignmentData.date));

  dueDate.setHours(23, 59, 59, 999);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.email !== oldAssignmentData.email) {
      toast.error("Access denied!", {
        position: "top-center",
      });
      return;
    }

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

    const updatedAssignment = {
      title,
      image,
      description,
      marks,
      difficulty,
      date,
      userName,
      email,
    };

    fetch(`https://study-buddy-server-nu.vercel.app/assignment-update/${oldAssignmentData?._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Assignment Updated", {
            position: "top-center",
          });
        } else {
          toast.error("No changes made!", {
            position: "top-center",
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 my-4">
        <h2 className="text-2xl font-semibold text-center pb-10">
          Update Assignment
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Title</span>
            </label>
            <input
              name="title"
              type="text"
              defaultValue={oldAssignmentData.title}
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
              defaultValue={oldAssignmentData.image}
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
              defaultValue={oldAssignmentData.description}
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
              defaultValue={oldAssignmentData.marks}
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
                defaultValue={oldAssignmentData.difficulty}
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
                onChange={(date) => {
                  setDueDate(date);
                }}
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
              Update Assignment
            </button>
          </div>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
