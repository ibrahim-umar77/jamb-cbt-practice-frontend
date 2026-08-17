import PracticeSets from "./pages/PracticeSets";
import Practice from "./pages/Practice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from "./pages/Review";

import Home from "./pages/Home";
import Report from "./pages/Report";
import Subjects from "./pages/Subjects";
import Results from "./pages/Results";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
  path="/practice-sets/:subjectId"
  element={<PracticeSets />}
/>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/report"
          element={<Report />}
        />

        <Route
          path="/subjects"
          element={<Subjects />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

        <Route
          path="/review"
          element={<Review />}
        />

        <Route
          path="/practice/:practiceSetId"
          element={<Practice />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;