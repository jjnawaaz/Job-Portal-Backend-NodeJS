import jobsModels from "../models/jobs.models.js"
import mongoose from "mongoose"
import moment from "moment"

export const createjobs = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next("Please provide all the fields")
    }
    req.body.createdBy = req.user.userId
    const jobs = await jobsModels.create(req.body)
    res.status(201).json({ jobs });
}

export const getJobs = async (req, res, next) => {
    const { status, workType, search, sort } = req.query
    // Condition for searching
    const queryObject = {
        createdBy: req.user.userId
    }
    //logic filters
    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (workType && workType !== 'all') {
        queryObject.workType = workType
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }
    }

    let queryResult = jobsModels.find(queryObject)
    // sorting
    if (sort === 'latest') {
        queryResult = queryResult.sort('-createdAt')
    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort('createdAt')
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort('position')
    }
    if (sort === 'z-a') {
        queryResult = queryResult.sort('-position')
    }
    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    queryResult = queryResult.skip(skip).limit(limit)


    //Jobs Count
    const totalJobs = await jobsModels.countDocuments(queryResult)
    const numofPage = Math.ceil(totalJobs / limit)


    const jobs = await queryResult

    // const jobs = await jobsModels.find({ createdBy: req.user.userId })
    res.status(200).json({
        totalJobs,
        jobs,
        numofPage
    })
}

export const updateJobs = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    if (!company || !position) {
        next("Please provide all the fields")
    }

    const job = await jobsModels.findOne({ _id: id })
    if (!job) {
        next("No jobs found with this Id")
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next("You are not auhorized to update this job")
        return
    }

    const updateJob = await jobsModels.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ updateJob })

}

export const deleteJob = async (req, res, next) => {
    const job = await jobsModels.findOne(req.params._id)

    if (!job) {
        next(`No job found with this id ${id}`)
    }

    if (!req.user.userId === job.createdBy.toString()) {
        next("You are not auhorized to update this job")
        return
    }
    await job.deleteOne();
    res.status(200).json({
        message: "Job Successfully deleted"
    })

}


export const jobStats = async (req, res) => {
    const stats = await jobsModels.aggregate([

        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId),
            }
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ])

    //default stats 
    const defaultStats = {
        pending: stats.pending || 0,
        reject: stats.reject || 0,
        interview: stats.interview || 0
    }

    // monthly yearly stats
    let monthlyStats = await jobsModels.aggregate([
        {
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                },
                count: {
                    $sum: 1
                }
            }

        }
    ])
    monthlyStats = monthlyStats.map(item => {
        const { _id: { year, month }, count } = item
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date, count }
    }).reverse()
    res.status(200).json({
        totalJobs: stats.length,
        defaultStats,
        monthlyStats
    })
}


