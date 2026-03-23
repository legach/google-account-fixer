# Google Account Fixer

A minimal Chrome extension that automatically opens Google Docs, Sheets, Slides, Forms, and Drive links under the correct Google account by appending `?authuser=N` to every request.

## The problem

When you have multiple Google accounts signed in, clicking a shared link often opens it under the wrong account — prompting a "Request access" error even though you have permission under a different account.

## How it works

The extension uses Chrome's `declarativeNetRequest` API to redirect matching URLs at the network level before the page loads — no JavaScript is injected, no content is read.

Covered domains:
- `docs.google.com` — Docs, Sheets, Slides, Forms, Drawings

Every navigation to these domains is redirected to the same URL with `?authuser=N` appended. If the parameter is already present, no redirect happens.

## Installation

This extension is not published to the Chrome Web Store. Install it as an unpacked extension:

1. Download or clone this repository
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the project folder
5. The extension is now active

To update after changing files: click the **refresh icon** on the extension card in `chrome://extensions`.

## Configuration

1. Go to `chrome://extensions`
2. Find **Google Account Fixer** and click **Details**
3. Click **Extension options**
4. Enter your account index and click **Save**

The account index is the position of your Google account in Chrome's account list, starting from 0:
- `0` — first (primary) account
- `1` — second account
- and so on

The setting takes effect immediately — no page reload required.

## Debugging

### Check that rules are active

Open the Service Worker console:
1. Go to `chrome://extensions`
2. Find the extension and click the **Service worker** link
3. Open the **Console** tab

Every matched redirect logs:
```
[GAccountFixer] Rules applied for authuser=0
[GAccountFixer] Rule matched: https://docs.google.com/... → rule 1
```

### Check network redirects

1. Open DevTools → **Network** tab
2. Navigate to a Google Docs or Drive URL
3. Look for a redirect request — its **Initiator** column will show `Extension`

### Verify the active rules

In the Service Worker console, run:
```js
chrome.declarativeNetRequest.getDynamicRules(console.log)
```

This prints the currently active redirect rules.
