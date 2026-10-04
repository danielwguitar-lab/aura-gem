---
name: aura-gem-chat
description: Install the Aura Gem chat (DWD's signature AI receptionist window) on any website in minutes. Use when Daniel asks to add Aura / the Aura Gem to a client site, a DWD site, or sell Aura Gem standalone.
---

# Aura Gem chat · Built by Daniel Walsh Digital

The official Aura Gem interface (locked by Daniel, 29 Sept 2026):
charcoal panel, gold outlines, Cormorant Garamond + Archivo, "Aura *Gem*" name (Gem in gold),
60px glowing avatar bubble, green live dot + "AI Receptionist", gem launcher with teal + purple comets,
"The Aura Gem · Built by Daniel Walsh Digital" credit in gold.

## Rules
1. Client sites: `showLabel: true` (small "Meet Aura" pill under the gem so nobody mistakes it for a loading icon).
2. DWD's own site: no label (the Keystone host section introduces her). DWD currently has an inline copy of this design in dwd-website/index.html.
3. Never change the design per client without Daniel's say-so. Change only the words (messages, actions).
4. The input stays disabled ("Live chat arriving soon") until the site has a live agent wired in via a server-side route (Vercel API route -> Base44 Agent API; key in env var, never in frontend).

## Install
```
bash /app/.agents/skills/aura-gem-chat/scripts/run.sh <project_public_dir> [index.html]
```
Copies `aura-gem-chat.js` into the site's public folder and prints the config snippet to paste before `</body>`.
Any element with `data-open-aura` opens the chat. `window.AuraGem.open()` / `.close()` also work.

## Config (window.AuraGemConfig)
business, subtitle, showLabel, label, messages[], actions[{label, href}] (`#anchor` links close the panel),
placeholder, credit (HTML allowed), gem, avatar, gold, loadFonts.

## Live installs
1. Tom's Taxi Shetland: public/aura-gem-chat.js + config in index.html (commit after 7b6836d).
2. DWD site: inline version (same design).
