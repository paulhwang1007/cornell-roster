import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SubjectListPage from "./pages/SubjectListPage.jsx";
import CourseListPage from "./pages/CourseListPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/:semester", element: <SubjectListPage /> },
  { path: "/:semester/:subject", element: <CourseListPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
