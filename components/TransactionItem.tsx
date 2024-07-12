'use client';

import deleteTransaction from '@/actions/deleteTransaction';
import { addCommas } from '@/lib/utils';
import { Transaction } from '@/types/Transaction';
import React from 'react';
import { toast } from 'react-toastify';

export default function TransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const sign = transaction.amount < 0 ? '-' : '+';

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction'
    );
    if (!confirmed) return;

    const { message, error } = await deleteTransaction(transactionId);
    if (error) {
      toast.error(error);
    }

    toast.success(message);
  };
  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text}
      <span>
        {sign}${addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className='delete-btn'
      >
        x
      </button>
    </li>
  );
}
