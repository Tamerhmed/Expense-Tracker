
'use server';

import { db } from '@/lib/db';
import { Transaction } from "@/types/Transaction";
import { auth } from '@clerk/nextjs/server';
import { error } from "console";

async function getTransactions(): Promise<{transactions?:Transaction[], error?:string}> {

  const {userId} =  auth();
  if(!userId) {
    return {error: 'User Not Found'}
  }
  try {
    const transactions = await db.transaction.findMany({
      where:{userId},
      orderBy:{createdAt:'desc'}
    });

    return {transactions}
  } catch (error) {
    return {error: 'Database error'}
  }
}

export default getTransactions;