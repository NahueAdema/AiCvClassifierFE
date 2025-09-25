# 📄 CV Analyzer Frontend

Este es el **frontend** de una aplicación hecha en **Next.js** que permite subir y analizar CVs utilizando un modelo de **IA** .

El sistema envía los archivos y la información al **backend** (API) encargado del análisis y muestra los resultados de manera clara y organizada.

---

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

## ⚙️ Requisitos previos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## 📦 Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tuusuario/cv-analyzer-frontend.git
   cd cv-analyzer-frontend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Crear un archivo **`.env.local`** en la raíz del proyecto y agregar la URL de tu API:

   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```

   > ⚠️ Asegúrate de que la URL coincida con la dirección donde está corriendo tu backend (FastAPI, Flask, etc.).

---

## ▶️ Ejecutar en desarrollo

```bash
npm run dev
# o
yarn dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000/).

---

## 🛠️ Build para producción

```bash
npm run build
npm start
```

---

## 📂 Estructura básica del proyecto

```
cv-analyzer-frontend/
├── components/      # Componentes reutilizables
├── pages/           # Rutas y vistas principales
├── services/        # Llamadas a la API
├── types/           # Definición de tipos TypeScript
├── public/          # Archivos estáticos
└── .env.local       # Variables de entorno
```

---

## ✅ Flujo de uso

1. Subir un archivo **CV en PDF/DOCX** .
2. El frontend lo envía al backend configurado en `NEXT_PUBLIC_API_URL`.
3. La IA analiza el CV en función de los requisitos del puesto.
4. Se muestran los resultados en pantalla.
