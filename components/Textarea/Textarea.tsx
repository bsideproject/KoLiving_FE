import React, { ChangeEvent } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({ placeholder, value, onChange, className }: TextareaProps) {
  return (
    <textarea
      className={className ?? styles.textArea}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Textarea;

Textarea.defaultProps = {
  value: '',
  placeholder: '',
};
