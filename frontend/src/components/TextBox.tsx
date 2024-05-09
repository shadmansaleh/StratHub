import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface TextBoxProps {
  type?: string;
  placeholder: string;
  className?: string;
  label?: string;
  value?: string;
  id?: string;
  onChange?: (value: any) => void;
}
const TextBox = ({
  type = "text",
  placeholder,
  label,
  id,
  onChange,
  value,
  className,
}: TextBoxProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={twMerge("form-control relative", className)}>
      {label && (
        <label className="label">
          <span className={`label-text`}>{label}</span>
        </label>
      )}
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className={`input input-bordered bg-transparent `}
        value={value}
        id={id}
        onChange={(e) => onChange && onChange(e)}
        required
      />
      <div
        className={type === "password" ? "" : "hidden"}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <FaEyeSlash
            size="20"
            className="absolute cursor-pointer right-2 top-[50%] translate-y-[50%] opacity-50 hover:opacity-100"
          />
        ) : (
          <FaEye
            size="20"
            className="absolute cursor-pointer right-2 top-[50%] translate-y-[50%] opacity-50 hover:opacity-100"
          />
        )}
      </div>
    </div>
  );
};

export default TextBox;
