import { Routes, Route } from "react-router-dom";
import Page from "./pages/Page";

function App() {
  return (
    <Routes>
      <Route path="/" Component={Page} />
    </Routes>
  );
}

export default App;
