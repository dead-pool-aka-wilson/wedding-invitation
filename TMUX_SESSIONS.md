# TMUX Sessions for Wedding Card Project

## Active Sessions

| Session Name | Purpose | Status |
|--------------|---------|--------|
| `wedding-dev` | Main development session | Active |

## How to Attach

```bash
# List all sessions
tmux ls

# Attach to wedding-dev
tmux attach -t wedding-dev

# Create new window in session
tmux new-window -t wedding-dev -n <window-name>
```

## Session Details

### wedding-dev
- **Created**: 2026-02-04 18:30 KST
- **Windows**:
  - `main` - Primary development terminal
  
## Persistent Tasks

If SSH connection fails, these tasks continue in tmux:
- Build processes
- Test watchers
- Dev server

## Recovery Commands

```bash
# If disconnected, reconnect with:
tmux attach -t wedding-dev

# If session died, recreate:
tmux new-session -d -s wedding-dev -n main
```
