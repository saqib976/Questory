export interface LongFormProject {
  id: string;
  title: string;
  category: 'faceless' | 'motion-graphics' | 'retention' | 'podcasts' | 'commercial';
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
  category: 'viral-hooks' | 'talking-head' | 'faceless-reels' | 'motion-shorts' | 'ads';
  categoryLabel: string;
  platform: 'Instagram Reels' | 'TikTok' | 'YouTube Shorts';
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
    id: 'doc-shadow-billionaires',
    title: 'The Shadow Billionaires: Inside Silicon’s Dark Capital',
    category: 'faceless',
    categoryLabel: 'Faceless / Documentary',
    client: 'Apex Chronicles (1.4M Subs)',
    duration: '24:18',
    views: '4.2M',
    retention: '78.4%',
    thumbnail: '/src/assets/images/doc_thumbnail_1790731951434.jpg',
    description: 'Deep-dive investigative documentary featuring multi-layered archival 3D parallax, newspaper kinetic foldouts, dark ambient sound design, and custom timeline cartography.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:45', retention: 91, note: 'Cold open sensory hook with heart pulse sound design' },
      { time: '4:30', retention: 84, note: 'Pattern interrupt: 3D paper dossier fly-through' },
      { time: '12:15', retention: 79, note: 'Mid-point plot twist with sound riser' },
      { time: '22:00', retention: 74, note: 'Climactic synthesis before closing resolution' }
    ],
    soundStems: ['Deep Sub Risers', 'Vintage Newspaper Foley', 'Analog Tape Hiss', 'Orchestral Drones'],
    keyPacingTechniques: ['Fast 2.4s hook pacing', 'Parallax 2.5D document depth', 'Micro sound cues every 5s'],
    colorGradingProfile: 'Kodak 2383 35mm film emulation with custom warm amber paper highlights'
  },
  {
    id: 'motion-longevity',
    title: 'Synthetic Biology & The End of Aging: 2030 Roadmap',
    category: 'motion-graphics',
    categoryLabel: 'Motion Graphics & VFX',
    client: 'FutureSphere Media',
    duration: '18:42',
    views: '2.6M',
    retention: '82.1%',
    thumbnail: '/src/assets/images/motion_thumbnail_1790731966584.jpg',
    description: 'High-end 3D kinetic typography, cellular biology simulations, and bespoke isometric vector illustrations explaining CRISPR gene drives and mitochondrial repair.',
    software: ['After Effects', 'Blender 3D', 'Premiere Pro', 'Illustrator'],
    retentionPoints: [
      { time: '0:00 - 0:30', retention: 94, note: 'Cinematic 3D DNA unzipping intro' },
      { time: '6:10', retention: 88, note: 'Interactive cellular comparison graphic' },
      { time: '14:20', retention: 81, note: 'Speed-ramped timeline of clinical trials' }
    ],
    soundStems: ['Granular Synth Swells', 'Hi-tech Interface Beeps', 'Atmospheric Spatial Pads'],
    keyPacingTechniques: ['Fluid morph transitions', 'Kinetic kinetic text highlights', 'Visual analogies for complex science'],
    colorGradingProfile: 'Futuristic teal-cyan luminescents balanced by deep obsidian black'
  },
  {
    id: 'retention-breakdown',
    title: 'The MrBeast Pacing Formula: 100M Views Retention Engine',
    category: 'retention',
    categoryLabel: 'YouTube Retention',
    client: 'Creator Strategy Lab',
    duration: '16:05',
    views: '3.8M',
    retention: '85.6%',
    thumbnail: '/src/assets/images/doc_thumbnail_1790731951434.jpg',
    description: 'Masterclass in modern retention editing: dynamic crash zooms, contextual sound effects, dopamine micro-animations, and zero dead air.',
    software: ['Premiere Pro', 'After Effects', 'Audition'],
    retentionPoints: [
      { time: '0:00 - 0:15', retention: 96, note: '3-second visual question hook' },
      { time: '3:45', retention: 89, note: 'Rapid 1.2s b-roll rhythm' },
      { time: '9:20', retention: 85, note: 'Retention chart overlay with live counter' }
    ],
    soundStems: ['Whoosh Impacts', 'Dopamine Chime Cues', 'Bass Drops', 'Vinyl Scratches'],
    keyPacingTechniques: ['0.8 - 2.1s average shot length', 'Pattern interrupt wipes', 'Subtle dynamic camera shake'],
    colorGradingProfile: 'High saturation punch with clean skin tone isolation'
  },
  {
    id: 'podcast-founders-exit',
    title: 'The Unfiltered $100M Exit: What Wall Street Hid',
    category: 'podcasts',
    categoryLabel: 'Podcasts & Talking Heads',
    client: 'Valuation Diaries',
    duration: '42:10',
    views: '1.2M',
    retention: '69.3%',
    thumbnail: '/src/assets/images/podcast_thumbnail_1790731982742.jpg',
    description: 'Multi-cam broadcast edit with automatic speaker-tracking framing, animated balance sheet overlays, cinematic punch-ins for dramatic punchlines, and pristine audio leveling.',
    software: ['Premiere Pro', 'DaVinci Resolve', 'iZotope RX 10'],
    retentionPoints: [
      { time: '0:00 - 1:00', retention: 88, note: 'Provocative clip cold-open teasers' },
      { time: '15:30', retention: 73, note: 'B-roll transition covering monotone monologue' },
      { time: '30:00', retention: 68, note: 'Document leak highlight with highlight marker' }
    ],
    soundStems: ['De-noised Studio Vocals', 'Subtle Lounge Jazz Ambience', 'Subtle Glass Clinks'],
    keyPacingTechniques: ['Dynamic crop 4K zoom-ins', 'Lower third investor cards', 'Dead silence removal'],
    colorGradingProfile: 'Warm studio tungsten film tones with soft roll-off'
  },
  {
    id: 'commercial-apex-hypercar',
    title: 'Apex GT-X: Pure Aerodynamics Launch Film',
    category: 'commercial',
    categoryLabel: 'Commercial & Brand',
    client: 'Apex Automotive Group',
    duration: '02:45',
    views: '2.4M',
    retention: '91.2%',
    thumbnail: '/src/assets/images/motion_thumbnail_1790731966584.jpg',
    description: 'High-octane commercial brand showcase featuring precision speed-ramps, custom exhaust sound design synthesis, lens flare composites, and commercial color grading.',
    software: ['DaVinci Resolve Studio', 'After Effects', 'Pro Tools'],
    retentionPoints: [
      { time: '0:00 - 0:20', retention: 98, note: 'Ultra slow-mo engine roar transition' },
      { time: '1:10', retention: 93, note: 'Rhythmic speed ramp match-cut across race track' },
      { time: '2:30', retention: 89, note: 'Brand crescendo into bold typography lockup' }
    ],
    soundStems: ['Twin-Turbo V8 Engine Foley', 'Metallic Glitch Swells', 'Bass Rumbles', 'Tire Screech Stabs'],
    keyPacingTechniques: ['BPM-synced beat cutting', 'Whip pan kinetic match-cuts', 'Optical flow speed ramps'],
    colorGradingProfile: 'ARRI Alexa LogC to Rec709 with high contrast automotive specular curves'
  },
  {
    id: 'doc-ai-singularity',
    title: 'The Silicon Frontier: Autonomous Agents Take Flight',
    category: 'faceless',
    categoryLabel: 'Faceless / Documentary',
    client: 'NeuraNet Studios',
    duration: '21:30',
    views: '3.1M',
    retention: '76.8%',
    thumbnail: '/src/assets/images/doc_thumbnail_1790731951434.jpg',
    description: 'Gripping investigative narrative exploring the frontiers of autonomous intelligence, robotic factories, and societal paradigm shifts with bespoke 3D motion design.',
    software: ['Premiere Pro', 'After Effects', 'Cinema 4D'],
    retentionPoints: [
      { time: '0:00 - 0:45', retention: 92, note: 'Atmospheric robotic factory montage' },
      { time: '8:15', retention: 81, note: 'Historical compute comparison infographic' },
      { time: '18:00', retention: 75, note: 'Speculative 2035 timeline visualization' }
    ],
    soundStems: ['Cybernetic Servo Motifs', 'Orchestral Sub Thuds', 'Digital Static Risers'],
    keyPacingTechniques: ['Documentary pacing modulation', 'Seamless kinetic scene transitions', 'Immersive Foley spatialization'],
    colorGradingProfile: 'Moody cyber-noir palette with warm incandescent highlights'
  }
];

export const SHORT_FORM_PROJECTS: ShortFormProject[] = [
  {
    id: 'short-zero-to-400k',
    title: 'How I scaled to 400K subs with zero ad spend',
    category: 'talking-head',
    categoryLabel: 'Talking Head & Captions',
    platform: 'Instagram Reels',
    views: '4.8M',
    hookRate: '92.4%',
    completionRate: '78.2%',
    likes: '342K',
    thumbnail: '/src/assets/images/shortform_cover_1790731999167.jpg',
    soundtrack: 'Phonk Lo-Fi Rhythmic Beat (128 BPM)',
    captionsStyle: 'Hormozi / Beast style kinetic color-pop captions with word-by-word tracking',
    hookHeadline: 'DO NOT POST ANOTHER VIDEO UNTIL YOU FIX THIS',
    pacingSecondsPerCut: '1.2s',
    colorTheme: 'from-amber-500/20 to-orange-600/30',
    breakdown: 'Instant 0.3s zoom punch-in, colored keyword emphasis (Amber & Emerald), contextual sound cues on every noun, and a looping seamless final sentence.'
  },
  {
    id: 'short-dark-sugar',
    title: 'The 1965 Secret Memo That Tricked Humanity',
    category: 'faceless-reels',
    categoryLabel: 'Faceless & Storytelling',
    platform: 'TikTok',
    views: '6.2M',
    hookRate: '95.1%',
    completionRate: '83.4%',
    likes: '518K',
    thumbnail: '/src/assets/images/shortform_cover_1790731999167.jpg',
    soundtrack: 'Dark Suspense Drone & Heartbeat',
    captionsStyle: 'Minimalist editorial typewriter with yellow key highlight',
    hookHeadline: 'THEY PAID $50,000 TO HIDE THIS ONE TRUTH',
    pacingSecondsPerCut: '1.5s',
    colorTheme: 'from-red-500/20 to-zinc-900/60',
    breakdown: 'Historical document reveals with magnifying glass 3D distortion, micro sound effects of pen scratches, and dramatic bass drop at the reveal.'
  },
  {
    id: 'short-editing-mistake',
    title: 'The #1 amateur editing mistake killing your views',
    category: 'viral-hooks',
    categoryLabel: 'Viral Hooks & Retention',
    platform: 'YouTube Shorts',
    views: '3.1M',
    hookRate: '89.6%',
    completionRate: '81.0%',
    likes: '284K',
    thumbnail: '/src/assets/images/shortform_cover_1790731999167.jpg',
    soundtrack: 'Upbeat Tech House Bassline',
    captionsStyle: 'Bold condensed Grotesk with glowing bounding box highlights',
    hookHeadline: 'STOP CUTTING YOUR VIDEOS LIKE IT IS 2018',
    pacingSecondsPerCut: '0.9s',
    colorTheme: 'from-blue-500/20 to-cyan-500/30',
    breakdown: 'Split screen comparison of "Amateur vs Pro", green checkmark dopamine sound, and high-frequency sound transitions.'
  },
  {
    id: 'short-ai-smart-glasses',
    title: 'These new AR glasses make phones look obsolete',
    category: 'ads',
    categoryLabel: 'E-commerce & Ads',
    platform: 'Instagram Reels',
    views: '2.5M',
    hookRate: '87.8%',
    completionRate: '75.6%',
    likes: '198K',
    thumbnail: '/src/assets/images/shortform_cover_1790731999167.jpg',
    soundtrack: 'Electronic Future Bass Instrumental',
    captionsStyle: 'Clean tech sans with neon cyan highlight accents',
    hookHeadline: 'IS THIS THE DEVICE THAT KILLS THE SMARTPHONE?',
    pacingSecondsPerCut: '1.4s',
    colorTheme: 'from-emerald-500/20 to-teal-900/50',
    breakdown: 'Precision speed ramps on unboxing, futuristic HUD graphics composited over first-person view, dynamic CTA with discount code voucher.'
  },
  {
    id: 'short-brain-rewire',
    title: '3 Books that rewired my psychology in 30 days',
    category: 'talking-head',
    categoryLabel: 'Talking Head & Captions',
    platform: 'TikTok',
    views: '3.9M',
    hookRate: '91.0%',
    completionRate: '79.5%',
    likes: '380K',
    thumbnail: '/src/assets/images/shortform_cover_1790731999167.jpg',
    soundtrack: 'Chill Ambient Neo-Classical Piano',
    captionsStyle: 'Minimal italic serif with smooth sliding motion',
    hookHeadline: 'READ THESE IF YOU FEEL STUCK RIGHT NOW',
    pacingSecondsPerCut: '1.8s',
    colorTheme: 'from-purple-500/20 to-indigo-900/60',
    breakdown: 'Aesthetic 3D book covers floating in space, high-value bullet takeaways on screen, atmospheric warm LUT color grade.'
  },
  {
    id: 'short-why-99-fail',
    title: 'Why 99% of YouTube channels die in month 2',
    category: 'viral-hooks',
    categoryLabel: 'Viral Hooks & Retention',
    platform: 'YouTube Shorts',
    views: '5.6M',
    hookRate: '94.2%',
    completionRate: '86.1%',
    likes: '462K',
    thumbnail: '/src/assets/images/shortform_cover_1790731999167.jpg',
    soundtrack: 'Epic Cinematic Build-Up',
    captionsStyle: 'High-contrast bold font with pulsating red alert box',
    hookHeadline: 'THE GRAVEYARD OF DEAD YOUTUBE CHANNELS',
    pacingSecondsPerCut: '1.1s',
    colorTheme: 'from-amber-600/30 to-red-600/30',
    breakdown: 'Animated analytical retention graph dropping to zero, pattern interrupt warning alarm foley, actionable solution reveal.'
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
    avatar: "/src/assets/images/client_avatar_marcus_1790734855226.jpg",
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
    avatar: "/src/assets/images/client_avatar_elena_1790734870382.jpg",
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
    avatar: "/src/assets/images/client_avatar_liam_1790734886932.jpg",
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
    avatar: "/src/assets/images/client_avatar_sarah_1790734903165.jpg",
    viewsGenerated: "9.2M+ Views Generated",
    projectType: "High-Ticket Edits & Shorts"
  }
];

