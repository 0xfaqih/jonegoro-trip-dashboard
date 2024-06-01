import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (content: string) => {
      onChange(content);
    },
    [onChange]
  );

  return <ReactQuill value={value} onChange={handleChange} />;
};

export default Editor;
