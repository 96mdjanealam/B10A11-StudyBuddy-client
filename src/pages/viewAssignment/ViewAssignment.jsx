import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

function ViewAssignment() {
  const assignment = useLoaderData();
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
  } = assignment;

  const handleTakeAssignment = () => {
    if (user.email === email) {
      toast.error("Your cannot take your assignment", {
        position: "top-center",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    const form = e.target;
    const submission = form.submission.value;
    const notes = form.notes.value;
    const pending = true;
    const submittedBy = user.email;
    const nameSubmittedBy = user.displayName;
    const submittedAssignment = {
      submission,
      notes,
      pending,
      submittedBy,
      nameSubmittedBy,
    };
    fetch(`https://study-buddy-server-nu.vercel.app/assignment-submit/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(submittedAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsModalOpen(false);
        toast.success("Assignment Submitted", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="my-14 w-11/12 mx-auto">
      <h2 className="text-center mb-8 text-xl">Assignment Details</h2>
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Full Mark:</span> {marks}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Difficulty:</span> {difficulty}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Due Date:</span>{" "}
              {new Date(date).toLocaleDateString()}
            </p>
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
      <div className="flex justify-center">
        <button
          onClick={handleTakeAssignment} // Open the modal
          className="px-4 mt-8 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none hover:shadow-lg hover:shadow-blue-300 focus:ring-2 focus:ring-blue-300"
        >
          Take Assignment
        </button>
      </div>

      {/* Modal (div element) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <form
              method="dialog"
              onSubmit={(e) => handleSubmit(e, _id)}
              className=""
            >
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              >
                ✕
              </button>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Google Doc Link</span>
                </label>
                <input
                  type="text"
                  name="submission"
                  placeholder="paste google doc link here"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quick Notes</span>
                </label>
                <input
                  type="text"
                  name="notes"
                  placeholder="Write notes here ..."
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <div className="flex justify-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default ViewAssignment;
