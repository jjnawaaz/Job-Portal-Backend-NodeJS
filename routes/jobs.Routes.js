import express from 'express'
import { userAuth } from '../middlewares/authmiddleware.js'
import { createjobs, deleteJob, getJobs, jobStats, updateJobs } from '../controllers/jobs.controller.js'


const router = express.Router()

// Routes
router.post('/create-job', userAuth, createjobs)
router.get('/get-jobs', userAuth, getJobs)
router.patch('/update-job/:id', userAuth, updateJobs)
router.delete('/delete-job/:id', userAuth, deleteJob)
router.get('/job-stats', userAuth, jobStats)


export default router