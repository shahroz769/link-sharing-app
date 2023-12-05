import "./buttonsecondary.css";

const Buttonsecondary = ({ buttonSecondaryText, onClick }) => {
    return (
        <button className="button-secondary" onClick={onClick}>
            <h3>{buttonSecondaryText}</h3>
        </button>
    );
};

export default Buttonsecondary;
