import React,{useEffect} from 'react'

const Alert = ({msg,type,removeAlert}) => {
      useEffect(() => {
         const remove = setTimeout(()=> {
           removeAlert()
         },3000)
          return () => clearTimeout(remove) 
      },[] )  //every time the list changes
      return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
