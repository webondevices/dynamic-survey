import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { store } from "./store";
import { queryClient } from "./lib/queryClient";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <div>
            <h1>Dynamic Survey Builder</h1>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
