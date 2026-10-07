const { Router } = require('express');
const controller = require('../controllers/users.controller');
const asyncHandler = require('../utils/asyncHandler');
const { validateId, validateUserBody } = require('../middleware/validateUser');

const router = Router();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', validateId, asyncHandler(controller.getById));
router.post('/', validateUserBody, asyncHandler(controller.create));
router.put('/:id', validateId, validateUserBody, asyncHandler(controller.update));
router.delete('/:id', validateId, asyncHandler(controller.remove));

module.exports = router;