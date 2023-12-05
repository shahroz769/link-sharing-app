import emptyLinks from "../../assets/images/illustration-empty.svg";
import Buttonsecondary from "../Button Secondary/buttonsecondary.jsx";

const Linkscustomizationempty = () => {
    return (
        <div className="links-customization-links">
            <div className="links-customization-empty-image">
                <img src={emptyLinks} alt="Empty Links" />
            </div>
            <div className="links-customization-empty-text">
                <h2>Let’s get you started</h2>
                <p>
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We’re
                    here to help you share your profiles with everyone!
                </p>
            </div>
        </div>
    );
};

export default Linkscustomizationempty;
