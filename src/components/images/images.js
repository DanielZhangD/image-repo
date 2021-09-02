import React from "react";
import "./projects.css";
import ImageCard from "./image-card";

function Images(imageData) {
    const data = imageData;
    return (
        <div className="projects">
            <label className="section-title">Images</label>
            <div>
                {data.map((image) => {
                    return <ImageCard image={image} />;
                })}
            </div>
        </div>
    );
}

export default Images;