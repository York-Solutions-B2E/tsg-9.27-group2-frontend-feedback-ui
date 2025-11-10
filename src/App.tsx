import { useState } from "react";
import SubmitFeedbackPage from "./pages/SubmitFeedbackPage";
import MyFeedbackPage from "./pages/MyFeedbackPage";

function App() {
  const [view, setView] = useState<"submit" | "list">("submit");

  return (
    <div className="min-h-screen bg-green-50 text-gray-100 w-screen flex flex-col">
      <header className="p-4 shadow bg-white flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">
          Provider Feedback Portal
        </h1>
        <nav className="space-x-4 flex gap-4">
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              view === "submit" ? "bg-blue-500 text-white" : "hover:bg-gray-400"
            }`}
            onClick={() => setView("submit")}
          >
            Submit
          </button>
          <button
            className={`px-3 py-1 rounded cursor-pointer ${
              view === "list" ? "bg-blue-500 text-white" : "hover:bg-gray-400"
            }`}
            onClick={() => setView("list")}
          >
            My Feedback
          </button>
        </nav>
      </header>

      <main className="p-6">
        {view === "submit" ? <SubmitFeedbackPage /> : <MyFeedbackPage />}
      </main>
    </div>
  );
}

export default App;
