function ReportDashboard({ analysis }) {
  return (
    <div className="report-dashboard">
      <section className="report-summary">
        <div>
          <h2>Summary</h2>
          <p>{analysis.summary}</p>
        </div>
        <div>
          <h3>Accuracy Score</h3>
          <p>{analysis.accuracyScore}%</p>
        </div>
        <div>
          <h3>Bias Level</h3>
          <p>{analysis.biasLevel}</p>
        </div>
      </section>

      <section className="report-details">
        <h2>Detected Claims</h2>
        {analysis.claims.length === 0 ? (
          <p>No claims detected. The content appears to be descriptive and informational.</p>
        ) : (
          <div className="claim-list">
            {analysis.claims.map((claim, index) => (
              <div key={index} className="claim-card">
                <strong>Claim {index + 1}</strong>
                <p>{claim.text}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ReportDashboard;