# The Exonian Website

NextJS + Tailwind Front End, Strapi V5 + Postgres Back End

Created by the 16th, 15th, & 14th Web Boards. Launched by the 16th Web Board. Expanded and Updated by the 17th Web Board.

## Structure

This github repository is a monorepo, containing the self-contained `frontend` and `backend` in separate folders. Devs should also reference and update the documentation in `docs` regularly.

## Running the Repo while developing

Use Node 22 (see `.nvmrc`). The backend requires Node `>=22 <=26`; Strapi 5.61+ dropped Node 20 support.

Ensure `frontend/.env` and `backend/.env` contain valid keys. Please see the corresponding `.env.example` files for structure.

### Frontend

```bash
cd frontend
npm install # installs all dependencies necessary
npm run dev
npm run dev:clean # deletes .next first, then runs the same dev server
```

`npm run dev:clean` deletes the Turbopack `.next` cache before starting the dev server. That cache remembers the Tailwind content file list, so switching branches while the dev server is running (or after an interrupted one) can leave a stale entry and every page 500s with `Error evaluating Node.js code: ENOENT: no such file or directory, stat '.../src/app/...'` from `tailwindcss/lib/lib/content.js`. If that happens, stop the dev server and run `npm run dev:clean`; the cleanest habit is to stop `npm run dev` before switching branches.

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
pm2 stop strapi # stops the strapi instance (confirm the name against `pm2 list` first)
npm run build # builds admin panel; needs ~3.5 GB of RAM+swap
pm2 start strapi
```

There must be exactly one `strapi` entry in `pm2 list`, and it must run node directly (`node_modules/@strapi/strapi/bin/strapi.js --name strapi -- start`), not `npm ... start`. Running it through npm makes the real server a grandchild of pm2 (`daemon -> npm -> sh -c strapi start -> node ...`), and pm2 restarts only signal the npm process, leaving `sh` and `node` running and holding their memory and swap. After a restart, `ps -eo pid,ppid,args | grep '[s]trapi'` should show a single `node .../strapi.js start` owning port 1337 per `ss -lptn 'sport = :1337'`.

If strapi needs to be run in develop mode, please temporarily use `npm run dev` instead of the pm2 instance.
