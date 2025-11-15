import { Card } from "../components/Card";
import { useSubmissions } from "../hooks/useSurvey";
import styles from "../App.module.css";

export function SubmissionsPage() {
  const { data: submissions } = useSubmissions();

  return (
    <Card>
      <div className={styles.content}>
        <h1>Survey Submissions</h1>
        {submissions?.map((submission: any) => (
          <div key={submission.id}>
            <p>{new Date(submission.createdAt).toLocaleString()}</p>
            <p>{JSON.stringify(submission.answers)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
