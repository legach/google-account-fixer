chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  console.log('[GAccountFixer] Rule matched:', info.request.url, '→ rule', info.rule.ruleId);
});
