import { useState } from "react";
import { analyzeContent } from "../services/api";

function InputPanel() {

  const [type, setType] = useState("url");
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleAnalyze = async () => {

  if (
  (type !== "document" && !input) ||
  (type === "document" && !file)
) {
  return;
}

  setLoading(true);
  setResult(null);


  try {

    const response = await analyzeContent(
  type,
  type === "document" ? "" : input,
  file
);


    console.log("FULL n8n RESPONSE:", response);


    let raw =
      response.analysis ||
      response.text ||
      response.result ||
      response.output ||
      response;



    if (typeof raw === "string") {


      raw = raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();



      try {

        raw = JSON.parse(raw);


      } catch (e) {


        console.log(
          "Trying JSON extraction..."
        );


        const start = raw.indexOf("{");

        const end = raw.lastIndexOf("}");


        if (start !== -1 && end !== -1) {

          raw = JSON.parse(
            raw.substring(start, end + 1)
          );

        } else {

          throw new Error(
            "No JSON object found"
          );

        }

      }

    }


    console.log(
      "FINAL PARSED RESULT:",
      raw
    );


    setResult(raw);



  } catch(error) {


    console.error(
      "PARSING ERROR:",
      error
    );


    setResult({
  error: JSON.stringify(response)
});

  }


  setLoading(false);

};



  return (

    <div className="input-panel">


      <h2>
        Submit Content For Analysis
      </h2>



     <div className="tabs">

  <button
    className={type === "url" ? "active" : ""}
    onClick={() => setType("url")}
  >
    🌐 URL
  </button>

  <button
    className={type === "text" ? "active" : ""}
    onClick={() => setType("text")}
  >
    📝 TEXT
  </button>

  <button
    className={type === "document" ? "active" : ""}
    onClick={() => setType("document")}
  >
    📄 DOCUMENT
  </button>

</div>




      {type === "document" ? (

  <input
    type="file"
    accept=".pdf,.doc,.docx,.txt"
    onChange={(e) => setFile(e.target.files[0])}
  />

) : (

  <textarea
    className="content-box"
    placeholder={
      type === "url"
        ? "Enter website URL (e.g. https://react.dev)"
        : "Paste technical content here..."
    }
    value={input}
    onChange={(e) => setInput(e.target.value)}
/>

)}




      <button className="analyze-btn" onClick={handleAnalyze}>

        {
          loading
          ? "Analyzing..."
          : "Analyze"
        }

      </button>





      {result && (

        <div className="report">


          <h2>
            Analysis Result
          </h2>

<div className="summary-card">

  <h3>📊 Analysis Summary</h3>

  <p>
    <strong>Claims Found:</strong>{" "}
    {result.technical_analysis?.claims?.length || 0}
  </p>

  <p>
    <strong>🟢 Verified:</strong>{" "}
    {
      result.technical_analysis?.claims?.filter(
        claim => claim.status === "VERIFIED"
      ).length || 0
    }
  </p>

  <p>
    <strong>🟡 Unverified:</strong>{" "}
    {
      result.technical_analysis?.claims?.filter(
        claim => claim.status === "UNVERIFIED"
      ).length || 0
    }
  </p>

  <p>
    <strong>🔴 Outdated:</strong>{" "}
    {
      result.technical_analysis?.claims?.filter(
        claim =>
          claim.status ===
          "OUTDATED OR POTENTIALLY INCORRECT"
      ).length || 0
    }
  </p>

  <p>
    <strong>⚠ Bias Signals:</strong>{" "}
    {
      result.technical_analysis?.claims?.filter(
        claim =>
          claim.bias_signals &&
          claim.bias_signals.toLowerCase() !== "none"
      ).length || 0
    }
  </p>

  <hr />

  <h3>
    ⭐ Credibility Score
  </h3>

  <h1>
    {result.technical_analysis?.credibility_score?.score || "-"} / 10
  </h1>

  <p>

    {
      result.technical_analysis?.credibility_score?.justification
    }

  </p>

</div>

          {result.error && (

            <p>
              {result.error}
            </p>

          )}



          {result.technical_analysis?.claims?.map(

            (claim,index)=>(


              <div

                className="claim-card"

                key={index}

              >


                <h3>
                  Claim {index + 1}
                </h3>



                <p>
                  <b>Claim:</b>
                  <br/>

                  {claim.claim}

                </p>



                <p>
                  <b>Category:</b>{" "}
                  {claim.category}

                </p>




                <p>

  <b>Status:</b>

  <br />

  {claim.status === "VERIFIED" && (
    <span className="verified">
      🟢 VERIFIED
    </span>
  )}

  {claim.status === "UNVERIFIED" && (
    <span className="unverified">
      🟡 UNVERIFIED
    </span>
  )}

  {claim.status ===
    "OUTDATED OR POTENTIALLY INCORRECT" && (
    <span className="outdated">
      🔴 OUTDATED
    </span>
  )}

</p>

<p>

  <b>Reason</b>

  <br />

  {claim.reason}

</p>

<p>

  <b>Bias Signals</b>

  <br />

  {claim.bias_signals}

</p>

<p>

  <b>Neutral Explanation</b>

  <br />

  {claim.neutral_explanation}

</p>




              


              </div>


            )

          )}


        </div>

      )}



    </div>

  );

}


export default InputPanel;