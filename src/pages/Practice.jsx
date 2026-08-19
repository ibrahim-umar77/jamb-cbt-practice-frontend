import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Practice() {
  const { practiceSetId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("cbt-theme") === "dark"
  );

  // -----------------------------------------
  // Apply light / dark mode
  // -----------------------------------------
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem(
      "cbt-theme",
      darkMode ? "dark" : "light"
    );

    return () => {
      document.body.classList.remove("dark-mode");
    };
  }, [darkMode]);

  // -----------------------------------------
  // Load questions
  // -----------------------------------------
  useEffect(() => {
    async function loadQuestions() {
      try {
  const response = await axios.get(
    `https://jambcbt.up.railway.app/api/questions/${practiceSetId}`
  );

        console.log("Questions response:", response.data);

        if (response.data.success) {
          setQuestions(response.data.questions);
        } else {
          setError("Could not load questions.");
        }
      } catch (err) {
        console.error("Questions error:", err);
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [practiceSetId]);

  // -----------------------------------------
  // Submit practice
  // -----------------------------------------
  const handleSubmit = (automatic = false) => {
    // Manual submission asks for confirmation.
    // Automatic submission does not.
    if (!automatic) {
      const confirmed = window.confirm(
        "Are you sure you want to submit your practice?"
      );

      if (!confirmed) {
        return;
      }
    }

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((question, index) => {
      const selectedAnswer = answers[index];

      if (!selectedAnswer) {
        unanswered++;
      } else if (selectedAnswer === question.correct_answer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const totalQuestions = questions.length;
    const score = correct;

    const percentage =
      totalQuestions > 0
        ? Math.round((score / totalQuestions) * 100)
        : 0;

    const result = {
      score,
      totalQuestions,
      percentage,
      correct,
      wrong,
      unanswered,
      questions,
      answers,
      practiceSetId,
    };

    console.log(
      automatic
        ? "Time expired. Practice submitted automatically:"
        : "Practice submitted:",
      result
    );

    navigate("/results", {
      state: result,
    });
  };

  // -----------------------------------------
  // Countdown timer
  // -----------------------------------------
  useEffect(() => {
    if (timeLeft <= 0) {
      // Automatically submit when time reaches zero.
      if (questions.length > 0) {
        handleSubmit(true);
      }

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions]);

  // -----------------------------------------
  // Select answer
  // -----------------------------------------
  const handleAnswer = (answer) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion]: answer,
    }));
  };

  // -----------------------------------------
  // Next question
  // -----------------------------------------
  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion + 1
      );
    }
  };

  // -----------------------------------------
  // Previous question
  // -----------------------------------------
  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion - 1
      );
    }
  };

  // -----------------------------------------
  // Loading
  // -----------------------------------------
  if (loading) {
    return (
      <div className="practice-status">
        <h2>Loading questions...</h2>
      </div>
    );
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------
  if (error) {
    return (
      <div className="practice-status">
        <h2>{error}</h2>
      </div>
    );
  }

  // -----------------------------------------
  // No questions
  // -----------------------------------------
  if (questions.length === 0) {
    return (
      <div className="practice-status">
        <h2>No questions found.</h2>
      </div>
    );
  }

  const question = questions[currentQuestion];

  // -----------------------------------------
  // Convert seconds into MM:SS
  // -----------------------------------------
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="practice-page">

      {/* Header */}
      <header className="practice-header">

        <div className="practice-title">
          <h1>JAMB CBT Practice</h1>
          <p>Practice Set {practiceSetId}</p>
        </div>

        <div className="practice-header-actions">

          <div className="practice-progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>

          <div
            className={`practice-timer ${
              timeLeft <= 300 ? "warning" : ""
            }`}
          >
            ⏱️ {formattedTime}
          </div>

          <button
            className="theme-toggle"
            onClick={() =>
              setDarkMode((previous) => !previous)
            }
            aria-label="Toggle light and dark mode"
            title="Toggle light/dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </header>

      {/* Question Navigator */}
      <section className="question-navigator">

        <div className="navigator-header">

          <h2>Questions</h2>

          <p>
            Answered:{" "}
            <strong>
              {Object.keys(answers).length}
            </strong>{" "}
            / {questions.length}
          </p>

        </div>

        <div className="question-numbers">

          {questions.map((_, index) => (

            <button
              key={index}
              className={`
                question-number
                ${currentQuestion === index ? "current" : ""}
                ${answers[index] ? "answered" : ""}
              `}
              onClick={() =>
                setCurrentQuestion(index)
              }
            >
              {index + 1}
            </button>

          ))}

        </div>

      </section>

      {/* Current Question */}
      <main className="question-card">

        <div className="question-heading">

          <span>
            Question {currentQuestion + 1}
          </span>

        </div>

        <h2>
          {question.question_text}
        </h2>

        {/* Answer Options */}
        <div className="options">

          <button
            className={
              answers[currentQuestion] === "A"
                ? "option selected"
                : "option"
            }
            onClick={() => handleAnswer("A")}
          >
            <span className="option-letter">
              A
            </span>

            <span>
              {question.option_a}
            </span>
          </button>

          <button
            className={
              answers[currentQuestion] === "B"
                ? "option selected"
                : "option"
            }
            onClick={() => handleAnswer("B")}
          >
            <span className="option-letter">
              B
            </span>

            <span>
              {question.option_b}
            </span>
          </button>

          <button
            className={
              answers[currentQuestion] === "C"
                ? "option selected"
                : "option"
            }
            onClick={() => handleAnswer("C")}
          >
            <span className="option-letter">
              C
            </span>

            <span>
              {question.option_c}
            </span>
          </button>

          <button
            className={
              answers[currentQuestion] === "D"
                ? "option selected"
                : "option"
            }
            onClick={() => handleAnswer("D")}
          >
            <span className="option-letter">
              D
            </span>

            <span>
              {question.option_d}
            </span>
          </button>

        </div>

        {/* Previous / Next */}
        <div className="navigation-buttons">

          <button
            className="previous-button"
            onClick={goPrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <button
            className="next-button"
            onClick={goNext}
            disabled={
              currentQuestion === questions.length - 1
            }
          >
            Next →
          </button>

        </div>

        {/* Submit */}
        <div className="submit-section">

          <button
            className="submit-button"
            onClick={() => handleSubmit(false)}
          >
            Submit Practice
          </button>

        </div>

      </main>

    </div>
  );
}

export default Practice;