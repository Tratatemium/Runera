import { ReactNode } from "react";
import styles from "./Panel.module.css";

interface PanelProps {
  children: ReactNode;
  variant: "light" | "frosted" | "frostedWarm";
}

function Panel({ children, variant }: PanelProps) {
  return <div className={`${styles.panel} ${styles[variant]}`}>{children}</div>;
}

export { Panel };
