import { createContext, useEffect, useState } from "react";


export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const [products, setProducts] = useState([])

    const getProductsData = async () => {
        try {
            
            const response = await axios.get(server + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData()
    },[])

    const value = {
        products, 
        setProducts
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;