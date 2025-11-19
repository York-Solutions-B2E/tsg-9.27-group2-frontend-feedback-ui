import type { FeedbackRequest } from "../types/feedback";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function submitFeedback(payload: FeedbackRequest) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    // backend returns: { errors: [{ field, message }] }
    const message =
      errorBody?.errors?.[0]?.message || "Failed to submit feedback";

    throw new Error(message);
  }

  return res.json();
}

export const getFeedbackByMember = async (memberId: string) => {
  // return mockFeedbacks.filter((f) => f.memberId === memberId);

  const res = await fetch(`${BASE_URL}/feedback?memberId=${memberId}`);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    const message =
      errorBody?.errors?.[0]?.message || "Error fetching feedback";

    console.log(message);
    throw new Error(message);
  }

  return await res.json();
};
