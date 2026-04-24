# nextjs-aspire
See Aspire work with NextJS

## Dockerized Next.js web app

The Next.js app in `with-jest-app` is containerized using a multi-stage Docker build and Next.js standalone output.

- Dockerfile: `with-jest-app/Dockerfile`
- Build context ignore file: `with-jest-app/.dockerignore`

This follows the Next.js guidance for `output: "standalone"` and production container runtime.

## Aspire integration

The AppHost now runs the `web` resource as a Docker-backed container resource:

- `addDockerfile("web", "with-jest-app")`

Run the distributed app:

```bash
aspire start
```
