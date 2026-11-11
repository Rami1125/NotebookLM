export type Role = "ADMIN" | "EDITOR" | "VIEWER";

export type TechnicalStatus =
  | "VERIFIED"
  | "USER_PROVIDED"
  | "NEEDS_VERIFICATION"
  | "OUTDATED";

export type ProjectStatus =
  | "DRAFT"
  | "IN_PROGRESS"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "ARCHIVED";

export type Member = {
  userId: string;
  name: string;
  email: string;
  role: Role;
  status: string;
  createdAt: string;
};

export type Product = {
  productId: string;
  sku: string;
  nameHe: string;
  nameEn: string;
  manufacturer: string;
  category: string;
  packageSize: string;
  description: string;
  marketingBenefits: string;
  technicalData: string;
  technicalStatus: TechnicalStatus;
  manufacturerUrl: string;
  technicalSheetUrl: string;
  productImageUrl: string;
  priceText: string;
  priceApproved: boolean;
  promoText: string;
  complementaryIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  projectId: string;
  projectName: string;
  projectType: string;
  productIds: string[];
  targetAudience: string;
  visualStyle: string;
  format: string;
  goal: string;
  status: ProjectStatus;
  previewUrl: string;
  exportUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type Slide = {
  slideId: string;
  projectId: string;
  slideNumber: number;
  title: string;
  subtitle: string;
  body: string;
  technicalContent: string;
  imageUrl: string;
  layout: string;
  duration: number;
  benefit: string;
  cta: string;
  warning: string;
  createdAt: string;
};

export type VideoScene = {
  sceneNumber: number;
  duration: number;
  visualDescription: string;
  cameraMovement: string;
  lighting: string;
  voiceover: string;
  onScreenText: string;
  aiVideoPrompt: string;
};

export type VideoVersion = {
  savedAt: string;
  script: string;
  storyboard: VideoScene[];
  videoPrompt: string;
};

export type VideoProject = {
  videoId: string;
  projectId: string;
  title: string;
  duration: number;
  aspectRatio: string;
  script: string;
  storyboard: VideoScene[];
  videoPrompt: string;
  provider: string;
  outputUrl: string;
  status: string;
  versions: VideoVersion[];
  createdAt: string;
  updatedAt: string;
};

export type MediaItem = {
  mediaId: string;
  fileName: string;
  mediaType: string;
  productId: string;
  sourceType: string;
  sourceUrl: string;
  storageUrl: string;
  licenseStatus: string;
  notes: string;
  createdAt: string;
};

export type PromptItem = {
  promptId: string;
  promptName: string;
  promptType: string;
  promptText: string;
  category: string;
  variables: string[];
  builtin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type KnowledgeSource = {
  sourceId: string;
  title: string;
  sourceType: string;
  sourceUrl: string;
  productId: string;
  documentUrl: string;
  verificationStatus: TechnicalStatus;
  lastVerified: string;
  notes: string;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
};

export type Campaign = {
  campaignId: string;
  campaignName: string;
  targetAudience: string;
  productIds: string[];
  campaignGoal: string;
  contentIds: string[];
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type SignageScreen = {
  screenId: string;
  name: string;
  screenType: "counter" | "lobby" | "parking";
  productIds: string[];
  intervalSec: number;
  transition: "fade" | "slide";
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type SystemLog = {
  logId: string;
  action: string;
  userId: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  result: string;
  errorMessage: string;
};

export type StudioTemplate = {
  templateId: string;
  name: string;
  kind: "presentation" | "video" | "signage" | "prompt";
  audience: string;
  description: string;
  visualStyle: string;
  format: string;
  slideCount: number;
};
