import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [dataUrl, setDataUrl] = useState<string>();

  const blob = data => {
    const fileReader = new FileReader();
    fileReader.onload = f => setDataUrl(f.target.result);
    fileReader.readAsDataURL(data);
  };

  const onPaste = e => {
    if (e.clipboardData && e.clipboardData.files.length === 1) {
      blob(e.clipboardData.files[0]);
    }
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('paste', onPaste);

    return () => {
      window.removeEventListener('paste', onPaste);
    };
  }, []);

  return (
    <div contentEditable={true}>
      {dataUrl && <img src={dataUrl} />}
      <p>クリップボードの画像を画像化するやつ：ペーストしてちょ</p>
    </div>
  );
};

export default App;
