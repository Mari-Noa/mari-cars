# Roadmap and status

## Decisions
- Hebrew (RTL) first, English second.
- Deployment target open (possibly a local server): Docker Compose first; Terraform/K8s in Phase 6.
- Rentals are request-and-approve, no online payment in the MVP.
- Images on local disk behind a storage interface; S3-compatible driver later.

## Done
- Phase 1: architecture document approved with the decisions above.
- Phase 2: workspace, tooling, contracts, API and web skeletons, dev compose (verified running locally by the user).
- Phase 3: design tokens, homepage, catalog (filters, sorting, paging), vehicle detail with inquiry and rental forms. All on sample data; forms are stubs.
- Next: backend (Phase 4), admin dashboard, integration (Phase 5), infra (Phase 6).

## Remaining
- Phase 2: install dependencies, run lint/typecheck/tests, verify Docker builds.
- Phases 3 to 7 as in the Phase 1 document.

## Known issues
- Dependencies not yet installed or verified (package installs were unavailable when this was scaffolded).
- Dependency versions are minimums to be bumped at first install.
