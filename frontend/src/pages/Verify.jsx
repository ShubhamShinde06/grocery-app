import React, { useContext, useEffect } from 'react'
//import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { server } from '../App'
import { ShopContext } from '../Context/ShopContext'
import { userAuthStore } from '../store/authStore'

const Verify = () => {

    const {user} = userAuthStore()

    const userId = user?._id

    const navigate = useNavigate()

    const { setCartUpdated} = useContext(ShopContext)
    const [serchParams, setSerchParams] = useSearchParams()

    const success = serchParams.get('success')
    const orderId = serchParams.get('orderId')

    const verifyPayment = async () => {

        try {
            
            if(!userId){
                return null
            }

            const response = await axios.post(server + '/api/order/verifyStripe', {success, orderId, userId})

            if(response.data.success){
                setCartUpdated((prev) => !prev);
                navigate('/order')
            } else {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)   
        }

    }

    useEffect(()=>{
        verifyPayment()
    },[userId])

  return (
    <div>Verify</div>
  )
}

export default Verify