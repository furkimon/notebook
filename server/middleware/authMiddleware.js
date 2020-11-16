import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {  //pass in 3 things for middleware
    const token = req.header('x-auth-token')

    if (!token) { // check for token
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.jwtSecret)
        //add user from payload
        req.user = decoded
        next()  // moves on to the next middleware
    } catch (error) {
        res.status(400).json({message : 'Token is not valid'})
    }

}
