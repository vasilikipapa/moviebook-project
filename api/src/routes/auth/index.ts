import { Router } from 'express'
import controller from './controller'
import { validate, auth } from '../../middlewares'
import { loginSchema, registerSchema } from './schema'

const router: Router = Router()

router.post('/login', validate(loginSchema), controller.login)
router.post('/register', validate(registerSchema), controller.register)
router.post('/logout', auth, controller.logout)
router.get('/me', auth, controller.me)

export default router
