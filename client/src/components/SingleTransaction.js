import React from 'react';
import {useGlobalContext} from '../context/GlobalState';
import Modal from './Modal';
import {arrayOfWeekdays,months} from '../assets/data'
import styled from 'styled-components';
import {numberWithCommas} from '../assets/helpers'




function SingleTransaction({transaction}) {
    const{modalOpen,editTransaction,isEditing,deleteTransaction} = useGlobalContext()
    const {note,amount,_id,date,category,subCategory} = transaction;
    let transactionDate = new Date(date);  
        let day = transactionDate.getDate();  
        let month = transactionDate.getMonth();
        let year = transactionDate.getFullYear();
        let weekDay = transactionDate.getDay()
        let weekDayName = arrayOfWeekdays[weekDay];
        let monthName = months[month];
    const handleEdit = ()=> {  
        modalOpen();   
        editTransaction(transaction); 
        console.log(date);
        let demo = new Date(date)     
        console.log(demo);    
    }
    if(isEditing){
        return <Modal />
    }
    return (
        <Wrapper>
            <div className="section-center single">     
                <article className="grocery-item">
                    <div className="title-data">
                        
                        <div className="title-name">
                                <h3 className="subCategory">{subCategory}</h3>
                                <p className="subCategory-name">{note}</p>  
                            </div>  
                        <span>${numberWithCommas(amount)}</span>
                   </div> 
                    <div className="title-amount">
                        <div className="title-date">
                        <div className="title-day">{day}</div>
                            <div className="title-year">
                                <p className="dayName">{weekDayName}</p>
                                <p>{monthName}</p>
                                <p>{year}</p>
                            </div>  
                            
                        </div>        
                     {/* <h4>{weekDayName}</h4>
                     <h5>{day + "/" + month + "/" + year}</h5>  */}
                        <div className="title-btns">
                            <button type="button" className="btn single-btn edit"onClick={handleEdit}>EDIT</button>
                            <button type="button"className="btn single-btn remove" onClick={()=> deleteTransaction(_id)}>REMOVE</button>
                        </div>  
                    </div>
                </article>
        </div>
        </Wrapper>   
    )
}
const Wrapper = styled.div`


` 
export default SingleTransaction
