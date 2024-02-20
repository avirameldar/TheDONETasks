import "./input.css";
const Input = ({ error, ...rest }) => {
  return (
    <div className="form-group my-1">
      <input
        {...rest}
        id={rest.name}
        className={[error && "is-invalid"].filter(Boolean).join("")}
      />
      <span className="feedback" style={{ marginLeft: 20 }}>
        {error}
      </span>
    </div>
  );
};

export default Input;
