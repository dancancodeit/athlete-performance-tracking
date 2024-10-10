import jwt from 'jsonwebtoken';
import {
  getCookie,
} from 'hono/cookie'

// Function to generate JWT
export const generateToken = (username: string) => {
    const user = { username };
    return jwt.sign(user, 'secret', { expiresIn: '1h' });
  };

  
// JWT Middleware (if needed for other routes)
export const authenticateJWT = async (c: any, next: any) => {
    const token = getCookie(c, 'token'); // Access cookies using c.req.cookies.get()
    console.log(token);
    if (token) {
        jwt.verify(token, 'secret', (err: any, user: any) => {
            if (err) {
                return c.json({ message: 'Unauthorized' }, 401);
            }
        });
        await next();
    } else {
        return c.json({ message: 'Unauthorized' }, 401);
    }
};