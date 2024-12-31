import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MyAttemptedAssignments from "../pages/myAttemptedAssignments/MyAttemptedAssignments";
import CreateAssignments from "../pages/createAssignments/CreateAssignments";
import Assignments from "../pages/assignments/Assignments";
import UpdateAssignment from "../pages/updateAssignment/UpdateAssignment";
import ViewAssignment from "../pages/viewAssignment/ViewAssignment";
import PendingAssignments from "../pages/pendingAssignments/PendingAssignments";
import AssignmentSubmission from "../pages/assignmentSubmission/AssignmentSubmission";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/myAttemptedAssignments",
        element: (
          <PrivateRoute>
            <MyAttemptedAssignments></MyAttemptedAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/createAssignments",
        element: (
          <PrivateRoute>
            <CreateAssignments></CreateAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>,
        loader: () => fetch("https://study-buddy-server-nu.vercel.app/allAssignments"),
      },
      {
        path: "/updateAssignment/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://study-buddy-server-nu.vercel.app/assignment/${params.id}`),
      },
      {
        path: "/viewAssignment/:id",
        element: (
          <PrivateRoute>
            <ViewAssignment></ViewAssignment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://study-buddy-server-nu.vercel.app/assignment/${params.id}`),
      },
      {
        path: "/pendingAssignments",
        element: (
          <PrivateRoute>
            <PendingAssignments></PendingAssignments>
          </PrivateRoute>
        ),
        loader: () => fetch("https://study-buddy-server-nu.vercel.app/assignments/pending"),
      },
      {
        path: "/assignmentSubmission/:id",
        element: (
          <PrivateRoute>
            <AssignmentSubmission></AssignmentSubmission>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://study-buddy-server-nu.vercel.app/assignment/${params.id}`),
      },
    ],
  },
]);

export default router;
