import { Card } from "../components/Card";
import { useSubmissions } from "../hooks/useSurvey";
import styles from "../App.module.css";

export function SubmissionsPage() {
  const { data: submissions } = useSubmissions();

  return (
    <Card>
      <div className={styles.content} style={{ marginTop: "4rem" }}>
        <h1>Survey Submissions</h1>
        {submissions?.map((submission: any) => (
          <div key={submission.id} style={{ marginBottom: "2rem" }}>
            <pre>{new Date(submission.createdAt).toLocaleString()}</pre>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                textAlign: "left",
              }}
            >
              {JSON.stringify(submission.answers, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </Card>
  );
}
