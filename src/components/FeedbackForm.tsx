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

    try {
      await submitFeedback(form);
      setStatus("success");
      setForm({ memberId: "", providerName: "", rating: 1, comment: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err.message || "Submission failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-500 p-6 rounded-xl shadow space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Member IDD</label>
        <input
          name="memberId"
          value={form.memberId}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          maxLength={36}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Provider Name</label>
        <input
          name="providerName"
          value={form.providerName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
          maxLength={80}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Rating (1–5)</label>
        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Comment</label>
        <textarea
          name="comment"
          value={form.comment}
          onChange={handleChange}
          className="w-full border rounded p-2"
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
        <p className="text-green-600 mt-2">Feedback submitted successfully!</p>
      )}
      {status === "error" && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}

export default FeedbackForm;
