import React from 'react'
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import TransactionImportWizard from '@/components/ImportWizard';

const MOCK_TRANSACTIONS = [
  {
      "id": "GXWQ1pbNL4SbLWKbVLLXIdBe1N6rbaF6peBzv",
      "name": "Uber 063015 SF**POOL**",
      "paymentChannel": "online",
      "type": "online",
      "accountId": "wZdKrND8nkHwa3GwmaapSz5pJDQleytPmMVEl",
      "amount": 5.4,
      "pending": false,
      "category": "Travel",
      "date": "2025-03-20",
      "image": "https://plaid-merchant-logos.plaid.com/uber_1060.png"
  },
  {
      "id": "vQxqK4b8GoInd3EnkddmumQVB65WZMUqK3z9W",
      "name": "CREDIT CARD 3333 PAYMENT *//",
      "paymentChannel": "other",
      "type": "other",
      "accountId": "58doqrz9KAs5v9R5gvvwU1kADKE5LWF58JdGg",
      "amount": 25,
      "pending": false,
      "category": "Payment",
      "date": "2025-03-20",
      "image": null
  },
  {
      "id": "ndy5WKm8L7IRlJGRAllPiwqRLavpxjiA5yeL4",
      "name": "United Airlines",
      "paymentChannel": "in store",
      "type": "in store",
      "accountId": "wZdKrND8nkHwa3GwmaapSz5pJDQleytPmMVEl",
      "amount": -500,
      "pending": false,
      "category": "Travel",
      "date": "2025-03-18",
      "image": "https://plaid-merchant-logos.plaid.com/united_airlines_1065.png"
  },
  {
      "id": "bnLx71emdKIjK8GjbKKlipbjkq6zrZumk4xMJ",
      "name": "McDonald's",
      "paymentChannel": "in store",
      "type": "in store",
      "accountId": "wZdKrND8nkHwa3GwmaapSz5pJDQleytPmMVEl",
      "amount": 12,
      "pending": false,
      "category": "Food and Drink",
      "date": "2025-03-17",
      "image": "https://plaid-merchant-logos.plaid.com/mcdonalds_619.png"
  },
  {
      "id": "mxm5EqW81jIARjEAXRRNIeZAgdRWvDigovmVK",
      "name": "Starbucks",
      "paymentChannel": "in store",
      "type": "in store",
      "accountId": "wZdKrND8nkHwa3GwmaapSz5pJDQleytPmMVEl",
      "amount": 4.33,
      "pending": false,
      "category": "Food and Drink",
      "date": "2025-03-17",
      "image": "https://plaid-merchant-logos.plaid.com/starbucks_956.png"
  }
]

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((a: Account) => (
              <BankCard 
                key={accounts.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
        </div>

        <TransactionImportWizard transactions={MOCK_TRANSACTIONS}/>
      </div>
    </section>
  )
}

export default Transfer

// import HeaderBox from '@/components/HeaderBox'
// import PaymentTransferForm from '@/components/PaymentTransferForm';
// import { getAccounts } from '@/lib/actions/bank.actions';
// import { getLoggedInUser } from '@/lib/actions/user.actions';
// import React from 'react'

// const Transfer = async () => {
//   const loggedIn = await getLoggedInUser();
//   const accounts = await getAccounts({ 
//     userId: loggedIn.$id 
//   })

//   if(!accounts) return;
  
//   const accountsData = accounts?.data;

//   return (
//     <section className="payment-transfer">
//       <HeaderBox 
//         title="Payment Transfer"
//         subtext="Please provide any specific details or notes related to the payment transfer"
//       />

//       <section className="size-full pt-5">
//         <PaymentTransferForm accounts={accountsData} />
//       </section>
//     </section>
//   )
// }

// export default Transfer