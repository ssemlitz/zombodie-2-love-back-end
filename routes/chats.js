import { Router } from 'express'
import * as chatsCtrl from '../controllers/chats.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, chatsCtrl.create)
router.get('/:userId', checkAuth, chatsCtrl.show)
router.get('/find/:firstId/:secondId', checkAuth, chatsCtrl.findChat)

export { router }