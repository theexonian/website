# For prosperity's sake

If you're a future developer, make sure to **understand everything fully**

You're in a production enviornment!

- Configuration Files in `./configs`
- API overview in `apis.md`
- Issues/Notse in `issues.md`
- Tech Stack Diagram in `stack.md` (use another mermaid diagram viewer)
- Server Configuration in `server.md` (use another mermaid diagram viewer)
- Listmonk configuration (soon to be added)

## Backend deploys

Pushes to `main` that touch `backend/**` run `.github/workflows/deploy-backend.yml`, which SSHes into EC2, hard-resets the checkout to `origin/main`, runs `npm ci && npm run build`, starts the `strapi` pm2 process, and waits for `/_health`.

The instance has 4 GB of RAM and the admin panel build peaks near 3.5 GB, so the build runs while Strapi keeps serving and the only interruption is the restart. `ensure_swap` tops RAM+swap up to 4.5 GB with `/swapfile.extra` as a safety net for Meilisearch reindexing; on the 4 GB instance it is normally a no-op. If free memory plus swap is under 3.6 GB the workflow stops Strapi before building instead, so the OOM killer cannot pick Strapi. A failed build leaves the previous build in place, brings Strapi back up if it was stopped, and fails the run.

Strapi is started as `node_modules/@strapi/strapi/bin/strapi.js --name strapi -- start`. The old entry was `npm --name strapi -- start`, which makes the real server a grandchild (`daemon -> npm -> sh -c strapi start -> node .../strapi start`); pm2 restarts only signal the npm process, so `sh` and `node` survived and kept holding their memory and swap. That is why the box stayed full and later builds were OOM-killed.

The API is down for the few seconds between the restart and `/_health` responding. `/admin` is served from `backend/build/`, which the build rewrites, so it can return 404 until the new build finishes.

Content types are code (`backend/src/api/*/content-types/*/schema.json` and `backend/src/components/**`). The Content-Type Builder only works under `strapi develop`, so edit schemas locally against SQLite (`$env:DATABASE_CLIENT = "sqlite"`), commit them, and let the workflow deploy. `strapi start` applies the schema sync on boot — and it drops removed columns without warning.

Required repository secrets: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`.