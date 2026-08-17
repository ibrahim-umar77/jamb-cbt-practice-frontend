import { useLocation, useNavigate } from "react-router-dom";

function Review() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions, answers, result } = location.state || {};

  if (!questions || !answers || !result) {
    return (
      <div className="review-page">

        <header className="review-header">
          <h1>No Review Data Found</h1>

          <p>
            The answers from this practice session are no longer available.
          </p>
        </header>

        <div className="review-actions">

          <button
            onClick={() => navigate("/subjects")}
          >
            Back to Subjects
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="review-page">

      {/* Header */}
      <header className="review-header">

        <h1>Review Answers</h1>

        <p>
          Review your answers and compare them with the correct answers.
        </p>

        <div className="review-score">

          <strong>
            {result.score}
          </strong>

          <span>
            / {result.totalQuestions}
          </span>

        </div>

      </header>

      {/* Review Summary */}
      <div className="review-summary">

        <div className="review-summary-item correct">

          <strong>
            {result.correct}
          </strong>

          <span>
            Correct
          </span>

        </div>

        <div className="review-summary-item wrong">

          <strong>
            {result.wrong}
          </strong>

          <span>
            Wrong
          </span>

        </div>

        <div className="review-summary-item unanswered">

          <strong>
            {result.unanswered}
          </strong>

          <span>
            Unanswered
          </span>

        </div>

      </div>

      {/* Questions */}
      <div className="review-list">

        {questions.map((question, index) => {

          const studentAnswer = answers[index];

          const isUnanswered = !studentAnswer;

          const isCorrect =
            studentAnswer === question.correct_answer;

          const statusClass = isUnanswered
            ? "unanswered"
            : isCorrect
            ? "correct"
            : "wrong";

          return (
            <article
              key={question.id}
              className={`review-card ${statusClass}`}
            >

              {/* Question Header */}
              <div className="review-card-header">

                <span className="review-question-number">
                  Question {index + 1}
                </span>

                <span className={`review-status ${statusClass}`}>

                  {isUnanswered
                    ? "Unanswered"
                    : isCorrect
                    ? "Correct"
                    : "Wrong"}

                </span>

              </div>

              {/* Question */}
              <h2>
                {question.question_text}
              </h2>

              {/* Options */}
              <div className="review-options">

                <p
                  className={
                    question.correct_answer === "A"
                      ? "correct-option"
                      : studentAnswer === "A"
                      ? "selected-wrong-option"
                      : ""
                  }
                >
                  <strong>A.</strong>{" "}
                  {question.option_a}
                </p>

                <p
                  className={
                    question.correct_answer === "B"
                      ? "correct-option"
                      : studentAnswer === "B"
                      ? "selected-wrong-option"
                      : ""
                  }
                >
                  <strong>B.</strong>{" "}
                  {question.option_b}
                </p>

                <p
                  className={
                    question.correct_answer === "C"
                      ? "correct-option"
                      : studentAnswer === "C"
                      ? "selected-wrong-option"
                      : ""
                  }
                >
                  <strong>C.</strong>{" "}
                  {question.option_c}
                </p>

                <p
                  className={
                    question.correct_answer === "D"
                      ? "correct-option"
                      : studentAnswer === "D"
                      ? "selected-wrong-option"
                      : ""
                  }
                >
                  <strong>D.</strong>{" "}
                  {question.option_d}
                </p>

              </div>

              {/* Answer Summary */}
              <div className="answer-summary">

                <div>
                  <span>
                    Your answer
                  </span>

                  <strong>
                    {isUnanswered
                      ? "Not answered"
                      : studentAnswer}
                  </strong>
                </div>

                <div>
                  <span>
                    Correct answer
                  </span>

                  <strong>
                    {question.correct_answer}
                  </strong>
                </div>

              </div>

              {/* Explanation */}
              {question.explanation && (
                <div className="explanation">

                  <h3>
                    Explanation
                  </h3>

                  <p>
                    {question.explanation}
                  </p>

                </div>
              )}

            </article>
          );
        })}

      </div>

      {/* Bottom Navigation */}
      <div className="review-actions">

        <button
          onClick={() =>
            navigate("/results", {
              state: result,
            })
          }
        >
          Back to Result
        </button>

        <button
          onClick={() =>
            navigate("/subjects")
          }
        >
          Back to Subjects
        </button>

      </div>

    </div>
  );
}

export default Review;