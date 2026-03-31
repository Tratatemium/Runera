import styles from "./Dialog.module.css";

import { Button } from "./";

export interface DialogProps {
  title: string;
  text: string;
  action1Text: string;
  onAction1: () => void;
  action2Text: string;
  onAction2: () => void;
}

function Dialog({
  title,
  text,
  action1Text,
  onAction1,
  action2Text,
  onAction2,
}: DialogProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={styles.actionsWrapper}>
          <Button
            buttonText={action1Text}
            type="button"
            variant="primary"
            onClick={onAction1}
          />
          <Button
            buttonText={action2Text}
            type="button"
            variant="secondary"
            onClick={onAction2}
          />
        </div>
      </div>
    </div>
  );
}

export { Dialog };
