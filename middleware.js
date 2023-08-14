// exports.requirelogin = (req , res , next)=>{
//     if(req.session && req.session.user)
//     {
//         return next();
//     }
//     else{
//         res.status(200).render("login")
    
//     }
// }


exports.requirelogin = (req, res, next) => {
    if (req.session.user) {
        // User is authenticated, allow access to the next middleware or route handler
        next();
    } else {
        // User is not authenticated, redirect to the login page
        res.redirect("/");
    }
};


