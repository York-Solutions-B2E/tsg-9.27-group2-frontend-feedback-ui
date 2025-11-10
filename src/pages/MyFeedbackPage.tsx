import FeedbackList from "../components/FeedbackList";

function MyFeedbackPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Feedback</h2>
      <FeedbackList />
    </div>
  );
}

export default MyFeedbackPage;
