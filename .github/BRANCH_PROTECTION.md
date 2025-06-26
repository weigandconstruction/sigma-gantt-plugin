# Branch Protection Setup

To enable branch protection and require status checks before merging to main:

## Using GitHub CLI (recommended)

Run these commands in your terminal after pushing the workflow:

```bash
# Enable branch protection for main branch
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Test & Build (18)","Test & Build (20)","Security Audit"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null

# Alternative: More permissive for single-person projects
gh api repos/:owner/:repo/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Test & Build (20)"]}' \
  --field enforce_admins=false \
  --field required_pull_request_reviews=null \
  --field restrictions=null
```

## Using GitHub Web Interface

1. Go to your repository on GitHub
2. Navigate to Settings → Branches
3. Click "Add rule" for branch protection
4. Branch name pattern: `main`
5. Enable these options:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require conversation resolution before merging
6. Select these required status checks:
   - `Test & Build (18)`
   - `Test & Build (20)`
   - `Security Audit`
7. Click "Create"

## Status Check Names

The workflow creates these status checks:

- `Test & Build (18)` - Tests with Node.js 18
- `Test & Build (20)` - Tests with Node.js 20
- `Security Audit` - npm audit security check

Choose the checks you want to require based on your needs.
