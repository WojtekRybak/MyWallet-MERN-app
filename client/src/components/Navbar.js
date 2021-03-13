import React, { useState, useRef, useEffect} from 'react'
import { FaBars } from 'react-icons/fa';
import {GiMoneyStack} from 'react-icons/gi'    
import {useHistory} from 'react-router-dom'; 
import {useGlobalContext} from '../context/GlobalState';  
import axios from 'axios';
import TransactionsForm from './TransactionForm';
import SingleTransaction from './SingleTransaction';
import Modal from './Modal';
import Loading from './Loading';
axios.defaults.withCredentials = true;

function Navbar() {

    const {transactions,isLoading,deleteTransaction,isModalOpen} = useGlobalContext()
    const history = useHistory();

    const renderTransactions = ()=> {
        let allTransactions = [...transactions]
        allTransactions = allTransactions.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        });
        return allTransactions.map((transaction,i)=> { 
            return (
                <SingleTransaction key={i} transaction={transaction} deleteTransaction={deleteTransaction}/> 
            )
        })
    }
    const logoutUser = async () => {
        await axios.get('/logout');  
        history.push('/')
    }

    useEffect(()=>{ 
        renderTransactions();  
    },[transactions]) 

    if(isLoading){ 
        return <Loading/>
    }
    return ( 
        <div>
            <nav> 
                <div className="nav-center">
                    <div className="nav-header">
                        {/* <img src={logo} alt="logo"/> */}
                        <span><GiMoneyStack size="4em" color="#009579"/></span>
                        <button className="nav-toggle">         
                            <FaBars/>      
                        </button>
                    </div>
                    <div className='links-container'> 
                    <button className="btn" onClick={logoutUser}>LOGOUT</button> 
                    </div> 
                </div>
            </nav>  
            <div className="section-center spinner"> 
                <TransactionsForm transactions={transactions}/>
            </div>
            { transactions.length > 0 ? renderTransactions() : null}
            {isModalOpen ? <Modal/> : null}
        </div>
    )
}

export default Navbar
