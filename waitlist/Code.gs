// AgentLive.Events waitlist. Bound to the sheet "AgentLive.Events waitlist".
// Deploy as a web app: execute as me, access: anyone. Appends one row per new email.
//
// REFERENCE COPY ONLY. This file does not run from the repo. The live copy is pasted
// into the sheet's Apps Script editor (see WEBSITE_HANDOFF.md section A4).
function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.website) return page_(true); // honeypot filled: pretend success, store nothing
  var email = String(p.email || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return page_(false);
  var lock = LockService.getScriptLock(); lock.waitLock(5000);
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var existing = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().flat() : [];
    if (existing.indexOf(email) === -1) sh.appendRow([new Date(), email, String(p.source || "site").slice(0, 40)]);
  } finally { lock.releaseLock(); }
  return page_(true);
}
function doGet() { return page_(true); }
function page_(ok) {
  var msg = ok ? "You're on the list." : "That didn't go through. Check the address and try again.";
  var html = "<!doctype html><html lang=en><meta charset=utf-8><meta name=viewport content='width=device-width,initial-scale=1'>" +
    "<title>AgentLive.Events</title><body style='margin:0;background:#F6F3EA;color:#17150F;font-family:Newsreader,Georgia,serif;padding:56px 20px'>" +
    "<div style='max-width:640px;margin:0 auto;border-top:3px solid #17150F;padding-top:24px'>" +
    "<p style='font-size:23px;line-height:1.4'>" + msg + "</p>" +
    "<p style='font-family:\"IBM Plex Mono\",monospace;font-size:14px'><a href='https://agentlive.events' style='color:#17150F'>&larr; agentlive.events</a></p></div>";
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
