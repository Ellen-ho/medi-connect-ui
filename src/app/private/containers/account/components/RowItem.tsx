import React from 'react';

interface RowItemProps {
  label: string;
  value: string;
  error?: boolean;
  helperText?: string;
  onChange: (value: string) => void; // 新增onChange函數
}

const RowItem: React.FC<RowItemProps> = ({
  label,
  value,
  error,
  helperText,
  onChange, 
}) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <span>{helperText}</span>}
    </div>
  );
};

export default RowItem;