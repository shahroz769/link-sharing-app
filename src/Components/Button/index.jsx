import "./index.css";

const Button = ({ buttonText, handleClick }) => {
    return (
        <button onClick={handleClick || null} className="button">
            <h3>{buttonText}</h3>
        </button>
    );
};
export default Button;
