# Wedding Card Project - Original Prompts

## Session 2026-02-04 18:30 KST

### User Request
```
check the html file start with hk_ai which is updated concept. replace concept.html with that. check the new concept file for what mobile page we are developing. run tmux for background task and write down md file that list name of tmux so even though ssh connection failed but task still ongoing. previous commit from before 13:00 kst is failed one so remove all history of it. image should be created with gemini-image-pro-3. ultrawork, use ralph loop. follow github opencode workflow strictly. main <- stage <- dev branch system. every task(prd) should have github issue and dedicated branch. after pr check automated review from github and fix or patch according to review before merge. if cdn or deployment setup needed make md files for setup list that human intervention needed.
```

### Context
- Source file: `hk_ai_prompt_filenames_v3_3.html`
- Concept version: v3.3
- Total images: 30 PNG
- Viewport: 100vw (responsive), 390px reference (iPhone 14/15)
- Scroll depth: 8,670px
- Retina: @2x 780px, @3x 1170px
- Zones: 5

### Key Requirements
1. **Git Workflow**: main <- stage <- dev branch system
2. **Issue-driven**: One issue, one branch rule
3. **Image Generation**: Use Gemini Image Pro 3 (gemini-image-pro-3)
4. **CDN Setup**: Configure CDN for image delivery (create setup MD if human intervention needed)
5. **Deployment**: Full pipeline from dev to production
6. **Background Tasks**: Run in tmux, documented in TMUX_SESSIONS.md

### Zones from v3.3 Spec
| Zone | Name | Scroll Range | Images |
|------|------|--------------|--------|
| Z01 | Night Sky | 0-870px | 3 |
| Z02 | Skyline & Towers | 870-2600px | 7 |
| Z03 | Mid-Levels Escalator | 2600-4880px | 5 |
| Z04 | Street Level (Neon) | 4880-7370px | 9 |
| Z05 | Ground (Dai Pai Dong) | 7370-8670px | 6 |

### GitHub Issue
- Issue #6: feat: Implement HK Parallax Wedding Invitation v3.3
- Branch: 6-feat-implement-hk-parallax-v3.3

---

## Previous Session (Failed - Before 13:00 KST)

Previous implementation attempts were unsuccessful. History cleaned. Starting fresh with v3.3 spec.
