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


const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout></MainLayout>,
        errorElement:<h2>Route not found</h2>,
        children: [
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path:"/myAttemptedAssignments",
                element: <MyAttemptedAssignments></MyAttemptedAssignments>
            },
            {
                path: "/createAssignments",
                element:<CreateAssignments></CreateAssignments>
            },
            {
                path: "/assignments",
                element: <Assignments></Assignments>,
                loader:()=>fetch("http://localhost:5000/allAssignments")
            },
            {
                path:"/updateAssignment/:id",
                element:<UpdateAssignment></UpdateAssignment>,
                loader:({params})=>fetch(`http://localhost:5000/assignment/${params.id}`)
            },
            {
                path:"/viewAssignment/:id",
                element:<ViewAssignment></ViewAssignment>,
                loader:({params})=>fetch(`http://localhost:5000/assignment/${params.id}`)

            },
            {
                path:"/pendingAssignments",
                element: <PendingAssignments></PendingAssignments>,
                loader:()=>fetch("http://localhost:5000/assignments/pending")
            },
            {
                path:"/assignmentSubmission/:id",
                element:<AssignmentSubmission></AssignmentSubmission>,
                loader:({params})=>fetch(`http://localhost:5000/assignment/${params.id}`)
            }
            
        ]
    }
])

export default router;