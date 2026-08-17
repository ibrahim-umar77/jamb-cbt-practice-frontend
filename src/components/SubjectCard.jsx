function SubjectCard({ subject, onClick }) {
  return (
    <div className="subject-card" onClick={onClick}>
      <h3>{subject.name}</h3>

      <p>
        {subject.description || "Practice questions"}
      </p>

      <button>
        View Practice Sets
      </button>
    </div>
  );
}

export default SubjectCard;