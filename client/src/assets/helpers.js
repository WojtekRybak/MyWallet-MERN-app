export const formatPrice = (number) =>{
   return new Intl.NumberFormat('en-US', {
        style : 'currency',
        currency : 'USD'
     }).format(number/ 100)
}


export const numberWithCommas = (x) => {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}