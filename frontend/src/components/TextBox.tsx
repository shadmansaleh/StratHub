interface TextBoxProps {
  type: string;
  label: string;
  placeholder: string;
}
const TextBox = ({ type, label, placeholder }: TextBoxProps) => (
  <div className="form-control">
    {label && (
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
    )}
    <input
      type={type}
      placeholder={placeholder}
      className="input input-bordered bg-transparent"
      required
    />
  </div>
);

export default TextBox;
