import UserModel from "../models/user.model.js"

export const updateUser = async (req, res, next) => {
    const { name, email, lastName, location } = req.body
    if (!name || !email || !lastName || !location) {
        next('Please provide all details')
    }

    const user = await UserModel.findOne({ _id: req.user.userId })
    user.name = name
    user.lastName = lastName
    user.email = email
    user.location = location

    await user.save()
    const token = user.createJWT()
    res.status(200).json({
        user,
        token
    })
}
