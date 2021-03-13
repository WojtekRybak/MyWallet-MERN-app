import React,{useState} from 'react';
import styled from 'styled-components';
import {Link,useHistory} from 'react-router-dom';
import {useGlobalContext} from '../context/GlobalState';
import axios from 'axios';
import Alert from './Alert';

const initialState = {name:'',email: '',password: '',confirmPassword:''}

function CreateUSer() {
    const [newUser,setNewUSer] = useState(initialState);
    const [alert,setAlert] = useState({show : false,type : '',msg : ''})
    const {getUser} = useGlobalContext();
    const history = useHistory();



    const handleSubmit = async(e) => {
        e.preventDefault();
        const values = Object.values(newUser);
        const validateNewUser = values.every((value) => value !== '');
        if(!validateNewUser){
            showAlert(true,'danger','Please enter all values...')
            return;
        }
        if(newUser.password !== newUser.confirmPassword){
            showAlert(true,'danger',"Password don't match");
            return;
        }
        await axios.post('/signup',newUser);
        await getUser();
        history.push('/transactions')
    }
    const showAlert = (show=false,type='',msg='')=>{
        setAlert({show,type,msg})
    }
    return (
        (
        <Wrapper>
            <div className="container">
                <div className="form--container">
                    <form action="" className="form" onSubmit={handleSubmit}>
                        <h1 className="form__title">Create Account</h1>
                        <div  className="form__message form__message--error">{alert.show && <Alert {...alert} removeAlert={showAlert}/>}</div>
                        <div className="form__input-group">
                                <input type="text" name="name" autoFocus={true} placeholder="name" className="form__input" onChange={(e) => setNewUSer({...newUser,name : e.target.value})}/>       
                        </div>
                        <div className="form__input-group">
                                <input type="email" name="email" autoFocus={true} placeholder="email" className="form__input"onChange={(e) => setNewUSer({...newUser,email : e.target.value})}/>
                                       
                        </div>
                        <div className="form__input-group">
                                <input type="password" name="password" autoFocus={true} placeholder="password" className="form__input"onChange={(e) => setNewUSer({...newUser,password : e.target.value})}/>
                                   
                        </div>
                        <div className="form__input-group">
                                <input type="password" name="password" autoFocus={true} placeholder="Confirm password" className="form__input"onChange={(e) => setNewUSer({...newUser,confirmPassword : e.target.value})}/>
                                  
                        </div>
                        <button className="form__button" type="Submit">Continue</button>
                         <Link to='/' className="form__link">
                            <p className="form__text">Already have an account? Sign in</p>    
                        </Link> 
                    </form> 
                   
                </div>
            </div>   
        </Wrapper>
        
    )
    )
}
const Wrapper = styled.div`
.container {
    height : 100vh;
    display: flex;
    align-items : center;
    justify-content : center;
    font-size : 18px;
}
.form--container
{
    width : 400px;
    max-width : 400px;
    margin: 1rem;
    padding: 1rem;
    box-shadow: 0 0 40px rgba(0,0,0,0.2);
    border-radius : 4px;
    background: #fff;
}
.form > *:first-child
{
    margin-top : 0;
}
.form> *:last-child
{
    margin-bottom : 0;
}
.form__message
{
    text-align : center;
    margin-bottom : 1rem;
}
.form__title
{
    margin-bottom : 2rem;
    text-align : center;
}
.form__input-group
{
    margin-bottom : 1rem
}
.form__input
{
    display : block;
    width : 100%;
    padding: 0.75rem;
    border-radius : 4px;
    border : 1px solid #ddd;
    outline: none;
    background : #eee;
    transition : background 0.2s, border-color 0.2s;
}
.form__input:focus
{
    border-color : #009579;
    background : #fff;
}
.form__button
{
    width : 100%;
    padding : 1rem 2rem;
    font-weight : bold;
    font-size: 1.1rem;
    color : #fff;
    border: none;
    border-radius : 4px;
    outline: none;
    cursor: pointer;
    background: #009579;
}
.form__button:hover
{
    background: #007f67;
}
.form__button:active
{
    transform: scale(0.98)
}
.form__text
{
    text-align: center;
}
.form__link
{
    color: #252c6a;
    text-decoration : none;
    cursor: pointer;
}
.form__link:hover
{
    text-decoration: underline; 
}
`

export default CreateUSer
