import getUserBalance from '@/actions/getUserBalance';
import { addCommas } from '@/lib/utils';
import React from 'react';
import { toast } from 'react-toastify';

export default async function Balance() {
  const { balance, error } = await getUserBalance();

  if (error) {
    toast.error(error);
  }

  return (
    <>
    
      <h4>Your Balance</h4>
      <div>{addCommas(Number(balance?.toFixed(2) ?? 0))}</div>
    </>
  );
}
