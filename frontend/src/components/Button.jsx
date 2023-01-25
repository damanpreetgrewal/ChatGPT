const Button = ({ onClick, text }) => (
  <div className="button-picker" onClick={onClick}>
    {text}
  </div>
);

export default Button;
