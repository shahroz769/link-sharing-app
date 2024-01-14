import { Space, Skeleton } from "antd";

const LinkInputSkeleton = () => {
    return (
        <div className="link-customization-not-empty-container">
            <Space
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Skeleton.Button
                    active
                    style={{
                        width: "100px",
                        height: "16px",
                    }}
                />
                <Skeleton.Button
                    active
                    style={{
                        width: "60px",
                        height: "16px",
                    }}
                />
            </Space>
            <Skeleton.Button
                active
                style={{
                    width: "30px",
                    height: "8px",
                    // marginTop: "-10px",
                }}
            />
            <Skeleton.Input
                active
                style={{
                    width: "100%",
                    marginTop: "-15px",
                }}
            />
            <Skeleton.Button
                active
                style={{
                    width: "30px",
                    height: "8px",
                    // marginTop: "-25px",
                }}
            />
            <Skeleton.Input
                active
                style={{
                    width: "100%",
                    marginTop: "-15px",
                }}
            />
        </div>
    );
};

export default LinkInputSkeleton;
