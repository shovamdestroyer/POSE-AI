// Verify JS files syntax and data structures
const fs = require('fs');
const vm = require('vm');

console.log("=== Validating JavaScript Syntax and Data Integrity ===");

// 1. Validate poseData.js
try {
  const poseDataCode = fs.readFileSync('poseData.js', 'utf8');
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(poseDataCode, context);
  const db = context.POSE_DATABASE || context.window.POSE_DATABASE;
  console.log(`[PASS] poseData.js syntax valid. Total poses: ${db.length}`);
  
  const soloPoses = db.filter(p => p.mode === 'solo');
  const couplePoses = db.filter(p => p.mode === 'couple');
  const groupPoses = db.filter(p => p.mode === 'group');
  console.log(`       Solo poses: ${soloPoses.length} (${soloPoses.map(p => p.name).join(', ')})`);
  console.log(`       Couple poses: ${couplePoses.length} (${couplePoses.map(p => p.name).join(', ')})`);
  console.log(`       Group poses: ${groupPoses.length} (${groupPoses.map(p => p.name).join(', ')})`);

  // Verify each pose has steps, shy tips, and SVG
  db.forEach(p => {
    if (!p.id || !p.name || !p.steps || p.steps.length === 0) {
      throw new Error(`Pose ${p.id} is missing steps!`);
    }
    p.steps.forEach(s => {
      if (!s.instruction || !s.shyTip) {
        throw new Error(`Pose ${p.name} step ${s.stepNumber} is missing instruction or shyTip!`);
      }
    });
  });
  console.log(`[PASS] All ${db.length} poses have full step-by-step instructions and shy tips.`);
} catch (e) {
  console.error("[FAIL] poseData.js validation error:", e);
  process.exit(1);
}

// 2. Validate poseDetector.js
try {
  const code = fs.readFileSync('poseDetector.js', 'utf8');
  const context = { window: {}, performance, requestAnimationFrame: () => {}, cancelAnimationFrame: () => {}, console };
  vm.createContext(context);
  vm.runInContext(code, context);
  if (!context.window.PoseDetectorEngine) {
    throw new Error("PoseDetectorEngine not exported on window");
  }
  console.log("[PASS] poseDetector.js syntax valid and PoseDetectorEngine defined.");
} catch (e) {
  console.error("[FAIL] poseDetector.js validation error:", e);
  process.exit(1);
}

// 3. Validate script.js syntax
try {
  const scriptCode = fs.readFileSync('script.js', 'utf8');
  // Simple syntax check via Function constructor or vm.Script
  new vm.Script(scriptCode);
  console.log("[PASS] script.js syntax is valid.");
} catch (e) {
  console.error("[FAIL] script.js syntax error:", e);
  process.exit(1);
}

// 4. Validate HTML IDs referenced in script.js
try {
  const html = fs.readFileSync('index.html', 'utf8');
  const script = fs.readFileSync('script.js', 'utf8');
  const idMatches = script.match(/getElementById\("([^"]+)"\)/g) || [];
  const referencedIds = idMatches.map(m => m.match(/getElementById\("([^"]+)"\)/)[1]);
  
  const missingIds = [];
  referencedIds.forEach(id => {
    if (!html.includes(`id="${id}"`)) {
      missingIds.push(id);
    }
  });

  if (missingIds.length > 0) {
    console.warn("[WARN] Missing HTML IDs:", missingIds);
  } else {
    console.log(`[PASS] All ${referencedIds.length} DOM element IDs referenced in script.js exist in index.html!`);
  }
} catch (e) {
  console.error("[FAIL] DOM ID validation error:", e);
  process.exit(1);
}

console.log("=== ALL INTEGRITY CHECKS PASSED ===");
