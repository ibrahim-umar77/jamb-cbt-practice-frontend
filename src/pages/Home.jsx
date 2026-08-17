import { useNavigate } from "react-router-dom";
import "../App.css";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Welcome Header */}
      <header className="home-header">

        <ThemeToggle />

        <h1>JAMB CBT Practice</h1>

        <p>
          Prepare for your JAMB examination with practice questions
          based on the JAMB syllabus.
        </p>

      </header>

      {/* Main Welcome Card */}
      <section className="home-content">

        <div className="home-card">

          <span className="home-badge">
            JAMB Preparation
          </span>

          <h2>Start Your Practice</h2>

          <p className="home-description">
            Choose a subject and select a practice set to begin your test.
            Each practice set contains 40 questions and gives you 40 minutes
            to complete the test.
          </p>

          <div className="home-info">

            <div>
              <strong>40</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>40</strong>
              <span>Minutes</span>
            </div>

            <div>
              <strong>5</strong>
              <span>Subjects</span>
            </div>

          </div>

          <button
            className="home-start-button"
            onClick={() => navigate("/subjects")}
          >
            Start Practice
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;