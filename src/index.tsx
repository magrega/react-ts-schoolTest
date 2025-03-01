import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import QuestionCard from "./Components/QuestionCard/QuestionCard";
import Results from "./Components/Result/Result";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "single-choice",
    element: <QuestionCard type={"single-choice"} />,
  },
  {
    path: "multiple-choice",
    element: <QuestionCard type={"multiple-choice"} />,
  },
  {
    path: "short-written",
    element: <QuestionCard type={"short-written"} />,
  },
  {
    path: "long-written",
    element: <QuestionCard type={"long-written"} />,
  },
  {
    path: "results",
    element: <Results />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

<RouterProvider router={router} />;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
