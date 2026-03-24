import { useEffect } from 'react';
const VLibrasAccessibility = () => {
  useEffect(() => {
    const scriptId = 'vlibras-plugin-script';

    const initWidget = () => {
      if (window.VLibras && typeof window.VLibras.Widget === 'function') {
        try {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        } catch (e) {
          console.error('Erro ao inicializar VLibras:', e);
        }
      }
    };

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        setTimeout(initWidget, 500);
      };
      document.head.appendChild(script);
    } else if (window.VLibras) {
      initWidget();
    }
  }, []);

  return (
    <>
      {
        
      }
      <div 
        {...{ vw: 'true' as 'true' }}
        className="enabled fixed z-[9999]"
      >
        <div 
          {...{ 'vw-access-button': 'true' as 'true' }}
          className="active fixed bottom-5 right-5 z-[10000] cursor-pointer"
        ></div>
        <div 
          {...{ 'vw-plugin-wrapper': 'true' as 'true' }}
          className="fixed z-[9998]"
        >
          <div className="vw-plugin-top-wrapper relative"></div>
        </div>
      </div>
    </>
  );
};

declare global {
  interface Window {
    VLibras?: {
      Widget: new (appUrl: string) => any;
    };
  }
}

export default VLibrasAccessibility;
