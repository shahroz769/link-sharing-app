import "./linkscustomization!empty.css";
import handle from "../../assets/images/icon-drag-and-drop.svg";
import InputField from "../Input Field";
import LinkIcon from "../../assets/images/icon-link.svg";
import DropDown from "../DropDown/DropDown";
import { useState } from "react";

const Linkscustomizationnotempty = () => {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    console.log(selectedPlatform);

    const handlePlatformChange = (newPlatform) => {
        setSelectedPlatform(newPlatform);
    };
    return (
        <div className="link-customization-not-empty-container">
            <div className="link-header">
                <div className="link-handle">
                    <div className="link-handle-img">
                        <img src={handle} alt="Drag and Drop Handle" />
                    </div>
                    <h3>Link #1</h3>
                </div>
                <div className="link-remove">
                    <p>Remove</p>
                </div>
            </div>
            <div className="links-dropdown">
                <span>Platform</span>
                <DropDown onSelectPlatform={handlePlatformChange} />
            </div>
            <div className="link-url">
                <InputField
                    label={"Link"}
                    iconSrc={LinkIcon}
                    altText={"Link"}
                    placeholderText={
                        selectedPlatform
                            ? selectedPlatform.placeholder
                            : "Select an option from dropdown"
                    }
                />
            </div>
        </div>
    );
};

export default Linkscustomizationnotempty;
