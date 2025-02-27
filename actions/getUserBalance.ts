'use server';

import Balance from '@/components/Balance';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function getUserBalance(): Promise<{
  balance?: number;
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });
    const balance = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    return { balance };
  } catch (error) {
    return { error: 'Database error' };
  }
}
