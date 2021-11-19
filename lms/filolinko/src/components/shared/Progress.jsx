import { useEffect, useState } from "react";

export default function Progress({ progress, url, file }) {
  const [isUploading, setIsUploading] = useState(true);
  const style = {
    width: `${progress}%`,
    height: "15px",
    backgroundColor: "#254e58",
  };

  useEffect(() => {
    setIsUploading(true);
  }, [url]);

  useEffect(() => {
    setIsUploading(false);
  }, [file]);

  return (
    <div className="progress-wrap">
      <span className="complete">
        {isUploading && url && (
          <span>
            Upload complete <i className="fas fa-check-circle" />
          </span>
        )}
      </span>
      <div className="progress" style={style}></div>
    </div>
  );
}
