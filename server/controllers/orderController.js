import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Calculate Amount Using Items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({ success: false, message: `Product not found: ${item.product}` });
            }
            amount += product.offerPrice * item.quantity;
        }

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
            isPaid: false
        });

        return res.json({ success: true, message: "Order Placed Successfully", order });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        // Accept from query (GET) or body (POST)
        const userId = req.query.userId || req.body.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get All Orders (for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
