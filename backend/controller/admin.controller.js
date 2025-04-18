import adminModel from "../model/admin.model.js";


const getAdminData = async (req, res) => {
    try {
        const { userId } = req.body;

        const admin = await adminModel.findById(userId);

        if (!admin) {
            return res.json({ success: false, message: "Admin not found" })
        }

        res.json({
            success: true,
            adminData: {
                name : admin.name,
                email: admin.email,
                isverified : admin.isverified
            }
        });


    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export default getAdminData;