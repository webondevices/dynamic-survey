import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { ProgressBar } from "../components/ProgressBar";
import { SurveyQuestion, FormValue } from "../components/SurveyQuestion";
import { useSurveyConfig, useSubmitSurvey } from "../hooks/useSurvey";
import {
  setAnswer,
  setCurrentQuestionIndex,
  setSurveySubmitted,
  setAiMessage,
} from "../store/surveySlice";

import styles from "../App.module.css";
import surveyStyles from "./SurveyPage.module.css";
import { RootState } from "../store";

export function SurveyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: config } = useSurveyConfig();
  const submitMutation = useSubmitSurvey();

  const { answers, currentQuestionIndex } = useSelector(
    (state: RootState) => state.survey
  );

  const canGoPrevious = currentQuestionIndex > 0;

  const [currentQuestionValid, setCurrentQuestionValid] = useState(false);
  const [currentQuestionValue, setCurrentQuestionValue] =
    useState<unknown>(undefined);

  // Filter questions based on conditions
  const visibleQuestions = useMemo(() => {
    if (!config) return [];

    return config.questions.filter((question) => {
      if (!question.condition) return true;

      const conditionValue = answers[question.condition.name];
      return conditionValue === question.condition.value;
    });
  }, [config, answers]);

  const totalQuestions = visibleQuestions.length;
  const currentQuestion = visibleQuestions[currentQuestionIndex];

  const handleValidChange = (isValid: boolean, value: unknown) => {
    setCurrentQuestionValid(isValid);
    setCurrentQuestionValue(value);
  };

  const handleNavigate = (direction: "next" | "previous") => {
    if (currentQuestion && currentQuestionValid) {
      dispatch(
        setAnswer({ name: currentQuestion.name, value: currentQuestionValue })
      );
    }

    const newIndex =
      direction === "next"
        ? currentQuestionIndex + 1
        : currentQuestionIndex - 1;

    dispatch(setCurrentQuestionIndex(newIndex));
    setCurrentQuestionValid(false);
    setCurrentQuestionValue(undefined);
  };

  const handleSubmit = async () => {
    if (currentQuestion && currentQuestionValid) {
      dispatch(
        setAnswer({ name: currentQuestion.name, value: currentQuestionValue })
      );

      const response = await submitMutation.mutateAsync({
        answers: {
          ...answers,
          [currentQuestion.name]: currentQuestionValue,
        } as Record<string, string | number | boolean | string[]>,
      });

      if (response.message) {
        dispatch(setAiMessage(response.message));
      }

      dispatch(setSurveySubmitted(true));
      navigate("/complete");
    }
  };

  if (!config || !currentQuestion) return null;

  return (
    <>
      <ProgressBar
        max={totalQuestions}
        current={currentQuestionIndex + 1}
        position="top"
      />
      <Card>
        <div className={styles.content}>
          <h1>{config.title}</h1>
          <p className={surveyStyles.questionLabel}>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </p>

          <SurveyQuestion
            key={currentQuestion.name}
            question={currentQuestion}
            initialValue={answers[currentQuestion.name] as FormValue}
            onValidChange={handleValidChange}
          />

          <div className={surveyStyles.navigationButtons}>
            {canGoPrevious && (
              <Button
                onClick={() => handleNavigate("previous")}
                variant="secondary"
              >
                Previous
              </Button>
            )}

            {currentQuestionIndex < totalQuestions - 1 ? (
              <Button
                onClick={() => handleNavigate("next")}
                variant="primary"
                disabled={!currentQuestionValid}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant="primary"
                disabled={!currentQuestionValid || submitMutation.isPending}
              >
                {submitMutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
