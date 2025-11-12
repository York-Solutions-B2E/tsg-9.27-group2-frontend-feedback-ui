import { useState } from "react";
import { getFeedbackByMember } from "../services/api";
import type { Feedback } from "../types/feedback";

function FeedbackList() {
  const [memberId, setMemberId] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const data = await getFeedbackByMember(memberId);
      setFeedbacks(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-500 p-6 rounded-xl shadow space-y-4">
      <div className="flex space-x-2">
        <input
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={fetchFeedback}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {!loading && feedbacks.length === 0 && <p>No feedback found.</p>}

      <ul className="divide-y divide-gray-200">
        {feedbacks.map((f) => (
          <li key={f.id} className="py-3">
            <p className="font-semibold">{f.providerName}</p>
            <p>Rating: {f.rating}</p>
            {f.comment && <p className="italic text-gray-600">{f.comment}</p>}
            <p className="text-sm text-gray-400">{f.submittedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
