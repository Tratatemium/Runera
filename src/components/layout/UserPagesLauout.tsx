import styles from "./UserPagesLauout.module.css";
import bg from "../../assets/bg1.png";

import { Outlet } from "react-router-dom";

function UserPagesLauout() {
  return (
    <div className={styles.layout} style={{ backgroundImage: `url(${bg})` }}>
      <Outlet />
    </div>
  );
}

export { UserPagesLauout };
