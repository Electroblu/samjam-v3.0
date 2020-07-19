import Employee from '../../../models/Employee'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const {method} = req

    switch(method) {
        case 'GET':
            try {
                const employees = await Employee.find({})
                res.status(200).json({success: true, data: employees})
            } catch (error) {
                res.status(400).json({success: false})
            }
            break
        case 'POST':
            try {
                const employee = await Employee.create(req.body)
                res.status(201).json({success: true, data: employee})
            } catch (error) {
                res.status(400).json({success: false, error})
            }
            break
        default:
            res.status(400).json({success: false})
            break
    }
}