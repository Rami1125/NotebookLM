//#region node_modules/.nitro/vite/services/ssr/assets/sheets.server-B6RjD0YU.js
function config() {
	const url = process.env.GOOGLE_APPS_SCRIPT_URL?.trim() ?? "";
	const key = process.env.GOOGLE_SHEETS_API_KEY?.trim() ?? "";
	return {
		url,
		key,
		spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID?.trim() ?? "",
		driveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID?.trim() ?? "",
		configured: Boolean(url && key)
	};
}
function sheetsStatusQuiet() {
	const cfg = config();
	if (!cfg.configured) return {
		configured: false,
		ok: false,
		message: "Google Sheets לא הוגדר. הנתונים נשמרים במסד האפליקציה עד שיחוברו כתובת הסקריפט ומפתח ה־API.",
		spreadsheetIdSet: Boolean(cfg.spreadsheetId),
		driveFolderSet: Boolean(cfg.driveFolderId)
	};
	return {
		configured: true,
		ok: false,
		message: "החיבור הוגדר אך עדיין לא נבדק מול הגיליון.",
		spreadsheetIdSet: Boolean(cfg.spreadsheetId),
		driveFolderSet: Boolean(cfg.driveFolderId)
	};
}
async function callScript(action, payload, attempt = 0) {
	const cfg = config();
	if (!cfg.configured) throw new Error("Google Sheets לא מחובר.");
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 8e3);
	try {
		const response = await fetch(cfg.url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				action,
				apiKey: cfg.key,
				spreadsheetId: cfg.spreadsheetId,
				...payload
			}),
			signal: controller.signal
		});
		const text = await response.text();
		if (!response.ok) throw new Error(`גיליון החזיר ${response.status}`);
		return JSON.parse(text);
	} catch (error) {
		if (attempt < 1) return callScript(action, payload, attempt + 1);
		throw error instanceof Error ? error : /* @__PURE__ */ new Error("קריאת הגיליון נכשלה");
	} finally {
		clearTimeout(timer);
	}
}
async function checkSheets() {
	const quiet = sheetsStatusQuiet();
	if (!quiet.configured) return quiet;
	try {
		const body = await callScript("healthCheck", {});
		if (!body?.ok) return {
			...quiet,
			ok: false,
			message: body?.error || "הגיליון ענה בלי אישור תקינות."
		};
		return {
			...quiet,
			ok: true,
			message: "Google Sheets מחובר ומגיב."
		};
	} catch (error) {
		return {
			...quiet,
			ok: false,
			message: error instanceof Error ? error.message : "בדיקת הגיליון נכשלה"
		};
	}
}
async function pushSnapshot(payload) {
	const quiet = sheetsStatusQuiet();
	if (!quiet.configured) return {
		ok: false,
		message: quiet.message
	};
	try {
		const body = await callScript("syncSnapshot", { snapshot: payload });
		if (!body?.ok) return {
			ok: false,
			message: body?.error || "הסנכרון לא אושר."
		};
		return {
			ok: true,
			message: "הנתונים נכתבו לגיליון ואושרו."
		};
	} catch (error) {
		return {
			ok: false,
			message: error instanceof Error ? error.message : "הסנכרון נכשל"
		};
	}
}
function integrationStatus() {
	const cfg = config();
	return {
		sheetsConfigured: cfg.configured,
		spreadsheetIdSet: Boolean(cfg.spreadsheetId),
		driveFolderSet: Boolean(cfg.driveFolderId),
		driveMessage: cfg.driveFolderId ? "מזהה תיקיית Drive הוגדר. העלאת קבצים אוטומטית אליה עדיין לא חובּרה כי אין אסימון Drive פעיל." : "Google Drive לא הוגדר. שמרו כתובות קבצים בלבד, לא את הקובץ עצמו.",
		grok: Boolean(process.env.XAI_API_KEY),
		gemini: Boolean(process.env.GEMINI_API_KEY),
		imageGeneration: Boolean(process.env.XAI_API_KEY),
		videoFileGeneration: false,
		voiceGeneration: false,
		notebooklm: "manual"
	};
}
//#endregion
export { checkSheets, integrationStatus, pushSnapshot, sheetsStatusQuiet };
