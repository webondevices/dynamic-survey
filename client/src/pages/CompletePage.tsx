import { Card } from "../components/Card";
import styles from "../App.module.css";

export function CompletePage() {
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h1 className={styles.header}>Thank you for your feedback!</h1>
          <p className={styles.paragraph}>
            Your responses have been submitted successfully.
          </p>
        </div>
      </Card>
    </div>
  );
}
