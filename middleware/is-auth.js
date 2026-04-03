module.exports = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.session.error="Please login to view this page";
        res.redirect("/login");
    }
};