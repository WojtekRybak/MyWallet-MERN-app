export default (state,action) => {
        switch(action.type) {
            case 'AUTH':
                return {...state, userToken : action.payload} 
            case 'USER_AUTHENTICATION':
                return {...state, isSignedUp : 'Signed Up'}   
            case 'SIGNUP_USER':
                return {...state, userToken : action.payload}
            case 'GET_TRANSACTIONS_BEGINS':
                return {...state,isLoading : true}        
            case 'GET_TRANSACTIONS_SUCCESS' :
                return {...state, transactions : action.payload,isLoading : false}  
            case 'DELETE_TRANSACTION':
                return {...state,transactions : state.transactions.filter((transaction) => transaction.id !== action.payload)}
            case 'ADD_TRANSACTION' :
                return {...state, transactions : [...state.transactions,action.payload]}  
            case 'EDIT_MODE' :  
                return {...state, isEditing: true, editedTransaction : action.payload} 
            case 'UPDATE_ITEM' :
                return {...state,isEditing : false}     
            case 'CLEAR_EDITING' :
                return {...state, editTransaction : [], isEditing : false}    
            case 'MODAL_OPEN' :
                return {...state, isModalOpen : true}  
            case 'MODAL_CLOSE' :
                return {...state, isModalOpen : false} 
            case 'SET_LOADING' : 
                return {...state, isLoading : false}
            
        }
}