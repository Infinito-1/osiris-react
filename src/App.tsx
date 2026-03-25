import { BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppContent from "./components/AppContent";
  
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
        <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;