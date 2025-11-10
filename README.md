# Frontend Feedback UI

React + Vite + TypeScript frontend for **Provider Feedback Portal**  
Uses **TailwindCSS** for styling.

---

## Setup

1. **Clone the repo**

```
git clone https://github.com/York-Solutions-B2E/tsg-9.27-group2-frontend-feedback-ui
cd tsg-9.27-group2-frontend-feedback-ui
```

2. **Install dependencies**

```
npm install

```

3. **Create .env file (root of frontend folder)**

```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

4. **Run dev server**

```
npm run dev
```

## Git Workflow

- **Main branch**: stable, production-ready
- **Feature branches**: `feature/<task>`

**Example workflow:**

```
git checkout -b feature/feedback-form
git add .
git commit -m "Add feedback form validation"
git push origin feature/feedback-form

```

Open a **Pull Request** on GitHub for review.

---

## Docker (Optional)

**Build and run container:**

```bash
docker build -t frontend-feedback-ui .
docker run -p 5173:80 frontend-feedback-ui
```
