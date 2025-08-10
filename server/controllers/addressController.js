// controllers/addressController.js
import Address from "../models/Address.js";

// Add Address : /api/address/add (POST)
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body; // address object from frontend
    const userId = req.user?.id; // get from authUser middleware

    if (!userId) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    if (!address) {
      return res.json({ success: false, message: "Address required" });
    }

    // create address with userId
    await Address.create({ ...address, userId });

    return res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error("addAddress error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Get Address : /api/address/get (GET)
export const getAddress = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.json({ success: false, message: "Not Authorized" });
    }

    const addresses = await Address.find({ userId });
    return res.json({ success: true, addresses });
  } catch (error) {
    console.error("getAddress error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};
