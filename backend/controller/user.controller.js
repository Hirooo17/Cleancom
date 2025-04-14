import userModel from "../model/user.model.js";




export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        res.json({
            success: true,
            userData: {
                id: user._id,
                name : user.name,
                email: user.email,
                isverified : user.isverified
            }
        });



    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}


