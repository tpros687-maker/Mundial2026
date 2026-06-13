# Mundial 2026 Dashboard

Dashboard de partidos del Mundial 2026 con datos en vivo via balldontlie API.

## Deploy en Vercel

### 1. Subir a GitHub
1. Crea un repo en github.com (botón "New repository")
2. Nombre: `mundial2026`, público
3. Sube este proyecto:
```bash
git init
git add .
git commit -m "Mundial 2026 dashboard"
git remote add origin https://github.com/TU_USUARIO/mundial2026.git
git push -u origin main
```

### 2. Conectar a Vercel
1. Ve a vercel.com → "Add New Project"
2. Importa el repo `mundial2026` de GitHub
3. En **Environment Variables** agrega:
   - Name: `BALLDONTLIE_KEY`
   - Value: `de99e002-67d9-4c9f-b168-921a63dfc4c5`
4. Click "Deploy"

Listo — tu URL quedará tipo `mundial2026.vercel.app`
