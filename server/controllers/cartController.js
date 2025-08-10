// controllers/cartController.js
import User from "../models/User.js";

// Update User CartData: /api/cart/update (POST)
export const updateCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { cartItems } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    // optional validation: ensure cartItems is an object
    if (!cartItems || typeof cartItems !== "object") {
      return res.json({ success: false, message: "cartItems is required" });
    }

    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    return res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error("updateCart error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};
