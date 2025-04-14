import jwt from 'jsonwebtoken'


const userAuth = (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
       return res.status(401).json({success: false,message: "Unauthorized"}) 
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id; 
            next();
        }
        
       
    } catch (error) {
        return res.json ({success: false, message: error.message})
    }

}

export default userAuth;
