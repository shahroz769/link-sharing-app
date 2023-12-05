import "./tabs.css";
const Tabs = ({
    imgSrc,
    altText,
    tabText,
    clickHandler,
    clickProp,
    active,
}) => {
    return (
        <div
            onClick={() => clickHandler(clickProp || null) || null}
            className={`tab-container${active ? " active" : ""}`}
        >
            <div className="tab-img">
                <img src={imgSrc} alt={altText} />
            </div>
            <div className="tab-text">
                <h3>{tabText}</h3>
            </div>
        </div>
    );
};

export default Tabs;
