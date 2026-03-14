import { BrowserRouter as Router } from "react-router-dom";
import styles from "./App.module.css";

import { RoutesProvider } from "./RoutesProvider";

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <RoutesProvider />
      </div>
    </Router>
  );
}

export default App;
