# Multi-Environment Feature App

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend (Local)

```bash
cd backend
npm install
npx wrangler dev --port 9000
```

## Backend (Remote D1)

```bash
npx wrangler dev --remote --port 9000
```

## Deploy

```bash
# Production (main)
npx wrangler deploy

# Preview (develop)
npx wrangler deploy --env preview
```
