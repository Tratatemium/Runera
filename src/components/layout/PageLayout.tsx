import styles from "./PageLayout.module.css";
import bg from "../../assets/bg1.png"

import { Outlet } from "react-router-dom";
import { Header, Footer } from "./";

function PageLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.contentWrapper} style={{ backgroundImage: `url(${bg})`}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export { PageLayout };
