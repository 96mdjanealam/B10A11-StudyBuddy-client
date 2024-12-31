import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const { signInWithGoogle, userLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    userLogin(email, password)
      .then(() => {
        form.reset();
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      });
  };

  return (
    <div className=" flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 my-4">
        <h2 className="text-2xl font-semibold text-center pb-10">
          Login your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-neutral">Login</button>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline btn-success mt-4"
        >
          Sign In with Google
        </button>
        <p className="text-center font-semibold pt-10">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
