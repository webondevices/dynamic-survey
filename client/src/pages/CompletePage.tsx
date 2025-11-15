import { useSelector } from "react-redux";
import { Card } from "../components/Card";
import styles from "../App.module.css";
import { RootState } from "../store";

export function CompletePage() {
  const aiMessage = useSelector((state: RootState) => state.survey.aiMessage);

  return (
    <Card>
      <div className={styles.content}>
        <h1>Thank you for your feedback!</h1>
        <p>{aiMessage || "Your responses have been submitted successfully."}</p>
      </div>
    </Card>
  );
}
