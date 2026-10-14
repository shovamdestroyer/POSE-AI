const fs = require('fs');

// 42 Highly Curated, Aesthetic, Realistic Photography Poses
const POSE_DATABASE = [
  // ==========================================
  // SOLO POSES (22 Poses)
  // ==========================================
  {
    id: "solo-casual-standing",
    mode: "solo",
    name: "Effortless Standing",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Natural & Relaxed",
    framing: "Full Body",
    suitableOutfits: ["casual", "western", "formal", "traditional"],
    suitableStyles: ["instagram", "college", "travel", "professional"],
    description: "The essential natural standing stance. Balances weight on one leg to create organic lines without looking stiff.",
    referenceImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Drop weight 70% onto back leg for a natural S-curve.",
      handPlacement: "Let arms hang relaxed beside thighs with soft fingers.",
      legPosition: "Front foot angled 20° outward with soft knee micro-bend.",
      facialExpression: "Relax jaw, soft micro-smile, direct gaze into camera lens.",
      cameraAngle: "Chest to waist level."
    },
    proTips: {
      posture: "Inhale to lengthen spine, exhale and drop shoulders.",
      lighting: "45° key light for sculpted contours.",
      framing: "Leave 15% headroom above crown.",
      expression: "Breathe gently through parted lips."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="100" y1="58" x2="100" y2="74" stroke="currentColor" stroke-width="3"/>
      <line x1="78" y1="76" x2="122" y2="74" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 70,122 72,165" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,74 130,120 126,165" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="90,155 86,225 84,295" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="112,155 114,225 116,295" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 8, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Center Yourself",
        instruction: "Step into the center of the camera frame.",
        shyTip: "Keep both shoulders level and relaxed.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Drop Shoulders",
        instruction: "Relax your shoulders down and back.",
        shyTip: "Shake off neck tension.",
        targetCondition: { type: "shoulders_level", maxTilt: 10 }
      },
      {
        stepNumber: 3,
        title: "Level Chin",
        instruction: "Keep your chin level and look into the camera.",
        shyTip: "Look directly at the camera lens glass.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 4,
        title: "Hold the Pose",
        instruction: "Hold still for 1 second! Looking great.",
        shyTip: "Breathe softly.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-hands-on-hips",
    mode: "solo",
    name: "Hands on Hips",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Confident & Empowered",
    framing: "3/4 View",
    suitableOutfits: ["casual", "western", "formal"],
    suitableStyles: ["instagram", "college", "professional"],
    description: "The classic confident power pose. Flaring elbows creates clean negative space that accentuates the waistline.",
    referenceImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Torso tall, shoulders back, chest proud.",
      handPlacement: "Both hands firmly or lightly on waist, thumbs pointing back.",
      legPosition: "Feet hip-width apart for a balanced athletic stance.",
      facialExpression: "Calm, confident gaze or wide radiant smile.",
      cameraAngle: "Slightly low angle to emphasize stature."
    },
    proTips: {
      posture: "Flare elbows outward to create triangle negative space.",
      lighting: "Balanced soft frontal light.",
      framing: "Waist-up or 3/4 length crop.",
      expression: "Direct eye contact."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="78" y1="76" x2="122" y2="76" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 58,115 84,145" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 142,115 116,145" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="90,155 88,225 86,295" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="112,155 114,225 116,295" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Stand Tall",
        instruction: "Stand straight with your body centered.",
        shyTip: "Feet hip-width apart.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Right Hand on Waist",
        instruction: "Place your right hand on your waist.",
        shyTip: "Elbow pointing outward.",
        targetCondition: { type: "right_hand_on_waist", maxDist: 0.22 }
      },
      {
        stepNumber: 3,
        title: "Both Hands on Hips",
        instruction: "Place both hands on your hips and flare elbows out.",
        shyTip: "Creates clean negative space at your waist.",
        targetCondition: { type: "hands_on_hips", maxDist: 0.25 }
      },
      {
        stepNumber: 4,
        title: "Power Hold",
        instruction: "Hold this confident stance!",
        shyTip: "Look directly into the camera.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-arms-crossed",
    mode: "solo",
    name: "Power Arms Crossed",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Bold & Professional",
    framing: "Medium Shot",
    suitableOutfits: ["formal", "casual", "western"],
    suitableStyles: ["professional", "college", "instagram"],
    description: "Clean executive portrait posture. Loosely crossed arms project warmth, strength, and quiet confidence.",
    referenceImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Slight 15° torso turn, spine tall, shoulders relaxed.",
      handPlacement: "Arms folded loosely over ribs, fingers resting softly on biceps.",
      legPosition: "Weight distributed 60/40 on rear foot.",
      facialExpression: "Warm, confident micro-smile, focused eye contact.",
      cameraAngle: "Eye level or slightly above."
    },
    proTips: {
      posture: "Don't clutch elbows tightly; keep arms loose.",
      lighting: "Side directional window light.",
      framing: "Chest up or waist up.",
      expression: "Smile with your eyes."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="76" y1="76" x2="124" y2="76" stroke="currentColor" stroke-width="3"/>
      <polyline points="76,76 66,120 115,125" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="124,76 134,120 85,125" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="90" y1="155" x2="88" y2="295" stroke="currentColor" stroke-width="3"/>
      <line x1="112" y1="155" x2="114" y2="295" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Posture Up",
        instruction: "Stand tall and relax your shoulders.",
        shyTip: "Drop tension from neck.",
        targetCondition: { type: "shoulders_level", maxTilt: 12 }
      },
      {
        stepNumber: 2,
        title: "Cross Arms",
        instruction: "Fold your arms loosely across your chest.",
        shyTip: "Rest fingers gently on outer biceps.",
        targetCondition: { type: "arms_crossed" }
      },
      {
        stepNumber: 3,
        title: "Chin Up & Hold",
        instruction: "Lift chin slightly and look at the camera.",
        shyTip: "Warm, approachable expression.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 4,
        title: "Hold Steady",
        instruction: "Hold steady! Looking sharp.",
        shyTip: "Keep posture crisp.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-hand-in-hair",
    mode: "solo",
    name: "Hand Touching Hair",
    category: "Portrait",
    difficulty: "Beginner",
    vibe: "Chic & Playful",
    framing: "Medium Close-Up",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "birthday", "travel"],
    description: "Effortlessly candid gesture. Running fingers through hair creates playful motion and dynamic triangular elbow lines.",
    referenceImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Upper body angled 20°, neck elongated.",
      handPlacement: "One hand lightly touching or brushing hair near temple.",
      legPosition: "Standing or seated casually.",
      facialExpression: "Candid laugh or gentle dreamy gaze.",
      cameraAngle: "Eye level."
    },
    proTips: {
      posture: "Keep wrist relaxed like you're brushing silk.",
      lighting: "Soft rim lighting on hair strands.",
      framing: "Chest up portrait.",
      expression: "Smile naturally."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 145,55 116,36" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 72,125 76,165" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.18 },
    steps: [
      {
        stepNumber: 1,
        title: "Center Frame",
        instruction: "Position yourself in the center of the frame.",
        shyTip: "Step comfortably into view.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Touch Hair",
        instruction: "Raise one hand and gently touch your hair.",
        shyTip: "Rest fingers near your temple.",
        targetCondition: { type: "hand_near_hair", maxDist: 0.24 }
      },
      {
        stepNumber: 3,
        title: "Tilt Head",
        instruction: "Tilt your head slightly toward your shoulder.",
        shyTip: "Keep expression relaxed.",
        targetCondition: { type: "head_tilt_any", minDeg: 6, maxDeg: 25 }
      },
      {
        stepNumber: 4,
        title: "Hold the Look",
        instruction: "Hold it right there! Gorgeous.",
        shyTip: "Breathe gently.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-over-shoulder",
    mode: "solo",
    name: "Looking Over Shoulder",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Mysterious & Flattering",
    framing: "3/4 View",
    suitableOutfits: ["western", "casual", "traditional", "formal"],
    suitableStyles: ["instagram", "wedding", "travel"],
    description: "Turn your back slightly to the camera and glance back over your shoulder for high editorial intrigue and defined jaw angles.",
    referenceImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Turn back 60° away from lens, rotate head back toward camera.",
      handPlacement: "Hands relaxed in pockets or holding bag strap.",
      legPosition: "One foot forward as if pausing mid-walk.",
      facialExpression: "Intense or playful over-the-shoulder gaze.",
      cameraAngle: "Eye level."
    },
    proTips: {
      posture: "Don't hunch back; keep spine long.",
      lighting: "Backlight or edge light catches profile.",
      framing: "3/4 view vertical.",
      expression: "Soft focus in eyes."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="106" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="82" y1="78" x2="126" y2="72" stroke="currentColor" stroke-width="3"/>
      <line x1="88" y1="155" x2="84" y2="295" stroke="currentColor" stroke-width="3"/>
      <line x1="114" y1="150" x2="110" y2="295" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.20 },
    steps: [
      {
        stepNumber: 1,
        title: "Turn Body",
        instruction: "Turn your torso slightly away from the camera.",
        shyTip: "Angle your body about 45°.",
        targetCondition: { type: "torso_turn_45" }
      },
      {
        stepNumber: 2,
        title: "Turn Face Back",
        instruction: "Turn your face back over your shoulder toward the lens.",
        shyTip: "Look directly into the camera.",
        targetCondition: { type: "head_turn_any", minOffset: 0.12 }
      },
      {
        stepNumber: 3,
        title: "Hold Glancing Pose",
        instruction: "Hold this glance! Perfect angle.",
        shyTip: "Slight smile.",
        targetCondition: { type: "hold_pose", durationMs: 1100 }
      }
    ]
  },

  {
    id: "solo-hand-on-jaw",
    mode: "solo",
    name: "Classic Portrait (Hand to Jaw)",
    category: "Close-up",
    difficulty: "Beginner",
    vibe: "Thoughtful & Elegant",
    framing: "Chest Up",
    suitableOutfits: ["formal", "casual", "traditional"],
    suitableStyles: ["professional", "instagram", "birthday"],
    description: "The gold standard close-up portrait. Light fingertips near the jawline frame facial features without adding pressure.",
    referenceImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Upper body angled 25°, head tilted slightly.",
      handPlacement: "Fingertips resting delicately against side of jaw or chin.",
      legPosition: "Standing or seated upright.",
      facialExpression: "Calm, captivating gaze, parted lips.",
      cameraAngle: "Direct eye level."
    },
    proTips: {
      posture: "Do not push skin or cheeks with fingers.",
      lighting: "Soft beauty dish or diffuse window light.",
      framing: "Tight head and shoulders portrait.",
      expression: "Relax forehead completely."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 135,62 108,52" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Step Closer",
        instruction: "Center yourself for a close-up portrait.",
        shyTip: "Frame chest up.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Hand to Jaw",
        instruction: "Bring one hand up to lightly touch your jawline.",
        shyTip: "Keep fingers soft, don't press.",
        targetCondition: { type: "hand_near_jaw", maxDist: 0.22 }
      },
      {
        stepNumber: 3,
        title: "Micro Head Tilt",
        instruction: "Tilt your head slightly toward your hand.",
        shyTip: "Gaze right into the lens.",
        targetCondition: { type: "head_tilt_any", minDeg: 5, maxDeg: 22 }
      },
      {
        stepNumber: 4,
        title: "Hold Portrait",
        instruction: "Hold still for the beauty portrait!",
        shyTip: "Subtle smile.",
        targetCondition: { type: "hold_pose", durationMs: 1100 }
      }
    ]
  },

  {
    id: "solo-street-stride",
    mode: "solo",
    name: "Street Stride Walk",
    category: "Dynamic",
    difficulty: "Intermediate",
    vibe: "Urban & Energetic",
    framing: "Full Body",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["travel", "instagram", "college"],
    description: "The fashion-week street stroll. Walking at half-speed delivers crisp garment motion and effortless candid momentum.",
    referenceImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Walk slowly forward on a slight diagonal.",
      handPlacement: "Arms swing naturally in gentle opposite motion.",
      legPosition: "One foot forward heel down, rear foot pushing off.",
      facialExpression: "Cool candid glance to side, then to lens.",
      cameraAngle: "Low angle waist-level tracking shot."
    },
    proTips: {
      posture: "Walk at half-speed for sharpness.",
      lighting: "Natural outdoor ambient.",
      framing: "Wide full length leaving leading space.",
      expression: "Confident urban rhythm."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="90,155 75,225 60,295" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="112,155 125,225 140,295" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.20 },
    steps: [
      {
        stepNumber: 1,
        title: "Take a Stride",
        instruction: "Step one foot forward in a slow walking stance.",
        shyTip: "Simulate a walking stride.",
        targetCondition: { type: "body_centered", minX: 0.30, maxX: 0.70 }
      },
      {
        stepNumber: 2,
        title: "Swing Arms",
        instruction: "Let your arms swing naturally at your sides.",
        shyTip: "Keep fingers completely loose.",
        targetCondition: { type: "shoulders_level", maxTilt: 14 }
      },
      {
        stepNumber: 3,
        title: "Look Forward",
        instruction: "Look straight toward the camera with confidence.",
        shyTip: "Keep chin up.",
        targetCondition: { type: "head_straight", tolerance: 12 }
      },
      {
        stepNumber: 4,
        title: "Freeze the Stride",
        instruction: "Hold this walking moment!",
        shyTip: "Hold steady.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-wall-lean",
    mode: "solo",
    name: "Architectural Wall Lean",
    category: "Support",
    difficulty: "Beginner",
    vibe: "Moody & Editorial",
    framing: "Full Body",
    suitableOutfits: ["casual", "western", "formal"],
    suitableStyles: ["instagram", "college", "professional"],
    description: "Leaning one shoulder against a textured wall creates natural diagonal posture lines and architectural depth.",
    referenceImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Lean rear shoulder 30% against wall surface.",
      handPlacement: "One hand in pocket or touching wall, other arm loose.",
      legPosition: "Outer leg crossed in front of inner leg at ankle.",
      facialExpression: "Thoughtful moody glance away or direct gaze.",
      cameraAngle: "Shot along the wall for leading lines."
    },
    proTips: {
      posture: "Only lean with 30% weight so clothes don't bunch.",
      lighting: "Grazing wall texture light.",
      framing: "Full length vertical.",
      expression: "Calm exhalation."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <line x1="60" y1="20" x2="60" y2="300" stroke="#c5a880" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="95" cy="42" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="75" y1="78" x2="118" y2="72" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 14, centerOffsetMax: 0.22 },
    steps: [
      {
        stepNumber: 1,
        title: "Lean Posture",
        instruction: "Lean slightly to one side as if against a wall.",
        shyTip: "Keep your upper body relaxed.",
        targetCondition: { type: "shoulders_level", maxTilt: 16 }
      },
      {
        stepNumber: 2,
        title: "Hand Relaxed",
        instruction: "Rest one hand near your pocket or hip.",
        shyTip: "Keep arm tension-free.",
        targetCondition: { type: "right_hand_on_waist", maxDist: 0.28 }
      },
      {
        stepNumber: 3,
        title: "Look Across",
        instruction: "Turn your face slightly to the side.",
        shyTip: "Brooding, thoughtful gaze.",
        targetCondition: { type: "head_turn_any", minOffset: 0.10 }
      },
      {
        stepNumber: 4,
        title: "Hold the Lean",
        instruction: "Hold this moody lean! Perfect.",
        shyTip: "Breathe slowly.",
        targetCondition: { type: "hold_pose", durationMs: 1100 }
      }
    ]
  },

  {
    id: "solo-seated-steps",
    mode: "solo",
    name: "Relaxed Steps Seated",
    category: "Sitting",
    difficulty: "Beginner",
    vibe: "Cozy & Candid",
    framing: "Medium Shot",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "college", "travel"],
    description: "Sitting forward on steps or a chair eliminates standing stiffness. Resting elbows on knees creates an intimate, candid atmosphere.",
    referenceImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Sit on front edge, lean torso forward 15° towards lens.",
      handPlacement: "Elbows on knees, hands clasped loosely or resting on shins.",
      legPosition: "Knees apart, feet flat on lower step.",
      facialExpression: "Warm approachable smile, direct eye contact.",
      cameraAngle: "Slightly low angle pointing up."
    },
    proTips: {
      posture: "Sit right on edge; don't slouch back.",
      lighting: "Soft ambient daylight.",
      framing: "Waist-up medium shot.",
      expression: "Friendly open demeanor."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="55" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="80" y1="90" x2="120" y2="90" stroke="currentColor" stroke-width="3"/>
      <polyline points="80,90 70,140 100,165" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="120,90 130,140 100,165" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.18 },
    steps: [
      {
        stepNumber: 1,
        title: "Sit Upright",
        instruction: "Sit tall and lean your upper body slightly forward.",
        shyTip: "Engage core slightly.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Elbows Forward",
        instruction: "Bring your hands forward near your lap or knees.",
        shyTip: "Loosely clasp fingers or rest wrists.",
        targetCondition: { type: "hands_in_lap", maxDist: 0.28 }
      },
      {
        stepNumber: 3,
        title: "Warm Smile",
        instruction: "Look directly at the camera with a warm smile.",
        shyTip: "Think of an old friend.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 4,
        title: "Hold Seated Shot",
        instruction: "Hold still! Capturing cozy seated pose.",
        shyTip: "Hold it steady.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-candid-laugh",
    mode: "solo",
    name: "Candid Laugh & Glance",
    category: "Candid",
    difficulty: "Beginner",
    vibe: "Joyful & Authentic",
    framing: "Medium Shot",
    suitableOutfits: ["casual", "western", "traditional"],
    suitableStyles: ["birthday", "instagram", "travel"],
    description: "The joy shot! A genuine laugh accompanied by a natural head tilt creates unforced authenticity that makes photos feel alive.",
    referenceImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Upper body relaxed, tilted naturally with laughter.",
      handPlacement: "One hand near chest or waist, other arm relaxed.",
      legPosition: "Standing or seated casually.",
      facialExpression: "Open genuine laughter, crinkled happy eyes.",
      cameraAngle: "Eye level."
    },
    proTips: {
      posture: "Laugh out loud right before the shot.",
      lighting: "Bright warm ambient glow.",
      framing: "Chest up or waist up.",
      expression: "Authentic laughter releases facial tension."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="104" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M 98,46 Q 104,54 110,46" stroke="#c5a880" stroke-width="2" fill="none"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 14, centerOffsetMax: 0.18 },
    steps: [
      {
        stepNumber: 1,
        title: "Relax Everything",
        instruction: "Drop your shoulders and breathe out completely.",
        shyTip: "Let all tension go.",
        targetCondition: { type: "shoulders_level", maxTilt: 14 }
      },
      {
        stepNumber: 2,
        title: "Tilt & Laugh",
        instruction: "Tilt your head slightly and give a genuine laugh.",
        shyTip: "Laugh out loud!",
        targetCondition: { type: "head_tilt_any", minDeg: 6, maxDeg: 24 }
      },
      {
        stepNumber: 3,
        title: "Glance at Lens",
        instruction: "Glance toward the camera with smiling eyes.",
        shyTip: "Hold that laughter sparkle.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-one-pocket-turn",
    mode: "solo",
    name: "One Hand in Pocket 45°",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Cool & Effortless",
    framing: "3/4 View",
    suitableOutfits: ["casual", "western", "formal"],
    suitableStyles: ["instagram", "college", "professional"],
    description: "The timeless casual-cool pose. Angling 45° slims the silhouette while one hand in pocket gives hands a natural anchor.",
    referenceImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Torso turned 45°, weight on pocket-side hip.",
      handPlacement: "Four fingers in pocket, thumb hooked outside.",
      legPosition: "Straight pocket leg, relaxed opposite leg.",
      facialExpression: "Calm chin-level gaze just past camera lens.",
      cameraAngle: "Waist level."
    },
    proTips: {
      posture: "Leaving thumb outside pocket avoids 'hidden hand' look.",
      lighting: "Side key light creates texture depth.",
      framing: "3/4 view to full length.",
      expression: "Unbothered confidence."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 65,118 86,145" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 132,120 128,162" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.18 },
    steps: [
      {
        stepNumber: 1,
        title: "Turn 45 Degrees",
        instruction: "Turn your body 45° away from the camera.",
        shyTip: "Angle torso to 1:30 on the clock.",
        targetCondition: { type: "torso_turn_45" }
      },
      {
        stepNumber: 2,
        title: "Hand in Pocket",
        instruction: "Slide your dominant hand into your pocket.",
        shyTip: "Keep your other arm hanging relaxed.",
        targetCondition: { type: "right_hand_on_waist", maxDist: 0.24 }
      },
      {
        stepNumber: 3,
        title: "Look Back",
        instruction: "Turn your face back toward the lens.",
        shyTip: "Direct gaze with chin level.",
        targetCondition: { type: "head_straight", tolerance: 12 }
      },
      {
        stepNumber: 4,
        title: "Hold Cool Stance",
        instruction: "Hold this effortless look!",
        shyTip: "Breathe calmly.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-jacket-hold",
    mode: "solo",
    name: "Jacket Lapel Grip",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Sharp & Tailored",
    framing: "3/4 View",
    suitableOutfits: ["formal", "western", "casual"],
    suitableStyles: ["professional", "instagram", "wedding"],
    description: "Holding one or both lapels of a blazer or jacket creates structured chest framing and purposeful hand placement.",
    referenceImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Upright spine, slight weight shift.",
      handPlacement: "One or both hands lightly grasping jacket lapel near sternum.",
      legPosition: "Feet shoulder-width apart.",
      facialExpression: "Sharp, focused executive look.",
      cameraAngle: "Chest height."
    },
    proTips: {
      posture: "Don't yank jacket; fingers should lightly rest on fabric.",
      lighting: "High-contrast rim lighting.",
      framing: "Mid-thigh up.",
      expression: "Determined gaze."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 86,110 96,105" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 114,110 104,105" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Stand Straight",
        instruction: "Stand tall with shoulders squared.",
        shyTip: "Keep neck elongated.",
        targetCondition: { type: "shoulders_level", maxTilt: 10 }
      },
      {
        stepNumber: 2,
        title: "Hands to Chest",
        instruction: "Bring hands up toward your chest or lapels.",
        shyTip: "Hold jacket or rest fingers near sternum.",
        targetCondition: { type: "hands_near_chest", maxDist: 0.26 }
      },
      {
        stepNumber: 3,
        title: "Eye Contact",
        instruction: "Look straight into the camera lens.",
        shyTip: "Clear, determined expression.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 4,
        title: "Hold Sharp Look",
        instruction: "Hold this sharp stance!",
        shyTip: "Steady.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-side-profile",
    mode: "solo",
    name: "Dramatic Side Profile",
    category: "Close-up",
    difficulty: "Intermediate",
    vibe: "Cinematic & Sculpted",
    framing: "Chest Up",
    suitableOutfits: ["formal", "western", "traditional"],
    suitableStyles: ["instagram", "professional", "wedding"],
    description: "Pure cinematic profile. Turning 80° highlights jawline sharpness, eyelash contours, and editorial silhouette depth.",
    referenceImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Turn head 80° sideways relative to camera lens.",
      handPlacement: "Arms relaxed or out of frame.",
      legPosition: "Standing tall.",
      facialExpression: "Lips gently parted, eyes looking toward horizon.",
      cameraAngle: "Strict eye level."
    },
    proTips: {
      posture: "Keep chin parallel to ground; don't tuck chin into chest.",
      lighting: "Rim backlight creates dramatic profile halo.",
      framing: "Profile chest up portrait.",
      expression: "Contemplative cinematic gaze."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <ellipse cx="100" cy="40" rx="14" ry="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M 114,35 L 122,42 L 114,48" stroke="#c5a880" stroke-width="2" fill="none"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.20 },
    steps: [
      {
        stepNumber: 1,
        title: "Turn Head Side",
        instruction: "Turn your face to the side into profile view.",
        shyTip: "Face sideways toward 3 or 9 o'clock.",
        targetCondition: { type: "head_turn_any", minOffset: 0.20 }
      },
      {
        stepNumber: 2,
        title: "Chin Up",
        instruction: "Lift your chin parallel to the floor.",
        shyTip: "Elongates neckline and sharpens jaw.",
        targetCondition: { type: "shoulders_level", maxTilt: 14 }
      },
      {
        stepNumber: 3,
        title: "Hold Profile",
        instruction: "Hold this dramatic profile shot!",
        shyTip: "Look into distance.",
        targetCondition: { type: "hold_pose", durationMs: 1100 }
      }
    ]
  },

  {
    id: "solo-head-tilt-portrait",
    mode: "solo",
    name: "Soft Head Tilt Portrait",
    category: "Close-up",
    difficulty: "Beginner",
    vibe: "Sweet & Approachable",
    framing: "Chest Up",
    suitableOutfits: ["casual", "western", "traditional"],
    suitableStyles: ["instagram", "birthday", "travel"],
    description: "A gentle 10° head tilt instantly softens facial symmetry, making close-up portraits look natural, welcoming, and photogenic.",
    referenceImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Upper body centered, shoulders relaxed.",
      handPlacement: "Arms relaxed or out of frame.",
      legPosition: "Standing or seated.",
      facialExpression: "Warm micro-smile, kind eye contact.",
      cameraAngle: "Eye level or slightly above."
    },
    proTips: {
      posture: "Tilt head from neck, not waist.",
      lighting: "Soft wrap-around window light.",
      framing: "Head and shoulders crop.",
      expression: "Smile with mouth and eyes."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="102" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3" transform="rotate(10 102 40)"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Center Face",
        instruction: "Position your face in the center of the frame.",
        shyTip: "Step close to camera.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Tilt Head",
        instruction: "Tilt your head slightly (around 10°) to one side.",
        shyTip: "Gentle tilt toward shoulder.",
        targetCondition: { type: "head_tilt_any", minDeg: 6, maxDeg: 22 }
      },
      {
        stepNumber: 3,
        title: "Warm Smile",
        instruction: "Smile softly into the camera lens.",
        shyTip: "Relax your eyes.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-leaned-forward-portrait",
    mode: "solo",
    name: "Leaning Into Camera",
    category: "Close-up",
    difficulty: "Beginner",
    vibe: "Intimate & Engaging",
    framing: "Chest Up",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "college", "professional"],
    description: "Leaning 15° toward the camera lens creates immediate viewer intimacy and draws full focus to eyes and facial expression.",
    referenceImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Lean upper torso 15° forward toward the lens.",
      handPlacement: "Arms relaxed or resting on table edge.",
      legPosition: "Weight on front foot.",
      facialExpression: "Engaged, direct eye contact.",
      cameraAngle: "Forehead level."
    },
    proTips: {
      posture: "Lean from hips so spine stays straight.",
      lighting: "Soft diffused key light.",
      framing: "Intimate portrait crop.",
      expression: "Eyes sharp and present."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="46" r="22" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="72" y1="84" x2="128" y2="84" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Lean Forward",
        instruction: "Lean your upper body slightly toward the camera.",
        shyTip: "Brings energy and intimacy into the frame.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Chin Down",
        instruction: "Lower your chin slightly and gaze up into the lens.",
        shyTip: "Sculpts jawline naturally.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 3,
        title: "Hold the Focus",
        instruction: "Hold this engaging look! Perfect.",
        shyTip: "Hold steady.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-hands-in-back-pockets",
    mode: "solo",
    name: "Hands in Back Pockets",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Casual & Open",
    framing: "Full Body",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "travel", "college"],
    description: "Sliding hands into back pockets rolls shoulders back naturally, opening the chest and creating a clean, confident silhouette.",
    referenceImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Chest open, shoulders back, spine elongated.",
      handPlacement: "Hands hooked lightly into back denim pockets.",
      legPosition: "One foot slightly forward.",
      facialExpression: "Warm, open smile or effortless glance.",
      cameraAngle: "Waist level."
    },
    proTips: {
      posture: "Naturally rolls shoulders back without feeling forced.",
      lighting: "Bright daylight.",
      framing: "Full length vertical.",
      expression: "Breathe easily."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 68,118 84,152" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 132,118 116,152" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Stand Tall",
        instruction: "Stand straight in the center of the frame.",
        shyTip: "Keep body relaxed.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Hands Back",
        instruction: "Place your hands near your back pockets or hips.",
        shyTip: "Rolls shoulders open naturally.",
        targetCondition: { type: "right_hand_on_waist", maxDist: 0.26 }
      },
      {
        stepNumber: 3,
        title: "Look at Camera",
        instruction: "Look straight at the lens with a natural smile.",
        shyTip: "Open chest.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 4,
        title: "Hold Open Pose",
        instruction: "Hold it right there! Looking great.",
        shyTip: "Hold steady.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-chin-rest",
    mode: "solo",
    name: "Seated Chin on Hand",
    category: "Sitting",
    difficulty: "Beginner",
    vibe: "Thoughtful & Aesthetic",
    framing: "Chest Up",
    suitableOutfits: ["casual", "western", "formal"],
    suitableStyles: ["instagram", "college", "professional"],
    description: "Resting chin on hand while seated at a cafe table creates effortless editorial charm and intellectual depth.",
    referenceImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Seated, leaning forward onto elbow.",
      handPlacement: "Chin resting softly on back of hand or knuckles.",
      legPosition: "Seated comfortably.",
      facialExpression: "Contemplative, dreaming gaze into lens.",
      cameraAngle: "Slightly elevated eye level."
    },
    proTips: {
      posture: "Don't mash your cheek; just brush skin lightly.",
      lighting: "Soft ambient cafe window light.",
      framing: "Medium close-up.",
      expression: "Soft lips."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="45" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="120,80 125,120 102,60" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.18 },
    steps: [
      {
        stepNumber: 1,
        title: "Lean Forward",
        instruction: "Lean forward as if resting your elbow on a table.",
        shyTip: "Keep posture relaxed.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Hand to Chin",
        instruction: "Rest your chin lightly against your hand.",
        shyTip: "Keep fingers soft.",
        targetCondition: { type: "hand_near_jaw", maxDist: 0.22 }
      },
      {
        stepNumber: 3,
        title: "Hold the Thought",
        instruction: "Hold this dreamy thoughtful pose!",
        shyTip: "Gaze into camera.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-crossed-ankles",
    mode: "solo",
    name: "Crossed Ankles Elegance",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Graceful & Elongated",
    framing: "Full Body",
    suitableOutfits: ["formal", "western", "traditional"],
    suitableStyles: ["professional", "wedding", "instagram"],
    description: "Crossing one ankle in front of the other visually elongates your vertical silhouette while keeping weight anchored.",
    referenceImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Spine tall, front shoulder slightly lower.",
      handPlacement: "Arms relaxed beside thighs or one hand at hip.",
      legPosition: "Front foot crossed in front of other at ankle.",
      facialExpression: "Calm, statuesque confidence.",
      cameraAngle: "Waist level."
    },
    proTips: {
      posture: "Keep balance centered on rear foot.",
      lighting: "Soft full-body illumination.",
      framing: "Full length vertical.",
      expression: "Relaxed neckline."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="88" y1="155" x2="108" y2="295" stroke="currentColor" stroke-width="3"/>
      <line x1="112" y1="155" x2="94" y2="295" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Cross Ankles",
        instruction: "Cross one leg in front of the other at your ankle.",
        shyTip: "Elongates vertical body line.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Level Shoulders",
        instruction: "Relax your shoulders and let arms hang softly.",
        shyTip: "Keep neck long.",
        targetCondition: { type: "shoulders_level", maxTilt: 10 }
      },
      {
        stepNumber: 3,
        title: "Look at Lens",
        instruction: "Look straight into the camera lens with a soft smile.",
        shyTip: "Confident posture.",
        targetCondition: { type: "head_straight", tolerance: 10 }
      },
      {
        stepNumber: 4,
        title: "Hold Elegant Stance",
        instruction: "Hold still for the elegant portrait!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-sunglasses-touch",
    mode: "solo",
    name: "Adjusting Sunglasses",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Cool & Summer Vibe",
    framing: "Medium Shot",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["travel", "instagram"],
    description: "Reaching up to touch your sunglasses frame gives hands an active purpose and brings focus straight to cheekbones.",
    referenceImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Upper body angled slightly, head tilted 5°.",
      handPlacement: "Fingertips resting lightly on sunglasses frame.",
      legPosition: "Standing casually.",
      facialExpression: "Subtle smirk or confident smile.",
      cameraAngle: "Eye level."
    },
    proTips: {
      posture: "Keep elbow out to the side for triangular lines.",
      lighting: "Bright sunny outdoor lighting.",
      framing: "Chest up.",
      expression: "Effortless vacation attitude."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 138,58 112,38" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 12, centerOffsetMax: 0.18 },
    steps: [
      {
        stepNumber: 1,
        title: "Center Stance",
        instruction: "Step comfortably into the center of the frame.",
        shyTip: "Relax shoulders.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Touch Glasses",
        instruction: "Bring one hand up to your temple or sunglasses.",
        shyTip: "Elbow flared slightly out.",
        targetCondition: { type: "hand_near_hair", maxDist: 0.22 }
      },
      {
        stepNumber: 3,
        title: "Confident Smirk",
        instruction: "Tilt your chin slightly and hold this cool pose!",
        shyTip: "Subtle smirk.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-back-glance-walk",
    mode: "solo",
    name: "Walking Away Glance Back",
    category: "Dynamic",
    difficulty: "Intermediate",
    vibe: "Cinematic Stride",
    framing: "Full Body",
    suitableOutfits: ["casual", "western", "traditional"],
    suitableStyles: ["travel", "instagram", "wedding"],
    description: "Simulate walking away from the camera, then glance back over your shoulder as if someone called your name.",
    referenceImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Body walking away, head turned 75° back.",
      handPlacement: "Arms moving naturally with stride.",
      legPosition: "One foot forward, one back.",
      facialExpression: "Spontaneous, candid smile.",
      cameraAngle: "Waist level."
    },
    proTips: {
      posture: "Turn neck smoothly without raising shoulders.",
      lighting: "Golden hour backlighting.",
      framing: "Full body landscape or vertical.",
      expression: "Surprised happy glance."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="106" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <line x1="84" y1="76" x2="124" y2="74" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 14, centerOffsetMax: 0.20 },
    steps: [
      {
        stepNumber: 1,
        title: "Angle Away",
        instruction: "Angle your body slightly away from the camera.",
        shyTip: "As if stepping forward.",
        targetCondition: { type: "torso_turn_45" }
      },
      {
        stepNumber: 2,
        title: "Glance Back",
        instruction: "Turn your head back toward the camera lens.",
        shyTip: "Like someone just called your name.",
        targetCondition: { type: "head_turn_any", minOffset: 0.12 }
      },
      {
        stepNumber: 3,
        title: "Hold the Glance",
        instruction: "Hold this spontaneous glance!",
        shyTip: "Big smile.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-coffee-cup-hold",
    mode: "solo",
    name: "Casual Prop Hold",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Lifestyle Candid",
    framing: "3/4 View",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["college", "instagram", "travel"],
    description: "Holding a prop (coffee cup, phone, or bag strap) gives both hands natural purpose and anchors casual street energy.",
    referenceImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Relaxed upright stance, 10° twist.",
      handPlacement: "Hands held near waist holding prop or bag.",
      legPosition: "Feet hip-width apart.",
      facialExpression: "Approachable candid look.",
      cameraAngle: "Chest level."
    },
    proTips: {
      posture: "Hold prop around waist level, not blocking face.",
      lighting: "Soft ambient daylight.",
      framing: "3/4 view.",
      expression: "Relaxed lifestyle vibe."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="78,76 70,120 95,130" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="122,76 130,120 105,130" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 10, centerOffsetMax: 0.15 },
    steps: [
      {
        stepNumber: 1,
        title: "Center Up",
        instruction: "Stand centered with relaxed shoulders.",
        shyTip: "Natural posture.",
        targetCondition: { type: "body_centered", minX: 0.35, maxX: 0.65 }
      },
      {
        stepNumber: 2,
        title: "Hands to Waist",
        instruction: "Bring hands together near your waist level.",
        shyTip: "As if holding a coffee or bag.",
        targetCondition: { type: "hands_in_lap", maxDist: 0.25 }
      },
      {
        stepNumber: 3,
        title: "Hold Candid Pose",
        instruction: "Look at the camera and hold this lifestyle pose!",
        shyTip: "Hold steady.",
        targetCondition: { type: "hold_pose", durationMs: 1000 }
      }
    ]
  },

  {
    id: "solo-fashion-squat",
    mode: "solo",
    name: "Streetwear Low Crouch",
    category: "Support",
    difficulty: "Editorial",
    vibe: "High-Fashion & Grungy",
    framing: "Full Body",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "college"],
    description: "The high-impact streetwear crouch. Knees wide, elbows resting on knees, looking straight up into the camera.",
    referenceImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Low crouch, spine tall, knees wide.",
      handPlacement: "Elbows on knees, hands hanging loose.",
      legPosition: "Deep squat on balls of feet.",
      facialExpression: "Intense, editorial high-fashion stare.",
      cameraAngle: "High angle pointing down, or low angle pointing up."
    },
    proTips: {
      posture: "Keep balance steady on balls of feet.",
      lighting: "Edgy flash or dramatic key light.",
      framing: "Full body vertical.",
      expression: "Fierce eye contact."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="80" r="18" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="75,115 50,150 70,200" fill="none" stroke="currentColor" stroke-width="3"/>
      <polyline points="125,115 150,150 130,200" fill="none" stroke="currentColor" stroke-width="3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.20 },
    steps: [
      {
        stepNumber: 1,
        title: "Crouch Low",
        instruction: "Lower your body into a low, balanced crouch.",
        shyTip: "Knees wide apart.",
        targetCondition: { type: "body_centered", minX: 0.30, maxX: 0.70 }
      },
      {
        stepNumber: 2,
        title: "Elbows on Knees",
        instruction: "Rest your elbows on your knees with hands loose.",
        shyTip: "Fierce editorial posture.",
        targetCondition: { type: "hands_in_lap", maxDist: 0.30 }
      },
      {
        stepNumber: 3,
        title: "Intense Gaze",
        instruction: "Look straight into the lens and hold this pose!",
        shyTip: "Hold balance steady.",
        targetCondition: { type: "hold_pose", durationMs: 1100 }
      }
    ]
  },

  // ==========================================
  // COUPLE POSES (12 Poses)
  // ==========================================
  {
    id: "couple-side-by-side",
    mode: "couple",
    name: "Coordinated Side-by-Side",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Harmonious & Connected",
    framing: "3/4 View",
    suitableOutfits: ["casual", "formal", "traditional", "western"],
    suitableStyles: ["instagram", "wedding", "birthday", "travel"],
    description: "The timeless couple portrait. Standing shoulder-to-shoulder with bodies angled slightly inward shows unity and connection.",
    referenceImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Inner shoulders touching, torsos angled 20° inward.",
      handPlacement: "Holding hands or arm around waist.",
      legPosition: "Inner feet close together.",
      facialExpression: "Warm, coordinated smiles into camera.",
      cameraAngle: "Chest level centered between couple."
    },
    proTips: {
      posture: "Eliminate gap between shoulders for emotional warmth.",
      lighting: "Balanced even light across both faces.",
      framing: "3/4 view centered.",
      expression: "Whisper an inside joke right before clicking."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="75" cy="42" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="125" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="58" y1="75" x2="92" y2="75" stroke="currentColor" stroke-width="2.5"/>
      <line x1="108" y1="73" x2="142" y2="73" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners stand together in the camera frame.",
        shyTip: "Ensure both partners are clearly visible.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Step Closer",
        instruction: "Step close together so inner shoulders touch.",
        shyTip: "Angle torsos slightly inward.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Look at Camera",
        instruction: "Both partners look at the camera and smile!",
        shyTip: "Hold hands or wrap arm around waist.",
        targetCondition: { type: "head_straight", tolerance: 12 }
      },
      {
        stepNumber: 4,
        title: "Hold Couple Shot",
        instruction: "Hold this sweet couple moment!",
        shyTip: "Hold steady.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-looking-at-each-other",
    mode: "couple",
    name: "Looking at Each Other",
    category: "Intimate",
    difficulty: "Beginner",
    vibe: "Romantic & Candid",
    framing: "Medium Shot",
    suitableOutfits: ["casual", "formal", "wedding"],
    suitableStyles: ["wedding", "instagram", "birthday"],
    description: "Turning toward each other and sharing genuine eye contact produces spontaneous laughter, tenderness, and natural chemistry.",
    referenceImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Turn bodies 60° toward each other.",
      handPlacement: "Hands on waist, chest, or holding both hands.",
      legPosition: "Facing inward.",
      facialExpression: "Eye contact, spontaneous laughter and smiles.",
      cameraAngle: "3/4 profile angle capturing both faces."
    },
    proTips: {
      posture: "Keep chins level when looking at each other.",
      lighting: "Golden hour rim light.",
      framing: "Waist-up medium shot.",
      expression: "Focus on partner's eyelashes to relax gaze."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="70" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="130" cy="43" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into the camera view.",
        shyTip: "Make sure both are visible.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Face Each Other",
        instruction: "Turn your bodies toward each other.",
        shyTip: "Step close together.",
        targetCondition: { type: "facing_each_other" }
      },
      {
        stepNumber: 3,
        title: "Eye Contact & Laugh",
        instruction: "Look directly into each other's eyes and smile!",
        shyTip: "Say something funny to partner.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-forehead-touch",
    mode: "couple",
    name: "Gentle Forehead Lean",
    category: "Intimate",
    difficulty: "Beginner",
    vibe: "Tender & Dreamy",
    framing: "Close-up",
    suitableOutfits: ["wedding", "formal", "casual"],
    suitableStyles: ["wedding", "instagram"],
    description: "Resting foreheads together with eyes softly closed creates pure cinematic emotion and timeless wedding intimacy.",
    referenceImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Face each other completely, bring foreheads together.",
      handPlacement: "Hands cupping cheek, neck, or waist.",
      legPosition: "Standing close.",
      facialExpression: "Eyes softly closed, gentle tender smiles.",
      cameraAngle: "Close portrait."
    },
    proTips: {
      posture: "Angle noses opposite so they don't bump.",
      lighting: "Dreamy soft backlight.",
      framing: "Close portrait emphasizing connection.",
      expression: "Breathe in synchronization."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="85" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="115" cy="43" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into view.",
        shyTip: "Stand close together.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Touch Foreheads",
        instruction: "Gently lean your foreheads together.",
        shyTip: "Angle noses in opposite directions.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold the Embrace",
        instruction: "Close eyes softly and hold this tender moment.",
        shyTip: "Hold still.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-walking-hand-in-hand",
    mode: "couple",
    name: "Walking Hand-in-Hand",
    category: "Dynamic",
    difficulty: "Intermediate",
    vibe: "Adventure & Romance",
    framing: "Full Body",
    suitableOutfits: ["casual", "western", "traditional"],
    suitableStyles: ["travel", "instagram", "wedding"],
    description: "Strolling forward while holding hands captures joyful candid momentum and relaxed, natural laughter.",
    referenceImage: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Walk forward in synchronized slow stride.",
      handPlacement: "Holding inner hands naturally with fingers interlaced.",
      legPosition: "Alternating natural stride.",
      facialExpression: "Looking at each other or laughing forward.",
      cameraAngle: "Low waist angle."
    },
    proTips: {
      posture: "Walk at half-speed for sharp focus.",
      lighting: "Golden hour sunset.",
      framing: "Wide full length.",
      expression: "Natural conversation."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="75" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="125" cy="43" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="90" y1="120" x2="110" y2="120" stroke="#c5a880" stroke-width="2"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into view side-by-side.",
        shyTip: "Hold inner hands.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Hold Hands & Stride",
        instruction: "Step forward holding hands as if walking.",
        shyTip: "Take a synchronized step.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Glance & Hold",
        instruction: "Glance at your partner and hold this romantic stroll!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-shoulder-embrace",
    mode: "couple",
    name: "The Gentle Shoulder Hug",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Warm & Protective",
    framing: "3/4 View",
    suitableOutfits: ["casual", "formal", "western"],
    suitableStyles: ["instagram", "travel", "birthday"],
    description: "One partner gently wraps an arm around the other's shoulder, creating a cozy and protective embrace.",
    referenceImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Partner on left wraps arm over partner's shoulder.",
      handPlacement: "Arm draped over shoulder; other holds that forearm.",
      legPosition: "Standing close together.",
      facialExpression: "Both smiling happily toward camera.",
      cameraAngle: "Chest level."
    },
    proTips: {
      posture: "Keep wrapping arm relaxed, not clamping.",
      lighting: "Soft frontal light.",
      framing: "Medium shot.",
      expression: "Warm happy glow."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="75" cy="42" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="125" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M 85,75 Q 110,65 130,80" stroke="#c5a880" stroke-width="2.5" fill="none"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into the camera view.",
        shyTip: "Stand close together.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Wrap Shoulder",
        instruction: "Wrap one arm gently around your partner's shoulder.",
        shyTip: "Keep arm loose and comfortable.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Smile at Camera",
        instruction: "Both look at the camera and hold this sweet hug!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-playful-back-to-back",
    mode: "couple",
    name: "Playful Back-to-Back",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Fun & High Energy",
    framing: "3/4 View",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "college", "birthday"],
    description: "Leaning back-to-back with arms folded or hands in pockets brings playful competition and fun energy.",
    referenceImage: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Stand back-to-back, shoulder blades touching.",
      handPlacement: "Arms folded or hands in pockets.",
      legPosition: "Feet hip-width apart.",
      facialExpression: "Playful smirks or laughing over shoulders.",
      cameraAngle: "Eye level centered."
    },
    proTips: {
      posture: "Equal gentle weight distribution.",
      lighting: "Bright even lighting.",
      framing: "3/4 view.",
      expression: "Playful banter."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="85" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="115" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners stand in the frame.",
        shyTip: "Step into view.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Back to Back",
        instruction: "Stand back-to-back with shoulder blades touching.",
        shyTip: "Fold arms playfully.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Glance at Lens",
        instruction: "Turn heads slightly and smile at the camera!",
        shyTip: "Big playful smiles.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-whisper-laugh",
    mode: "couple",
    name: "Whispering a Secret",
    category: "Intimate",
    difficulty: "Beginner",
    vibe: "Playful & Candid",
    framing: "Chest Up",
    suitableOutfits: ["casual", "western", "formal"],
    suitableStyles: ["instagram", "wedding"],
    description: "One partner whispers a secret in the other's ear, instantly triggering genuine, uncontrolled laughter.",
    referenceImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "One leans in to ear, other partner tilts head with laugh.",
      handPlacement: "Hand cupping near partner's cheek.",
      legPosition: "Standing close.",
      facialExpression: "Spontaneous laughter.",
      cameraAngle: "Medium shot."
    },
    proTips: {
      posture: "Whisper an actual funny joke.",
      lighting: "Soft ambient.",
      framing: "Chest up.",
      expression: "Genuine unposed laugh."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="80" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="120" cy="48" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners stand in view.",
        shyTip: "Close proximity.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Whisper in Ear",
        instruction: "One partner leans in to whisper in the other's ear.",
        shyTip: "Whisper a real secret or joke!",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Capture the Laugh",
        instruction: "Hold this spontaneous laughing moment!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-arm-in-arm-stroll",
    mode: "couple",
    name: "Arm-in-Arm Stroll",
    category: "Standing",
    difficulty: "Beginner",
    vibe: "Classic Elegance",
    framing: "3/4 View",
    suitableOutfits: ["formal", "traditional", "western"],
    suitableStyles: ["wedding", "professional", "instagram"],
    description: "Linking arms while standing or walking is a classic gesture of elegance and deep partnership.",
    referenceImage: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Standing linked arm-in-arm.",
      handPlacement: "One partner links arm through partner's elbow.",
      legPosition: "Standing side by side.",
      facialExpression: "Warm, proud smiles.",
      cameraAngle: "Chest level."
    },
    proTips: {
      posture: "Stand upright with regal poise.",
      lighting: "Soft flattering key light.",
      framing: "3/4 view.",
      expression: "Refined elegance."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="75" cy="42" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="125" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into view.",
        shyTip: "Stand together.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Link Arms",
        instruction: "Link your arms together at the elbow.",
        shyTip: "Stand close shoulder to shoulder.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Arm-in-Arm",
        instruction: "Look at the camera and hold this elegant pose!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-hug-from-behind",
    mode: "couple",
    name: "Warm Embrace From Behind",
    category: "Intimate",
    difficulty: "Beginner",
    vibe: "Cozy & Loving",
    framing: "Medium Shot",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["instagram", "birthday", "wedding"],
    description: "One partner stands slightly behind and wraps their arms gently around the front partner's waist or shoulders.",
    referenceImage: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Partner behind wraps arms around front partner's waist.",
      handPlacement: "Hands wrapped warmly around waist/forearms.",
      legPosition: "Standing close.",
      facialExpression: "Both smiling with genuine warmth.",
      cameraAngle: "Chest level."
    },
    proTips: {
      posture: "Front partner leans back slightly for support.",
      lighting: "Soft ambient lighting.",
      framing: "Medium shot.",
      expression: "Heartfelt happiness."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="108" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into view.",
        shyTip: "One stands slightly behind.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Hug Around Waist",
        instruction: "Wrap arms gently around partner's waist from behind.",
        shyTip: "Rest chin gently near shoulder.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Embrace",
        instruction: "Both smile at the camera and hold this hug!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-twirl-spin",
    mode: "couple",
    name: "The Candid Dance Twirl",
    category: "Dynamic",
    difficulty: "Intermediate",
    vibe: "Joyous & Cinematic",
    framing: "Full Body",
    suitableOutfits: ["western", "traditional", "wedding"],
    suitableStyles: ["wedding", "instagram"],
    description: "Holding one hand overhead as partner spins or twirls adds swirling motion, flowing fabric, and pure joy.",
    referenceImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "One partner twirls with dress or jacket flowing.",
      handPlacement: "Hands held overhead in gentle dance hold.",
      legPosition: "Dynamic dance stance.",
      facialExpression: "Exuberant laughter and celebration.",
      cameraAngle: "Waist level."
    },
    proTips: {
      posture: "Keep overhead hand light.",
      lighting: "Golden hour sunset.",
      framing: "Wide full body.",
      expression: "Dance joy."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="70" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="130" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="90" y1="20" x2="110" y2="20" stroke="#c5a880" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into view.",
        shyTip: "Hold hands overhead.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Dance Hold",
        instruction: "Raise one hand together overhead in a dance twirl.",
        shyTip: "Partner can spin gently.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold the Twirl",
        instruction: "Hold this joyful dance moment!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-seated-cuddle",
    mode: "couple",
    name: "Seated Bench Cozy",
    category: "Sitting",
    difficulty: "Beginner",
    vibe: "Cozy & Intimate",
    framing: "Medium Shot",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["travel", "instagram"],
    description: "Sitting close on a park bench or cafe steps with head resting on partner's shoulder projects deep comfort and tenderness.",
    referenceImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Seated close together, one head on partner's shoulder.",
      handPlacement: "Holding hands in lap.",
      legPosition: "Seated comfortably.",
      facialExpression: "Peaceful gentle smiles.",
      cameraAngle: "Eye level."
    },
    proTips: {
      posture: "Rest head lightly without slouching.",
      lighting: "Soft shaded natural light.",
      framing: "Medium shot.",
      expression: "Peaceful contentment."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="80" cy="55" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="115" cy="62" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners sit in frame.",
        shyTip: "Sit close together.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Head on Shoulder",
        instruction: "Rest your head gently on your partner's shoulder.",
        shyTip: "Hold hands in your lap.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Cozy Shot",
        instruction: "Hold this peaceful couple moment!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "couple-hand-kiss-gaze",
    mode: "couple",
    name: "Gentle Hand Touch & Gaze",
    category: "Intimate",
    difficulty: "Beginner",
    vibe: "Timeless Romance",
    framing: "Medium Shot",
    suitableOutfits: ["formal", "wedding", "traditional"],
    suitableStyles: ["wedding", "instagram"],
    description: "One partner gently cradles the other's hand near their heart while both share a soft, loving gaze.",
    referenceImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Facing slightly inward, standing close.",
      handPlacement: "Holding partner's hand between both hands near chest.",
      legPosition: "Standing gracefully.",
      facialExpression: "Warm, emotional gaze.",
      cameraAngle: "Medium portrait."
    },
    proTips: {
      posture: "Keep hands close to chest level.",
      lighting: "Soft directional light on hands and faces.",
      framing: "Medium waist-up.",
      expression: "Tender connection."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="75" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="125" cy="45" r="16" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 15, centerOffsetMax: 0.25 },
    steps: [
      {
        stepNumber: 1,
        title: "Both in Frame",
        instruction: "Both partners step into the view.",
        shyTip: "Face each other.",
        targetCondition: { type: "two_people_present" }
      },
      {
        stepNumber: 2,
        title: "Hold Hand to Heart",
        instruction: "Hold your partner's hand gently near your chest.",
        shyTip: "Look into partner's eyes.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold the Romance",
        instruction: "Hold this romantic gaze!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  // ==========================================
  // GROUP POSES (8 Poses)
  // ==========================================
  {
    id: "group-triangle-huddle",
    mode: "group",
    name: "Friends Triangle Huddle",
    category: "Group",
    difficulty: "Beginner",
    vibe: "Tight-Knit & Fun",
    framing: "Medium Wide",
    suitableOutfits: ["casual", "western", "college"],
    suitableStyles: ["college", "instagram", "birthday"],
    description: "Center friend slightly forward, two friends flanking on left and right angled inward. Eliminates flat group lineups.",
    referenceImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Triangle formation with heads at slightly different heights.",
      handPlacement: "Arms around adjacent shoulders or on hips.",
      legPosition: "Staggered stances.",
      facialExpression: "Big radiant laughs into camera.",
      cameraAngle: "Eye level wide."
    },
    proTips: {
      posture: "Heads at different heights create visual harmony.",
      lighting: "Wide ambient coverage.",
      framing: "Medium group shot.",
      expression: "Countdown 3-2-1 and laugh together."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="65" cy="55" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="135" cy="55" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "All in Frame",
        instruction: "Gather all group members into the camera frame.",
        shyTip: "Check everyone is visible on screen.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Form Triangle",
        instruction: "Center person steps forward slightly, others flank on sides.",
        shyTip: "Connect arms or shoulders.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Smile and Hold",
        instruction: "Everyone look at the camera with big smiles!",
        shyTip: "Hold it together.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-campus-stairs",
    mode: "group",
    name: "Staggered Campus Steps",
    category: "Group",
    difficulty: "Beginner",
    vibe: "Youthful & Cohesive",
    framing: "Wide View",
    suitableOutfits: ["college", "casual"],
    suitableStyles: ["college", "birthday", "instagram"],
    description: "Using stairs or varied heights: lower members seated, upper members standing behind. Guarantees every face is clearly visible.",
    referenceImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Tiered seating and standing arrangement.",
      handPlacement: "Casual hands on knees or pockets.",
      legPosition: "Natural seated and standing stances.",
      facialExpression: "Celebratory, energetic smiles.",
      cameraAngle: "Slightly low angle looking up stairs."
    },
    proTips: {
      posture: "Verify that no person's head blocks another.",
      lighting: "Even outdoor shade.",
      framing: "Wide architectural framing.",
      expression: "Camaraderie."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="70" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="130" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="100" cy="80" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "All in Frame",
        instruction: "All members gather in the camera frame.",
        shyTip: "Stagger heights if stairs are available.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Clear Sightlines",
        instruction: "Ensure everyone has a clear view of the camera lens.",
        shyTip: "No overlapping heads.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Group Cheer",
        instruction: "Smile together and hold the group shot!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-arms-over-shoulders",
    mode: "group",
    name: "Line Arms on Shoulders",
    category: "Group",
    difficulty: "Beginner",
    vibe: "Best Friends Unity",
    framing: "Wide View",
    suitableOutfits: ["casual", "college", "western"],
    suitableStyles: ["instagram", "college", "travel"],
    description: "Friends standing side-by-side with arms wrapped over adjacent shoulders. Creates an unbreakable line of camaraderie.",
    referenceImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Side by side line with inner shoulders touching.",
      handPlacement: "Arms wrapped warmly around neighbors' shoulders.",
      legPosition: "Balanced standing stances.",
      facialExpression: "Big radiant laughs into lens.",
      cameraAngle: "Chest level wide."
    },
    proTips: {
      posture: "Lean slightly inward toward group center.",
      lighting: "Bright even lighting.",
      framing: "Wide horizontal crop.",
      expression: "Cheer out loud."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="60" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="100" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="140" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "Line Up in Frame",
        instruction: "Friends line up side by side in the frame.",
        shyTip: "Step into view.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Arms on Shoulders",
        instruction: "Wrap your arms around adjacent friends' shoulders.",
        shyTip: "Tight group connection.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Big Group Smile",
        instruction: "Look at the camera with big smiles and hold!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-tiered-family",
    mode: "group",
    name: "Family Tiered Harmony",
    category: "Group",
    difficulty: "Beginner",
    vibe: "Timeless & Warm",
    framing: "Wide 3/4 View",
    suitableOutfits: ["traditional", "formal", "casual"],
    suitableStyles: ["wedding", "birthday", "professional"],
    description: "The timeless multi-generational family portrait: elders/parents seated in center, standing members arranged flanking behind.",
    referenceImage: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1542037104857-ffbc0b91c73c?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Seated in center, standing members behind in tiered layers.",
      handPlacement: "Hands resting gently on chairs or family shoulders.",
      legPosition: "Proper seated and standing alignment.",
      facialExpression: "Warm timeless family smiles.",
      cameraAngle: "Seated eye level."
    },
    proTips: {
      posture: "Keep heads close together without crowding.",
      lighting: "Soft diffuse lighting avoiding squints.",
      framing: "Classic family portrait composition.",
      expression: "Timeless warmth."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="70" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="65" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="135" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "Family in Frame",
        instruction: "Ensure all family members are visible in the frame.",
        shyTip: "Seated in front, standing behind.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Close Connection",
        instruction: "Gather close together with hands on shoulders or laps.",
        shyTip: "Warm family connection.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Timeless Family Smile",
        instruction: "Everyone look at the camera with warm smiles!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-candid-circle-laugh",
    mode: "group",
    name: "Circle Candid Laugh",
    category: "Group",
    difficulty: "Beginner",
    vibe: "Natural & Spontaneous",
    framing: "Wide View",
    suitableOutfits: ["casual", "college"],
    suitableStyles: ["instagram", "college", "travel"],
    description: "Friends standing in a loose semi-circle sharing laughter, creating an authentic candid memory that feels completely unposed.",
    referenceImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Inward semi-circle angled slightly toward lens.",
      handPlacement: "Casual gestures, cups, or hands in pockets.",
      legPosition: "Relaxed weight shifts.",
      facialExpression: "Spontaneous laughter.",
      cameraAngle: "Eye level."
    },
    proTips: {
      posture: "Keep shoulders open to camera.",
      lighting: "Natural ambient light.",
      framing: "Wide crop.",
      expression: "Talk and laugh naturally."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="65" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="100" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="135" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "Circle Up",
        instruction: "Gather in a loose circle in the camera frame.",
        shyTip: "Angle slightly toward camera.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Laugh Together",
        instruction: "Look at each other and laugh candidly!",
        shyTip: "Genuine smiles.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Candid Moment",
        instruction: "Hold this joyful group moment!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-v-power-formation",
    mode: "group",
    name: "V-Formation Power Squad",
    category: "Group",
    difficulty: "Editorial",
    vibe: "Fierce & Fashion",
    framing: "Wide View",
    suitableOutfits: ["western", "casual", "formal"],
    suitableStyles: ["instagram", "college"],
    description: "Lead person centered at point of the V, companions staggered progressively behind along V wings. High fashion squad power.",
    referenceImage: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Sharp V formation, leader at point.",
      handPlacement: "Power poses: pockets, crossed arms, jackets.",
      legPosition: "Strong shoulder-width stances.",
      facialExpression: "Fierce editorial look.",
      cameraAngle: "Low dramatic angle."
    },
    proTips: {
      posture: "Equal spacing along both arms of V.",
      lighting: "Directional dramatic lighting.",
      framing: "Wide center-weighted.",
      expression: "Unified confidence."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="55" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="65" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="135" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "Form the V",
        instruction: "Center person steps forward; friends stagger behind on left and right.",
        shyTip: "Sharp V-shape formation.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Power Stances",
        instruction: "Everyone take a confident power pose.",
        shyTip: "Hands in pockets or crossed arms.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Squad Power",
        instruction: "Look into the camera with fierce squad confidence!",
        shyTip: "Hold it steady.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-celebration-cheer",
    mode: "group",
    name: "Celebration Arms Up",
    category: "Celebration",
    difficulty: "Beginner",
    vibe: "Euphoric & Triumphant",
    framing: "Wide View",
    suitableOutfits: ["casual", "college", "wedding"],
    suitableStyles: ["wedding", "college", "birthday"],
    description: "Raising arms in triumph with cheers, glasses or bouquets captures the peak high-energy euphoria of weddings or graduations.",
    referenceImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "High energy, bodies turned 15° inward.",
      handPlacement: "Arms raised overhead cheering.",
      legPosition: "Celebratory dynamic stance.",
      facialExpression: "Ecstatic cheering and open laughter.",
      cameraAngle: "Waist level wide."
    },
    proTips: {
      posture: "Raise arms with enthusiasm.",
      lighting: "Bright festive light.",
      framing: "Wide landscape.",
      expression: "Cheer out loud together."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="100" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <polyline points="75,45 60,15" stroke="#c5a880" stroke-width="2.5" fill="none"/>
      <polyline points="125,45 140,15" stroke="#c5a880" stroke-width="2.5" fill="none"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "All Together",
        instruction: "Everyone gather together in frame.",
        shyTip: "Stand close.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Raise Arms",
        instruction: "Raise arms overhead in celebration!",
        shyTip: "Cheer and celebrate.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold the Cheer",
        instruction: "Hold this celebratory triumph!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  },

  {
    id: "group-sitting-floor-couch",
    mode: "group",
    name: "Living Room Tiered Cozy",
    category: "Group",
    difficulty: "Beginner",
    vibe: "Intimate & Relaxed",
    framing: "Wide View",
    suitableOutfits: ["casual", "western"],
    suitableStyles: ["birthday", "instagram"],
    description: "Cosy indoor gathering: some friends seated on floor leaning back against couch, others seated above on couch.",
    referenceImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    finalShotImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    poseBreakdown: {
      bodyPosition: "Multi-tiered living room casual layout.",
      handPlacement: "Casual hands on knees or resting on cushions.",
      legPosition: "Cross-legged floor and seated couch stances.",
      facialExpression: "Warm, authentic smiles.",
      cameraAngle: "Tripod eye level."
    },
    proTips: {
      posture: "Keep heads close in frame.",
      lighting: "Warm cozy indoor ambient.",
      framing: "Wide crop.",
      expression: "Comfortable friend vibes."
    },
    svgGuide: `<svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" class="pose-svg">
      <circle cx="75" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="125" cy="45" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <circle cx="100" cy="75" r="14" fill="none" stroke="currentColor" stroke-width="2.5"/>
    </svg>`,
    idealAlignment: { shoulderAngleTolerance: 20, centerOffsetMax: 0.30 },
    steps: [
      {
        stepNumber: 1,
        title: "All in Frame",
        instruction: "Everyone gather in the camera view.",
        shyTip: "Sit close together.",
        targetCondition: { type: "group_members_present" }
      },
      {
        stepNumber: 2,
        title: "Tiered Positions",
        instruction: "Ensure everyone has a clear view of the camera.",
        shyTip: "Relax your posture.",
        targetCondition: { type: "couple_close_together" }
      },
      {
        stepNumber: 3,
        title: "Hold Cozy Group",
        instruction: "Smile warmly together and hold!",
        shyTip: "Hold it.",
        targetCondition: { type: "hold_pose", durationMs: 1200 }
      }
    ]
  }
];

// Helper Functions
function getPosesByMode(mode) {
  if (!mode || mode === "all") return POSE_DATABASE;
  return POSE_DATABASE.filter(p => p.mode === mode);
}

function getPosesByFilter(mode, outfit, style) {
  return POSE_DATABASE.filter(p => {
    const matchMode = !mode || mode === "all" || p.mode === mode;
    const matchOutfit = !outfit || !p.suitableOutfits || p.suitableOutfits.includes(outfit);
    const matchStyle = !style || !p.suitableStyles || p.suitableStyles.includes(style);
    return matchMode && matchOutfit && matchStyle;
  });
}

function getPoseById(id) {
  return POSE_DATABASE.find(p => p.id === id) || POSE_DATABASE[0];
}

function getRandomUnseenPose(mode, recentIds = []) {
  const candidates = getPosesByMode(mode).filter(p => !recentIds.includes(p.id));
  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  const allMode = getPosesByMode(mode);
  return allMode[Math.floor(Math.random() * allMode.length)] || POSE_DATABASE[0];
}

const fileHeader = `/**
 * PoseMate AI - Pose Catalog & Guidance Database
 * Comprehensive diverse catalog of 42 curated photography poses:
 * - 22 Solo Poses (Standing, Hands on Hips, Arms Crossed, Hair Touch, Over Shoulder, Walking, Wall Lean, Seated, Candid, Fashion, Close-ups)
 * - 12 Couple Poses (Side-by-side, Eye Contact, Forehead Touch, Walking, Shoulder Hug, Back-to-Back, Twirl, Bench, etc.)
 * - 8 Group Poses (Triangle Huddle, Campus Stairs, Arms on Shoulders, Tiered Family, Squad V-formation, etc.)
 * Each equipped with genuine photography reference, final shot examples, short modern instructions, and measurable real-time landmark target conditions.
 */

const POSE_DATABASE = `;

const fileFooter = `;

// Helper Utility Functions
function getPosesByMode(mode) {
  if (!mode || mode === "all") return POSE_DATABASE;
  return POSE_DATABASE.filter(p => p.mode === mode);
}

function getPosesByFilter(mode, outfit, style) {
  return POSE_DATABASE.filter(p => {
    const matchMode = !mode || mode === "all" || p.mode === mode;
    const matchOutfit = !outfit || !p.suitableOutfits || p.suitableOutfits.includes(outfit);
    const matchStyle = !style || !p.suitableStyles || p.suitableStyles.includes(style);
    return matchMode && matchOutfit && matchStyle;
  });
}

function getPoseById(id) {
  return POSE_DATABASE.find(p => p.id === id) || POSE_DATABASE[0];
}

function getRandomUnseenPose(mode, recentIds = []) {
  const candidates = getPosesByMode(mode).filter(p => !recentIds.includes(p.id));
  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }
  const allMode = getPosesByMode(mode);
  return allMode[Math.floor(Math.random() * allMode.length)] || POSE_DATABASE[0];
}

// Export for both browser and Node/worker environments
if (typeof window !== "undefined") {
  window.POSE_DATABASE = POSE_DATABASE;
  window.getPosesByMode = getPosesByMode;
  window.getPosesByFilter = getPosesByFilter;
  window.getPoseById = getPoseById;
  window.getRandomUnseenPose = getRandomUnseenPose;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    POSE_DATABASE,
    getPosesByMode,
    getPosesByFilter,
    getPoseById,
    getRandomUnseenPose
  };
}
`;

fs.writeFileSync('poseData.js', fileHeader + JSON.stringify(POSE_DATABASE, null, 2) + fileFooter, 'utf8');
console.log('Successfully generated 42 poses with measurable landmark conditions in poseData.js!');
