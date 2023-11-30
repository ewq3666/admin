import TransactionList from './AddTransactions';
import { BalanceList, WithdrawalList } from './Balance';
import ContestManager from './Contest';
import Dashboard from './Dashboard';
import Home from './Home';
import PaymentManager from './PaymentManager';
import AddQuestion from './Question';
import WithdrawalRequestsTable from './Withdraw';
import logo from './logo.svg';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          element:<Home/>,
          index:true
        },
        {
          path: "contest",
          element: <ContestManager />,
        },
        { path: "payments", element: <PaymentManager /> },
        { path: "balance", element: <BalanceList /> },
        { path: "addtransactions", element: <TransactionList /> },
        { path: "withdrawtransactions", element: <WithdrawalList /> },
        { path: "WithdrawalRequestsTable", element: <WithdrawalRequestsTable /> },
        { path: "addquestions", element: <AddQuestion /> },
        { path: "home", element: <Home /> },
      ],
    },
  ]);

  return (
    <div>

      {element}
    </div>
  );
}

export default App;
