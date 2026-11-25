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

Pushes to `main` that touch `backend/**` run `.github/workflows/deploy-backend.yml`, which SSHes into EC2, hard-resets the checkout to `origin/main`, runs `npm ci && npm run build`, restarts the `strapi` pm2 process, and waits for `/_health`.

Content types are code (`backend/src/api/*/content-types/*/schema.json` and `backend/src/components/**`). The Content-Type Builder only works under `strapi develop`, so edit schemas locally against SQLite (`$env:DATABASE_CLIENT = "sqlite"`), commit them, and let the workflow deploy. `strapi start` applies the schema sync on boot — and it drops removed columns without warning.

Required repository secrets: `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`.