import styles from "./App.module.css";

import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { RoutesProvider } from "./RoutesProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.App}>
          <RoutesProvider />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
