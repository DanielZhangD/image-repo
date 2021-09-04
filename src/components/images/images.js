import "./images.css";
import ImageTable from "./image-table.js"
import React, {useState, useEffect} from 'react';


function Images() {
    const [imageData, setImageData] = useState(0);
    useEffect(() => {
      fetch('/get-images', {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',}}).then(res => res.json()).then(data => {
        setImageData(data);
      });
    }, []);
  
    console.log(imageData);
    const data = imageData;

    
    if (imageData === 0 || imageData === null) {
        return (
            <p> Loading...</p>
        )
    }

    return (
        <div className="images">
            <label className="section-title">Image Information</label>
            <div>
                <ImageTable data={data} />
            </div>
        </div>
    );
}

export default Images;