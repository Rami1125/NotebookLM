import assert from "node:assert/strict";
import test from "node:test";
import { assessClaim, buildSlides, buildVideo } from "./compose.ts";

const product = {
  nameHe: "SikaCeram-255 StarFlex",
  nameEn: "SikaCeram-255 StarFlex",
  manufacturer: "Sika",
  category: "דבקים לריצוף",
  packageSize: "",
  description: "רשומת פתיחה",
  marketingBenefits: "מותג מוכר",
  technicalData: "",
  technicalStatus: "NEEDS_VERIFICATION" as const,
  manufacturerUrl: "https://www.sika.com/",
  technicalSheetUrl: "",
  productImageUrl: "",
  priceText: "99",
  priceApproved: false,
  promoText: "",
};

test("slides do not invent technical numbers", () => {
  const slides = buildSlides({
    product,
    audience: "קבלנים",
    goal: "היכרות",
    slideCount: 8,
    visualStyle: "נקי תכלת",
  });
  const blob = JSON.stringify(slides);
  assert.equal(slides.length, 8);
  assert.match(blob, /אין/);
  assert.doesNotMatch(blob, /ק״ג|ק"ג|מ\"ר|תקן/);
  assert.match(blob, /הוזן מחיר אך הוא לא אושר/);
});

test("video prompt forbids invented specs", () => {
  const video = buildVideo({
    product,
    audience: "קבלנים",
    goal: "היכרות",
    duration: 30,
    aspectRatio: "16:9",
  });
  assert.equal(video.scenes.length, 6);
  assert.match(video.videoPrompt, /Do not invent coverage rates/);
  assert.equal(video.scenes.some((scene) => scene.aiVideoPrompt && scene.voiceover && scene.cameraMovement), true);
});

test("numeric claims without a verified excerpt stay unverified", () => {
  const result = assessClaim("הכיסוי הוא 4 ק״ג למ״ר", [{ status: "NEEDS_VERIFICATION", excerpt: "" }]);
  assert.equal(result.status, "NEEDS_VERIFICATION");
});
