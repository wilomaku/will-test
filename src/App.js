import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push, update, child } from "firebase/database";

import './App.css';

function App() {

  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([]);


  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [isIncome, setIsIncome] = useState(null);

  console.log(categories, category);

  const resetForm = () => {
    setAmount('');
    setCategory('');
    setIsIncome(null);
  };
  
  useEffect(() => {
    const db = getDatabase();
    const entriesData = ref(db, 'entries');
    
    onValue(entriesData, (snapshot) => {
      const data = snapshot.val();
      // make an array out of the object to render it nicely
      const list = Object.keys(data).map(entryId => ({id: entryId, ...data[entryId]}));
      // sort by timestamp, newest on top
      list.sort((a,b) => b.timestamp - a.timestamp);
      setEntries(list);
    });
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const categoriesObject = ref(db, 'categories');
    
    onValue(categoriesObject, (snapshot) => {
      const data = snapshot.val();

      // make an array out of the object to render it nicely
      const list = Object.keys(data).map(key => ({id: key, value: data[key]}))

      setCategories(list);
    });
  }, []);

  const onSubmit = () => {

    const db = getDatabase();
    const postData = {
      category: category,
      isIncome: isIncome,
      amount: amount,
      timestamp: new Date().getTime()
    };
  
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;
  
    console.log(newPostKey);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/entries/' + newPostKey] = postData;
    
    update(ref(db), updates);

    resetForm();
  }

  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="relative isolate px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Income + Expenses
          </h1>
          
          <form className="w-full max-w-lg" onSubmit={onSubmit}>
            <div className="mt-6">
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
              <input value={amount} onChange={(e) => setAmount(e.target.value)} type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

            <label className="block mt-6 mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {categories.map(({id, value}) => (
                <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600" key={id}>
                  <div className="flex items-center ps-3">
                    <input onChange={() => setCategory(id)}  checked={id === category}  id={`category-${id}`} type="radio" value={id} name="category" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label htmlFor={`category-${id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="grid w-full my-6 gap-6 md:grid-cols-2">
              <li>
                <input checked={isIncome === true} onChange={() => setIsIncome(true)} type="radio" id="income" value="income" className="hidden peer" required/>
                <label htmlFor="income" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                  <div className="block">
                    <div className="w-full text-m font-semibold">Income</div>
                    <div className="w-full">Money you earned</div>
                  </div>
                </label>
              </li>
              <li>
                <input checked={isIncome === false} onChange={() => setIsIncome(false)} type="radio" id="expense" value="expense" className="hidden peer"/>
                <label htmlFor="expense" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="block">
                    <div className="w-full text-m font-semibold">Expense</div>
                    <div className="w-full">Money you spent</div>
                  </div>
                </label>
              </li>
            </ul>

            <button type="button" onClick={() => resetForm()} className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Cancel</button>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
          </form>

          <Table entries={entries} categories={categories} />
        </div>
      </div>
    </div>
  );
}


const Table = ({entries, categories}) => (
  <div className="relative overflow-x-auto mt-12">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Type</th>
            <th scope="col" className="px-6 py-3">Date</th>
          </tr>
      </thead>

      <tbody>
        {entries.map(entry => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={entry.id}>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {entry.amount}
            </th>
            <td className="px-6 py-4">
              {categories.find(item => item.id === entry.category)?.value}
            </td>
            <td className="px-6 py-4">
              {entry.isIncome && (<><IncomeIcon /><p className="text-green-500">Income</p></>)}
              {!entry.isIncome && (<><ExpenseIcon /><p className="text-red-600">Expense</p></>)}
            </td>
            <td className="px-6 py-4">
              {new Date(entry.timestamp).toLocaleDateString()}
              { " " }
              {new Date(entry.timestamp).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const IncomeIcon = () => (
  <svg className="w-4 h-4 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
</svg>
);

const ExpenseIcon = () => (
  <svg className="w-4 h-4 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"></path>
  </svg>
);

export default App;