import "./PreviewFieldsSketeton.css";
import { Skeleton } from "antd";

const PreviewFieldsSkeleton = () => {
    return (
        <div className="profile-details-data">
            <div className="skeleton-profile-fileds">
                <Skeleton.Button
                    active
                    style={{
                        width: 100,
                        height: 24,
                        borderRadius: 6,
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: 465,
                        height: 44,
                    }}
                />
            </div>
            <div className="skeleton-profile-fileds">
                <Skeleton.Button
                    active
                    style={{
                        width: 100,
                        height: 24,
                        borderRadius: 6,
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: 465,
                        height: 44,
                    }}
                />
            </div>
            <div className="skeleton-profile-fileds">
                <Skeleton.Button
                    active
                    style={{
                        width: 100,
                        height: 24,
                        borderRadius: 6,
                    }}
                />
                <Skeleton.Input
                    active
                    style={{
                        width: 465,
                        height: 44,
                    }}
                />
            </div>
        </div>
    );
};

export default PreviewFieldsSkeleton;
