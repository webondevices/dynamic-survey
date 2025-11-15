import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { store } from "./store";
import { queryClient } from "./lib/queryClient";
import { IntroPage } from "./pages/IntroPage";
import { SurveyPage } from "./pages/SurveyPage";
import { CompletePage } from "./pages/CompletePage";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import { Button } from "./components/Button";
import styles from "./App.module.css";

function AppContent() {
  const context = useTheme();

  return (
    <BrowserRouter>
      {context?.toggleTheme && (
        <Button onClick={context.toggleTheme} className={styles.themeToggle}>
          {context.theme === "light" ? "Dark" : "Light"}
        </Button>
      )}
      <img
        src="https://immersive.co.uk/wp-content/uploads/2023/07/immersive-logo@2x.png"
        alt="Immersive Logo"
        className={styles.logo}
      />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
