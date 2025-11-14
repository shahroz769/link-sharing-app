import "./PreviewFieldsSketeton.css";
import { Skeleton } from "antd";
import { useMediaQuery } from "react-responsive";

const PreviewFieldsSkeleton = () => {
    const is1110 = useMediaQuery({ minWidth: 1110 });
    const is530 = useMediaQuery({ minWidth: 530 });
    const is450 = useMediaQuery({ minWidth: 450 });
    const getLabelWidth = () => {
        switch (true) {
            case is1110:
                return 100;
            case is530:
                return 100;
            case is450:
                return 50;
            default:
                return 0; // Set a default value, adjust as needed
        }
    };

    const getInputWidth = () => {
        switch (true) {
            case is1110:
                return 465;
            case is530:
                return 275;
            case is450:
                return 200;
            default:
                return 0; // Set a default value, adjust as needed
        }
    };
    return (
        <div className="profile-details-data">
            <div className="skeleton-profile-fileds">
                <Skeleton.Button
                    active
                    style={{
                        width: getLabelWidth(),
                        height: 24,
                        borderRadius: 6,
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: getInputWidth(),
                        height: 44,
                    }}
                />
            </div>
            <div className="skeleton-profile-fileds">
                <Skeleton.Button
                    active
                    style={{
                        width: getLabelWidth(),
                        height: 24,
                        borderRadius: 6,
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: getInputWidth(),
                        height: 44,
                    }}
                />
            </div>
            <div className="skeleton-profile-fileds">
                <Skeleton.Button
                    active
                    style={{
                        width: getLabelWidth(),
                        height: 24,
                        borderRadius: 6,
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: getInputWidth(),
                        height: 44,
                    }}
                />
            </div>
        </div>
    );
};

export default PreviewFieldsSkeleton;
