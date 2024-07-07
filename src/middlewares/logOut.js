exports.logOut = async (req, res) => {
    const user = req.body;
    console.log("Loggin out user:", user)
    res.clearCookie('token', { maxAge: 0 }).send({ success: true, status: "Logged Out" })
}