import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  answers: Record<string, unknown>;
  currentQuestionIndex: number;
  validationErrors: Record<string, string>;
}

const initialState: SurveyState = {
  answers: {},
  currentQuestionIndex: 0,
  validationErrors: {},
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
  },
});

export const {
  setAnswer,
  setValidationError,
  clearValidationError,
  setCurrentQuestionIndex,
} = surveySlice.actions;

export default surveySlice.reducer;
