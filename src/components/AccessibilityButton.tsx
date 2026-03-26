import { useState, useEffect } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

export default function AccessibilityButton() {
  const [zoom, setZoom] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [bold, setBold] = useState<boolean>(false);
  const [lineSpacing, setLineSpacing] = useState<number>(1.5);

  const aumentarFonte = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
  const diminuirFonte = () => setZoom((prev) => Math.max(prev - 0.1, 0.8));

  const ativarAudio = () => {
    const texto = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    speechSynthesis.speak(utterance);
  };

  const pararAudio = () => speechSynthesis.cancel();

  const alternarBold = () => setBold((prev) => !prev);

  const aumentarEspaco = () => setLineSpacing((prev) => Math.min(prev + 0.2, 2));
  const diminuirEspaco = () => setLineSpacing((prev) => Math.max(prev - 0.2, 1));

  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom}em`;
    document.body.style.fontWeight = bold ? "bold" : "normal";
    document.body.style.lineHeight = `${lineSpacing}`;
  }, [zoom, bold, lineSpacing]);

  return (
    <div
      className="fixed bottom-[calc(8.5rem+100px)] right-2.5 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="bg-[#2F80ED] text-white rounded-md shadow-lg flex items-center justify-center w-10 h-10"
        aria-label="Abrir recursos de acessibilidade visual"
      >
        <EyeIcon className="h-5 w-5" />
      </button>

      {open && (
        <div className="mt-3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col gap-3 w-56">
          {/* Zoom de fonte */}
          <div className="flex gap-2 items-center">
            <button
              onClick={aumentarFonte}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              A+
            </button>
            <button
              onClick={diminuirFonte}
              className="bg-gray-500 text-white px-3 py-2 rounded"
            >
              A−
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {(zoom * 100).toFixed(0)}%
            </span>
          </div>

          {/* Negrito */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Letra destacada
            </span>
            <button
              onClick={alternarBold}
              className="bg-purple-500 text-white px-3 py-2 rounded"
            >
              {bold ? "Normal" : "Negrito"}
            </button>
          </div>

          {/* Espaçamento de linha */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Espaçamento de linha
            </span>
            <div className="flex gap-2">
              <button
                onClick={aumentarEspaco}
                className="bg-blue-400 text-white px-3 py-2 rounded"
              >
                +
              </button>
              <button
                onClick={diminuirEspaco}
                className="bg-gray-400 text-white px-3 py-2 rounded"
              >
                −
              </button>
            </div>
          </div>

          {/* Áudio */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Descrição em áudio
            </span>
            <div className="flex gap-2">
              <button
                onClick={ativarAudio}
                className="bg-green-500 text-white px-3 py-2 rounded"
              >
                Ativar
              </button>
              <button
                onClick={pararAudio}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Parar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}