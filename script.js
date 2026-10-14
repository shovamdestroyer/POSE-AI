/**
 * PoseMate AI — Main Application Controller
 * Handles navigation, real camera integration, step-by-step pose coaching,
 * audio synthesis, real photographic references, secure authentication,
 * favorites, live pose search, theme switching, and live telemetry.
 */

// ===================================================================
// 1. Application State
// ===================================================================
const AppState = {
  currentView: "home", // "home" | "studio"
  selectedMode: "solo", // "solo" | "couple" | "group"
  selectedOutfit: "casual", // "casual" | "formal" | "traditional" | "western"
  selectedStyle: "instagram", // "instagram" | "wedding" | "college" | "birthday" | "travel" | "professional"

  currentPose: null,
  currentStepIndex: 0,
  activePhotoTab: "reference", // "reference" | "final"

  // Camera stream state
  mediaStream: null,
  availableCameras: [],
  selectedDeviceId: null,
  facingMode: "user", // "user" (front) | "environment" (rear)
  isCameraMirrored: true,

  // Viewfinder toggles
  isSkeletonActive: true,
  isGhostActive: true,
  isGridActive: false,
  timerSeconds: 3, // 3 or 0
  isCapturing: false,

  // Last captured photo
  capturedPhotoDataUrl: null,

  // Pose Detector Instance
  detector: null,

  // User Authentication & Session
  currentUser: null,

  // Saved Favorites (Pose IDs array)
  favorites: [],

  // Theme ('dark' | 'light')
  theme: "dark",

  // Search filter
  searchKeyword: "",
  searchModeFilter: "all",
  galleryModeFilter: "all",

  // Interactive guidance & auto-capture
  isAutoCaptureEnabled: true,
  isGuidancePaused: false,
  recentPoseIds: [],
  pendingCaptureAfterLogin: false,
  isStepChimed: false
};

// ===================================================================
// 2. DOM Elements Cache
// ===================================================================
const DOM = {
  // Views & App Nav
  homeView: document.getElementById("homeView"),
  studioView: document.getElementById("studioView"),
  navBrand: document.getElementById("navBrand"),
  navStartPosingBtn: document.getElementById("navStartPosingBtn"),
  openCatalogNavBtn: document.getElementById("openCatalogNavBtn"),
  navLinkHome: document.getElementById("navLinkHome"),
  navLinkExplore: document.getElementById("navLinkExplore"),
  navLinkStudio: document.getElementById("navLinkStudio"),
  navLinkFavorites: document.getElementById("navLinkFavorites"),
  navLinkGallery: document.getElementById("navLinkGallery"),
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  openFavoritesNavBtn: document.getElementById("openFavoritesNavBtn"),
  navFavoritesCount: document.getElementById("navFavoritesCount"),

  // Authentication in Nav
  openAuthNavBtn: document.getElementById("openAuthNavBtn"),
  userProfileMenu: document.getElementById("userProfileMenu"),
  userProfileTrigger: document.getElementById("userProfileTrigger"),
  userProfileDropdown: document.getElementById("userProfileDropdown"),
  userAvatarInitials: document.getElementById("userAvatarInitials"),
  userProfileName: document.getElementById("userProfileName"),
  userProfileEmail: document.getElementById("userProfileEmail"),
  profileFavoritesItem: document.getElementById("profileFavoritesItem"),
  profileStudioItem: document.getElementById("profileStudioItem"),
  profileFirebaseItem: document.getElementById("profileFirebaseItem"),
  logoutBtn: document.getElementById("logoutBtn"),

  // Home Screen Elements
  heroStartPosingBtn: document.getElementById("heroStartPosingBtn"),
  heroExplorePosesBtn: document.getElementById("heroExplorePosesBtn"),
  heroFavoritesBtn: document.getElementById("heroFavoritesBtn"),
  launchCameraBtn: document.getElementById("launchCameraBtn"),
  viewAllPosesBtn: document.getElementById("viewAllPosesBtn"),
  modeSelector: document.getElementById("modeSelector"),
  outfitSelector: document.getElementById("outfitSelector"),
  styleSelector: document.getElementById("styleSelector"),
  summaryModeTag: document.getElementById("summaryModeTag"),
  summaryOutfitTag: document.getElementById("summaryOutfitTag"),
  summaryStyleTag: document.getElementById("summaryStyleTag"),
  recommendedPosesTrack: document.getElementById("recommendedPosesTrack"),
  favoritesGrid: document.getElementById("favoritesGrid"),
  galleryGrid: document.getElementById("galleryGrid"),
  galleryModeTabs: document.getElementById("galleryModeTabs"),

  // Search & Filter
  poseSearchInput: document.getElementById("poseSearchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  searchFilterTabs: document.getElementById("searchFilterTabs"),
  searchResultsCount: document.getElementById("searchResultsCount"),

  // Footer Buttons
  footerOpenAuthBtn: document.getElementById("footerOpenAuthBtn"),
  footerOpenFirebaseBtn: document.getElementById("footerOpenFirebaseBtn"),

  // Studio Screen Header & Quick Controls
  exitStudioBtn: document.getElementById("exitStudioBtn"),
  studioModeSwitcher: document.getElementById("studioModeSwitcher"),
  studioPrevPoseBtn: document.getElementById("studioPrevPoseBtn"),
  studioNextPoseBtn: document.getElementById("studioNextPoseBtn"),
  studioFavoriteBtn: document.getElementById("studioFavoriteBtn"),
  studioModeBadge: document.getElementById("studioModeBadge"),
  studioStyleBadge: document.getElementById("studioStyleBadge"),
  flipCameraBtn: document.getElementById("flipCameraBtn"),
  toggleSkeletonBtn: document.getElementById("toggleSkeletonBtn"),
  toggleGhostBtn: document.getElementById("toggleGhostBtn"),
  toggleGridBtn: document.getElementById("toggleGridBtn"),
  cameraDeviceSelect: document.getElementById("cameraDeviceSelect"),

  // Viewfinder Elements
  viewfinderContainer: document.getElementById("viewfinderContainer"),
  cameraVideo: document.getElementById("cameraVideo"),
  poseCanvas: document.getElementById("poseCanvas"),
  ghostSilhouetteOverlay: document.getElementById("ghostSilhouetteOverlay"),
  ruleOfThirdsGrid: document.getElementById("ruleOfThirdsGrid"),
  shutterFlash: document.getElementById("shutterFlash"),
  countdownOverlay: document.getElementById("countdownOverlay"),
  countdownNumber: document.getElementById("countdownNumber"),
  liveFeedbackPill: document.getElementById("liveFeedbackPill"),
  feedbackIcon: document.getElementById("feedbackIcon"),
  feedbackText: document.getElementById("feedbackText"),
  aiStatusBadge: document.getElementById("aiStatusBadge"),
  aiStatusText: document.getElementById("aiStatusText"),

  // Studio Controls & Shutter
  shutterBtn: document.getElementById("shutterBtn"),
  timerToggleBtn: document.getElementById("timerToggleBtn"),
  timerLabel: document.getElementById("timerLabel"),
  analyzeOutfitSceneBtn: document.getElementById("analyzeOutfitSceneBtn"),

  // Coach Column Elements
  coachPoseName: document.getElementById("coachPoseName"),
  coachPoseCategory: document.getElementById("coachPoseCategory"),
  coachPoseDifficulty: document.getElementById("coachPoseDifficulty"),
  coachPoseFraming: document.getElementById("coachPoseFraming"),
  coachPoseVibe: document.getElementById("coachPoseVibe"),
  coachPrevPoseBtn: document.getElementById("coachPrevPoseBtn"),
  coachNextPoseBtn: document.getElementById("coachNextPoseBtn"),
  switchPoseBtn: document.getElementById("switchPoseBtn"),

  // Visual Photo Reference in Coach
  coachPhotoCard: document.getElementById("coachPhotoCard"),
  photoTabReferenceBtn: document.getElementById("photoTabReferenceBtn"),
  photoTabFinalBtn: document.getElementById("photoTabFinalBtn"),
  coachRefPhotoImg: document.getElementById("coachRefPhotoImg"),
  coachFinalPhotoImg: document.getElementById("coachFinalPhotoImg"),
  refPhotoFrame: document.getElementById("refPhotoFrame"),
  finalPhotoFrame: document.getElementById("finalPhotoFrame"),
  expandPhotoBtn: document.getElementById("expandPhotoBtn"),

  // Step guidance elements
  stepCounterDisplay: document.getElementById("stepCounterDisplay"),
  stepProgressBarFill: document.getElementById("stepProgressBarFill"),
  stepDotsContainer: document.getElementById("stepDotsContainer"),
  stepBodyPartBadge: document.getElementById("stepBodyPartBadge"),
  stepTitleText: document.getElementById("stepTitleText"),
  stepInstructionText: document.getElementById("stepInstructionText"),
  stepShyTipText: document.getElementById("stepShyTipText"),
  stepVisualBox: document.getElementById("stepVisualBox"),
  prevStepBtn: document.getElementById("prevStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  similarPosesRow: document.getElementById("similarPosesRow"),

  // Interactive Live Pose Coach Meter & Controls
  stepLiveMeterCard: document.getElementById("stepLiveMeterCard"),
  stepMatchStatusBadge: document.getElementById("stepMatchStatusBadge"),
  stepMatchStatusText: document.getElementById("stepMatchStatusText"),
  stepMatchPctText: document.getElementById("stepMatchPctText"),
  stepMatchProgressFill: document.getElementById("stepMatchProgressFill"),
  autoCaptureToggleBtn: document.getElementById("autoCaptureToggleBtn"),
  autoCaptureLabel: document.getElementById("autoCaptureLabel"),
  pauseGuidanceBtn: document.getElementById("pauseGuidanceBtn"),
  pauseGuidanceLabel: document.getElementById("pauseGuidanceLabel"),
  restartGuidanceBtn: document.getElementById("restartGuidanceBtn"),

  // Master Pro-Tips in Coach
  proTipPostureText: document.getElementById("proTipPostureText"),
  proTipLightingText: document.getElementById("proTipLightingText"),
  proTipFramingText: document.getElementById("proTipFramingText"),
  proTipExpressionText: document.getElementById("proTipExpressionText"),

  // Telemetry elements
  telemetryScoreBadge: document.getElementById("telemetryScoreBadge"),
  shoulderBar: document.getElementById("shoulderBar"),
  shoulderStatus: document.getElementById("shoulderStatus"),
  centerBar: document.getElementById("centerBar"),
  centerStatus: document.getElementById("centerStatus"),
  distanceBar: document.getElementById("distanceBar"),
  distanceStatus: document.getElementById("distanceStatus"),

  // Modal 1: Photo Review
  photoReviewModal: document.getElementById("photoReviewModal"),
  closeReviewModalBtn: document.getElementById("closeReviewModalBtn"),
  photoPreviewImg: document.getElementById("photoPreviewImg"),
  photoPoseWatermark: document.getElementById("photoPoseWatermark"),
  retakePhotoBtn: document.getElementById("retakePhotoBtn"),
  savePhotoBtn: document.getElementById("savePhotoBtn"),

  // Modal 2: Catalog
  poseCatalogModal: document.getElementById("poseCatalogModal"),
  closeCatalogModalBtn: document.getElementById("closeCatalogModalBtn"),
  catalogModeTabs: document.getElementById("catalogModeTabs"),
  catalogGrid: document.getElementById("catalogGrid"),

  // Modal 3: Camera Error
  cameraErrorModal: document.getElementById("cameraErrorModal"),
  cameraErrorMessage: document.getElementById("cameraErrorMessage"),
  cancelCameraErrorBtn: document.getElementById("cancelCameraErrorBtn"),
  retryCameraBtn: document.getElementById("retryCameraBtn"),

  // Modal 4: AI Vision Analysis
  aiVisionModal: document.getElementById("aiVisionModal"),
  closeAiVisionModalBtn: document.getElementById("closeAiVisionModalBtn"),
  aiEngineBanner: document.getElementById("aiEngineBanner"),
  aiEngineLabel: document.getElementById("aiEngineLabel"),
  aiLoadingState: document.getElementById("aiLoadingState"),
  aiAnalysisDetails: document.getElementById("aiAnalysisDetails"),
  aiSnapshotThumb: document.getElementById("aiSnapshotThumb"),
  aiDetectedOutfit: document.getElementById("aiDetectedOutfit"),
  aiDetectedColors: document.getElementById("aiDetectedColors"),
  aiDetectedEnvironment: document.getElementById("aiDetectedEnvironment"),
  aiDetectedFraming: document.getElementById("aiDetectedFraming"),
  aiRecommendationsList: document.getElementById("aiRecommendationsList"),

  // Modal 5: Premium Authentication
  authModal: document.getElementById("authModal"),
  authModalTitle: document.getElementById("authModalTitle"),
  authModalSubtitle: document.getElementById("authModalSubtitle"),
  closeAuthModalBtn: document.getElementById("closeAuthModalBtn"),
  authTabSignInBtn: document.getElementById("authTabSignInBtn"),
  authTabSignUpBtn: document.getElementById("authTabSignUpBtn"),
  signInForm: document.getElementById("signInForm"),
  signInEmail: document.getElementById("signInEmail"),
  signInPassword: document.getElementById("signInPassword"),
  signInTogglePasswordBtn: document.getElementById("signInTogglePasswordBtn"),
  signInRememberMe: document.getElementById("signInRememberMe"),
  signInSubmitBtn: document.getElementById("signInSubmitBtn"),
  signInEmailError: document.getElementById("signInEmailError"),
  signInPasswordError: document.getElementById("signInPasswordError"),
  signUpForm: document.getElementById("signUpForm"),
  signUpName: document.getElementById("signUpName"),
  signUpEmail: document.getElementById("signUpEmail"),
  signUpPassword: document.getElementById("signUpPassword"),
  signUpTogglePasswordBtn: document.getElementById("signUpTogglePasswordBtn"),
  signUpStrengthBar: document.getElementById("signUpStrengthBar"),
  signUpStrengthText: document.getElementById("signUpStrengthText"),
  signUpConfirmPassword: document.getElementById("signUpConfirmPassword"),
  signUpToggleConfirmPasswordBtn: document.getElementById("signUpToggleConfirmPasswordBtn"),
  signUpTerms: document.getElementById("signUpTerms"),
  signUpSubmitBtn: document.getElementById("signUpSubmitBtn"),
  signUpNameError: document.getElementById("signUpNameError"),
  signUpEmailError: document.getElementById("signUpEmailError"),
  signUpPasswordError: document.getElementById("signUpPasswordError"),
  signUpConfirmError: document.getElementById("signUpConfirmError"),
  googleSignInBtn: document.getElementById("googleSignInBtn"),
  demoSignInBtn: document.getElementById("demoSignInBtn"),
  openFirebaseSetupBtn: document.getElementById("openFirebaseSetupBtn"),
  forgotPasswordBtn: document.getElementById("forgotPasswordBtn"),

  // Modal 6: Firebase Setup Guide
  firebaseSetupModal: document.getElementById("firebaseSetupModal"),
  closeFirebaseSetupModalBtn: document.getElementById("closeFirebaseSetupModalBtn"),
  ackFirebaseSetupBtn: document.getElementById("ackFirebaseSetupBtn"),

  // Modal 7: Pose Detail & High-Res Breakdown
  poseDetailModal: document.getElementById("poseDetailModal"),
  closePoseDetailModalBtn: document.getElementById("closePoseDetailModalBtn"),
  modalPoseRefImg: document.getElementById("modalPoseRefImg"),
  modalPoseFinalImg: document.getElementById("modalPoseFinalImg"),
  modalPoseTitle: document.getElementById("modalPoseTitle"),
  modalPoseVibe: document.getElementById("modalPoseVibe"),
  modalPoseDesc: document.getElementById("modalPoseDesc"),
  modalBodyPos: document.getElementById("modalBodyPos"),
  modalHandPos: document.getElementById("modalHandPos"),
  modalLegPos: document.getElementById("modalLegPos"),
  modalFacePos: document.getElementById("modalFacePos"),
  modalCameraAngle: document.getElementById("modalCameraAngle"),
  modalToggleFavBtn: document.getElementById("modalToggleFavBtn"),
  modalFavBtnText: document.getElementById("modalFavBtnText"),
  modalLaunchPoseBtn: document.getElementById("modalLaunchPoseBtn"),

  // Canvas & Toast
  photoCaptureCanvas: document.getElementById("photoCaptureCanvas"),
  toastContainer: document.getElementById("toastContainer")
};

// ===================================================================
// 3. Audio Sound Effects (Web Audio API Synthesizer)
// ===================================================================
class SoundFX {
  static getAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  static playCountdownBeep(isFinal = false) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(isFinal ? 880 : 587.33, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (isFinal ? 0.35 : 0.15));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (isFinal ? 0.35 : 0.15));
    } catch (e) {
      // Audio playback restricted before interaction
    }
  }

  static playShutterSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Click 1 (Mirror flip)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "square";
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.05);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      // Click 2 (Curtain close)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(320, now + 0.08);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      gain2.gain.setValueAtTime(0.25, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.15);
    } catch (e) {
      // Ignore audio synthesis errors
    }
  }

  static playStepChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      // Ignore audio synthesis errors
    }
  }
}

// ===================================================================
// 4. Initialization & State Hydration
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function recordShownPose(poseId) {
  if (!poseId) return;
  if (!AppState.recentPoseIds.includes(poseId)) {
    AppState.recentPoseIds.push(poseId);
    if (AppState.recentPoseIds.length > 25) {
      AppState.recentPoseIds.shift();
    }
  }
}

function initApp() {
  // 1. Hydrate Saved Preferences
  hydrateSavedState();

  // 2. Set default pose (random unseen from initial mode)
  AppState.currentPose = getRandomUnseenPose(AppState.selectedMode, AppState.recentPoseIds);
  recordShownPose(AppState.currentPose ? AppState.currentPose.id : null);

  // 3. Initialize Pose Estimation Engine
  AppState.detector = new PoseDetectorEngine();

  // 4. Bind UI Events
  bindNavigationEvents();
  bindHomeEvents();
  bindStudioEvents();
  bindModalEvents();
  bindAuthEvents();
  bindSearchAndGalleryEvents();

  // 5. Render initial views
  renderRecommendedPoses();
  renderFavoritesGrid();
  renderGalleryGrid();
  updateFavoritesBadge();
}

function hydrateSavedState() {
  // Theme hydration
  const savedTheme = localStorage.getItem("posemate_theme") || "dark";
  AppState.theme = savedTheme;
  applyTheme(savedTheme);

  // Favorites hydration
  try {
    const savedFavs = JSON.parse(localStorage.getItem("posemate_favorites") || "[]");
    AppState.favorites = Array.isArray(savedFavs) ? savedFavs : [];
  } catch (e) {
    AppState.favorites = [];
  }

  // User session hydration
  try {
    const savedSession = JSON.parse(localStorage.getItem("posemate_session") || "null");
    if (savedSession && savedSession.email) {
      AppState.currentUser = savedSession;
      updateAuthUI();
    }
  } catch (e) {
    AppState.currentUser = null;
  }
}

// ===================================================================
// 5. Theme Toggle Logic
// ===================================================================
function applyTheme(theme) {
  AppState.theme = theme;
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem("posemate_theme", theme);

  const darkIcon = DOM.themeToggleBtn.querySelector(".theme-icon-dark");
  const lightIcon = DOM.themeToggleBtn.querySelector(".theme-icon-light");
  if (darkIcon && lightIcon) {
    darkIcon.classList.toggle("hidden", theme === "light");
    lightIcon.classList.toggle("hidden", theme === "dark");
  }
}

function toggleTheme() {
  const nextTheme = AppState.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  showToast(`Switched to ${nextTheme === "light" ? "Warm Cream (Light)" : "Charcoal & Gold (Dark)"} mode`, "info");
}

// ===================================================================
// 6. Navigation & View Routing
// ===================================================================
function bindNavigationEvents() {
  // Brand logo
  DOM.navBrand.addEventListener("click", () => switchView("home"));

  // Desktop navigation links
  if (DOM.navLinkHome) DOM.navLinkHome.addEventListener("click", () => switchView("home"));
  if (DOM.navLinkExplore) DOM.navLinkExplore.addEventListener("click", () => openPoseCatalog());
  if (DOM.navLinkStudio) DOM.navLinkStudio.addEventListener("click", () => startStudio());
  if (DOM.navLinkFavorites) {
    DOM.navLinkFavorites.addEventListener("click", () => {
      switchView("home");
      const section = document.getElementById("favoritesSection");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }
  if (DOM.navLinkGallery) {
    DOM.navLinkGallery.addEventListener("click", () => {
      switchView("home");
      const section = document.getElementById("gallerySection");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Theme toggle button
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener("click", () => toggleTheme());
  }

  // Saved favorites quick nav
  if (DOM.openFavoritesNavBtn) {
    DOM.openFavoritesNavBtn.addEventListener("click", () => {
      switchView("home");
      const section = document.getElementById("favoritesSection");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Launch buttons
  DOM.navStartPosingBtn.addEventListener("click", () => startStudio());
  DOM.openCatalogNavBtn.addEventListener("click", () => openPoseCatalog());
}

function switchView(viewName) {
  AppState.currentView = viewName;
  if (viewName === "home") {
    DOM.studioView.classList.remove("active");
    DOM.homeView.classList.add("active");
    stopCamera();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (viewName === "studio") {
    DOM.homeView.classList.remove("active");
    DOM.studioView.classList.add("active");
    window.scrollTo({ top: 0 });
  }

  // Update nav active link state
  if (DOM.navLinkHome) DOM.navLinkHome.classList.toggle("active", viewName === "home");
  if (DOM.navLinkStudio) DOM.navLinkStudio.classList.toggle("active", viewName === "studio");
}

// ===================================================================
// 7. Home View Setup, Category & Config Events
// ===================================================================
function bindHomeEvents() {
  DOM.heroStartPosingBtn.addEventListener("click", () => startStudio());
  DOM.heroExplorePosesBtn.addEventListener("click", () => openPoseCatalog());
  DOM.launchCameraBtn.addEventListener("click", () => startStudio());
  DOM.viewAllPosesBtn.addEventListener("click", () => openPoseCatalog());

  if (DOM.heroFavoritesBtn) {
    DOM.heroFavoritesBtn.addEventListener("click", () => {
      const section = document.getElementById("favoritesSection");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Curated category cards
  document.querySelectorAll(".category-action-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const mode = btn.dataset.mode;
      selectMode(mode);
      openPoseCatalog(mode);
    });
  });

  document.querySelectorAll(".category-showcase-card").forEach((card) => {
    card.addEventListener("click", () => {
      const mode = card.dataset.category;
      selectMode(mode);
      openPoseCatalog(mode);
    });
  });

  // Photography Mode Cards
  DOM.modeSelector.querySelectorAll(".mode-card").forEach((card) => {
    card.addEventListener("click", () => {
      selectMode(card.dataset.mode);
    });
  });

  // Outfit Selection Chips
  DOM.outfitSelector.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      DOM.outfitSelector.querySelectorAll(".chip").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-checked", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-checked", "true");

      AppState.selectedOutfit = chip.dataset.outfit;
      updateSummaryTags();
      renderRecommendedPoses();
    });
  });

  // Photography Style Chips
  DOM.styleSelector.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      DOM.styleSelector.querySelectorAll(".chip").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-checked", "false");
      });
      chip.classList.add("active");
      chip.setAttribute("aria-checked", "true");

      AppState.selectedStyle = chip.dataset.style;
      updateSummaryTags();
      renderRecommendedPoses();
    });
  });
}

function selectMode(mode) {
  if (!mode) return;
  AppState.selectedMode = mode;

  // Sync Home screen photography mode cards
  if (DOM.modeSelector) {
    DOM.modeSelector.querySelectorAll(".mode-card").forEach((c) => {
      const match = c.dataset.mode === mode;
      c.classList.toggle("active", match);
      c.setAttribute("aria-pressed", match ? "true" : "false");
    });
  }

  // Sync Studio view mode switcher pills
  if (DOM.studioModeSwitcher) {
    DOM.studioModeSwitcher.querySelectorAll(".studio-mode-pill").forEach((p) => {
      const match = p.dataset.studioMode === mode;
      p.classList.toggle("active", match);
      p.setAttribute("aria-checked", match ? "true" : "false");
    });
  }

  // Pick an unseen pose matching the new mode
  const newPose = getRandomUnseenPose(mode, AppState.recentPoseIds);
  if (newPose) {
    AppState.currentPose = newPose;
    recordShownPose(newPose.id);
    if (AppState.currentView === "studio") {
      loadPoseIntoCoach(newPose);
    }
  }

  updateSummaryTags();
  renderRecommendedPoses();
}

function updateSummaryTags() {
  DOM.summaryModeTag.textContent = `Mode: ${capitalize(AppState.selectedMode)}`;
  DOM.summaryOutfitTag.textContent = `Outfit: ${capitalize(AppState.selectedOutfit)}`;
  DOM.summaryStyleTag.textContent = `Style: ${capitalize(AppState.selectedStyle)}`;
}

// ===================================================================
// 8. Pose Recommendations Shelf with Actual Photographic References
// ===================================================================
function renderRecommendedPoses() {
  const filtered = getPosesByFilter(
    AppState.selectedMode,
    AppState.selectedOutfit,
    AppState.selectedStyle
  );

  const displayPoses = filtered.length >= 2 ? filtered : getPosesByMode(AppState.selectedMode);

  DOM.recommendedPosesTrack.innerHTML = "";

  displayPoses.forEach((pose) => {
    const isFav = AppState.favorites.includes(pose.id);
    const card = document.createElement("div");
    card.className = "pose-card-item";
    card.innerHTML = `
      <div class="pose-card-preview">
        <img class="pose-card-img" src="${pose.referenceImage}" alt="${pose.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'" />
        <div class="pose-card-badges">
          <span class="card-mode-badge">${capitalize(pose.mode)}</span>
          <span class="card-mode-badge">${pose.difficulty}</span>
        </div>
        <button type="button" class="fav-card-btn ${isFav ? 'favorited' : ''}" data-pose-id="${pose.id}" title="Toggle Favorite" aria-label="Toggle Favorite">
          <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="pose-card-body">
        <div>
          <h3 class="pose-card-title">${pose.name}</h3>
          <p class="pose-card-desc">${pose.description}</p>
        </div>
        <div class="pose-card-footer">
          <span class="pose-card-vibe">${pose.vibe}</span>
          <span class="pose-card-step-count">${pose.steps.length} Steps</span>
        </div>
      </div>
    `;

    // Click card to open in Studio
    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-card-btn")) return;
      selectAndLaunchPose(pose.id);
    });

    // Favorite heart button
    const favBtn = card.querySelector(".fav-card-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(pose.id);
    });

    DOM.recommendedPosesTrack.appendChild(card);
  });
}

function selectAndLaunchPose(poseId) {
  const pose = getPoseById(poseId);
  if (pose) {
    AppState.currentPose = pose;
    AppState.selectedMode = pose.mode;
    selectMode(pose.mode);
    startStudio();
  }
}

// ===================================================================
// 9. Saved Favorites System
// ===================================================================
function toggleFavorite(poseId) {
  const index = AppState.favorites.indexOf(poseId);
  const pose = getPoseById(poseId);
  const poseName = pose ? pose.name : "Pose";

  if (index >= 0) {
    AppState.favorites.splice(index, 1);
    showToast(`Removed "${poseName}" from favorites`, "info");
  } else {
    AppState.favorites.push(poseId);
    showToast(`Saved "${poseName}" to your collection!`, "gold");
  }

  localStorage.setItem("posemate_favorites", JSON.stringify(AppState.favorites));
  updateFavoritesBadge();
  renderFavoritesGrid();
  renderRecommendedPoses();
  updateStudioFavoriteButton();
}

function updateFavoritesBadge() {
  if (DOM.navFavoritesCount) {
    DOM.navFavoritesCount.textContent = AppState.favorites.length;
    DOM.navFavoritesCount.style.display = AppState.favorites.length > 0 ? "flex" : "none";
  }
}

function renderFavoritesGrid() {
  if (!DOM.favoritesGrid) return;
  DOM.favoritesGrid.innerHTML = "";

  if (AppState.favorites.length === 0) {
    DOM.favoritesGrid.innerHTML = `
      <div class="favorites-empty-card">
        <span class="empty-fav-icon">🤍</span>
        <h3 class="empty-fav-title">No Saved Poses Yet</h3>
        <p class="empty-fav-desc">Tap the heart icon on any pose in the library or during camera coaching to build your personal photoshoot cheat sheet.</p>
        <button type="button" class="btn btn-secondary btn-sm" onclick="openPoseCatalog()">Browse Poses Now</button>
      </div>
    `;
    return;
  }

  AppState.favorites.forEach((favId) => {
    const pose = getPoseById(favId);
    if (!pose) return;

    const card = document.createElement("div");
    card.className = "pose-card-item";
    card.innerHTML = `
      <div class="pose-card-preview">
        <img class="pose-card-img" src="${pose.referenceImage}" alt="${pose.name}" loading="lazy" />
        <div class="pose-card-badges">
          <span class="card-mode-badge">${capitalize(pose.mode)}</span>
        </div>
        <button type="button" class="fav-card-btn favorited" data-pose-id="${pose.id}" title="Remove Favorite">
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="pose-card-body">
        <div>
          <h3 class="pose-card-title">${pose.name}</h3>
          <p class="pose-card-desc">${pose.description}</p>
        </div>
        <div class="pose-card-footer">
          <span class="pose-card-vibe">${pose.vibe}</span>
          <span class="pose-card-step-count">${pose.steps.length} Steps</span>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-card-btn")) return;
      selectAndLaunchPose(pose.id);
    });

    card.querySelector(".fav-card-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(pose.id);
    });

    DOM.favoritesGrid.appendChild(card);
  });
}

// ===================================================================
// 10. Live Pose Search & Editorial Gallery
// ===================================================================
function bindSearchAndGalleryEvents() {
  // Live search input
  if (DOM.poseSearchInput) {
    DOM.poseSearchInput.addEventListener("input", (e) => {
      AppState.searchKeyword = e.target.value.trim().toLowerCase();
      if (DOM.clearSearchBtn) {
        DOM.clearSearchBtn.classList.toggle("hidden", AppState.searchKeyword.length === 0);
      }
      applyPoseSearchAndFilter();
    });
  }

  if (DOM.clearSearchBtn) {
    DOM.clearSearchBtn.addEventListener("click", () => {
      DOM.poseSearchInput.value = "";
      AppState.searchKeyword = "";
      DOM.clearSearchBtn.classList.add("hidden");
      applyPoseSearchAndFilter();
    });
  }

  // Search filter tabs
  if (DOM.searchFilterTabs) {
    DOM.searchFilterTabs.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        DOM.searchFilterTabs.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        AppState.searchModeFilter = pill.dataset.filter;
        applyPoseSearchAndFilter();
      });
    });
  }

  // Gallery mode tabs
  if (DOM.galleryModeTabs) {
    DOM.galleryModeTabs.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        DOM.galleryModeTabs.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        AppState.galleryModeFilter = tab.dataset.galleryMode;
        renderGalleryGrid();
      });
    });
  }
}

function applyPoseSearchAndFilter() {
  const keyword = AppState.searchKeyword;
  const mode = AppState.searchModeFilter;

  let results = POSE_DATABASE.filter((pose) => {
    const matchesMode = mode === "all" || pose.mode === mode;
    if (!matchesMode) return false;

    if (!keyword) return true;

    const inName = pose.name.toLowerCase().includes(keyword);
    const inDesc = pose.description.toLowerCase().includes(keyword);
    const inVibe = pose.vibe.toLowerCase().includes(keyword);
    const inCategory = pose.category.toLowerCase().includes(keyword);
    const inSteps = pose.steps.some(s => s.instruction.toLowerCase().includes(keyword) || s.title.toLowerCase().includes(keyword));

    return inName || inDesc || inVibe || inCategory || inSteps;
  });

  if (DOM.searchResultsCount) {
    DOM.searchResultsCount.textContent = `Showing ${results.length} of ${POSE_DATABASE.length} poses`;
  }

  DOM.recommendedPosesTrack.innerHTML = "";
  if (results.length === 0) {
    DOM.recommendedPosesTrack.innerHTML = `
      <div class="favorites-empty-card" style="grid-column: 1 / -1;">
        <span class="empty-fav-icon">🔍</span>
        <h3 class="empty-fav-title">No Poses Match "${keyword}"</h3>
        <p class="empty-fav-desc">Try searching for terms like "sitting", "standing", "pocket", "walking", or clear filters.</p>
      </div>
    `;
    return;
  }

  results.forEach((pose) => {
    const isFav = AppState.favorites.includes(pose.id);
    const card = document.createElement("div");
    card.className = "pose-card-item";
    card.innerHTML = `
      <div class="pose-card-preview">
        <img class="pose-card-img" src="${pose.referenceImage}" alt="${pose.name}" loading="lazy" />
        <div class="pose-card-badges">
          <span class="card-mode-badge">${capitalize(pose.mode)}</span>
          <span class="card-mode-badge">${pose.difficulty}</span>
        </div>
        <button type="button" class="fav-card-btn ${isFav ? 'favorited' : ''}" data-pose-id="${pose.id}" title="Toggle Favorite">
          <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="pose-card-body">
        <div>
          <h3 class="pose-card-title">${pose.name}</h3>
          <p class="pose-card-desc">${pose.description}</p>
        </div>
        <div class="pose-card-footer">
          <span class="pose-card-vibe">${pose.vibe}</span>
          <span class="pose-card-step-count">${pose.steps.length} Steps</span>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-card-btn")) return;
      selectAndLaunchPose(pose.id);
    });

    card.querySelector(".fav-card-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(pose.id);
    });

    DOM.recommendedPosesTrack.appendChild(card);
  });
}

function renderGalleryGrid() {
  if (!DOM.galleryGrid) return;
  DOM.galleryGrid.innerHTML = "";

  const filter = AppState.galleryModeFilter;
  const poses = filter === "all" ? POSE_DATABASE : POSE_DATABASE.filter(p => p.mode === filter);

  poses.forEach((pose) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.innerHTML = `
      <img class="gallery-img" src="${pose.finalShotImage || pose.referenceImage}" alt="${pose.name}" loading="lazy" />
      <div class="gallery-overlay">
        <h4 class="gallery-pose-name">${pose.name}</h4>
        <span class="gallery-pose-meta">${capitalize(pose.mode)} • ${pose.vibe}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      openPoseDetailModal(pose);
    });

    DOM.galleryGrid.appendChild(card);
  });
}

// ===================================================================
// 11. Studio View: Camera, Cycle, and Step Coaching
// ===================================================================
function bindStudioEvents() {
  DOM.exitStudioBtn.addEventListener("click", () => exitStudio());

  // Quick Prev / Next Pose Buttons in Header & Coach
  if (DOM.studioPrevPoseBtn) DOM.studioPrevPoseBtn.addEventListener("click", () => cyclePose(-1));
  if (DOM.studioNextPoseBtn) DOM.studioNextPoseBtn.addEventListener("click", () => cyclePose(1));
  if (DOM.coachPrevPoseBtn) DOM.coachPrevPoseBtn.addEventListener("click", () => cyclePose(-1));
  if (DOM.coachNextPoseBtn) DOM.coachNextPoseBtn.addEventListener("click", () => cyclePose(1));

  // Favorite button in studio header
  if (DOM.studioFavoriteBtn) {
    DOM.studioFavoriteBtn.addEventListener("click", () => {
      if (AppState.currentPose) {
        toggleFavorite(AppState.currentPose.id);
      }
    });
  }

  // Camera Utility Buttons
  DOM.flipCameraBtn.addEventListener("click", () => flipCameraFacing());
  DOM.toggleSkeletonBtn.addEventListener("click", () => toggleSkeletonOverlay());
  DOM.toggleGhostBtn.addEventListener("click", () => toggleGhostSilhouette());
  DOM.toggleGridBtn.addEventListener("click", () => toggleRuleOfThirdsGrid());

  // Camera Selector
  DOM.cameraDeviceSelect.addEventListener("change", (e) => {
    AppState.selectedDeviceId = e.target.value;
    openCamera();
  });

  // Action dock buttons
  DOM.timerToggleBtn.addEventListener("click", () => toggleTimerSetting());
  DOM.shutterBtn.addEventListener("click", () => triggerPhotoCapture());
  DOM.analyzeOutfitSceneBtn.addEventListener("click", () => launchAiVisionAnalysis());

  // Coach Actions
  DOM.switchPoseBtn.addEventListener("click", () => openPoseCatalog(AppState.selectedMode));
  DOM.prevStepBtn.addEventListener("click", () => prevStep());
  DOM.nextStepBtn.addEventListener("click", () => nextStep());

  // Studio Mode Switcher Pills (Solo / Couple / Group)
  if (DOM.studioModeSwitcher) {
    DOM.studioModeSwitcher.querySelectorAll(".studio-mode-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        selectMode(pill.dataset.studioMode);
      });
    });
  }

  // Interactive Live Guidance Controls
  if (DOM.autoCaptureToggleBtn) {
    DOM.autoCaptureToggleBtn.addEventListener("click", () => toggleAutoCapture());
  }
  if (DOM.pauseGuidanceBtn) {
    DOM.pauseGuidanceBtn.addEventListener("click", () => togglePauseGuidance());
  }
  if (DOM.restartGuidanceBtn) {
    DOM.restartGuidanceBtn.addEventListener("click", () => restartPoseGuidance());
  }

  // Visual Photo Reference Switcher Tabs
  if (DOM.photoTabReferenceBtn) {
    DOM.photoTabReferenceBtn.addEventListener("click", () => setPhotoReferenceTab("reference"));
  }
  if (DOM.photoTabFinalBtn) {
    DOM.photoTabFinalBtn.addEventListener("click", () => setPhotoReferenceTab("final"));
  }
  if (DOM.expandPhotoBtn) {
    DOM.expandPhotoBtn.addEventListener("click", () => {
      if (AppState.currentPose) openPoseDetailModal(AppState.currentPose);
    });
  }
}

async function startStudio() {
  switchView("studio");

  // Load current pose into coach UI (ensure matching mode and avoid repeating recently seen poses)
  if (!AppState.currentPose || AppState.currentPose.mode !== AppState.selectedMode) {
    const candidatePoses = getPosesByFilter(
      AppState.selectedMode,
      AppState.selectedOutfit,
      AppState.selectedStyle
    ).filter(p => !AppState.recentPoseIds.includes(p.id));

    if (candidatePoses.length > 0) {
      AppState.currentPose = candidatePoses[0];
    } else {
      AppState.currentPose = getRandomUnseenPose(AppState.selectedMode, AppState.recentPoseIds);
    }
  }

  recordShownPose(AppState.currentPose ? AppState.currentPose.id : null);
  loadPoseIntoCoach(AppState.currentPose);

  // Initialize and open real camera
  await openCamera();
}

function exitStudio() {
  stopCamera();
  switchView("home");
}

function cyclePose(direction) {
  const currentMode = AppState.currentPose ? AppState.currentPose.mode : AppState.selectedMode;
  const sameModePoses = getPosesByMode(currentMode);
  if (sameModePoses.length === 0) return;

  let currentIndex = sameModePoses.findIndex(p => p.id === AppState.currentPose.id);
  if (currentIndex === -1) currentIndex = 0;

  let newIndex = (currentIndex + direction + sameModePoses.length) % sameModePoses.length;
  const nextPose = sameModePoses[newIndex];
  recordShownPose(nextPose.id);
  loadPoseIntoCoach(nextPose);
  showToast(`Switched to: ${nextPose.name}`, "info");
}

function setPhotoReferenceTab(tab) {
  AppState.activePhotoTab = tab;
  if (DOM.photoTabReferenceBtn) DOM.photoTabReferenceBtn.classList.toggle("active", tab === "reference");
  if (DOM.photoTabFinalBtn) DOM.photoTabFinalBtn.classList.toggle("active", tab === "final");

  if (DOM.refPhotoFrame) DOM.refPhotoFrame.classList.toggle("hidden", tab !== "reference");
  if (DOM.finalPhotoFrame) DOM.finalPhotoFrame.classList.toggle("hidden", tab !== "final");
}

function updateStudioFavoriteButton() {
  if (!DOM.studioFavoriteBtn || !AppState.currentPose) return;
  const isFav = AppState.favorites.includes(AppState.currentPose.id);
  DOM.studioFavoriteBtn.classList.toggle("active", isFav);
  const svg = DOM.studioFavoriteBtn.querySelector("svg");
  if (svg) svg.setAttribute("fill", isFav ? "currentColor" : "none");
}

function loadPoseIntoCoach(pose) {
  if (!pose) return;
  AppState.currentPose = pose;
  AppState.currentStepIndex = 0;
  recordShownPose(pose.id);

  // Header metadata
  DOM.coachPoseName.textContent = pose.name;
  DOM.coachPoseCategory.textContent = pose.category || "Standing";
  DOM.coachPoseDifficulty.textContent = pose.difficulty || "Beginner";
  DOM.coachPoseFraming.textContent = pose.framing || "Full Body";
  DOM.coachPoseVibe.textContent = pose.vibe || "Confident";

  DOM.studioModeBadge.textContent = capitalize(pose.mode);
  DOM.studioStyleBadge.textContent = capitalize(AppState.selectedStyle);

  // Sync studio mode switcher pills
  if (DOM.studioModeSwitcher) {
    DOM.studioModeSwitcher.querySelectorAll(".studio-mode-pill").forEach((p) => {
      const match = p.dataset.studioMode === pose.mode;
      p.classList.toggle("active", match);
      p.setAttribute("aria-checked", match ? "true" : "false");
    });
  }

  // Photographic Reference Images
  if (DOM.coachRefPhotoImg) {
    DOM.coachRefPhotoImg.src = pose.referenceImage || "";
  }
  if (DOM.coachFinalPhotoImg) {
    DOM.coachFinalPhotoImg.src = pose.finalShotImage || pose.referenceImage || "";
  }
  setPhotoReferenceTab("reference");

  // Master Pro-Tips
  if (pose.proTips) {
    if (DOM.proTipPostureText) DOM.proTipPostureText.textContent = pose.proTips.posture;
    if (DOM.proTipLightingText) DOM.proTipLightingText.textContent = pose.proTips.lighting;
    if (DOM.proTipFramingText) DOM.proTipFramingText.textContent = pose.proTips.framing;
    if (DOM.proTipExpressionText) DOM.proTipExpressionText.textContent = pose.proTips.expression;
  }

  // Update Ghost Silhouette Wireframe
  DOM.ghostSilhouetteOverlay.innerHTML = pose.svgGuide || "";
  DOM.ghostSilhouetteOverlay.classList.toggle("hidden", !AppState.isGhostActive);

  // Notify Detector
  if (AppState.detector) {
    AppState.detector.setTargetPose(pose, pose.mode, 0);
  }

  // Reset match meter
  if (DOM.stepMatchProgressFill) DOM.stepMatchProgressFill.style.width = "0%";
  if (DOM.stepMatchStatusText) DOM.stepMatchStatusText.textContent = "Adjusting position...";
  if (DOM.stepMatchPctText) DOM.stepMatchPctText.textContent = "0% Match";

  // Render Step 1
  renderCurrentStep();

  // Update Favorite Button State
  updateStudioFavoriteButton();

  // Render similar poses strip
  renderSimilarPosesStrip();
}

function renderCurrentStep() {
  const pose = AppState.currentPose;
  if (!pose || !pose.steps) return;

  const steps = pose.steps;
  const currentIndex = AppState.currentStepIndex;
  const currentStep = steps[currentIndex];

  // Counter
  DOM.stepCounterDisplay.textContent = `Step ${currentIndex + 1} of ${steps.length}`;

  // Continuous Progress Bar Fill
  if (DOM.stepProgressBarFill) {
    const pct = Math.round(((currentIndex + 1) / steps.length) * 100);
    DOM.stepProgressBarFill.style.width = `${pct}%`;
  }

  // Step dots
  DOM.stepDotsContainer.innerHTML = "";
  steps.forEach((step, idx) => {
    const dot = document.createElement("div");
    dot.className = "step-dot";
    if (idx === currentIndex) dot.classList.add("active");
    if (idx < currentIndex) dot.classList.add("completed");
    DOM.stepDotsContainer.appendChild(dot);
  });

  // Body content: short, modern instructions prominently
  DOM.stepBodyPartBadge.textContent = currentStep.bodyPart || "Posture";
  DOM.stepTitleText.textContent = currentStep.title;
  DOM.stepInstructionText.textContent = currentStep.instruction;
  DOM.stepShyTipText.textContent = currentStep.shyTip || "Breathe naturally and relax your shoulders.";

  // Mini visual preview
  DOM.stepVisualBox.innerHTML = pose.svgGuide || "";

  // Reset step match meter
  if (DOM.stepMatchProgressFill) DOM.stepMatchProgressFill.style.width = "0%";
  if (DOM.stepMatchStatusText) DOM.stepMatchStatusText.textContent = "Aligning posture...";
  if (DOM.stepMatchPctText) DOM.stepMatchPctText.textContent = "0% Match";

  // Notify detector of new step
  if (AppState.detector) {
    AppState.detector.setStepIndex(currentIndex);
  }

  // Buttons state
  DOM.prevStepBtn.disabled = currentIndex === 0;
  DOM.prevStepBtn.style.opacity = currentIndex === 0 ? "0.4" : "1";

  if (currentIndex === steps.length - 1) {
    DOM.nextStepBtn.innerHTML = `<span>Ready to Snap! 📸</span>`;
  } else {
    DOM.nextStepBtn.innerHTML = `
      <span>Next Step</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
  }
}

function nextStep() {
  const pose = AppState.currentPose;
  if (!pose) return;

  if (AppState.currentStepIndex < pose.steps.length - 1) {
    AppState.currentStepIndex++;
    renderCurrentStep();
  } else {
    triggerPhotoCapture();
  }
}

function prevStep() {
  if (AppState.currentStepIndex > 0) {
    AppState.currentStepIndex--;
    renderCurrentStep();
  }
}

function toggleAutoCapture() {
  AppState.isAutoCaptureEnabled = !AppState.isAutoCaptureEnabled;
  if (DOM.autoCaptureToggleBtn) {
    DOM.autoCaptureToggleBtn.classList.toggle("active", AppState.isAutoCaptureEnabled);
  }
  if (DOM.autoCaptureLabel) {
    DOM.autoCaptureLabel.textContent = `Auto-Capture: ${AppState.isAutoCaptureEnabled ? "ON" : "OFF"}`;
  }
  showToast(`Auto-Capture turned ${AppState.isAutoCaptureEnabled ? "ON" : "OFF"}`, "info");
}

function togglePauseGuidance() {
  AppState.isGuidancePaused = !AppState.isGuidancePaused;
  if (AppState.detector) {
    if (AppState.isGuidancePaused) {
      AppState.detector.pause();
    } else {
      AppState.detector.resume();
    }
  }
  if (DOM.pauseGuidanceBtn) {
    DOM.pauseGuidanceBtn.classList.toggle("active", AppState.isGuidancePaused);
  }
  if (DOM.pauseGuidanceLabel) {
    DOM.pauseGuidanceLabel.textContent = AppState.isGuidancePaused ? "▶ Resume" : "⏸ Pause";
  }
  showToast(AppState.isGuidancePaused ? "Pose guidance paused" : "Pose guidance resumed", "info");
}

function restartPoseGuidance() {
  AppState.currentStepIndex = 0;
  AppState.isGuidancePaused = false;
  if (AppState.detector) {
    AppState.detector.resume();
    AppState.detector.setStepIndex(0);
  }
  if (DOM.pauseGuidanceLabel) DOM.pauseGuidanceLabel.textContent = "⏸ Pause";
  if (DOM.pauseGuidanceBtn) DOM.pauseGuidanceBtn.classList.remove("active");
  renderCurrentStep();
  showToast("Pose guidance restarted to Step 1", "info");
}

function handleStepCompleted(completedStepIndex) {
  if (AppState.isGuidancePaused) return;

  const pose = AppState.currentPose;
  if (!pose || !pose.steps) return;

  if (completedStepIndex < pose.steps.length - 1) {
    showToast(`Step ${completedStepIndex + 1} completed! ✓`, "success");
    setTimeout(() => {
      if (!AppState.isGuidancePaused && AppState.currentStepIndex === completedStepIndex) {
        nextStep();
      }
    }, 600);
  } else {
    showToast("🌟 Full pose achieved! Looking stunning.", "gold");
    if (DOM.stepMatchStatusText) {
      DOM.stepMatchStatusText.textContent = "🌟 Pose complete! Looking great.";
    }

    if (AppState.isAutoCaptureEnabled) {
      setTimeout(() => {
        if (!AppState.isGuidancePaused) {
          triggerPhotoCapture();
        }
      }, 700);
    } else {
      showToast("Pose complete! Tap Shutter to capture 📸", "gold");
    }
  }
}

function renderSimilarPosesStrip() {
  const currentMode = AppState.currentPose ? AppState.currentPose.mode : "solo";
  const sameModePoses = getPosesByMode(currentMode);

  DOM.similarPosesRow.innerHTML = "";
  sameModePoses.forEach((pose) => {
    const chip = document.createElement("div");
    chip.className = `strip-card ${pose.id === AppState.currentPose.id ? "active" : ""}`;
    chip.innerHTML = `
      <span class="strip-card-name">${pose.name}</span>
      <span class="strip-card-sub">${pose.steps.length} Steps • ${pose.difficulty}</span>
    `;
    chip.addEventListener("click", () => {
      loadPoseIntoCoach(pose);
    });
    DOM.similarPosesRow.appendChild(chip);
  });
}

// ===================================================================
// 12. Real Camera Integration (HTML5 MediaDevices API)
// ===================================================================
async function openCamera() {
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Camera API is not supported in this browser.");
    }

    if (AppState.mediaStream) {
      AppState.mediaStream.getTracks().forEach((track) => track.stop());
      AppState.mediaStream = null;
    }

    const constraints = {
      audio: false,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    if (AppState.selectedDeviceId) {
      constraints.video.deviceId = { exact: AppState.selectedDeviceId };
    } else {
      constraints.video.facingMode = AppState.facingMode;
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    AppState.mediaStream = stream;
    DOM.cameraVideo.srcObject = stream;

    const isRear = AppState.facingMode === "environment";
    DOM.cameraVideo.classList.toggle("rear-facing", isRear);

    DOM.cameraVideo.onloadedmetadata = () => {
      DOM.cameraVideo.play();
      enumerateCameras();
      initAndStartPoseDetector();
    };
  } catch (err) {
    console.error("Camera access error:", err);
    handleCameraError(err);
  }
}

function stopCamera() {
  if (AppState.detector) {
    AppState.detector.stop();
  }
  if (AppState.mediaStream) {
    AppState.mediaStream.getTracks().forEach((track) => track.stop());
    AppState.mediaStream = null;
  }
  DOM.cameraVideo.srcObject = null;
}

async function enumerateCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    AppState.availableCameras = videoDevices;

    DOM.cameraDeviceSelect.innerHTML = "";
    if (videoDevices.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "Default Camera";
      DOM.cameraDeviceSelect.appendChild(opt);
      return;
    }

    videoDevices.forEach((device, index) => {
      const opt = document.createElement("option");
      opt.value = device.deviceId;
      opt.textContent = device.label || `Camera ${index + 1}`;
      if (device.deviceId === AppState.selectedDeviceId) {
        opt.selected = true;
      }
      DOM.cameraDeviceSelect.appendChild(opt);
    });
  } catch (err) {
    console.warn("Could not enumerate camera devices:", err);
  }
}

async function flipCameraFacing() {
  AppState.facingMode = AppState.facingMode === "user" ? "environment" : "user";
  AppState.selectedDeviceId = null;
  await openCamera();
  showToast(`Switched to ${AppState.facingMode === "user" ? "Front" : "Rear"} Camera`, "info");
}

function toggleSkeletonOverlay() {
  AppState.isSkeletonActive = !AppState.isSkeletonActive;
  DOM.toggleSkeletonBtn.classList.toggle("active", AppState.isSkeletonActive);
  if (AppState.detector) {
    AppState.detector.setSkeletonVisible(AppState.isSkeletonActive);
  }
  showToast(AppState.isSkeletonActive ? "Skeleton tracking ON" : "Skeleton tracking OFF", "info");
}

function toggleGhostSilhouette() {
  AppState.isGhostActive = !AppState.isGhostActive;
  DOM.toggleGhostBtn.classList.toggle("active", AppState.isGhostActive);
  DOM.ghostSilhouetteOverlay.classList.toggle("hidden", !AppState.isGhostActive);
  showToast(AppState.isGhostActive ? "Pose silhouette ON" : "Pose silhouette OFF", "info");
}

function toggleRuleOfThirdsGrid() {
  AppState.isGridActive = !AppState.isGridActive;
  DOM.toggleGridBtn.classList.toggle("active", AppState.isGridActive);
  DOM.ruleOfThirdsGrid.classList.toggle("hidden", !AppState.isGridActive);
  showToast(AppState.isGridActive ? "Rule of Thirds grid ON" : "Grid OFF", "info");
}

function toggleTimerSetting() {
  AppState.timerSeconds = AppState.timerSeconds === 3 ? 0 : 3;
  DOM.timerLabel.textContent = AppState.timerSeconds === 0 ? "Off" : "3s";
  showToast(`Shutter Timer: ${AppState.timerSeconds === 0 ? "Instant (0s)" : "3 Seconds"}`, "info");
}

function handleCameraError(err) {
  let message = "PoseMate AI could not open your camera. Please ensure permissions are granted.";

  if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
    message = "Camera permission was denied. Please allow camera access in your browser settings to continue.";
  } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
    message = "No camera was detected on this device. Please connect a webcam or open this website on a mobile phone.";
  } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
    message = "Your camera is currently in use by another app (e.g. Zoom, Teams, or FaceTime). Please close that app and retry.";
  } else if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    message = "Modern browsers require a secure context (HTTPS or localhost) to access the camera.";
  }

  DOM.cameraErrorMessage.textContent = message;
  DOM.cameraErrorModal.classList.remove("hidden");
}

// ===================================================================
// 13. Live Pose Estimation & Guidance Callback
// ===================================================================
function initAndStartPoseDetector() {
  if (!AppState.detector) return;

  AppState.detector.setTargetPose(AppState.currentPose, AppState.selectedMode, AppState.currentStepIndex);
  AppState.detector.setSkeletonVisible(AppState.isSkeletonActive);

  AppState.detector.init(
    DOM.cameraVideo,
    DOM.poseCanvas,
    (feedback) => updateLiveFeedbackUI(feedback),
    (statusInfo) => updateAiStatusUI(statusInfo),
    (completedStepIndex) => handleStepCompleted(completedStepIndex)
  ).then(() => {
    AppState.detector.start();
  });
}

function updateLiveFeedbackUI(feedback) {
  if (!feedback) return;
  DOM.feedbackText.textContent = feedback.message;
  DOM.liveFeedbackPill.className = `feedback-pill ${feedback.type || "info"}`;

  if (feedback.type === "success") {
    DOM.feedbackIcon.textContent = "🌟";
  } else if (feedback.type === "warning") {
    DOM.feedbackIcon.textContent = "⚠️";
  } else {
    DOM.feedbackIcon.textContent = "💡";
  }

  const score = feedback.alignmentScore || 85;
  DOM.telemetryScoreBadge.textContent = `${score}% Match`;

  // Step Match Meter Updates
  if (DOM.stepMatchPctText) {
    DOM.stepMatchPctText.textContent = `${score}% Match`;
  }
  if (DOM.stepMatchProgressFill) {
    DOM.stepMatchProgressFill.style.width = `${feedback.stabilityProgress || 0}%`;
  }
  if (DOM.stepMatchStatusText) {
    DOM.stepMatchStatusText.textContent = feedback.message;
  }
  if (DOM.stepMatchStatusBadge) {
    DOM.stepMatchStatusBadge.style.color = feedback.type === "success" ? "#10b981" : (feedback.type === "warning" ? "#f59e0b" : "var(--text-main)");
  }

  // Chime sound on step stability completion
  if (feedback.isStable && !AppState.isStepChimed) {
    AppState.isStepChimed = true;
    SoundFX.playStepChime();
  } else if (!feedback.isStable) {
    AppState.isStepChimed = false;
  }

  if (feedback.type === "warning") {
    if (feedback.message.includes("shoulder") || feedback.message.includes("tense")) {
      DOM.shoulderBar.style.width = "45%";
      DOM.shoulderStatus.textContent = "Uneven";
    } else if (feedback.message.includes("center") || feedback.message.includes("left") || feedback.message.includes("right")) {
      DOM.centerBar.style.width = "40%";
      DOM.centerStatus.textContent = "Off-Center";
    } else if (feedback.message.includes("farther") || feedback.message.includes("closer")) {
      DOM.distanceBar.style.width = "50%";
      DOM.distanceStatus.textContent = "Adjust Framing";
    }
  } else if (feedback.type === "success") {
    DOM.shoulderBar.style.width = "95%";
    DOM.shoulderStatus.textContent = "Level";
    DOM.centerBar.style.width = "96%";
    DOM.centerStatus.textContent = "Centered";
    DOM.distanceBar.style.width = "94%";
    DOM.distanceStatus.textContent = "Optimal";
  }
}

function updateAiStatusUI(statusInfo) {
  if (!statusInfo) return;
  DOM.aiStatusText.textContent = statusInfo.text;
  DOM.aiStatusBadge.className = `ai-status-badge ${statusInfo.isFallback ? "fallback" : "ready"}`;
}

// ===================================================================
// 14. Photo Capture, Countdown & Shutter
// ===================================================================
function triggerPhotoCapture() {
  if (AppState.isCapturing) return;

  // Requirement 6: Require sign-in before taking photos
  if (!AppState.currentUser) {
    AppState.pendingCaptureAfterLogin = true;
    openAuthModal("Please sign in or create an account to take and save studio photos.");
    showToast("Sign in required to capture photos", "info");
    return;
  }

  if (AppState.timerSeconds > 0) {
    runCaptureCountdown(AppState.timerSeconds);
  } else {
    executeInstantCapture();
  }
}

function runCaptureCountdown(seconds) {
  AppState.isCapturing = true;
  let remaining = seconds;

  DOM.countdownOverlay.classList.remove("hidden");
  DOM.countdownNumber.textContent = remaining;
  SoundFX.playCountdownBeep(false);

  const interval = setInterval(() => {
    remaining--;
    if (remaining > 0) {
      DOM.countdownNumber.textContent = remaining;
      SoundFX.playCountdownBeep(false);
    } else {
      clearInterval(interval);
      SoundFX.playCountdownBeep(true);
      DOM.countdownOverlay.classList.add("hidden");
      executeInstantCapture();
      AppState.isCapturing = false;
    }
  }, 1000);
}

function executeInstantCapture() {
  // Flash animation
  DOM.shutterFlash.classList.add("flashing");
  setTimeout(() => {
    DOM.shutterFlash.classList.remove("flashing");
  }, 180);

  // Shutter sound
  SoundFX.playShutterSound();

  // Grab full-res frame from video
  const video = DOM.cameraVideo;
  const canvas = DOM.photoCaptureCanvas;
  if (!video || !video.videoWidth) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");

  // Mirror capture if using front camera
  if (AppState.facingMode === "user") {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
  AppState.capturedPhotoDataUrl = dataUrl;

  // Open review modal
  DOM.photoPreviewImg.src = dataUrl;
  DOM.photoPoseWatermark.textContent = AppState.currentPose ? AppState.currentPose.name : "PoseMate AI";
  DOM.photoReviewModal.classList.remove("hidden");
}

function saveCapturedPhoto() {
  if (!AppState.capturedPhotoDataUrl) return;

  // Requirement 6: Protect save photo action
  if (!AppState.currentUser) {
    AppState.pendingCaptureAfterLogin = false;
    openAuthModal("Please sign in or create an account to save high-res studio photos.");
    showToast("Sign in required to save photos", "info");
    return;
  }

  const link = document.createElement("a");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.download = `PoseMate_${AppState.currentPose ? AppState.currentPose.id : "Photo"}_${timestamp}.jpg`;
  link.href = AppState.capturedPhotoDataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Photo saved to downloads!", "success");
  DOM.photoReviewModal.classList.add("hidden");
}

// ===================================================================
// 15. Modals & Catalog Controller
// ===================================================================
function bindModalEvents() {
  // Review modal
  DOM.closeReviewModalBtn.addEventListener("click", () => DOM.photoReviewModal.classList.add("hidden"));
  DOM.retakePhotoBtn.addEventListener("click", () => DOM.photoReviewModal.classList.add("hidden"));
  DOM.savePhotoBtn.addEventListener("click", () => saveCapturedPhoto());

  // Catalog modal
  DOM.closeCatalogModalBtn.addEventListener("click", () => DOM.poseCatalogModal.classList.add("hidden"));
  DOM.catalogModeTabs.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      DOM.catalogModeTabs.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderCatalogGrid(tab.dataset.mode);
    });
  });

  // Camera error modal
  DOM.cancelCameraErrorBtn.addEventListener("click", () => DOM.cameraErrorModal.classList.add("hidden"));
  DOM.retryCameraBtn.addEventListener("click", () => {
    DOM.cameraErrorModal.classList.add("hidden");
    openCamera();
  });

  // AI Vision Modal
  DOM.closeAiVisionModalBtn.addEventListener("click", () => DOM.aiVisionModal.classList.add("hidden"));

  // Pose Detail Modal
  if (DOM.closePoseDetailModalBtn) {
    DOM.closePoseDetailModalBtn.addEventListener("click", () => DOM.poseDetailModal.classList.add("hidden"));
  }
  if (DOM.modalLaunchPoseBtn) {
    DOM.modalLaunchPoseBtn.addEventListener("click", () => {
      DOM.poseDetailModal.classList.add("hidden");
      if (window.detailTargetPose) {
        selectAndLaunchPose(window.detailTargetPose.id);
      }
    });
  }
  if (DOM.modalToggleFavBtn) {
    DOM.modalToggleFavBtn.addEventListener("click", () => {
      if (window.detailTargetPose) {
        toggleFavorite(window.detailTargetPose.id);
        const isFav = AppState.favorites.includes(window.detailTargetPose.id);
        DOM.modalFavBtnText.textContent = isFav ? "Remove Favorite" : "Save to Favorites";
      }
    });
  }

  // Firebase Setup Guide Modal
  if (DOM.closeFirebaseSetupModalBtn) {
    DOM.closeFirebaseSetupModalBtn.addEventListener("click", () => DOM.firebaseSetupModal.classList.add("hidden"));
  }
  if (DOM.ackFirebaseSetupBtn) {
    DOM.ackFirebaseSetupBtn.addEventListener("click", () => DOM.firebaseSetupModal.classList.add("hidden"));
  }
  if (DOM.footerOpenFirebaseBtn) {
    DOM.footerOpenFirebaseBtn.addEventListener("click", () => DOM.firebaseSetupModal.classList.remove("hidden"));
  }
  if (DOM.footerOpenAuthBtn) {
    DOM.footerOpenAuthBtn.addEventListener("click", () => openAuthModal());
  }

  // Close modals when clicking backdrop
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
      }
    });
  });
}

function openPoseCatalog(initialMode = "all") {
  DOM.catalogModeTabs.querySelectorAll(".filter-tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.mode === initialMode);
  });
  renderCatalogGrid(initialMode);
  DOM.poseCatalogModal.classList.remove("hidden");
}

function renderCatalogGrid(modeFilter = "all") {
  DOM.catalogGrid.innerHTML = "";
  const poses = modeFilter === "all" ? POSE_DATABASE : getPosesByMode(modeFilter);

  poses.forEach((pose) => {
    const isFav = AppState.favorites.includes(pose.id);
    const card = document.createElement("div");
    card.className = "pose-card-item";
    card.innerHTML = `
      <div class="pose-card-preview">
        <img class="pose-card-img" src="${pose.referenceImage}" alt="${pose.name}" loading="lazy" />
        <div class="pose-card-badges">
          <span class="card-mode-badge">${capitalize(pose.mode)}</span>
          <span class="card-mode-badge">${pose.difficulty}</span>
        </div>
        <button type="button" class="fav-card-btn ${isFav ? 'favorited' : ''}" data-pose-id="${pose.id}">
          <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      <div class="pose-card-body">
        <div>
          <h3 class="pose-card-title">${pose.name}</h3>
          <p class="pose-card-desc">${pose.description}</p>
        </div>
        <div class="pose-card-footer">
          <span class="pose-card-vibe">${pose.vibe}</span>
          <span class="pose-card-step-count">${pose.steps.length} Steps</span>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-card-btn")) return;
      DOM.poseCatalogModal.classList.add("hidden");
      selectAndLaunchPose(pose.id);
    });

    card.querySelector(".fav-card-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(pose.id);
      renderCatalogGrid(modeFilter);
    });

    DOM.catalogGrid.appendChild(card);
  });
}

function openPoseDetailModal(pose) {
  if (!pose) return;
  window.detailTargetPose = pose;

  DOM.modalPoseTitle.textContent = pose.name;
  DOM.modalPoseVibe.textContent = pose.vibe;
  DOM.modalPoseDesc.textContent = pose.description;

  if (DOM.modalPoseRefImg) DOM.modalPoseRefImg.src = pose.referenceImage || "";
  if (DOM.modalPoseFinalImg) DOM.modalPoseFinalImg.src = pose.finalShotImage || pose.referenceImage || "";

  if (pose.poseBreakdown) {
    if (DOM.modalBodyPos) DOM.modalBodyPos.textContent = pose.poseBreakdown.bodyPosition;
    if (DOM.modalHandPos) DOM.modalHandPos.textContent = pose.poseBreakdown.handPlacement;
    if (DOM.modalLegPos) DOM.modalLegPos.textContent = pose.poseBreakdown.legPosition;
    if (DOM.modalFacePos) DOM.modalFacePos.textContent = pose.poseBreakdown.facialExpression;
    if (DOM.modalCameraAngle) DOM.modalCameraAngle.textContent = pose.poseBreakdown.cameraAngle;
  }

  const isFav = AppState.favorites.includes(pose.id);
  if (DOM.modalFavBtnText) {
    DOM.modalFavBtnText.textContent = isFav ? "Remove Favorite" : "Save to Favorites";
  }

  DOM.poseDetailModal.classList.remove("hidden");
}

// ===================================================================
// 16. AI Outfit & Scene Analysis (Preserved)
// ===================================================================
async function launchAiVisionAnalysis() {
  const video = DOM.cameraVideo;
  if (!video || !video.videoWidth) {
    handleCameraError(new Error("Camera feed is not ready."));
    return;
  }

  const canvas = DOM.photoCaptureCanvas;
  canvas.width = 640;
  canvas.height = Math.round((video.videoHeight / video.videoWidth) * 640);
  const ctx = canvas.getContext("2d");

  if (AppState.facingMode === "user") {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const snapshotDataUrl = canvas.toDataURL("image/jpeg", 0.85);

  DOM.aiSnapshotThumb.src = snapshotDataUrl;
  DOM.aiLoadingState.classList.remove("hidden");
  DOM.aiAnalysisDetails.classList.add("hidden");
  DOM.aiVisionModal.classList.remove("hidden");

  try {
    const response = await fetch("/api/analyze-pose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: snapshotDataUrl,
        mode: AppState.selectedMode,
        outfit: AppState.selectedOutfit,
        style: AppState.selectedStyle
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.isAiConfigured) {
        displayAiVisionResults(data, "Live Gemini Vision AI");
        return;
      }
    }
  } catch (err) {
    // Fallback if offline
  }

  setTimeout(() => {
    const ruleBasedResults = runSmartVisionHeuristics(ctx, canvas.width, canvas.height);
    displayAiVisionResults(ruleBasedResults, "Smart Vision & Rule-Based Recommendation Engine");
  }, 1000);
}

function runSmartVisionHeuristics(ctx, width, height) {
  const imgData = ctx.getImageData(width * 0.25, height * 0.25, width * 0.5, height * 0.5);
  let totalBrightness = 0;
  let totalRed = 0;
  let totalBlue = 0;
  const len = imgData.data.length;

  for (let i = 0; i < len; i += 16) {
    const r = imgData.data[i];
    const g = imgData.data[i + 1];
    const b = imgData.data[i + 2];
    totalBrightness += (r + g + b) / 3;
    totalRed += r;
    totalBlue += b;
  }

  const sampleCount = len / 16;
  const avgBrightness = totalBrightness / sampleCount;
  const isWarm = totalRed > totalBlue;

  const lighting = avgBrightness > 150 ? "Bright High-Key Ambient" : avgBrightness > 80 ? "Balanced Natural Indoor" : "Moody Cinematic Low-Light";
  const colors = isWarm ? "Warm Earth Tones & Neutrals" : "Cool Minimalist Palette";
  const outfitCategory = capitalize(AppState.selectedOutfit);

  const recommendedPoses = getPosesByFilter(AppState.selectedMode, AppState.selectedOutfit, AppState.selectedStyle);
  const topPoses = (recommendedPoses.length > 0 ? recommendedPoses : getPosesByMode(AppState.selectedMode)).slice(0, 3);

  return {
    visibleOutfit: `${outfitCategory} Attire`,
    colorsAndPatterns: colors,
    environment: `${lighting} Lighting`,
    framing: "Eye-Level Portrait Framing",
    recommendedPoses: topPoses.map((p) => ({
      id: p.id,
      name: p.name,
      whyItSuits: `Flattering silhouette that highlights ${AppState.selectedOutfit} lines under ${lighting}.`,
      difficulty: p.difficulty,
      stepsCount: p.steps.length
    }))
  };
}

function displayAiVisionResults(data, engineLabel) {
  DOM.aiEngineLabel.textContent = engineLabel;
  DOM.aiDetectedOutfit.textContent = data.visibleOutfit || "Casual Outfit";
  DOM.aiDetectedColors.textContent = data.colorsAndPatterns || "Natural Tones";
  DOM.aiDetectedEnvironment.textContent = data.environment || "Indoor Soft Light";
  DOM.aiDetectedFraming.textContent = data.framing || "Waist-Up Vertical";

  DOM.aiRecommendationsList.innerHTML = "";
  (data.recommendedPoses || []).forEach((rec) => {
    const matchedPose = rec.id ? getPoseById(rec.id) : null;
    const bodyPos = rec.bodyPositioning || (matchedPose ? matchedPose.steps[0].instruction : "Shift weight gracefully onto one leg");
    const handLeg = rec.handAndLegPlacement || (matchedPose && matchedPose.steps[1] ? matchedPose.steps[1].instruction : "Keep hands soft, relaxed at side or in pockets");
    const gaze = rec.faceAndGaze || (matchedPose && matchedPose.steps[4] ? matchedPose.steps[4].instruction : "Look slightly above camera lens with a soft micro-smile");
    const framingAdvice = rec.framingAdvice || (matchedPose ? matchedPose.framing : "Medium shot at eye level");

    const card = document.createElement("div");
    card.className = "ai-rec-card";
    card.innerHTML = `
      <div class="ai-rec-card-header">
        <div>
          <h4 class="ai-rec-title">${rec.name}</h4>
          <span class="ai-rec-framing-badge">${framingAdvice}</span>
        </div>
        <span class="badge-pill badge-primary">${rec.difficulty || "Beginner"}</span>
      </div>

      <p class="ai-rec-reason"><strong>Why it suits the scene:</strong> ${rec.whyItSuits}</p>

      <div class="ai-rec-details-grid">
        <div class="ai-rec-detail-item">
          <strong>🧍 Body Positioning:</strong> ${bodyPos}
        </div>
        <div class="ai-rec-detail-item">
          <strong>✋ Hands & Legs:</strong> ${handLeg}
        </div>
        <div class="ai-rec-detail-item">
          <strong>👀 Face & Gaze:</strong> ${gaze}
        </div>
      </div>

      <div class="ai-rec-action-row">
        <button type="button" class="ai-rec-apply-btn">
          <span>Apply to Pose Coach</span>
        </button>
      </div>
    `;

    card.querySelector(".ai-rec-apply-btn").addEventListener("click", () => {
      DOM.aiVisionModal.classList.add("hidden");
      const targetPose = rec.id ? getPoseById(rec.id) : matchedPose || POSE_DATABASE[0];
      if (targetPose) {
        loadPoseIntoCoach(targetPose);
      }
    });

    DOM.aiRecommendationsList.appendChild(card);
  });

  DOM.aiLoadingState.classList.add("hidden");
  DOM.aiAnalysisDetails.classList.remove("hidden");
}

// ===================================================================
// 17. Premium Authentication System (SHA-256 Hashing, Zero Plaintext)
// ===================================================================
async function sha256(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

function bindAuthEvents() {
  // Nav Auth Open
  if (DOM.openAuthNavBtn) {
    DOM.openAuthNavBtn.addEventListener("click", () => openAuthModal());
  }

  // Close Auth Modal
  if (DOM.closeAuthModalBtn) {
    DOM.closeAuthModalBtn.addEventListener("click", () => DOM.authModal.classList.add("hidden"));
  }

  // Toggle between Sign In and Sign Up tabs
  if (DOM.authTabSignInBtn) {
    DOM.authTabSignInBtn.addEventListener("click", () => setAuthTab("signin"));
  }
  if (DOM.authTabSignUpBtn) {
    DOM.authTabSignUpBtn.addEventListener("click", () => setAuthTab("signup"));
  }

  // Password visibility toggles
  if (DOM.signInTogglePasswordBtn) {
    DOM.signInTogglePasswordBtn.addEventListener("click", () => togglePasswordVisibility(DOM.signInPassword, DOM.signInTogglePasswordBtn));
  }
  if (DOM.signUpTogglePasswordBtn) {
    DOM.signUpTogglePasswordBtn.addEventListener("click", () => togglePasswordVisibility(DOM.signUpPassword, DOM.signUpTogglePasswordBtn));
  }
  if (DOM.signUpToggleConfirmPasswordBtn) {
    DOM.signUpToggleConfirmPasswordBtn.addEventListener("click", () => togglePasswordVisibility(DOM.signUpConfirmPassword, DOM.signUpToggleConfirmPasswordBtn));
  }

  // Real-time password strength meter
  if (DOM.signUpPassword) {
    DOM.signUpPassword.addEventListener("input", (e) => evaluatePasswordStrength(e.target.value));
  }

  // Sign In submit
  if (DOM.signInForm) {
    DOM.signInForm.addEventListener("submit", handleSignInSubmit);
  }

  // Sign Up submit
  if (DOM.signUpForm) {
    DOM.signUpForm.addEventListener("submit", handleSignUpSubmit);
  }

  // Google Login button
  if (DOM.googleSignInBtn) {
    DOM.googleSignInBtn.addEventListener("click", handleGoogleSignIn);
  }

  // Demo user instant login
  if (DOM.demoSignInBtn) {
    DOM.demoSignInBtn.addEventListener("click", handleDemoLogin);
  }

  // Firebase setup guide trigger
  if (DOM.openFirebaseSetupBtn) {
    DOM.openFirebaseSetupBtn.addEventListener("click", () => {
      DOM.authModal.classList.add("hidden");
      DOM.firebaseSetupModal.classList.remove("hidden");
    });
  }

  // Forgot password
  if (DOM.forgotPasswordBtn) {
    DOM.forgotPasswordBtn.addEventListener("click", () => {
      showToast("Password reset link will be sent to registered emails with Firebase setup.", "info");
    });
  }

  // User profile dropdown toggle
  if (DOM.userProfileTrigger) {
    DOM.userProfileTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = DOM.userProfileDropdown.classList.contains("hidden");
      DOM.userProfileDropdown.classList.toggle("hidden", !isHidden);
      DOM.userProfileTrigger.setAttribute("aria-expanded", isHidden ? "true" : "false");
    });
  }

  // Close profile dropdown on document click
  document.addEventListener("click", (e) => {
    if (DOM.userProfileDropdown && !e.target.closest("#userProfileMenu")) {
      DOM.userProfileDropdown.classList.add("hidden");
      if (DOM.userProfileTrigger) DOM.userProfileTrigger.setAttribute("aria-expanded", "false");
    }
  });

  // Profile menu items
  if (DOM.profileFavoritesItem) {
    DOM.profileFavoritesItem.addEventListener("click", () => {
      DOM.userProfileDropdown.classList.add("hidden");
      switchView("home");
      const section = document.getElementById("favoritesSection");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (DOM.profileStudioItem) {
    DOM.profileStudioItem.addEventListener("click", () => {
      DOM.userProfileDropdown.classList.add("hidden");
      startStudio();
    });
  }

  if (DOM.profileFirebaseItem) {
    DOM.profileFirebaseItem.addEventListener("click", () => {
      DOM.userProfileDropdown.classList.add("hidden");
      DOM.firebaseSetupModal.classList.remove("hidden");
    });
  }

  // Logout button
  if (DOM.logoutBtn) {
    DOM.logoutBtn.addEventListener("click", handleLogout);
  }
}

function openAuthModal(customSubtitle) {
  setAuthTab("signin");
  if (customSubtitle && DOM.authModalSubtitle) {
    DOM.authModalSubtitle.textContent = customSubtitle;
  }
  DOM.authModal.classList.remove("hidden");
}

function setAuthTab(tab) {
  const isSignIn = tab === "signin";
  DOM.authTabSignInBtn.classList.toggle("active", isSignIn);
  DOM.authTabSignUpBtn.classList.toggle("active", !isSignIn);

  DOM.signInForm.classList.toggle("hidden", !isSignIn);
  DOM.signUpForm.classList.toggle("hidden", isSignIn);

  DOM.authModalTitle.textContent = isSignIn ? "Welcome Back to Studio" : "Create Studio Account";
  DOM.authModalSubtitle.textContent = isSignIn
    ? "Sign in to access your curated poses and favorites"
    : "Join PoseMate AI to save poses and sync across devices";

  clearAuthErrors();
}

function clearAuthErrors() {
  if (DOM.signInEmailError) DOM.signInEmailError.textContent = "";
  if (DOM.signInPasswordError) DOM.signInPasswordError.textContent = "";
  if (DOM.signUpNameError) DOM.signUpNameError.textContent = "";
  if (DOM.signUpEmailError) DOM.signUpEmailError.textContent = "";
  if (DOM.signUpPasswordError) DOM.signUpPasswordError.textContent = "";
  if (DOM.signUpConfirmError) DOM.signUpConfirmError.textContent = "";
}

function togglePasswordVisibility(input, button) {
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";

  const openIcon = button.querySelector(".eye-open-icon");
  const closedIcon = button.querySelector(".eye-closed-icon");
  if (openIcon && closedIcon) {
    openIcon.classList.toggle("hidden", isPassword);
    closedIcon.classList.toggle("hidden", !isPassword);
  }
}

function evaluatePasswordStrength(password) {
  let score = 0;
  if (!password) {
    DOM.signUpStrengthBar.className = "strength-fill";
    DOM.signUpStrengthText.textContent = "Password strength";
    return;
  }

  if (password.length >= 6) score++;
  if (password.length >= 9) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  DOM.signUpStrengthBar.className = "strength-fill";
  if (score <= 1) {
    DOM.signUpStrengthBar.classList.add("fair");
    DOM.signUpStrengthText.textContent = "Fair (add numbers & symbols)";
  } else if (score <= 3) {
    DOM.signUpStrengthBar.classList.add("good");
    DOM.signUpStrengthText.textContent = "Good password";
  } else {
    DOM.signUpStrengthBar.classList.add("strong");
    DOM.signUpStrengthText.textContent = "Strong & secure!";
  }
}

async function handleSignInSubmit(e) {
  e.preventDefault();
  clearAuthErrors();

  const email = DOM.signInEmail.value.trim().toLowerCase();
  const password = DOM.signInPassword.value;

  if (!email || !email.includes("@")) {
    DOM.signInEmailError.textContent = "Please enter a valid email address.";
    return;
  }
  if (!password) {
    DOM.signInPasswordError.textContent = "Please enter your password.";
    return;
  }

  // Check against registered users in localStorage
  const users = JSON.parse(localStorage.getItem("posemate_users") || "[]");
  const user = users.find(u => u.email === email);

  if (!user) {
    DOM.signInEmailError.textContent = "No account found with this email. Please sign up.";
    return;
  }

  const hashedAttempt = await sha256(password);
  if (user.passwordHash !== hashedAttempt) {
    DOM.signInPasswordError.textContent = "Incorrect password. Please try again.";
    return;
  }

  // Successful login
  completeLogin({
    name: user.name,
    email: user.email,
    initials: getInitials(user.name)
  });
}

async function handleSignUpSubmit(e) {
  e.preventDefault();
  clearAuthErrors();

  const name = DOM.signUpName.value.trim();
  const email = DOM.signUpEmail.value.trim().toLowerCase();
  const password = DOM.signUpPassword.value;
  const confirm = DOM.signUpConfirmPassword.value;

  let hasError = false;

  if (!name || name.length < 2) {
    DOM.signUpNameError.textContent = "Please enter your full name.";
    hasError = true;
  }
  if (!email || !email.includes("@")) {
    DOM.signUpEmailError.textContent = "Please enter a valid email address.";
    hasError = true;
  }
  if (!password || password.length < 6) {
    DOM.signUpPasswordError.textContent = "Password must be at least 6 characters.";
    hasError = true;
  }
  if (password !== confirm) {
    DOM.signUpConfirmError.textContent = "Passwords do not match.";
    hasError = true;
  }

  if (hasError) return;

  const users = JSON.parse(localStorage.getItem("posemate_users") || "[]");
  if (users.some(u => u.email === email)) {
    DOM.signUpEmailError.textContent = "An account with this email already exists. Sign in instead.";
    return;
  }

  // Hash password with SHA-256 (no plain text storage)
  const passwordHash = await sha256(password);

  users.push({
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("posemate_users", JSON.stringify(users));

  completeLogin({
    name,
    email,
    initials: getInitials(name)
  });
}

function handleGoogleSignIn() {
  // Check if live Firebase Auth is configured
  if (window.firebaseAuth) {
    showToast("Connecting to Google OAuth...", "info");
    // Firebase auth integration hook
    return;
  }

  // Explain required setup and offer instant demo login
  DOM.authModal.classList.add("hidden");
  DOM.firebaseSetupModal.classList.remove("hidden");
  showToast("Firebase/Google OAuth setup required for live cloud auth.", "info");
}

function handleDemoLogin() {
  completeLogin({
    name: "Alex Vance",
    email: "alex.vance@studio.posemate.ai",
    initials: "AV"
  });
}

function completeLogin(userProfile) {
  AppState.currentUser = userProfile;
  localStorage.setItem("posemate_session", JSON.stringify(userProfile));

  updateAuthUI();
  DOM.authModal.classList.add("hidden");
  showToast(`Welcome back, ${userProfile.name}!`, "gold");

  // If a capture was pending before sign-in, seamlessly return to camera & trigger capture
  if (AppState.pendingCaptureAfterLogin) {
    AppState.pendingCaptureAfterLogin = false;
    switchView("studio");
    setTimeout(() => {
      triggerPhotoCapture();
    }, 500);
  }
}

function handleLogout() {
  AppState.currentUser = null;
  localStorage.removeItem("posemate_session");
  updateAuthUI();
  if (DOM.userProfileDropdown) DOM.userProfileDropdown.classList.add("hidden");
  showToast("You have been signed out.", "info");
}

function updateAuthUI() {
  const isLoggedIn = !!AppState.currentUser;

  if (DOM.openAuthNavBtn) DOM.openAuthNavBtn.classList.toggle("hidden", isLoggedIn);
  if (DOM.userProfileMenu) DOM.userProfileMenu.classList.toggle("hidden", !isLoggedIn);

  if (isLoggedIn && AppState.currentUser) {
    if (DOM.userAvatarInitials) DOM.userAvatarInitials.textContent = AppState.currentUser.initials || "AU";
    if (DOM.userProfileName) DOM.userProfileName.textContent = AppState.currentUser.name || "Studio Member";
    if (DOM.userProfileEmail) DOM.userProfileEmail.textContent = AppState.currentUser.email || "";
  }
}

function getInitials(name) {
  if (!name) return "AU";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ===================================================================
// 18. Toast Notification System
// ===================================================================
function showToast(message, type = "info") {
  if (!DOM.toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === "success" ? "toast-success" : type === "gold" ? "toast-gold" : ""}`;

  let icon = "💡";
  if (type === "success") icon = "✓";
  if (type === "gold") icon = "✨";
  if (type === "info") icon = "📸";

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;

  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 280);
  }, 3200);
}

// ===================================================================
// 19. Helper Utilities
// ===================================================================
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
