import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import styles from "../App.module.css";

export function IntroPage() {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate("/survey");
  };

  return (
    <Card>
      <div className={styles.content}>
        <h1 className={styles.header}>Welcome to Our Survey</h1>
        <p className={styles.paragraph}>
          We'd love to hear your thoughts! This survey will take just a few
          minutes to complete. Your feedback helps us improve our service.
        </p>
        <Button onClick={handleStartSurvey}>Start Survey</Button>
      </div>
    </Card>
  );
}
