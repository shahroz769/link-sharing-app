import "./linkscustomization.css";
import handle from "../../assets/images/icon-drag-and-drop.svg";
import InputField from "../Input Field";
import LinkIcon from "../../assets/images/icon-link.svg";
import DropDown from "../DropDown/DropDown";
import { useContext } from "react";
import linkContext from "../../../context/linkContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Linkscustomization = ({ order, index, link, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: link.order, handle: true });
    const style = isDragging
        ? {
              transition,
              transform: CSS.Transform.toString(transform),
              zIndex: 1000,
              border: "1px solid var(--purple-60-)",
          }
        : {
              transition,
              transform: CSS.Transform.toString(transform),
              border: "none",
          };

    const { linksData, updateLinksData, setLinksData } =
        useContext(linkContext);

    const handlePlatformChange = (newPlatform) => {
        const updatedLinksData = [...linksData];
        updatedLinksData[index].platform = newPlatform;
        setLinksData(updatedLinksData);
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="link-customization-not-empty-container"
        >
            <div className="link-header">
                <div {...listeners} className="link-handle grabbing">
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
                    disabled={linksData[index]?.platform ? false : true}
                    value={linksData[index]?.link || ""}
                    label={"Link"}
                    iconSrc={LinkIcon}
                    altText={"Link"}
                    placeholderText={
                        linksData[index]?.platform?.placeholder ||
                        "Select an option from dropdown"
                    }
                />
            </div>
        </div>
    );
};

export default Linkscustomization;
