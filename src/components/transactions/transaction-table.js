import React from "react";
import { useTable } from 'react-table';



function TransactionTable({data }) {
    const columns = React.useMemo(
        () => [
                {
                    Header: 'Transaction Type',
                    accessor: 'transaction_type',
                },
                {
                    Header: 'Transaction Time',
                    accessor: 'transaction_time',
                },
                {
                    Header: 'Associated Image',
                    accessor: 'image_name',
                },
                {
                    Header: 'Price',
                    accessor:'cost'
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
        <table {...getTableProps()} className="transaction-table" style={
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
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            color: 'black',
                                            fontFamily: 'Roboto',
                                            background: 'white'
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

export default TransactionTable;