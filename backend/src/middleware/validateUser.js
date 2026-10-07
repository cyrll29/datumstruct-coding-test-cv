const HttpError = require('../utils/HttpError');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validates :id as a positive integer and stores it on req.userId.
function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) {
    return next(new HttpError(400, 'id must be a positive integer'));
  }
  req.userId = id;
  next();
}

// Validates the body for POST and PUT (PUT is a full replacement, so all fields are required).
// Only whitelisted fields are kept, so clients can't set `id` or inject extra properties.
function validateUserBody(req, res, next) {
  const body = req.body || {};
  const errors = [];

  for (const field of ['name', 'username', 'email']) {
    if (typeof body[field] !== 'string' || body[field].trim() === '') {
      errors.push(`${field} is required and must be a non-empty string`);
    }
  }
  if (typeof body.email === 'string' && body.email.trim() && !EMAIL_RE.test(body.email.trim())) {
    errors.push('email must be a valid email address');
  }

  if (errors.length) {
    return next(new HttpError(400, errors.join('; ')));
  }

  req.userData = {
    name: body.name.trim(),
    username: body.username.trim(),
    email: body.email.trim().toLowerCase(),
  };
  next();
}

module.exports = { validateId, validateUserBody };