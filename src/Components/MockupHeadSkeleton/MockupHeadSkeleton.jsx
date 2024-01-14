import { Skeleton } from "antd";

const MockupHeadSkeleton = () => {
    return (
        <div className="mockup-head">
            <Skeleton.Avatar
                active
                style={{
                    width: 106,
                    height: 106,
                    borderRadius: "50%",
                }}
            />
            <div className="mockup-head-title">
                <Skeleton.Button
                    active
                    style={{
                        width: 160,
                        height: 16,
                        borderRadius: 104,
                    }}
                />
                <Skeleton.Button
                    active
                    style={{
                        width: 72,
                        height: 8,
                        borderRadius: 104,
                    }}
                />
            </div>
        </div>
    );
};

export default MockupHeadSkeleton;
