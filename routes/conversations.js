import { Router } from 'express'
import * as conversationsCtrl from '../controllers/conversations.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', conversationsCtrl.index)
export { router }
