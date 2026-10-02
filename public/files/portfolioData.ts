export interface LongFormProject {
  id: string;
  title: string;
  category: 'faceless' | 'motion-graphics' | 'retention' | 'podcasts' | 'commercial' | 'talking-head';
  categoryLabel: string;
  client: string;
  duration: string;
  views: string;
  retention: string;
  thumbnail: string;
  videoUrl?: string; // YouTube URL, Vimeo URL, or direct MP4 link
  description: string;
  software: string[];
  retentionPoints: { time: string; retention: number; note: string }[];
  soundStems: string[];
  keyPacingTechniques: string[];
  colorGradingProfile: string;
}

export interface ShortFormProject {
  id: string;
  title: string;
  category: 'viral-hooks' | 'talking-head' | 'faceless-reels' | 'motion-shorts' | 'podcast' | 'ads';
  categoryLabel: string;
  platform: 'YouTube Shorts' | 'Instagram Reels' | 'TikTok';
  views: string;
  hookRate: string;
  completionRate: string;
  likes: string;
  thumbnail: string;
  videoUrl?: string; // YouTube Shorts URL, TikTok/Reel link, or direct MP4
  soundtrack: string;
  captionsStyle: string;
  hookHeadline: string;
  pacingSecondsPerCut: string;
  colorTheme: string;
  breakdown: string;
}

export const LONG_FORM_PROJECTS: LongFormProject[] = [
  {
    id: 'bentilla-tiktok-career',
    title: 'Bentilla: Build A Successful Career On TikTok',
    category: 'faceless',
    categoryLabel: 'Faceless / Documentary',
    client: 'Bentilla · Creator Case Study',
    duration: '14:28',
    views: '2.8M',
    retention: '84.6%',
    thumbnail: 'https://img.youtube.com/vi/mBUYgVUABCQ/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/mBUYgVUABCQ?si=WjFrS5I9_PKzlgSM',
    description: 'High-production faceless documentary dissecting the algorithmic mechanics, content pacing systems, and audience psychology behind building a multi-million-view creator career on TikTok.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:45', retention: 94, note: 'Sensory psychological cold-open hook with heartbeat sound design' },
      { time: '3:15', retention: 88, note: 'Pattern interrupt: 3D algorithmic breakdown fly-through' },
      { time: '8:40', retention: 83, note: 'Retention crescendo & pacing speed ramp' },
      { time: '13:00', retention: 79, note: 'Actionable monetization framework reveal' }
    ],
    soundStems: ['Bespoke Cinematic Sub Risers', 'Analog Foley Stems', 'Interface Glitch Accents', 'Deep Bass Drops'],
    keyPacingTechniques: ['Sub-2.2s average cut pacing', 'Sensory cold-open retention lock', 'Visual pattern interrupt every 6 seconds', 'BPM-matched beat transitions'],
    colorGradingProfile: 'Atmospheric high-contrast documentary grade with warm tungsten skin tones and deep black contrast'
  },
  {
    id: 'america-comparison',
    title: 'America Comparison In Two Completely Different Sections',
    category: 'faceless',
    categoryLabel: 'Faceless / Documentary',
    client: 'SocioEconomic Insights',
    duration: '18:40',
    views: '3.4M',
    retention: '81.2%',
    thumbnail: 'https://img.youtube.com/vi/_lz49lfgOwM/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/_lz49lfgOwM?si=SViUgZ_sTB1KKqvF',
    description: 'High-production investigative documentary contrasting socioeconomic divide, housing economics, and demographic shifts across American regions with archival 3D parallax and dynamic data mapping.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:40', retention: 93, note: 'Cold-open contrast hook juxtaposing wealth extremes' },
      { time: '5:20', retention: 85, note: 'Animated 3D regional infographic map reveal' },
      { time: '11:15', retention: 81, note: 'Mid-roll pacing reset with bass drop sound design' },
      { time: '16:50', retention: 77, note: 'Climactic policy breakdown synthesis' }
    ],
    soundStems: ['Analog Foley Stems', 'Cinematic String Drones', 'Subtle Mechanical Risers', 'Deep Sub Drops'],
    keyPacingTechniques: ['Rapid 2.1s visual cut speed', 'Dynamic split-screen contrast wipes', 'Micro audio cues every 5 seconds'],
    colorGradingProfile: 'Kodak 5219 film emulation with warm amber highlights and clean shadow separation'
  },
  {
    id: 'hackney-incident',
    title: 'Factory Of The Hackney Incident Explained In Detail',
    category: 'faceless',
    categoryLabel: 'Faceless / Documentary',
    client: 'Crime & Industry Chronicles',
    duration: '16:22',
    views: '1.9M',
    retention: '79.8%',
    thumbnail: 'https://img.youtube.com/vi/aqO4gxpYOBw/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/aqO4gxpYOBw?si=9jEfTl-B6XksYK5L',
    description: 'Gripping investigative deep-dive reconstructing the dramatic sequence of events at Hackney factory with suspenseful sound design, archival crime dossier unfoldings, and architectural 3D camera sweeps.',
    software: ['Premiere Pro', 'After Effects', 'Photoshop', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:35', retention: 95, note: 'Emergency dispatch audio opening with heart-rate monitor foley' },
      { time: '4:10', retention: 86, note: 'Blueprint floor plan 3D camera fly-through' },
      { time: '9:45', retention: 82, note: 'Key timeline turning point with high-tension drone swell' },
      { time: '14:30', retention: 76, note: 'Official inquiry document reveal' }
    ],
    soundStems: ['Police Scanner Foley', 'Sub Drone Tension Swells', 'Industrial Clangs', 'Heartbeat Pulses'],
    keyPacingTechniques: ['Suspense-driven pacing escalation', '2.5D archival photograph camera projection', 'Pattern interrupt audio drops'],
    colorGradingProfile: 'Moody desaturated industrial noir with cold steel cyan and tungsten highlights'
  },
  {
    id: 'neet-paper-leak',
    title: 'NEET 2026 Paper Leak Incident Explained In Detail',
    category: 'talking-head',
    categoryLabel: 'Talking Head / Documentary',
    client: 'Investigative Academy',
    duration: '22:15',
    views: '4.1M',
    retention: '83.5%',
    thumbnail: 'https://img.youtube.com/vi/777JzVWccOQ/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/777JzVWccOQ?si=7Vpumg_C_JvoOUy_',
    description: 'Hard-hitting journalistic breakdown combining dynamic on-camera presenter delivery with animated leaked paper evidence, investigative timeline flowcharts, and high-stakes courtroom audio textures.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'iZotope RX 10'],
    retentionPoints: [
      { time: '0:00 - 0:50', retention: 96, note: 'Provocative question hook with breaking-news lower third' },
      { time: '6:15', retention: 89, note: 'Confidential paper leak highlight with yellow marker animation' },
      { time: '13:40', retention: 84, note: 'Whistleblower audio waveform visualization' },
      { time: '19:10', retention: 80, note: 'Systemic conclusion and call to accountability' }
    ],
    soundStems: ['Camera Shutter Glitches', 'Subtle Newsroom Ambience', 'Dramatic String Risers', 'Tactile Paper Foley'],
    keyPacingTechniques: ['Dynamic crop punch-ins on emphasis words', 'Continuous visual evidence overlays', 'Zero dead air vocal cleanup'],
    colorGradingProfile: 'Crisp broadcast standard Rec709 with vibrant accent glows and isolated presenter skin tones'
  },
  {
    id: 'job-trap-motion',
    title: 'The Job Trap Motion | How To Get Out Of It',
    category: 'motion-graphics',
    categoryLabel: 'Talking Head & Motion',
    client: 'Career Architecture',
    duration: '12:50',
    views: '2.3M',
    retention: '86.4%',
    thumbnail: 'https://img.youtube.com/vi/ANK4pBgDdRM/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/ANK4pBgDdRM?si=iQjICO-NTRFxIp6o',
    description: 'Fast-paced career psychology masterclass engineered with 3D isometric kinetic typography, corporate ladder visual metaphors, dynamic camera zooms, and dopamine-reward audio design.',
    software: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'Illustrator'],
    retentionPoints: [
      { time: '0:00 - 0:30', retention: 97, note: 'Hamster wheel kinetic 3D loop with wake-up alarm sound cue' },
      { time: '3:45', retention: 91, note: 'Animated net worth & tax calculator comparison' },
      { time: '7:20', retention: 87, note: 'Escape matrix step-by-step kinetic flowchart' },
      { time: '11:00', retention: 83, note: 'Actionable 90-day transition blueprint summary' }
    ],
    soundStems: ['Cash Register Chimes', 'Mechanical Clock Ticks', 'Satisfying Whoosh Swells', 'Smooth Bass Glides'],
    keyPacingTechniques: ['Sub-1.8s average shot rhythm', 'Kinetic typography word highlights', 'Split-screen path comparisons'],
    colorGradingProfile: 'Punchy high-contrast modern commercial grade with bold amber and emerald accents'
  },
  {
    id: 'dubai-uk-salaries',
    title: 'What Is The Difference Between Dubai And United Kingdom Salaries',
    category: 'motion-graphics',
    categoryLabel: 'Faceless / Motion Graphics',
    client: 'Global Wealth Compass',
    duration: '15:10',
    views: '3.7M',
    retention: '82.9%',
    thumbnail: 'https://img.youtube.com/vi/8A3w1Des9aY/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/8A3w1Des9aY?si=sjoY7oKnu-7Ac9Z7',
    description: 'Bespoke comparative financial documentary breaking down net take-home pay, 0% income tax versus UK progressive tax bands, cost of living indices, and luxury purchasing power with 3D charts.',
    software: ['Premiere Pro', 'After Effects', 'Blender', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:40', retention: 94, note: 'Shocking tax breakdown side-by-side visual hook' },
      { time: '4:50', retention: 88, note: 'Interactive London vs Dubai rent heat-map animation' },
      { time: '9:15', retention: 83, note: 'Hidden expenditure comparison: Healthcare & Schooling' },
      { time: '13:30', retention: 79, note: 'Final verdict: Exact salary multiplier required to move' }
    ],
    soundStems: ['Subtle Airport Chimes', 'Currency Stamp Foley', 'Digital Ticker Clicks', 'Lush Warm Piano Melodies'],
    keyPacingTechniques: ['Dynamic side-by-side currency match-cuts', 'Speed-ramped city drone transitions', 'Micro-chart popups every 4s'],
    colorGradingProfile: 'Golden hour desert warm tones contrasted against London cool steel overcast curves'
  },
  {
    id: 'downfall-prime-beverages',
    title: 'The Crazy Downfall Of Prime Beverages',
    category: 'motion-graphics',
    categoryLabel: 'Faceless / Motion Graphics',
    client: 'Brand Autopsy',
    duration: '17:35',
    views: '5.2M',
    retention: '87.1%',
    thumbnail: 'https://img.youtube.com/vi/Zi_fHjK1HMg/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/Zi_fHjK1HMg?si=8NHcrpJ4eCbtOHwK',
    description: 'Meticulously paced business documentary tracking the meteoric rise and subsequent retailer inventory collapse of Logan Paul & KSI’s Prime Drink with 3D bottle simulations and viral marketing breakdowns.',
    software: ['Premiere Pro', 'After Effects', 'Cinema 4D', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:35', retention: 98, note: 'Black-market price frenzy opening montages ($100 per bottle)' },
      { time: '5:10', retention: 92, note: '3D animated retail shelf inventory crash diagram' },
      { time: '10:45', retention: 87, note: 'Wholesale distributor bankruptcy document reveal' },
      { time: '15:20', retention: 84, note: 'Marketing psychology autopsy: Why artificial scarcity failed' }
    ],
    soundStems: ['Viral Notification Pings', 'Crowd Screams & Foley', 'Dramatic Glitch Risers', 'Heavy Bass Thuds'],
    keyPacingTechniques: ['High-velocity 1.2s hook pacing', '3D bottle liquid splash match-cuts', 'Sound effects synced to every metric change'],
    colorGradingProfile: 'Vibrant neon beverage brand palette with punchy HDR-style highlights and deep shadow saturation'
  }
];

export const SHORT_FORM_PROJECTS: ShortFormProject[] = [
  {
    id: 'short-ai-takeover',
    title: 'The AI Took over Explained With Motion Graphics',
    category: 'motion-shorts',
    categoryLabel: 'Faceless · Motion Graphics',
    platform: 'YouTube Shorts',
    views: '4.8M',
    hookRate: '96.8%',
    completionRate: '89.4%',
    likes: '412K',
    thumbnail: 'https://img.youtube.com/vi/889HADnzKhU/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/889HADnzKhU?si=S-UY9yg5CMer2ZWa',
    soundtrack: 'Sub-bass cinematic pulse & digital data whoosh',
    captionsStyle: 'Kinetic 3D typography with high-contrast amber glows',
    hookHeadline: 'THE AI TAKEOVER IS ALREADY HERE',
    pacingSecondsPerCut: '0.9s',
    colorTheme: 'from-amber-500/20 to-cyan-500/30',
    breakdown: 'High-retention faceless motion graphics breakdown with 3D neural net visualizations, speed ramps, and seamless audio sound design that hooked 96.8% of viewers in the first 3 seconds.'
  },
  {
    id: 'short-barbers-250k',
    title: 'How Barbers Are Making 250k$ Per Month',
    category: 'talking-head',
    categoryLabel: 'Talking Head',
    platform: 'YouTube Shorts',
    views: '2.9M',
    hookRate: '93.4%',
    completionRate: '82.1%',
    likes: '248K',
    thumbnail: 'https://img.youtube.com/vi/9KVvtcAuNCU/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/9KVvtcAuNCU?si=QVPl5-CdkPYpEAP1',
    soundtrack: 'Upbeat modern hip-hop groove with subtle hi-hats',
    captionsStyle: 'Hormozi-style dynamic word punch-in with emerald money badges',
    hookHeadline: 'THE $250K/MO BARBER BUSINESS MODEL',
    pacingSecondsPerCut: '1.2s',
    colorTheme: 'from-emerald-500/20 to-zinc-900/60',
    breakdown: 'Punchy business breakdown engineered with micro-zooms on key numbers, animated profit breakdown charts, and seamless audio pacing.'
  },
  {
    id: 'short-house-marketing-vs-agency',
    title: 'Is Built House Social Media Marketing Cheaper Than Hiring An Agency',
    category: 'talking-head',
    categoryLabel: 'Talking Head',
    platform: 'YouTube Shorts',
    views: '1.8M',
    hookRate: '91.6%',
    completionRate: '79.8%',
    likes: '162K',
    thumbnail: 'https://img.youtube.com/vi/NZAVpHnKQ2o/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/NZAVpHnKQ2o?si=UR51kesyFH8COYou',
    soundtrack: 'Deep analog synth drone with tactile foley taps',
    captionsStyle: 'Clean corporate editorial sans with animated checkmark highlights',
    hookHeadline: 'AGENCY VS IN-HOUSE: THE REAL COST',
    pacingSecondsPerCut: '1.3s',
    colorTheme: 'from-blue-500/20 to-zinc-900/60',
    breakdown: 'Side-by-side cost matrix breakdown, rapid crop punch-ins for conversational punch, and engaging visual comparison cards.'
  },
  {
    id: 'short-separate-creators',
    title: 'The Most Important Thing Which Seperate Creators',
    category: 'talking-head',
    categoryLabel: 'Talking Head',
    platform: 'YouTube Shorts',
    views: '3.5M',
    hookRate: '94.9%',
    completionRate: '85.2%',
    likes: '318K',
    thumbnail: 'https://img.youtube.com/vi/KDHQPOEK-_M/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/KDHQPOEK-_M?si=2QzyCSjfrCLP_EuL',
    soundtrack: 'Inspiring cinematic piano swell with low-end risers',
    captionsStyle: 'High-velocity kinetic font with amber word emphasis',
    hookHeadline: 'WHAT ACTUALLY SEPARATES TOP 1% CREATORS',
    pacingSecondsPerCut: '1.1s',
    colorTheme: 'from-amber-500/20 to-orange-600/30',
    breakdown: 'High-engagement mindset breakdown with zero dead air, animated quote overlays, and punchy zoom cuts that maintained 85.2% average completion.'
  },
  {
    id: 'short-amiriam-home-tiles',
    title: 'Amiriam Home The Best Tiles Manufacturer In Europe',
    category: 'talking-head',
    categoryLabel: 'Talking Head',
    platform: 'YouTube Shorts',
    views: '1.4M',
    hookRate: '90.8%',
    completionRate: '81.5%',
    likes: '125K',
    thumbnail: 'https://img.youtube.com/vi/9sR_JzyUEtM/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/9sR_JzyUEtM?si=QjKjaH4NJ-Pfdkjm',
    soundtrack: 'Sleek European architectural ambient rhythm',
    captionsStyle: 'Minimal luxury typographic subtitles with marble accents',
    hookHeadline: 'EUROPE TOP TILE CRAFTSMANSHIP',
    pacingSecondsPerCut: '1.4s',
    colorTheme: 'from-zinc-400/20 to-zinc-900/60',
    breakdown: 'Brand documentary short blending crisp architectural factory b-roll, luxury product zooms, and authority-building narrative timing.'
  },
  {
    id: 'short-what-creators-dont-understand',
    title: 'What Most Creators Don\'t Understand',
    category: 'talking-head',
    categoryLabel: 'Talking Head',
    platform: 'YouTube Shorts',
    views: '2.7M',
    hookRate: '93.7%',
    completionRate: '84.3%',
    likes: '230K',
    thumbnail: 'https://img.youtube.com/vi/r14_a69ECTc/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/r14_a69ECTc?si=j_RpMkuc_gKltH_5',
    soundtrack: 'Tense rhythmic beat with pattern interrupt glitch sounds',
    captionsStyle: 'Bold condensed Grotesk with pulsating yellow highlight',
    hookHeadline: 'THE HARSH TRUTH ABOUT ALGORITHMS',
    pacingSecondsPerCut: '1.0s',
    colorTheme: 'from-red-500/20 to-amber-600/30',
    breakdown: 'Pattern interrupt cold-open, retention graph overlays, and rhythmic pacing cuts that eliminate pauses and maximize viewer watch time.'
  },
  {
    id: 'short-popcorn-trap',
    title: 'The Popcorn Trap Cinema Houses Do To You',
    category: 'talking-head',
    categoryLabel: 'Talking Head',
    platform: 'YouTube Shorts',
    views: '5.4M',
    hookRate: '97.5%',
    completionRate: '89.8%',
    likes: '492K',
    thumbnail: 'https://img.youtube.com/vi/IQkk-3_rp6g/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/IQkk-3_rp6g?si=Xy3ZY8uR2RRy3-u_',
    soundtrack: 'Playful mystery groove with pop & click foley sound design',
    captionsStyle: 'Pop-up 3D price tags with color contrast psychology',
    hookHeadline: 'THE DECOY EFFECT IN MOVIE THEATERS',
    pacingSecondsPerCut: '0.9s',
    colorTheme: 'from-amber-400/20 to-red-500/30',
    breakdown: 'Viral consumer psychology case study: animated 3D popcorn size comparisons, price anchor breakdowns, and irresistible comedic pacing.'
  },
  {
    id: 'short-why-difficult-to-start',
    title: 'Why Things Seem Difficult To Start And How To Avoid It',
    category: 'podcast',
    categoryLabel: 'Podcast',
    platform: 'YouTube Shorts',
    views: '2.3M',
    hookRate: '92.5%',
    completionRate: '82.0%',
    likes: '205K',
    thumbnail: 'https://img.youtube.com/vi/uL8fDlyXA90/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/uL8fDlyXA90?si=yVOzABS14aJr6_Ng',
    soundtrack: 'Warm lo-fi tape atmosphere with subtle acoustic chords',
    captionsStyle: 'Smooth fading serif captions with gold emphasis',
    hookHeadline: 'WHY STARTING FEELS IMPOSSIBLE',
    pacingSecondsPerCut: '1.5s',
    colorTheme: 'from-purple-500/20 to-indigo-900/60',
    breakdown: 'High-intimacy podcast clip with studio-grade vocal leveling, smooth b-roll match cuts, and an emotionally resonant pacing rhythm.'
  },
  {
    id: 'short-play-faster-game',
    title: 'Play Faster The Only Game You Have To Play',
    category: 'ads',
    categoryLabel: 'Games, Promotion',
    platform: 'YouTube Shorts',
    views: '3.8M',
    hookRate: '95.4%',
    completionRate: '86.5%',
    likes: '334K',
    thumbnail: 'https://img.youtube.com/vi/tCuFQAkvEMA/hqdefault.jpg',
    videoUrl: 'https://youtube.com/shorts/tCuFQAkvEMA?si=RAMu0PFT2VZYnKrg',
    soundtrack: 'High-BPM electronic gaming synthwave with riser drops',
    captionsStyle: 'Neon gaming cyber text with glitch transitions',
    hookHeadline: 'PLAY FASTER: THE ADRENALINE CHALLENGE',
    pacingSecondsPerCut: '0.8s',
    colorTheme: 'from-violet-500/20 to-fuchsia-600/30',
    breakdown: 'Adrenaline-fueled gaming promo with speed-ramped gameplay capture, screen shakes, bass-boosted sound effects, and high-CTR call to action.'
  }
];

export interface ClientReview {
  id: string;
  quote: string;
  author: string;
  role: string;
  channel: string;
  metric: string;
  rating: number;
  avatar: string;
  viewsGenerated: string;
  projectType: string;
}

export const TESTIMONIALS: ClientReview[] = [
  {
    id: 'review-1',
    quote: "Transformed our channel retention from 38% to over 72% in 60 days. Our documentaries routinely get pushed into browse features now, consistently pulling 2M+ views per upload.",
    author: "Marcus Vance",
    role: "Lead Creator",
    channel: "Apex Chronicles (1.4M Subs)",
    metric: "+340% Channel Growth",
    rating: 5,
    avatar: "/images/client_avatar_marcus_1790734855226.jpg",
    viewsGenerated: "14.8M+ Total Views",
    projectType: "Long-Form Documentaries"
  },
  {
    id: 'review-2',
    quote: "His vertical edits generated over 28M views for our agency clients in Q3 alone. The hook pacing, sound design, and custom captions keep people watching until the final second.",
    author: "Elena Rostova",
    role: "Founder & Creative Director",
    channel: "Lumina Media Agency",
    metric: "28M+ Vertical Reach",
    rating: 5,
    avatar: "/images/client_avatar_elena_1790734870382.jpg",
    viewsGenerated: "28M+ Vertical Views",
    projectType: "Viral Reels & TikToks"
  },
  {
    id: 'review-3',
    quote: "The 3D motion graphics breakdowns and audio stems brought true cinema-grade documentary quality to our channel. Audience retention jumped by 42% on our 20-minute films.",
    author: "Liam Chen",
    role: "Documentary Filmmaker",
    channel: "FutureSphere Media (850K Subs)",
    metric: "82.1% Avg Retention",
    rating: 5,
    avatar: "/images/client_avatar_liam_1790734886932.jpg",
    viewsGenerated: "6.5M+ Documentary Views",
    projectType: "Documentaries & 3D Motion"
  },
  {
    id: 'review-4',
    quote: "Fastest turnaround time in the industry without sacrificing an ounce of quality. He understands YouTube storytelling psychology better than anyone we've collaborated with.",
    author: "Sarah Jenkins",
    role: "Executive Content Producer",
    channel: "Horizon Creative Studio",
    metric: "4.9/5 Quality Rating",
    rating: 5,
    avatar: "/images/client_avatar_sarah_1790734903165.jpg",
    viewsGenerated: "9.2M+ Views Generated",
    projectType: "High-Ticket Edits & Shorts"
  }
];

