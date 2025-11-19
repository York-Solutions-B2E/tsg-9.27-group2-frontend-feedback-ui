import { useState } from "react";
import SubmitFeedbackPage from "./pages/SubmitFeedbackPage";
import MyFeedbackPage from "./pages/MyFeedbackPage";
import { CiEdit } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";

function App() {
  const [view, setView] = useState<"submit" | "list">("submit");

  return (
    <div className="min-h-screen bg-gray-900  text-gray-100 w-screen flex flex-col items-center justify-center pt-12">
      <header className="min-h-[60%] px-4 shadow bg-gray-800 flex justify-between items-center w-[65%] rounded-xl ">
        {/* <h1 className="text-xl font-semibold text-blue-600">Feedback Portal</h1> */}
        <nav className="space-x-4 flex gap-4">
          <button
            className={`px-3 py-4  cursor-pointer  ${
              view === "submit"
                ? "border-b-2 border-solid border-blue-500 text-white"
                : "hover:text-gray-500"
            }`}
            onClick={() => setView("submit")}
          >
            <CiEdit className="inline-flex" /> Submit
          </button>
          <button
            className={`flex items-center px-3 py-4 cursor-pointer ${
              view === "list"
                ? "border-b-2 border-solid border-blue-600"
                : "hover:text-gray-600"
            }`}
            onClick={() => setView("list")}
          >
            <LiaClipboardListSolid className="inline" />
            My Feedback
          </button>
        </nav>
      </header>

      <main className="p-6 min-h-screen w-[65%] rounded-xl bg-gray-900">
        {view === "submit" ? <SubmitFeedbackPage /> : <MyFeedbackPage />}
      </main>
    </div>
  );
}

export default App;
