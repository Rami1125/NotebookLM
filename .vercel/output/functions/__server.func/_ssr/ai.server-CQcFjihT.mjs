//#region node_modules/.nitro/vite/services/ssr/assets/ai.server-CQcFjihT.js
var SYSTEM = [
	"אתה עורך תוכן של ח. סבן חומרי בניין.",
	"כתוב עברית מקצועית, קצרה וברורה.",
	"אסור להמציא נתוני צריכה, תקנים, זמני ייבוש, עמידות למים, מי שתייה, או הוראות יישום.",
	"אם חסר נתון, כתוב שהוא חסר ושיש לאמת מול גיליון היצרן.",
	"אל תוסיף מחיר."
].join(" ");
async function grokRewrite(draft, instruction) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "ספק Grok לא זמין בסביבה זו."
	};
	const trimmed = draft.trim();
	if (trimmed.length < 2) return {
		ok: false,
		error: "אין טקסט לשיפור."
	};
	try {
		const response = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .3,
				max_tokens: 700,
				messages: [{
					role: "system",
					content: SYSTEM
				}, {
					role: "user",
					content: `הנחיה: ${instruction.slice(0, 400)}\n\nטיוטה:\n${trimmed.slice(0, 4e3)}`
				}]
			})
		});
		if (!response.ok) return {
			ok: false,
			error: `שגיאת ספק טקסט (${response.status}).`
		};
		const text = (await response.json()).choices?.[0]?.message?.content?.trim() ?? "";
		if (!text) return {
			ok: false,
			error: "הספק החזיר תשובה ריקה."
		};
		return {
			ok: true,
			text
		};
	} catch {
		return {
			ok: false,
			error: "לא הצלחנו להגיע לספק הטקסט."
		};
	}
}
//#endregion
export { grokRewrite };
