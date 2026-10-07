const fs = require('fs/promises');
const config = require('../config');

const DATA_FILE = config.dataFile;

// ---- low-level file access ---------------------------------------------------

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    if (err.code === 'ENOENT') return []; // first run: no file yet
    throw err;
  }
}

// Atomic write: write to a temp file, then rename over the original.
// A crash mid-write can never leave users.json half-written.
async function writeAll(users) {
  const tmp = `${DATA_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(users, null, 2), 'utf8');
  await fs.rename(tmp, DATA_FILE);
}

// ---- serialization of writes ---------------------------------------------------

// All read-modify-write cycles run one at a time. Without this, two concurrent
// requests could read the same snapshot and one would overwrite the other's change.
let queue = Promise.resolve();

function withLock(task) {
  const run = queue.then(task);
  queue = run.catch(() => { }); // keep the chain alive after a failure
  return run;
}

// ---- public API ----------------------------------------------------------------

function findAll() {
  return readAll();
}

async function findById(id) {
  const users = await readAll();
  return users.find((u) => u.id === id) || null;
}

/**
 * Runs `mutator(users)` under the lock. The mutator returns
 * `{ users, result }`: the new array to persist (omit to skip writing)
 * and the value to hand back to the caller.
 */
function transaction(mutator) {
  return withLock(async () => {
    const users = await readAll();
    const { users: next, result } = await mutator(users);
    if (next) await writeAll(next);
    return result;
  });
}

module.exports = { findAll, findById, transaction };