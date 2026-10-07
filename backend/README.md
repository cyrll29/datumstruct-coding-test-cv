# Users API

Express + `fs` JSON-file CRUD API.

    npm install
    npm start          # http://localhost:3000
    npm run dev        # auto-restart on change

Env vars: `PORT` (default 3000), `DATA_FILE` (default `data/users.json`).

| Method | Path           | Success | Errors        |
| ------ | -------------- | ------- | ------------- |
| GET    | /api/users     | 200     | -             |
| GET    | /api/users/:id | 200     | 400, 404      |
| POST   | /api/users     | 201     | 400, 409      |
| PUT    | /api/users/:id | 200     | 400, 404, 409 |
| DELETE | /api/users/:id | 204     | 400, 404      |

Errors are returned as `{ "error": "message" }`.
