import styles from "./App.module.css";

import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { RunsProvider } from "./context/RunsContext";
import { RoutesProvider } from "./RoutesProvider";

function App() {
  return (
    <AuthProvider>
      <RunsProvider>
        <Router>
          <div className={styles.App}>
            <RoutesProvider />
          </div>
        </Router>
      </RunsProvider>
    </AuthProvider>
  );
}

export default App;
