import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useFocusMain(): void {
  const location = useLocation();

  useEffect(() => {
    const main = document.getElementById("main-content");

    if (main instanceof HTMLElement) {
      main.focus();
    }
  }, [location]);
}