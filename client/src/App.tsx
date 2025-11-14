import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./store";
import { queryClient } from "./lib/queryClient";
import { IntroPage } from "./pages/IntroPage";
import { SurveyPage } from "./pages/SurveyPage";
import { CompletePage } from "./pages/CompletePage";
import styles from "./App.module.css";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrowserRouter>
            <img
              src="https://immersive.co.uk/wp-content/uploads/2023/07/immersive-logo@2x.png"
              alt="Immersive Logo"
              className={styles.logo}
            />
            <Routes>
              <Route path="/" element={<IntroPage />} />
              <Route path="/survey" element={<SurveyPage />} />
              <Route path="/complete" element={<CompletePage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
