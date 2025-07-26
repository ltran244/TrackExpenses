import { use, useEffect } from "react";
import { apiUrl } from "../../../config/api";
import { useState } from "react";
import TransactionsTable from "./transactionsTable";
interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  // Add other properties as needed (id, date, category, etc.)
}
export default function ThisMonthTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    // Fetch transactions for this month
    const fetchTransactions = async () => {
      try {
        const date = new Date();
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        console.log(`Fetching transactions from ${startDate.toISOString()}`);
        const response = await fetch(`${apiUrl}/transaction/get?startDate=${encodeURIComponent(startDate.toISOString())}`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.items || []);
        setPrice(data.totalPrice || 0);
        console.log(data.items);
      } catch (error) {
        console.error("Error during transactions", error);
      }
    };
    fetchTransactions();
  }, []);
  return (
    <div className="bg-background flex flex-col items-center h-[600px] w-[350px] border-2 border-foreground rounded-lg">
      <h1 className="text-lg text-foreground font-Inter mt-2">This Month's Recent Transactions</h1>
      <div className="mt-2">
       {transactions.length < 1 ? <span className="text-lg text-foreground">No transactions available for this month.</span> : (
          <div>
            <span className="text-lg text-foreground">Total Price: ${price}</span>  
            <TransactionsTable transactions={transactions} />
          </div>
       )}
      </div>
    </div>
  );
}