import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  useEffect(() => {
    console.log('Editor value:', value);
  }, [value]);

  return (
    <ReactQuill value={value} onChange={onChange} theme="snow" />
  );
};

export default Editor;

