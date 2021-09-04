import "./transactions.css";
import TransactionTable from "./transaction-table.js"
import React, {useState, useEffect} from 'react';



function Transactions() {
    const [transactionData, setTransactionData] = useState(0);
    useEffect(() => {
      fetch('/get-transactions', {headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',}}).then(res => res.json()).then(data => {
        setTransactionData(data);
      });
    }, []);
    
    console.log("Transaction");
    console.log(transactionData);
    const data = transactionData;

    
    if (data === 0 || data === null) {
        console.log("TransactionLoading");
        return (
            <p> Loading...</p>
        )
    }

    return (
        <div className="images">
            <label className="section-title">Transaction Information</label>
            <div>
                <TransactionTable data={data} />
            </div>
        </div>
    );
}

export default Transactions;