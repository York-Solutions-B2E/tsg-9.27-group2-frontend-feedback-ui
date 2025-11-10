import type { FeedbackRequest, Feedback } from "../types/feedback";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function submitFeedback(payload: FeedbackRequest) {
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to submit feedback");
  }

  return res.json();
}
let mockFeedbacks: Feedback[] = [
  {
    id: "1",
    memberId: "m-123",
    providerName: "Dr. Smith",
    rating: 4,
    comment: "Great experience",
    submittedAt: new Date().toISOString(),
  },
  {
    id: "2",
    memberId: "m-123",
    providerName: "Dr. Jones",
    rating: 5,
    comment: "Excellent service",
    submittedAt: new Date().toISOString(),
  },
];

export const getFeedbackByMember = async (memberId: string) => {
  return mockFeedbacks.filter((f) => f.memberId === memberId);

  //   const res = await fetch(`${BASE_URL}/feedback?memberId=${memberId}`);
  //   if (!res.ok) throw new Error("Error fetching feedback");
  //   return await res.json();
};
