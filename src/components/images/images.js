import React from "react";
import "./images.css";
import ImageTable from "./image-table.js"

function Images({imageData}) {
    const data = imageData;

    const columns = React.useMemo(
        () => [
                {
                    Header: 'Image Information',
                        columns: [
                        {
                            Header: 'Name',
                            accessor: 'image_name',
                        },
                        {
                            Header: 'Description',
                            accessor: 'description',
                        },
                        {
                            Header: 'Price',
                            accessor:'price'
                        },
                        {
                            Header: 'Stock',
                            accessor: 'stock'
                        }
                    ],
                },
            ],
        []
    )

    
    if (imageData === 0 || imageData === null) {
        return (
            <p> Loading...</p>
        )
    }

    return (
        <div className="images">
            <label className="section-title">Image Information</label>
            <div>
                <ImageTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default Images;