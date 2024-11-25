import {toast} from 'react-toastify'

 const handleSuccess=(msg) => {
        toast.success(msg, {
           position: "top-right", 
           duration:2000,
        })
}
 const handleError=(msg) => {
        toast.error(msg, {
           position: "top-right", 
           duration:2000,
        })
}

export {handleSuccess,handleError}