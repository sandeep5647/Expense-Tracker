import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addTransaction }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedExpenseInfo = { ...expenseInfo, [name]: value };
        setExpenseInfo(updatedExpenseInfo);
    };

    const addIncome = (e) => {
        e.preventDefault();
        const { amount, text } = expenseInfo;
        if (!amount || !text) {
            handleError('Please add Income details');
            return;
        }
        addTransaction({ ...expenseInfo, amount: parseFloat(amount) });  // Income is positive
        setExpenseInfo({ amount: '', text: '' });
    };

    const addExpense = (e) => {
        e.preventDefault();
        const { amount, text } = expenseInfo;
        if (!amount || !text) {
            handleError('Please add Expense details');
            return;
        }
        addTransaction({ ...expenseInfo, amount: -Math.abs(parseFloat(amount)) });  // Expense is negative
        setExpenseInfo({ amount: '', text: '' });
    };

    return (
        <div className='container'>
            <h1>Expense Tracker</h1>
            <form>
                <div>
                    <label htmlFor='text'>Detail</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter description...'
                        maxLength='30'
                        value={expenseInfo.text}
                    />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter amount...'
                        max='9999999999'
                        value={expenseInfo.amount}
                    />
                </div>
                <div className="button-group">
                   <div> <button className="custom-btn add-income" type='button' onClick={addIncome}>Add Income</button></div>
                    <div><button className="custom-btn add-expense" type='button' onClick={addExpense}>Add Expense</button></div>
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;
