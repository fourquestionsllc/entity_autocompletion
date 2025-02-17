# entity_autocompletion

## start backend api service 

```bash 
uvicorn backend_api.main:app --host 0.0.0.0 --port 8000 --reload
```

check the service at http://127.0.0.1:8000/docs

## create a app

```bash
npm create vite@latest ui-entity-completion --template react
```

## start the ui app

```base
cd ui-entity-completion
npm install
npm run dev
```

see the app at  http://localhost:5173/