export interface Feedback {
  id: string;
  memberId: string;
  providerName: string;
  rating: number;
  comment?: string;
  submittedAt: string;
}

export interface FeedbackRequest {
  memberId: string;
  providerName: string;
  rating: number;
  comment?: string;
}
