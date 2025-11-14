import { Card } from "../components/Card";
import styles from "../App.module.css";

export function SurveyPage() {
  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h1 className={styles.header}>Survey</h1>
        </div>
      </Card>
    </div>
  );
}
