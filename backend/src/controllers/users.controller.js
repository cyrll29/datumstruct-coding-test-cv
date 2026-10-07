const service = require('../services/users.service');

// Controllers only translate HTTP <-> service calls. No business logic here.

exports.getAll = async (req, res) => {
  res.json(await service.getAll());
};

exports.getById = async (req, res) => {
  res.json(await service.getById(req.userId));
};

exports.create = async (req, res) => {
  const user = await service.create(req.userData);
  res.status(201).location(`/api/users/${user.id}`).json(user);
};

exports.update = async (req, res) => {
  res.json(await service.update(req.userId, req.userData));
};

exports.remove = async (req, res) => {
  await service.remove(req.userId);
  res.status(204).end();
};