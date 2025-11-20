import { useState } from "react";
import { submitFeedback } from "../services/api";

function FeedbackForm() {
  const [form, setForm] = useState({
    memberId: "",
    providerName: "",
    rating: 1,
    comment: "",
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const ratingLabels: Record<number, string> = {
    1: "Terrible",
    2: "Poor",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setError(null);
    console.log(form);
    try {
      await submitFeedback(form);
      setStatus("success");
      setForm({ memberId: "", providerName: "", rating: 1, comment: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Submission failed");
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-xl shadow space-y-4 min-w-full"
    >
      <div>
        <label className="block mb-1 ">Member ID</label>
        <input
          placeholder="m-123"
          name="memberId"
          value={form.memberId}
          onChange={handleChange}
          className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-200 "
          required
          maxLength={36}
        />
      </div>

      <div>
        <label className="block mb-1 ">Provider Name</label>
        <input
          placeholder="Dr. Michael"
          name="providerName"
          value={form.providerName}
          onChange={handleChange}
          className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-200 "
          required
          maxLength={80}
        />
      </div>

      <div>
        <label className="block mb-1 ">Rating (1–5)</label>
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-200 "
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} - {ratingLabels[r]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 ">Comment</label>
        <textarea
          placeholder="m-123"
          name="comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-200 "
          maxLength={200}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Submit
      </button>

      {status === "success" && (
        <p className="border-x-4 border-solid border-x-green-700 text-center text-green-400 mt-2 bg-gray-700 p-4 rounded">
          Feedback submitted successfully!
        </p>
      )}
      {status === "error" && (
        <p className="border-x-4 border-solid border-x-red-700 text-center text-red-400 mt-2 bg-gray-700 rounded p-4">
          {error}
        </p>
      )}
    </form>
  );
}

export default FeedbackForm;
