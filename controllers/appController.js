const bcrypte =require("bcrypt");
const User =require("../models/user");


exports.landing_page =(req,res)=>{
    res.render("landing");
};

exports.login_get =(req,res)=>{
    const error = req.session.error;
    delete req.session.error;
    res.render("login",{err : error});
};

exports.login_post =async (req,res)=>{
    const {email,password} = req.body;
    const user =await User.findOne({email});
    if(!user){
        req.session.error="Invalid email or password";
        return res.redirect("/login");
    }
    const isMatch = await bcrypte.compare(password,user.password);
    if(!isMatch){
        req.session.error="Invalid email or password";
        return res.redirect("/login");
    }
    req.session.isAuth = true;
    req.session.username = user.username;
    res.redirect("/dashboard");
};

exports.register_get =(req,res)=>{
    const error = req.session.error;
    delete req.session.error;
    res.render("register",{err : error});
};

exports.register_post =async (req,res)=>{
    const {username,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        req.session.error="Email already exists";
        return res.redirect("/register");
    }
    
    const hasdPsw = await bcrypte.hash(password,12);
    const newUser = new User({
        username,   
        email,
        password: hasdPsw,
    });
    await newUser.save();
    res.redirect("/login");
}
exports.dashboard_get =(req,res)=>{
   const username =req.session.username;
   res.render("dashboard",{name: username});

};
exports.logout_post =(req,res)=>{
    req.session.destroy((err)=>{
        if(err)throw err;
        res.redirect("/login");
    });
};