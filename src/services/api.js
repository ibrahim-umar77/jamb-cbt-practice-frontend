import axios from "axios";

const BACKEND_URL =
  "https://jambcbt.up.railway.app";

export async function getSubjects() {
  const response = await axios.get(
    `${BACKEND_URL}/api/subjects`
  );

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
    `${BACKEND_URL}/api/questions/${practiceSetId}`
  );

  return response.data;
}
