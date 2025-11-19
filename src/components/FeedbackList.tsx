import { useState } from "react";
import { getFeedbackByMember } from "../services/api";
import type { Feedback } from "../types/feedback";
import { AiFillStar } from "react-icons/ai";

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
    <div className="bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <div className="flex space-x-2">
        <input
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-200"
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

      <ul className="space-y-3 pt-6">
        {feedbacks.map((f) => (
          <li
            key={f.id}
            className="p-4 rounded-xl bg-gray-750/60 border border-gray-700 hover:border-gray-500 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-200 break-words">
                {f.providerName}
              </p>
              <span className="text-yellow-400 font-medium flex">
                {/* {"⭐".repeat(+f.rating)} */}
                {Array.from({ length: +f.rating }).map((_, i) => (
                  <AiFillStar key={i} color="gray" />
                ))}
              </span>
            </div>

            {f.comment && (
              <p className="mt-1 text-gray-400 break-words whitespace-normal leading-relaxed">
                {f.comment}
              </p>
            )}

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <p className="break-all">Member: {f.memberId}</p>
              <p>{new Date(f.submittedAt).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
