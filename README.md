Make sure that both of these are running in a two separate terminal.

<hr>

# Frontend

 `/frontend` is a [Next.js](https://nextjs.org) project bootstrapped with `[create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)`.

## Getting Started

First, run the development server:

```bash
# Step 1: Navigate to /frontend
cd frontend
# Step 2: Install packages
npm install
# or
yarn
# Step 3: Run the development server:
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses `[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)` to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<hr>

# Backend
`/backend` is an Express + `fs` JSON-file CRUD API.
## Users API

```
cd backend
npm install
npm start          # http://localhost:4000
npm run dev        # auto-restart on change
```

Env vars: `PORT` (default 3000), `DATA_FILE` (default `data/users.json`).


| Method | Path           | Success | Errors        |
| ------ | -------------- | ------- | ------------- |
| GET    | /api/users     | 200     | -             |
| GET    | /api/users/:id | 200     | 400, 404      |
| POST   | /api/users     | 201     | 400, 409      |
| PUT    | /api/users/:id | 200     | 400, 404, 409 |
| DELETE | /api/users/:id | 204     | 400, 404      |


Errors are returned as `{ "error": "message" }`.