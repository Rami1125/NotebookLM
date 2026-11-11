/**
 * SABAN CREATIVE STUDIO — Google Sheets API
 * Deploy as a web app: Execute as me, access: anyone with the link.
 * Script properties: API_KEY (required), SPREADSHEET_ID (optional if sent in the body).
 * The studio server calls this. The browser never holds the key.
 *
 * Supported actions:
 *   healthCheck  → { ok, sheets: string[] }
 *   syncSnapshot → write products/projects/prompts/media/campaigns/knowledge
 *   pullSnapshot → read Products + MediaLibrary back to the app
 */
var SHEETS = {
  Products: ["productId", "sku", "nameHe", "nameEn", "manufacturer", "category", "packageSize", "description", "marketingBenefits", "technicalData", "technicalStatus", "manufacturerUrl", "technicalSheetUrl", "productImageUrl", "createdAt", "updatedAt"],
  Projects: ["projectId", "projectName", "projectType", "productIds", "targetAudience", "visualStyle", "format", "status", "previewUrl", "exportUrl", "createdAt", "updatedAt"],
  Slides: ["slideId", "projectId", "slideNumber", "title", "subtitle", "body", "technicalContent", "imageUrl", "layout", "duration", "createdAt"],
  VideoProjects: ["videoId", "projectId", "title", "duration", "aspectRatio", "script", "storyboard", "videoPrompt", "provider", "outputUrl", "status", "createdAt"],
  MediaLibrary: ["mediaId", "fileName", "mediaType", "productId", "sourceType", "sourceUrl", "storageUrl", "licenseStatus", "createdAt"],
  PromptLibrary: ["promptId", "promptName", "promptType", "promptText", "category", "variables", "createdAt", "updatedAt"],
  KnowledgeSources: ["sourceId", "title", "sourceType", "sourceUrl", "productId", "documentUrl", "verificationStatus", "lastVerified", "notes"],
  Campaigns: ["campaignId", "campaignName", "targetAudience", "productIds", "campaignGoal", "contentIds", "status", "createdAt"],
  Users: ["userId", "name", "email", "role", "status"],
  SystemLogs: ["logId", "action", "userId", "entityType", "entityId", "timestamp", "result", "errorMessage"]
};

function doPost(e) {
  return handle_(e);
}

function doGet(e) {
  return handle_(e);
}

function handle_(e) {
  try {
    var payload = {};
    if (e.postData && e.postData.contents) payload = JSON.parse(e.postData.contents);
    else payload = e.parameter || {};
    var expected = PropertiesService.getScriptProperties().getProperty("API_KEY");
    var got = String(payload.apiKey || (e.parameter && e.parameter.apiKey) || "");
    if (!expected || got !== expected) return json_({ ok: false, error: "unauthorized" });
    var action = String(payload.action || "");

    if (action === "healthCheck") {
      var book = openBook_(payload);
      return json_({ ok: true, sheets: book.getSheets().map(function (sheet) { return sheet.getName(); }) });
    }

    if (action === "syncSnapshot") {
      var result = withLock_(function () {
        ensureSheets_(openBook_(payload));
        var snapshot = payload.snapshot || {};
        writeRows_(openBook_(payload), "Products", snapshot.products || [], "productId");
        writeRows_(openBook_(payload), "Projects", snapshot.projects || [], "projectId");
        writeRows_(openBook_(payload), "PromptLibrary", snapshot.prompts || [], "promptId");
        writeRows_(openBook_(payload), "MediaLibrary", snapshot.media || [], "mediaId");
        writeRows_(openBook_(payload), "Campaigns", snapshot.campaigns || [], "campaignId");
        writeRows_(openBook_(payload), "KnowledgeSources", snapshot.knowledge || [], "sourceId");
        return { ok: true, written: true };
      });
      return json_(result);
    }

    if (action === "pullSnapshot") {
      var pull = withLock_(function () {
        var book = openBook_(payload);
        ensureSheets_(book);
        return {
          ok: true,
          products: readRows_(book, "Products"),
          media: readRows_(book, "MediaLibrary"),
        };
      });
      return json_(pull);
    }

    return json_({ ok: false, error: "unknown action" });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function openBook_(payload) {
  var id = String((payload && payload.spreadsheetId) || PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID") || "");
  if (!id) throw new Error("missing spreadsheet id");
  return SpreadsheetApp.openById(id);
}

function ensureSheets_(book) {
  Object.keys(SHEETS).forEach(function (name) {
    var sheet = book.getSheetByName(name) || book.insertSheet(name);
    var headers = SHEETS[name];
    var width = Math.max(sheet.getLastColumn(), headers.length);
    var current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
    var same = headers.every(function (header, index) { return current[index] === header; });
    if (!same) sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (width < headers.length) sheet.insertColumnsAfter(width || 1, headers.length - width);
  });
}

function writeRows_(book, sheetName, rows, idKey) {
  var sheet = book.getSheetByName(sheetName);
  var headers = SHEETS[sheetName];
  var existing = sheet.getLastRow() < 2 ? [] : sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  var indexById = {};
  existing.forEach(function (row, index) {
    if (row[0]) indexById[String(row[0])] = index;
  });
  rows.forEach(function (item) {
    var id = String(item[idKey] || "");
    if (!id) return;
    var line = headers.map(function (header) {
      var value = item[header];
      if (value && typeof value === "object") return JSON.stringify(value);
      return value == null ? "" : value;
    });
    if (Object.prototype.hasOwnProperty.call(indexById, id)) {
      sheet.getRange(indexById[id] + 2, 1, 1, headers.length).setValues([line]);
    } else {
      sheet.appendRow(line);
      indexById[id] = sheet.getLastRow() - 2;
    }
  });
}

function readRows_(book, sheetName) {
  var sheet = book.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  var headers = SHEETS[sheetName];
  var values = sheet.getRange(2, 1, sheet.getLastRow() - 1, headers.length).getValues();
  return values.map(function (row) {
    var obj = {};
    headers.forEach(function (header, index) {
      obj[header] = row[index] == null ? "" : row[index];
    });
    return obj;
  }).filter(function (obj) {
    return obj[headers[0]];
  });
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
