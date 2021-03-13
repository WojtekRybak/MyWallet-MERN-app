import React  from 'react';
import {useGlobalContext} from '../context/GlobalState';
import {numberWithCommas} from '../assets/helpers'


function TransactionForm({transactions}) { 
    
    
    const {modalOpen} = useGlobalContext();    
    let incomeAmount = [...transactions];
    incomeAmount = incomeAmount.filter((item)=> item.category === 'Income' ).map((item) => parseInt(item.amount)).reduce((acc,curr) => (acc+=curr),0).toFixed(2)
    
    let expenseAmount = [...transactions];
    expenseAmount = expenseAmount.filter((item)=> item.category === 'Expense').map((item)=> parseInt(item.amount)).reduce((acc,curr)=> (acc+= curr),0).toFixed(2)
    let total =  Number(incomeAmount) - Number(expenseAmount)
    
    let sign  = total > 0 ? null : "-";


    const btnHandle = ()=> { 
        modalOpen(); 
    }
 
    return ( 
       <div>
           <div className="info-header">
            <button type="button" className="btn" onClick={(btnHandle)}>Add Transaction</button> 
                <div className="moneyflow">
                    <div className="inflow flex">
                        <div>Inflow</div>
                        <span className="income-amount">${numberWithCommas(incomeAmount)}</span> 
                    </div>
                    <div className="outflow flex">
                        <div>Outflow</div>
                        <span className="outflow-amount">-${numberWithCommas(expenseAmount)}</span>
                    </div>
                    <div className="total"> 
                        <span className="total-amount">{sign}${numberWithCommas(Math.abs(total))}</span> 
                    </div>
                </div>  
            </div>
       </div> 
        
      
    )
}

export default TransactionForm
