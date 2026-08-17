import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state;

  if (!result) {
    return (
      <div className="results-page">

        <header className="results-header">
          <h1>No Result Found</h1>

          <p>
            Your practice result is no longer available.
          </p>
        </header>

        <div className="results-card">

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
    <div className="results-page">

      {/* Results Header */}
      <header className="results-header">

        <h1>Practice Complete</h1>

        <p>
          Your practice has been submitted successfully.
        </p>

      </header>

      {/* Main Results Card */}
      <div className="results-card">

        <h2>Your Result</h2>

        {/* Score */}
        <div className="score">

          <strong>
            {result.score}
          </strong>

          <span>
            / {result.totalQuestions}
          </span>

        </div>

        {/* Percentage */}
        <p className="results-percentage">
          Percentage:{" "}
          <strong>
            {result.percentage}%
          </strong>
        </p>

        {/* Test Information */}
        <div className="results-test-info">

          <div>
            <strong>
              {result.totalQuestions}
            </strong>

            <span>
              Questions
            </span>
          </div>

          <div>
            <strong>
              40
            </strong>

            <span>
              Minutes
            </span>
          </div>

        </div>

        {/* Performance Summary */}
        <div className="result-details">

          <div className="result-stat correct">

            <span className="result-stat-icon">
              ✓
            </span>

            <span className="result-stat-label">
              Correct
            </span>

            <strong>
              {result.correct}
            </strong>

          </div>

          <div className="result-stat wrong">

            <span className="result-stat-icon">
              ✕
            </span>

            <span className="result-stat-label">
              Wrong
            </span>

            <strong>
              {result.wrong}
            </strong>

          </div>

          <div className="result-stat unanswered">

            <span className="result-stat-icon">
              —
            </span>

            <span className="result-stat-label">
              Unanswered
            </span>

            <strong>
              {result.unanswered}
            </strong>

          </div>

        </div>

        {/* Actions */}
        <div className="results-actions">

          <button
            className="review-button"
            onClick={() =>
              navigate("/review", {
                state: {
                  questions: result.questions,
                  answers: result.answers,
                  result: result,
                },
              })
            }
          >
            Review Answers
          </button>

          <button
            className="back-subjects-button"
            onClick={() =>
              navigate("/subjects")
            }
          >
            Back to Subjects
          </button>

        </div>

      </div>

    </div>
  );
}

export default Results;