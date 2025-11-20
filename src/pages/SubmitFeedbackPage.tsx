import FeedbackForm from "../components/FeedbackForm";

function SubmitFeedbackPage() {
  return (
    <div className="mx-auto mt-8 w-[65%]">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Submit Feedback
      </h2>
      <FeedbackForm />
    </div>
  );
}

export default SubmitFeedbackPage;
