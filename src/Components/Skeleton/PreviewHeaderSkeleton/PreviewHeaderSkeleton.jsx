import { Skeleton } from "antd";

const PreviewHeaderSkeleton = () => {
    return (
        <div className="preview-card-header">
            <div className="preview-card-header-img">
                <Skeleton.Avatar active style={{ width: 110, height: 110 }} />
            </div>
            <div className="mockup-head-title">
                <div className="mockup-head-name">
                    <Skeleton.Button
                        active
                        style={{
                            width: 120,
                            height: 24,
                            borderRadius: 8,
                        }}
                    />
                </div>
                <div className="mockup-head-name">
                    <Skeleton.Button
                        active
                        style={{
                            width: 200,
                            height: 18,
                            borderRadius: 6,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PreviewHeaderSkeleton;
