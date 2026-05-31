import { BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppContent from "./components/AppContent";
import { AuthProvider } from "./contexts/AuthProvider";
  
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;