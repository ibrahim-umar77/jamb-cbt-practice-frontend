import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle";

function PracticeSets() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [practiceSets, setPracticeSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPracticeSets() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/practice-sets/${subjectId}`
        );

        if (response.data.success) {
          setPracticeSets(response.data.practice_sets);
        } else {
          setError("Could not load practice sets.");
        }
      } catch (err) {
        console.error(err);
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadPracticeSets();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="practice-sets-status">
        <h2>Loading practice sets...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="practice-sets-status">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="practice-sets-page">

      <header className="practice-sets-header">

        <ThemeToggle />

        <h1>Practice Sets</h1>

        <p>
          Select a practice set to begin.
        </p>

      </header>

      <main className="practice-sets-grid">

        {practiceSets.map((set) => (
          <div
            className="practice-set-card"
            key={set.id}
          >

            <div className="practice-set-icon">
              📝
            </div>

            <h2>{set.name}</h2>

            <p>
              {set.description}
            </p>

            <div className="practice-set-info">
              <strong>
                {set.total_questions}
              </strong>

              <span>
                Questions
              </span>
            </div>

            <button
              onClick={() =>
                navigate(`/practice/${set.id}`)
              }
            >
              Start Practice
            </button>

          </div>
        ))}

      </main>

    </div>
  );
}

export default PracticeSets;

