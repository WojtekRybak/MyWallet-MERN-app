import React, { useReducer, useState, useContext,useEffect} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;



const initialState = {
    isSignedUp : null,
    transactions : [],
    isEditing : false,
    isLoading : false,
    editID : null,
    alert : {show:false,msg:'',type:''},
    editedTransaction : [], 
    isModalOpen : false,
    userToken : []
    
};

const GlobalContext = React.createContext();
const GlobalProvider = ({children}) =>{


    const [state,dispatch] = useReducer(AppReducer, initialState); 
    const [user, setUser] = useState(null);


    async function getUser(){
        try {
           const userRes = await axios.get('/me');
            setUser(userRes.data);
            dispatch({type : 'USER_AUTHENTICATION', paylod : userRes.data})      
        } catch (error) {
           console.log(error);  
        }    
    }
    const getAllData = async() => {
        dispatch({type : 'GET_TRANSACTIONS_BEGINS'})
        try { 
            const response = await axios('/transactions')
            const transactions = response.data; 
            dispatch({type : 'GET_TRANSACTIONS_SUCCESS', payload : transactions})
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{       
        getUser();
    },[])     
    useEffect(()=>{

    })
    useEffect(()=>{
     if(state.isSignedUp){
         getAllData() 
     }
  },[state.isSignedUp])   
    useEffect(()=>{   
    },[state.transactions])
    
    const addNewTransaction = async(data)=> {
        try {
            await axios.post('/transaction',data)
            dispatch({type : 'ADD_TRANSACTION', payload : data})
        } catch (error) {
            console.log(error);
        }
        getAllData()  
    }
    const updateTransaction = async(data,id)=>{
        try {
            await axios.patch(`/transaction/${id}`,data)
            dispatch({type: 'UPDATE_ITEM', payload : data})    
            
        } catch (error) {
            console.log(error);
        }
        getAllData()
    }


    const signup = async(formData)=>{ 
         const config = {headers : { 'Content-Type' : 'application/json'}}      
        try {
            const res = await axios.post('/signup',formData,config)
            dispatch({type : 'SIGNUP_USER',payload: res}); 
        } catch (error) {
             console.log(error);
        }
    }
    const  deleteTransaction = async (id)=> { 
        if(window.confirm('Do you want to delete the transaction?')){
            await axios.delete(`/transaction/${id}`)  
        }
        dispatch({type: 'DELETE_TRANSACTION',payload : id});
        getAllData() 

    }
    
    const editTransaction = (transaction) =>{
        dispatch({type: 'EDIT_MODE',payload : transaction})
    }
    function clearEditing(){
        dispatch({type : 'CLEAR_EDITING'})
    }
    function modalOpen(){
        dispatch({type : 'MODAL_OPEN'})
    }
    function modalClose(){
        dispatch({ type: 'MODAL_CLOSE'})
    }
    function clearList(){
        dispatch({
            type : 'CLEAR_LIST'
        })
    }

    return (<GlobalContext.Provider value={{...state,getUser,user,clearEditing,addNewTransaction,
            deleteTransaction, clearList,editTransaction,modalOpen,modalClose,updateTransaction,
             signup,signup}}>
            {children}
        </GlobalContext.Provider>);

}

export const useGlobalContext = ()=>{ 
    return useContext(GlobalContext)
}
export {GlobalContext, GlobalProvider}      //or export before return GlobalContext