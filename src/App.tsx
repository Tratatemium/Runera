import styles from "./App.module.css";

import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { RunsProvider } from "./context/RunsContext";
import { DialogProvider } from "./context/DialogContext";
import { RoutesProvider } from "./RoutesProvider";

function App() {
  return (
    <AuthProvider>
      <RunsProvider>
        <DialogProvider>
          <Router>
            <div className={styles.App}>
              <RoutesProvider />
            </div>
          </Router>
        </DialogProvider>
      </RunsProvider>
    </AuthProvider>
  );
}

export default App;
