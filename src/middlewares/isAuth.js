const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const isAuth = (request, response, next) => {

    const token = request.cookies.authcookie;
    
    if (!token) {
        const id = request.params.id;
        // on n'accepte pas l'Id tant que il n'y a pas de token => redirection vers "/"
        if(!id){
            next();
        } else {
            response.redirect('/');
        }
    }
    else {
        
        jwt.verify(token, process.env.SECRET_JWT, (error, user) => {
            if(error){
                response.send("error : ", error.message);
            } 
            else {
                const { username, exp, id} = user;
    
                if(Date.now() / 1000 >= exp) {
                    response.clearCookie("authcookie");
                    response.send("Session expired. Please try to login again")
                } else {
                    request.user = { id, username };
                    next();
                }
            }
        })
       
    } 
    
}

module.exports = isAuth;