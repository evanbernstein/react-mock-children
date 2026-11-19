# Instructions

This project's general instructions live in a different repo imported below.

**If the import on the next line did not load** (no playbook content appears after it), stop and tell the user:

> The claude-playbook repo isn't where I expected. Please clone it so `../claude-playbook` (relative to this project) resolves, then restart this session. Or, if you've cloned it elsewhere, tell me the path and I'll create a symlink.

@../claude-playbook/CLAUDE.md

## Project-specific

- Run `bun run all-tests` before considering a task done.
- Use `bun` / `bunx`, never `npx`.
- Vitest only for now. The peer range is `^4 || ^5`; CI runs the suite against both.
- Library source (non-test files under `src/`) imports `vi`, `expect` and `beforeEach` from `vitest` explicitly. Consumers may not enable Vitest globals; only tests here may rely on them.
