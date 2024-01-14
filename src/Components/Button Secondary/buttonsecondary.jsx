import "./buttonsecondary.css";
import previewIcon from "../../assets/images/icon-preview-header.svg";

const Buttonsecondary = ({ buttonSecondaryText, onClick, screenWidth }) => {
    return (
        <button
            className="button-secondary"
            onClick={onClick}
            style={screenWidth ? { padding: "11px 16px" } : null}
        >
            {screenWidth ? (
                <img src={previewIcon} alt="Preview" />
            ) : (
                <h3>{buttonSecondaryText}</h3>
            )}
        </button>
    );
};

export default Buttonsecondary;
