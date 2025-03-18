import express from 'express'
import { clerkWebHooksController } from '../controller/webhooksController.js'

const router = express.Router()

router.post("/clerk", clerkWebHooksController)

export default router