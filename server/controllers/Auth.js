exports.signup = (req, res) => {
    const {username, firstName, lastName, email, password} = req.body;

    if(!username || !firstName || !lastName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        })
    }
}