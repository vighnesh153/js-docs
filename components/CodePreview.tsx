import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/system';

interface CodePreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<CodePreviewProps> = ({ code, err }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current?.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <Box
      // The following classname is being used in global.scss
      className="preview-wrapper"
      sx={{
        position: 'relative',
        height: '100%',
        flexGrow: 1,
      }}
    >
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
      {err && (
        <Box
          className="preview-error"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            color: 'red',
          }}
        >
          {err}
        </Box>
      )}
    </Box>
  );
};

export default CodePreview;
