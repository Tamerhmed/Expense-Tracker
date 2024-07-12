import { Transaction } from '@/types/Transaction';
import getTransactions from '@/actions/getTransactions';
import TransactionItem from './TransactionItem';

export default async function TransactionList() {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className='error'>{error}</p>;
  }
  return (
    <>
      <h3>History</h3>
      <ul className='list'>
        {transactions &&
          transactions.map((transaction: Transaction) => (
            <TransactionItem transaction={transaction} />
          ))}
      </ul>
    </>
  );
}
