import "./linkscustomization.css";
import handle from "../../assets/images/icon-drag-and-drop.svg";
import InputField from "../Input Field";
import LinkIcon from "../../assets/images/icon-link.svg";
import DropDown from "../DropDown/DropDown";
import { useState, useEffect, useContext } from "react";
import linkContext from "../../../context/linkContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Linkscustomization = ({ order, index, link, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: link.order, handle: true });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);
    const [url, setUrl] = useState();
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const handlePlatformChange = (newPlatform) => {
        setSelectedPlatform(newPlatform);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="link-customization-not-empty-container"
        >
            <div className="link-header">
                <div
                    {...listeners}
                    className="link-handle grabbing"
                >
                    <div className="link-handle-img">
                        <img src={handle} alt="Drag and Drop Handle" />
                    </div>
                    <h3>Link #{order}</h3>
                </div>
                <div onClick={() => onRemove(index)} className="link-remove">
                    <p>Remove</p>
                </div>
            </div>
            <div className="links-dropdown">
                <span>Platform</span>
                <DropDown
                    index={index}
                    onSelectPlatform={handlePlatformChange}
                />
            </div>
            <div className="link-url">
                <InputField
                    index={index}
                    disabled={selectedPlatform ? false : true}
                    value={link.link || ""}
                    label={"Link"}
                    iconSrc={LinkIcon}
                    altText={"Link"}
                    onInputChange={(urlVal) => setUrl(urlVal)}
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

export default Linkscustomization;
