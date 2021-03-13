import React, { useState,useEffect} from 'react';
import { useGlobalContext} from '../context/GlobalState';
import DatePicker from 'react-date-picker';
import { incomeCategories, expenseCategories} from '../assets/data';
import styled from "styled-components";
import Alert from './Alert'




function Modal() {
    
    const {isModalOpen,modalClose,isEditing,clearEditing,editedTransaction,addNewTransaction,updateTransaction,user} = useGlobalContext();
    const [alert,setAlert] = useState({show : false,type : '',msg : ''}) 
    const [amount,setAmount] = useState('');
    const [note,setNote] = useState(''); 
    const [selectedDate,setSelectedDate] = useState(null)
    const [category, setCategory] = useState('Expense');
    const [subCategory,setSubCategory] = useState(expenseCategories);
    const [subCatValue, setSubCatValue] = useState('')
   
    
    

    useEffect(()=>{  
        if(isEditing){
            setNote(editedTransaction.note ? editedTransaction.note : '')
            setAmount(editedTransaction.amount ? editedTransaction.amount : 0)
            setNote(editedTransaction.note ? editedTransaction.note : '')
            setSelectedDate(editedTransaction.date ? new Date(editedTransaction.date) : '');
        }
    },[isEditing,editedTransaction])  
    const selectCategory = (e)=> {
        setCategory(category === 'Expense' ? 'Income' : 'Expense')
    }
    const selectSubCat = (e) => {
        setSubCatValue(e.target.value);
    }
    useEffect(()=>{
        category === 'Expense' ? setSubCategory(expenseCategories) : setSubCategory(incomeCategories)
    },[category])

    const handleSubmit =  (e) => {   
        e.preventDefault(); 
        if(subCatValue === '' || note === '' || amount === '' || selectedDate === null){
            showAlert(true,'danger','Please enter all values!')
            return;
        }
        const newTransaction = { 
            note,
            amount,   
            date :  new Date(selectedDate),   
            category,
            subCategory : subCatValue
            
        }; 
        if(!isEditing){
            addNewTransaction(newTransaction)  
        } else{
            updateTransaction(newTransaction,editedTransaction._id)
        } 
       setAmount(0);
       setNote('');
       setSelectedDate(null)
       modalClose();
       clearEditing()
    } 
    const cancelAction = ()=> {
        clearEditing();
        modalClose()   
    }
    const showAlert = (show=false,type='',msg='')=>{
        setAlert({show,type,msg})
    }

    return (
        <Wrapper>
            <div className={`${isModalOpen ? 'modal-overlay show-modal' : 'modal-overlay' }`}>
            <div className="modal-container">
                <header className="modal grocery-item">
                    <h3>{`${isEditing ? 'Edit Transaction' : 'Add Transaction'}`}</h3>        
                </header>
                <div  className="form__message form__message--error">{alert.show && <Alert {...alert} removeAlert={showAlert}/>}</div>
                <form onSubmit={handleSubmit}> 
                    <div className="form-control">
                        <select name="sort" id="sort" className="grocery" value={category} onChange={selectCategory} >
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                            
                        </select>
                    </div>
                    <div className="form-control">
                        <select name="sort" id="sort" className="grocery"  onChange={selectSubCat}>
                            <option default >Category</option>
                            {subCategory.map((item,i)=>{
                                return (
                                    <option key={i}value={item}>{item}</option>
                                )
                            })}
                            
                        </select>
                    </div> 
                   <div className="form-inputs">
                        <div className="form-control">
                        <input type="text" className="grocery" placeholder="Note"value={note} required onChange={((e) => setNote(e.target.value))}/>
                    </div>
                     <div className="form-control">
                        <input type="number" className="grocery"placeholder="Amount"value={amount} onChange={((e) => setAmount(e.target.value))}/>
                    </div>
                    </div>
                    <div className="form-control">
                        <DatePicker type="date" className="grocery" value={selectedDate}  onChange={date => setSelectedDate(date)}/> 
                    </div> 
                    <button type="submit" className="btn save">Save Transaction</button> 
                    
                </form>
                    <button className="btn cancel" onClick={cancelAction}>Cancel</button> 
            </div>
            
        </div>
        </Wrapper>
        
    )
}
const Wrapper = styled.div`
    .save{
        margin: 1.5rem auto 0.5rem auto;
        
    }
    .cancel{
        background-color: red;
        margin-bottom : 0.5rem;
    }
`
export default Modal
