import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../services/api";

function Subjects() {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSubjects() {
      try {
        const response = await getSubjects();

        if (response.success) {
          setSubjects(response.subjects);
        } else {
          setError("Could not load subjects.");
        }
      } catch (err) {
        console.error("Subjects error:", err);
        setError("Could not connect to the backend.");
      } finally {
        setLoading(false);
      }
    }

    loadSubjects();
  }, []);

  if (loading) {
    return (
      <div className="subjects-status">
        <h2>Loading subjects...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subjects-status">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="subjects-page">

      {/* Page Header */}
      <header className="subjects-header">
        <h1>JAMB CBT Practice</h1>

        <p>
          Select a subject to begin your practice.
        </p>
      </header>

      {/* Section Heading */}
      <section className="subjects-section">

        <div className="subjects-section-heading">
          <h2>Choose a Subject</h2>

          <p>
            Select one of the subjects below to view available practice sets.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="subjects-grid">

          {subjects.map((subject) => (
            <div
              className="subject-card"
              key={subject.id}
            >

              <div className="subject-card-badge">
                Subject
              </div>

              <h3>
                {subject.name}
              </h3>

              <p className="subject-description">
                {subject.description}
              </p>

              <div className="subject-card-info">
                <span>
                  Practice Sets
                </span>

                <span>
                  JAMB Preparation
                </span>
              </div>

              <button
                className="subject-button"
                onClick={() =>
                  navigate(`/practice-sets/${subject.id}`)
                }
              >
                View Practice Sets
              </button>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Subjects;
