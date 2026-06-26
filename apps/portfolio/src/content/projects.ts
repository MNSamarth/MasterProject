export type CaseStudySection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  imageSrc?: string;
  year?: string;
  stack?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  demoUrl?: string;
  caseStudy?: {
    challenge: string;
    approach: string;
    outcome: string;
    sections?: CaseStudySection[];
  };
  metrics?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "promptquest",
    title: "PromptQuest",
    summary:
      "Real-time prompt-engineering game with structured evaluation, instant feedback, and dynamic scoring. Won 1st Place at Vercel Software Awards (Good Vibes Only Buildathon).",
    year: "2026",
    stack: ["Next.js", "Full-Stack", "LLM Integration", "Cloud Deployment"],
    repoUrl: "https://github.com/MNSamarth/PromptQuest",
    liveUrl: "https://prompt-quest-theta.vercel.app/",
    imageSrc: "/images/PromptQuest.png",
    featured: true,
    caseStudy: {
      challenge:
        "Teaching prompt engineering is hard — the feedback loop is too slow. Users write a prompt, wait for an LLM response, and only then realize if their framing was off. The gap between intent and output is opaque.",
      approach:
        "Built a game loop where each round presents a target output and lets users iterate their prompts in real-time. An LLM judge scores structural clarity, specificity, and constraint coverage — not just output similarity. Dynamic difficulty ramps up contextual constraints as players improve.",
      outcome:
        "Won 1st Place at Vercel's 'Good Vibes Only Buildathon.' Players reported a genuine 'aha' moment about prompt structure in under 5 minutes of play — something a tutorial couldn't deliver.",
      sections: [
        {
          heading: "Why a game?",
          body: "Documentation teaches syntax. Games teach intuition. The scoring loop forces you to articulate *why* a prompt fails rather than just rewriting it blindly. That friction is intentional.",
        },
        {
          heading: "LLM Judge Design",
          body: "The judge prompt is multi-criteria: it evaluates specificity (did you scope the task?), constraint satisfaction (did you honor the rules?), and tone calibration. Each criterion is weighted separately so the feedback points to the exact weakness.",
        },
      ],
    },
    metrics: [
      { value: "1st", label: "Vercel Buildathon" },
      { value: "<5m", label: "Time to insight" },
      { value: "3", label: "Evaluation axes" },
    ],
  },
  {
    slug: "eventsearch",
    title: "EventSearch",
    summary:
      "Location-aware event discovery with fast filtering and scalable REST APIs, designed for low-latency browsing and clean data modeling.",
    year: "2025",
    stack: ["React", "Node.js", "REST APIs", "Cloud Deployment", "Docker"],
    repoUrl: "https://github.com/MNSamarth/EventSearch",
    imageSrc: "/images/EventSearch.png",
    featured: true,
    caseStudy: {
      challenge:
        "Event discovery apps suffer from noisy data and slow filters. A search for 'concerts near me this weekend' returns everything from jazz festivals to corporate happy hours. Useful filtering requires both geospatial queries and category hierarchies working in concert.",
      approach:
        "Designed the API layer first — clean resource modeling for events, venues, and time windows. Geospatial indexing handles radius search in O(log n). The frontend is a minimal React SPA with a filtering UX that doesn't bury the user in options.",
      outcome:
        "Sub-200ms API responses for filtered location queries. Clean separation between backend logic and frontend display state made the mobile view straightforward to bolt on.",
      sections: [
        {
          heading: "API Design Choices",
          body: "Used cursor-based pagination instead of offset pagination — offset breaks with live data as events get added mid-browse. Cursor gives consistent results and is cheaper to implement server-side.",
        },
        {
          heading: "Deployment",
          body: "Containerized with Docker and deployed to GCP App Engine for both frontend and backend, with separate scaling policies. The backend cold-start time was the main latency risk, mitigated by keeping instances warm.",
        },
      ],
    },
    metrics: [
      { value: "<200ms", label: "API response time" },
      { value: "Docker", label: "Containerized" },
      { value: "GCP", label: "Deployed on" },
    ],
  },
  {
    slug: "isl-recognition",
    title: "Indian Sign Language Recognition",
    summary:
      "Real-time ISL alphabet/word recognition using a lightweight CV pipeline + CNN, optimized for reliability on consumer webcams.",
    stack: ["Python", "TensorFlow/Keras", "OpenCV", "MediaPipe", "Flask"],
    repoUrl: "https://github.com/MNSamarth/ISL-Interpreter",
    imageSrc: "/images/ISL.png",
    featured: true,
    caseStudy: {
      challenge:
        "Sign language interpreters are expensive and scarce. ISL (Indian Sign Language) has a distinct gesture set with regional variation, and existing models trained on ASL transfer poorly. Consumer webcam variation — lighting, background noise, hand size — makes real-time inference brittle.",
      approach:
        "Used MediaPipe Hands to extract 21 landmark keypoints per frame, eliminating raw pixel dependence and making the model invariant to skin tone and background. Trained a lightweight CNN on keypoint sequences — not images. This cut inference time by 4x vs image-based approaches.",
      outcome:
        "Achieved 94%+ accuracy on ISL alphabet recognition in varied lighting. Word-level prediction (ISL words are full gestures, not letter-spelled) reached 89% with a sliding window over landmark sequences.",
      sections: [
        {
          heading: "Why Keypoints Over Images",
          body: "Image-based models overfit to training backgrounds and fail under different lighting. Keypoints are a structural abstraction — the model learns gesture shape, not pixel patterns. This made the system usable on cheap webcams without special setup.",
        },
        {
          heading: "Word vs Letter Recognition",
          body: "ISL has a full vocabulary of gestures that aren't finger-spelled. I trained two separate models: one for the alphabet (static hand shapes) and one for common words (gesture sequences over time). The web app switches between them based on mode.",
        },
      ],
    },
    metrics: [
      { value: "94%+", label: "Alphabet accuracy" },
      { value: "89%", label: "Word accuracy" },
      { value: "4×", label: "Faster than image-based" },
    ],
  },
  {
    slug: "anpr",
    title: "Automatic Number Plate Recognition",
    summary:
      "Plate detection, perspective stabilization, character segmentation, and OCR with post-processing for Indian regional formats.",
    stack: ["Python", "OpenCV", "EasyOCR", "NumPy"],
    repoUrl: "https://github.com/MNSamarth/Automated-Number-Plate-Detection",
    imageSrc: "/images/ANPR.jpg",
    featured: true,
    caseStudy: {
      challenge:
        "Indian number plates are non-uniform — different states use different fonts, plate sizes, and reflective coatings. Variable lighting (direct sun, night, rain) destroys OCR accuracy if you feed raw frames directly.",
      approach:
        "Built a preprocessing pipeline: detect plate contour → apply perspective transform → normalize brightness → segment characters. Used EasyOCR on processed crops instead of raw frames. Post-processing applies regex patterns for Indian state codes to filter garbage outputs.",
      outcome:
        "Reliable recognition across day/night conditions and multiple plate formats. The perspective correction step alone raised accuracy by ~22% on angled captures — the most common real-world failure case.",
      sections: [
        {
          heading: "Perspective Stabilization",
          body: "A plate photographed at an angle has trapezoidal distortion. Detect the four corners of the plate region, compute the homography to a canonical rectangle, and warp before OCR. This is classical CV but often skipped — and it's the single biggest accuracy win.",
        },
        {
          heading: "Post-processing Regex",
          body: "EasyOCR returns noisy text. Indian plates follow a format: 2-letter state code + 2-digit district + 1-2 letters + 4 digits. Applying this pattern as a regex filter eliminates false positives like partial plate reads or background text.",
        },
      ],
    },
    metrics: [
      { value: "22%", label: "Accuracy gain from perspective fix" },
      { value: "Multi-state", label: "Format support" },
      { value: "Real-time", label: "Video processing" },
    ],
  },
  {
    slug: "automail-ai",
    title: "AutoMail AI",
    summary:
      "Context-aware email drafting with templates, tone controls, and fast iteration — designed to produce human-sounding drafts.",
    stack: ["Python", "Flask", "NLP", "SMTP"],
    repoUrl: "https://github.com/MNSamarth/Automatic-Mail-Generator-and-Sender-AI",
    imageSrc: "/images/AutomailAI.png",
    caseStudy: {
      challenge:
        "Composing professional emails from scratch is slow, especially for recurring patterns (follow-ups, cold outreach, status updates). Generic templates feel generic. The goal was drafts that sound like the user, not like a template.",
      approach:
        "Built a Flask app where users describe the email's intent, recipient context, and desired tone. The NLP layer adapts vocabulary and sentence structure based on tone settings (formal / casual / assertive). Integrated SMTP for one-click send after review.",
      outcome:
        "Drafts that require minimal editing. The tone calibration was the key differentiator — users reported the formal/casual axis made the biggest perceptual difference in output quality.",
    },
  },
  {
    slug: "stockoporto",
    title: "StockOPorto",
    summary:
      "Portfolio exploration with readable charts for drawdowns/risk and simple what-if scenarios, built for clarity over jargon.",
    stack: ["Python", "Pandas", "Matplotlib", "yfinance"],
    repoUrl: "https://github.com/MNSamarth/Stock-Portfolio-and-Prediction-StockoPorto",
    imageSrc: "/images/StockOPorto.png",
    caseStudy: {
      challenge:
        "Most portfolio tools drown users in financial jargon. Sharpe ratio, max drawdown, beta — these are useful metrics, but meaningless without intuition. The goal was a tool a non-finance person could use to understand portfolio risk.",
      approach:
        "Focused on two views: drawdown visualization (how much did this lose at worst?) and what-if comparisons (what if I had rebalanced monthly?). Stripped everything else. Readable Matplotlib charts with annotated worst-case periods.",
      outcome:
        "A tool that answers the two questions most retail investors actually have: 'how badly did this portfolio get hurt?' and 'would a different allocation have helped?'",
    },
  },
  {
    slug: "template-matching",
    title: "Template Matching",
    summary:
      "Compact demonstration of classical pattern search with swappable templates, thresholds, and false-positive inspection.",
    stack: ["Python", "OpenCV", "NumPy"],
    imageSrc: "/images/BorderMatching.png",
    caseStudy: {
      challenge:
        "Used as a baseline comparison for a Samsung PRISM internship project on UI/camera image validation. Needed a clean reference implementation to measure how much deep learning added over classical CV.",
      approach:
        "Pure OpenCV template matching with multi-scale search and NMS (non-maximum suppression) to avoid duplicate detections. Configurable threshold slider for interactive exploration of precision/recall tradeoffs.",
      outcome:
        "Established a clear performance ceiling for classical methods, justifying the shift to learned feature matching for the internship deliverable.",
    },
  },
  {
    slug: "easydine",
    title: "EasyDine — Restaurant Reservation System",
    summary:
      "Straightforward CRUD for managing tables/timeslots with conflict visibility and quick edits on a maintainable full-stack.",
    stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    repoUrl: "https://github.com/MNSamarth/Restaurant-Reservation-System-EasyDine",
    imageSrc: "/images/EasyDine.png",
    demoUrl: "/demo/easydine/index.html",
    caseStudy: {
      challenge:
        "Restaurant reservation systems are often over-engineered or under-featured. The real problem is simple: staff need to see at a glance which tables are free at what time, book a slot, and edit it without hunting through forms.",
      approach:
        "Built a PHP/MySQL CRUD system with a visual timeslot grid as the primary interface — not a form-first UX. Conflict detection is server-side; the UI reflects availability in real-time after each action. Minimal JavaScript, maximum clarity.",
      outcome:
        "A usable system that a restaurant owner could hand to any staff member with zero training. The visual grid interface reduced booking errors to near zero in testing.",
      sections: [
        {
          heading: "Design Philosophy",
          body: "The interface prioritizes the most common action (check availability) over the least common (add a new restaurant). The main view is the timeslot grid. Everything else is two clicks away.",
        },
        {
          heading: "Live Demo",
          body: "The demo below shows the frontend UI. The full system includes PHP backend + MySQL for real-time reservation management, login/auth, and conflict detection.",
        },
      ],
    },
    metrics: [
      { value: "Zero", label: "Booking conflicts in testing" },
      { value: "PHP+MySQL", label: "Stack" },
      { value: "Multi-restaurant", label: "Support" },
    ],
  },
];
