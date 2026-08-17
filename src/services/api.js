import axios from "axios";

const API_URL =
  "http://localhost:5678/webhook/analyze-content";

export async function analyzeContent(type, content, file = null) {

  if (type === "document") {

    const formData = new FormData();

    formData.append("type", type);
    formData.append("file", file);

    const response = await axios.post(
      API_URL,
      formData
    );

    return response.data;
  }

  const response = await axios.post(API_URL, {
    content: {
      type,
      content,
      file: null,
    },
  });

  return response.data;
}

const BACKEND_URL = "http://localhost:5000";

export async function getSubjects() {
  const response = await axios.get(`${BACKEND_URL}/api/subjects`);
  return response.data;
}

export async function getPracticeSets(subjectId) {
  const response = await axios.get(
    `${BACKEND_URL}/api/practice-sets/${subjectId}`
  );
  return response.data;
}

export async function getPracticeQuestions(practiceSetId) {
  const response = await axios.get(
    `${BACKEND_URL}/api/practice-sets/${practiceSetId}/questions`
  );
  return response.data;
}