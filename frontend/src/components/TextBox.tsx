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
  nobox?: boolean | undefined;
  required?: boolean;
}
const TextBox = ({
  type = "text",
  placeholder,
  label,
  id,
  onChange,
  value,
  className,
  nobox,
  required,
}: TextBoxProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={twMerge("form-control relative", className)}>
      {label && (
        <label className="label">
          <span className={`label-text`}>{label}</span>
        </label>
      )}
      {nobox && (
        <div className={twMerge("text-xl font-lora px-6 py-3", className)}>
          {value}
        </div>
      )}
      {!nobox && (
        <>
          <input
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className={`input input-bordered bg-transparent `}
            value={value}
            id={id}
            onChange={(e) => onChange && onChange(e)}
            required={required ? true : false}
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
        </>
      )}
    </div>
  );
};

export default TextBox;
