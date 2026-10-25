# The Exonian Website

NextJS + Tailwind Front End, Strapi V5 + Postgres Back End

Created by the 16th, 15th, & 14th Web Boards. Launched by the 16th Web Board. Expanded and Updated by the 17th Web Board.

## Structure

This github repository is a monorepo, containing the self-contained `frontend` and `backend` in separate folders. Devs should also reference and update the documentation in `docs` regularly.

## Running the Repo while developing

Use Node 22 (see `.nvmrc`).

Ensure `frontend/.env` and `backend/.env` contain valid keys. Please see the corresponding `.env.example` files for structure.

### Frontend

```bash
cd frontend
npm install # installs all dependencies necessary
npm run dev
```

### Backend

```bash
cd backend
npm install # installs all dependencies necessary
npm run dev
```

> [!WARNING]
> If `backend/.env` sets `DATABASE_CLIENT=postgres`, `npm run dev` connects to the production RDS instance and reads/writes live data. Point `DATABASE_HOST` at a local database, or leave `DATABASE_CLIENT` unset to use the SQLite fallback, when developing.

## Running the Repo in production

### Frontend

Any changes to the frontend code under the branch `main` should automatically deploy through Vercel. Please check the Exonian Web Board's Vercel account for deployment status.

### Backend

You should first access the ec2 instance (through ssh or otherwise). Check the instance's status using pm2.

```bash
pm2 list
pm2 logs --lines 50
```

If backend changes need to be deployed to production, you must redeploy on the EC2 server yourself; the steps below restart the Strapi process, not the EC2 instance.
```bash
git pull # pulls updated code from the main branch
cd backend
npm install # needed whenever package.json or package-lock.json changed
pm2 stop 0 # stops the strapi instance; confirm the id against `pm2 list` first
npm run build # builds admin panel
pm2 start 0
```

If strapi needs to be run in develop mode, please temporarily use `npm run dev` instead of the pm2 instance.
