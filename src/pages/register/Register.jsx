import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const { createNewUser, updateUserProfile } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    let newErrors = {};

    if (name.length < 5) {
      newErrors.name = "Must be more than 5 characters long.";
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!regex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters long, including an uppercase and a lowercase letter.";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    createNewUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          form.reset();
          toast.success("Welcome to Study Buddy!", {
            position: "top-center",
          });
        });
      })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 5000);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 my-4">
        <h2 className="text-2xl font-semibold text-center pb-10">
          Register your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
            />
          </div>
          {error.name && (
            <label className="label text-xs text-red-500">{error.name}</label>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="photo-URL"
              className="input input-bordered"
              required
            />
          </div>
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

          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="btn btn-xs absolute right-2 top-12"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye></FaEye>}
            </button>
          </div>
          {error.password && (
            <label className="label text-xs text-red-500">
              {error.password}
            </label>
          )}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-neutral">
              Register
            </button>
          </div>
        </form>
        <p className="text-center font-semibold pt-10">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
