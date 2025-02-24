
//COD
export const placeOrder = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error, placeOrder" });
    }
}

//Stripe
export const placeOrderStripe = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error, placeOrderStripe" });
    }
}

//Order Show Shopkeepers
export const ShopkeeperOrders = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error, ShopkeeperOrders" });
    }
}

//Users Orders
export const userOrders = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error, UserOrders" });
    }
}

//Update Order Status from Shopkeepers
export const updateOrdersStatuS = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error, UpdateOrdersStatuS" });
    }
}