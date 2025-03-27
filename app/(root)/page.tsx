import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccounts, getAccount } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';


const MOCK_ACCOUNT_1: (Account & Bank) = {
  id: "1",
  $id: "1",
  availableBalance: 123.50,
  currentBalance: 123.50,
  officialName: "Bank of Mocks",
  mask: "****",
  institutionId: "1",
  name: "Mock Account 1",
  type: "depository",
  subtype: "checking",
  appwriteItemId: "1",
  shareableId: "1",
  accountId: "1",
  bankId: "1",
  accessToken: "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017",
  fundingSourceUrl: "https://www.plaid.com/",
  userId: "1",
}

const MOCK_ACCOUNT_2: (Account & Bank) = {
  id: "2",
  $id: "2",
  availableBalance: 123.50,
  currentBalance: 123.50,
  officialName: "Bank of Mocks",
  mask: "****",
  institutionId: "2",
  name: "Mock Account 2",
  type: "depository",
  subtype: "checking",
  appwriteItemId: "2",
  shareableId: "2",
  accountId: "2",
  bankId: "2",
  accessToken: "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017",
  fundingSourceUrl: "https://www.plaid.com/",
  userId: "2",
}

const Home = async ( { searchParams: { id, page }} : SearchParamProps ) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts  = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accounts.data[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId})
  

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox 
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions 
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}></RecentTransactions>
      </div>

      {loggedIn && (<RightSidebar 
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountsData?.slice(0, 2)}
      />)}
    </section>
  )
}

export default Home