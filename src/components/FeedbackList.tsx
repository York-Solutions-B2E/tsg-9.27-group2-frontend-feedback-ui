import { useState } from "react";
import { getFeedbackById, getFeedbackByMember } from "../services/api";
import type { Feedback } from "../types/feedback";
import { AiFillStar } from "react-icons/ai";
import { BsClipboard2XFill } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";

function FeedbackList() {
  const [memberId, setMemberId] = useState("");
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedback, setFeedback] = useState<Feedback>();
  const [loading, setLoading] = useState(false);

  const fetchFeedbackByMember = async () => {
    setLoading(true);
    try {
      const data = await getFeedbackByMember(memberId);
      setFeedbacks(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbackById = async () => {
    setLoading(true);
    try {
      const data = await getFeedbackById(feedbackId);
      setFeedback(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="member bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg text-gray-400">Search by member ID:</h2>
        <div className="flex space-x-2">
          <input
            required
            placeholder="Enter Member ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-900"
          />
          <button
            onClick={fetchFeedbackByMember}
            disabled={!memberId.trim()}
            className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
          >
            Search
          </button>
          <button
            type="reset"
            onClick={() => {
              setFeedbacks([]);
              setMemberId("");
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            <MdOutlineClear />
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {!loading && feedbacks.length === 0 && (
          <div className="flex flex-col w-full h-48 justify-center items-center gap-4">
            <BsClipboard2XFill className="w-1/4 h-24 fill-gray-700" />
            <p className="text-gray-600"> No feedback found.</p>
          </div>
        )}

        <ul className="space-y-3 pt-6">
          {feedbacks.map((f) => (
            <li
              key={f.id}
              className="p-4 rounded-xl bg-gray-750/60 border border-gray-700 hover:border-gray-500 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className=" text-gray-200 break-words">
                  Provider Name: <span>{f.providerName}</span>
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
                  Comment: {f.comment}
                </p>
              )}
              {f.id && (
                <p className="mt-1 text-gray-400 break-words whitespace-normal leading-relaxed">
                  Id: {f.id}
                </p>
              )}

              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <p className="break-all">Member: {f.memberId}</p>
                <p>{new Date(f.submittedAt).toDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback bg-gray-800 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-lg text-gray-400">Search by feedback ID:</h2>
        <div className="flex space-x-2">
          <input
            placeholder="Enter Feedback ID"
            value={feedbackId}
            onChange={(e) => setFeedbackId(e.target.value)}
            className="w-full bg-gray-700 text-gray-400 rounded p-2 focus:outline-teal-900"
          />
          <button
            onClick={fetchFeedbackById}
            disabled={!feedbackId.trim()}
            className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 cursor-pointer disabled:bg-gray-500 disabled:hover:bg-gray-500 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
        {feedback && (
          <div className=" shadow-md rounded-2xl p-6 mb-4 border border-gray-200 hover:shadow-lg transitio text-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-200">
                {feedback.providerName}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date(feedback.submittedAt).toDateString()}
              </span>
            </div>
            <p className="text-gray-200 mb-2">
              <span className="font-medium">Member ID:</span>{" "}
              {feedback.memberId}
            </p>
            <p className="text-gray-200 mb-2">
              <span className="font-medium">Rating:</span> {feedback.rating} / 5
            </p>
            <p className="text-gray-200 mb-2">
              <span className="font-medium">Id:</span> {feedback.id}
            </p>
            {feedback.comment && (
              <p className="text-gray-200">
                <span className="font-medium">Comment:</span> {feedback.comment}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackList;
