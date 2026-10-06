# Portfolio Website

A personal portfolio for a DevOps Engineer / Frontend Developer / Spring Boot Java Programmer.
Static site (HTML/CSS/JS) containerized with Docker and deployable to Kubernetes across
**dev**, **staging**, and **prod** environments via Kustomize.

## 📁 Structure

```
portfolio/
├── index.html / css/ / js/ / assets/   # the site
├── Dockerfile, nginx.conf              # container image
├── docker-compose.yml                  # local container run
├── k8s/
│   ├── base/                           # shared Deployment, Service, Ingress
│   └── overlays/
│       ├── dev/                        # 1 replica, dev.portfolio.example.com
│       ├── staging/                    # 2 replicas, staging.portfolio.example.com
│       └── prod/                       # 3+ replicas, HPA, portfolio.example.com
└── .github/workflows/ci-cd.yml         # build image + deploy per branch/tag
```

## 🖥️ Run locally (no Docker)

Just open `index.html` in a browser, or serve it:

```bash
cd portfolio
python -m http.server 8080
```

## 🐳 Run with Docker

```bash
cd portfolio
docker build -t portfolio:local .
docker run --rm -p 8080:80 portfolio:local
# or
docker compose up --build
```

Visit http://localhost:8080

## ☸️ Deploy to Kubernetes

Each environment is a Kustomize overlay on top of `k8s/base`:

| Env     | Namespace            | Replicas | Image tag | Host                            |
|---------|----------------------|----------|-----------|----------------------------------|
| dev     | portfolio-dev        | 1        | `dev`     | dev.portfolio.example.com        |
| staging | portfolio-staging    | 2        | `staging` | staging.portfolio.example.com     |
| prod    | portfolio-prod       | 3 (+HPA) | `stable`  | portfolio.example.com            |

```bash
# Preview the rendered manifests
kubectl kustomize k8s/overlays/dev

# Apply to a cluster
kubectl apply -k k8s/overlays/dev
kubectl apply -k k8s/overlays/staging
kubectl apply -k k8s/overlays/prod
```

> Update the `image:` names, ingress hosts, and TLS `secretName`/`cluster-issuer` in
> `k8s/base` and the overlays to match your registry and domain before deploying.

## 🔁 CI/CD

`.github/workflows/ci-cd.yml` builds and pushes the image to GHCR, then applies the
matching overlay:

- `develop` branch → deploy **dev**
- `main` branch → deploy **staging**
- `v*` tag → deploy **prod**

Add a `KUBECONFIG`/cluster-auth secret per `environment` (dev/staging/production) in
your repo settings for the deploy jobs to reach your cluster(s).

## ✏️ Customize

- Replace placeholder name, bio, resume (`assets/resume.pdf`), GitHub/LinkedIn links,
  projects, and experience in `index.html`.
- Update image repository (`your-name/portfolio`) across `Dockerfile` comments,
  `docker-compose.yml`, `k8s/base/deployment.yaml`, and the CI workflow.
