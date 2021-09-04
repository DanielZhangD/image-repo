import React from "react";
import { useTable } from 'react-table';
import BuyButton from './buy-button.js';




function ImageTable({data}) {

    const columns = React.useMemo(
        () => [
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
                },
                {
                    Header: "Image",
                    accessor: 'address',
                    maxWidth: 80,
                    minWidth: 80,
                    Cell: ({cell: {value}}) => (
                        <img
                            src = {value}
                            width={60}
                            alt={value}
                        />
                    )
                },
                {
                    Header: "Buy Image",
                    accessor: "image_id",
                    Cell: ({ cell }) => (
                        <BuyButton  imageId = {cell.row.values.image_id}/>
                    )
                }

            ],
        []
    )

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })



    // Render the UI for your table
    return (
        <table {...getTableProps()} className="image-table" style={
            {
                border: 'solid 2px Purple',
                fontFamily: 'Roboto'
            }
        }>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} className="table-header" style={
                                {
                                    borderBottom: 'solid 2px Purple', 
                                    background: '#350554', 
                                    color: 'white', 
                                    fontWeight: 'bold',
                                    fontFamily: 'Roboto',
                                    padding: '6px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px'
                                }
                            }>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} className="table-cell" style = {
                                        {
                                            padding: '5px',
                                            border: 'solid 1px gray',
                                            color: 'black',
                                            fontFamily: 'Roboto',
                                            background: 'white',
                                            fontSize: '20px'
                                        }
                                    }>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default ImageTable;