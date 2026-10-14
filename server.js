/**
 * PoseMate AI - Lightweight Local Server
 * Zero external dependencies (uses Node.js built-in http, fs, path modules).
 * Serves static files for secure localhost camera access and provides
 * endpoints for AI Vision analysis.
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp"
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // API Route: Server Status
  if (pathname === "/api/status" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "online",
      isAiConfigured: !!process.env.GEMINI_API_KEY,
      nodeVersion: process.version
    }));
    return;
  }

  // API Route: Pose Analysis (Phase 2 integration)
  if (pathname === "/api/analyze-pose" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      // Cap at 10MB
      if (body.length > 10 * 1024 * 1024) {
        res.writeHead(413, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Payload too large" }));
        req.destroy();
      }
    });

    req.on("end", async () => {
      try {
        const payload = JSON.parse(body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
          // Rule-based fallback signal
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({
            isAiConfigured: false,
            message: "No GEMINI_API_KEY configured. Falling back to rule-based vision engine."
          }));
          return;
        }

        // Real Gemini Vision call if configured
        const aiResponse = await callGeminiVision(payload, apiKey);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(aiResponse));
      } catch (err) {
        console.error("API Analyze Pose Error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to analyze pose", details: err.message }));
      }
    });
    return;
  }

  // Static File Serving
  let relativeFilePath = pathname === "/" ? "/index.html" : pathname;
  // Sanitize path to prevent directory traversal
  const safePath = path.normalize(relativeFilePath).replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

/**
 * Call Gemini Vision using native fetch (Node.js 18+)
 */
async function callGeminiVision(payload, apiKey) {
  const { image, mode, outfit, style } = payload;
  if (!image) throw new Error("No image provided");

  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

  const prompt = `You are PoseMate AI, an expert photography pose coach.
Analyze the user's outfit, colors, background environment, and camera framing from this image.
The user selected Mode: "${mode || 'solo'}", Outfit category: "${outfit || 'casual'}", Style: "${style || 'instagram'}".

Return a strictly valid JSON object with this exact structure:
{
  "isAiConfigured": true,
  "visibleOutfit": "Brief description of clothing observed",
  "colorsAndPatterns": "Main detected colors and patterns",
  "environment": "Background lighting, depth, and setting",
  "framing": "Current camera framing (e.g. Waist-Up, Full Body, Close-Up)",
  "recommendedPoses": [
    {
      "id": "solo-natural-standing",
      "name": "Pose Name",
      "whyItSuits": "Clear explanation why this pose flatters this specific outfit and lighting",
      "bodyPositioning": "Torso and weight distribution advice",
      "handAndLegPlacement": "Actionable hand and foot cues",
      "faceAndGaze": "Eye contact and expression direction",
      "framingAdvice": "Camera angle recommendation",
      "difficulty": "Beginner | Intermediate",
      "steps": [
        { "stepNumber": 1, "title": "Step title", "instruction": "Clear instruction", "shyTip": "Tip for shy individuals" }
      ]
    }
  ]
}`;

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const bodyData = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      response_mime_type: "application/json"
    }
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyData)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const json = await response.json();
  const textOutput = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) throw new Error("Empty response from Gemini");

  return JSON.parse(textOutput);
}

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 PoseMate AI server running at:`);
  console.log(`   - Local:   http://localhost:${PORT}`);
  console.log(`   - Network: http://127.0.0.1:${PORT}`);
});
