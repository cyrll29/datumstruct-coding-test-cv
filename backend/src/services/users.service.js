const repo = require('../repositories/users.repository');
const HttpError = require('../utils/HttpError');

const notFound = (id) => new HttpError(404, `User ${id} not found`);

// Throws 409 if another user already has this username or email.
function assertUnique(users, { username, email }, ignoreId = null) {
  const clash = users.find(
    (u) =>
      u.id !== ignoreId &&
      (u.username.toLowerCase() === username.toLowerCase() || u.email.toLowerCase() === email.toLowerCase())
  );
  if (clash) {
    const field = clash.username.toLowerCase() === username.toLowerCase() ? 'username' : 'email';
    throw new HttpError(409, `A user with this ${field} already exists`);
  }
}

function getAll() {
  return repo.findAll();
}

async function getById(id) {
  const user = await repo.findById(id);
  if (!user) throw notFound(id);
  return user;
}

function create(data) {
  return repo.transaction((users) => {
    assertUnique(users, data);
    const id = users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
    const user = { id, ...data };
    return { users: [...users, user], result: user };
  });
}

function update(id, data) {
  return repo.transaction((users) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw notFound(id);
    assertUnique(users, data, id);
    const updated = { id, ...data };
    const next = [...users];
    next[index] = updated;
    return { users: next, result: updated };
  });
}

function remove(id) {
  return repo.transaction((users) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw notFound(id);
    return { users: users.filter((u) => u.id !== id), result: undefined };
  });
}

module.exports = { getAll, getById, create, update, remove };