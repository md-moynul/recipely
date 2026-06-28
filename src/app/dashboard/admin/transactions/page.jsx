import { getAllTransactions } from '@/lib/api/payment';
import React from 'react';

const TransactionsPage = async () => {
    const transactions = await getAllTransactions();
    console.log(transactions)
    return (
        <div>
            transactions
        </div>
    );
};

export default TransactionsPage;