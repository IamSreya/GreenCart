// middlewares/authUser.js
import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    // prefer cookie (you set token cookie in login), but allow Authorization header fallback
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers?.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized, token missing' });
    }

    // verify token synchronously - if invalid, it'll throw and be caught
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // set req.user for downstream controllers (minimal & safe)
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error('authUser error:', error.message);
    return res.status(401).json({ success: false, message: 'Not Authorized', error: error.message });
  }
};

export default authUser;
