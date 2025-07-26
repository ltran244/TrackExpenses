interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  // Add other properties as needed (id, date, category, etc.)
}
export default function TransactionsTable(props: { transactions: Transaction[] }) {
  return (
    <table className="text-lg text-foreground w-full">
      <thead>
        <th scope="col">Name</th>
      </thead>
    </table>
  );
}