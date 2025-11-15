import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  answers: Record<string, unknown>;
  currentQuestionIndex: number;
  validationErrors: Record<string, string>;
  surveySubmitted: boolean;
  aiMessage: string | null;
}

const initialState: SurveyState = {
  answers: {},
  currentQuestionIndex: 0,
  validationErrors: {},
  surveySubmitted: false,
  aiMessage: null,
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ name: string; value: unknown }>
    ) => {
      state.answers[action.payload.name] = action.payload.value;
    },
    setValidationError: (
      state,
      action: PayloadAction<{ name: string; error: string }>
    ) => {
      state.validationErrors[action.payload.name] = action.payload.error;
    },
    clearValidationError: (state, action: PayloadAction<string>) => {
      delete state.validationErrors[action.payload];
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
    },
    setSurveySubmitted: (state, action: PayloadAction<boolean>) => {
      state.surveySubmitted = action.payload;
    },
    setAiMessage: (state, action: PayloadAction<string>) => {
      state.aiMessage = action.payload;
    },
  },
});

export const {
  setAnswer,
  setValidationError,
  clearValidationError,
  setCurrentQuestionIndex,
  setSurveySubmitted,
  setAiMessage,
} = surveySlice.actions;

export default surveySlice.reducer;
