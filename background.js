const RULE_IDS = { docs: 1 };

function buildRules(authuser) {
  const queryTransform = {
    addOrReplaceParams: [{ key: 'authuser', value: String(authuser) }],
  };
  return [
    {
      id: RULE_IDS.docs,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: { transform: { queryTransform } },
      },
      condition: {
        urlFilter: '||docs.google.com/',
        resourceTypes: ['main_frame'],
      },
    },
  ];
}

async function applyRules(authuser) {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Object.values(RULE_IDS),
    addRules: buildRules(authuser),
  });
  console.log(`[GAccountFixer] Rules applied for authuser=${authuser}`);
}

chrome.runtime.onInstalled.addListener(async () => {
  const { authuser = 0 } = await chrome.storage.sync.get('authuser');
  await applyRules(authuser);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.authuser !== undefined) {
    applyRules(changes.authuser.newValue);
  }
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  console.log('[GAccountFixer] Rule matched:', info.request.url, '→ rule', info.rule.ruleId);
});
