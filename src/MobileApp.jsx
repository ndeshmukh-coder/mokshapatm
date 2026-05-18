import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Zap,
  RotateCcw,
  Compass,
  ArrowDown,
  Sparkles,
  BookOpen,
  ArrowLeft,
  Crown,
  Skull,
  TrendingUp,
  TrendingDown,
  X,
  Info
} from 'lucide-react';
import { squareDetails } from './squareDetails.js';
import { lokaDetails } from './lokaDetails.js';

// --- CONSTANTS & DATA ---
const ROWS = 8;
const COLS = 9;
const TOTAL_SQUARES = ROWS * COLS;
const WINNING_SQUARES = [67, 68, 69];

const lokasData = [
  { level: 8, name: "Brahman-loka", sanskrit: "ब्रह्म-लोक", cells: "64–72", description: "The highest realm. The One Reality seen from every standpoint.", details: "The highest realm where the One Reality is seen from every standpoint — prakṛti (substance), śiva, brahmā (creator), brahman (the absolute, the finishing square at 68). The three guṇas reveal themselves as the universe's powers. Theme: the finish — cell 68 is the destination, eternally existing, awareful, limitless-complete. Yet even here, the guṇas can unbalance the player; tama-guna (72) is the last snake. Way out: already here — cell 68 is liberation, accomplished through the guru-śiṣya relationship." },
  { level: 7, name: "Satya-loka", sanskrit: "सत्य-लोक", cells: "55–63", description: "The truth plane. The sense of individuality is examined and dissolved.", details: "The truth plane where aham-kāra (the sense of individuality) is examined and dissolved. The player chants OM, takes a stand in truth (satya-loka, cell 59), holds subuddhi (clear intellect) through the last breath. Theme: stabilization — three subtle snakes remain, including the slip from sukha into tamas (inertia). Even great clarity needs constant maintenance. Way out: nididhyāsana (contemplation) until the last breath — sustain subuddhi (60) and the small fire of habit cannot become a conflagration." },
  { level: 6, name: "Tapa-loka", sanskrit: "तप-लोक", cells: "46–54", description: "The purification realm. Knowledge is fused with action through devotion.", details: "The purification realm where the knowledge of Janaloka is fused with action through viveka (discernment), tapa-loka itself (austerity, cell 50), and finally bhakti (devotion). Sacred archetypes appear — Sarasvati, Yamuna, Ganga. Theme: living the truth one knows. Easy to say 'there is only God' — this row asks whether that vision holds up under heated arguments and difficult relationships. Way out: bhakti (54) — the recognition that devotee, devoted and act of devotion are all one Īśvara. Another liberation point in the game." },
  { level: 5, name: "Janaloka", sanskrit: "जनलोक", cells: "37–45", description: "The wisdom realm. Self-knowledge begins to dawn.", details: "The wisdom realm where jñāna (self-knowledge) begins. The player no longer just acts — they study, inquire, listen to a teacher, contemplate. The five prāṇas (subtle energies) are understood as the body's intelligence. Janaloka itself (cell 41) is named the wisdom plane. Theme: from doing to knowing — the source of most scriptural teachings. Without jñāna, the player falls into avidyā (ignorance, 44). Way out: sustained study of self, world and Brahman. Reaching suvidyā (45) means moksha is attained — the highest human goal accomplished." },
  { level: 4, name: "Mahaloka", sanskrit: "महलोक", cells: "28–36", description: "The plane of balance. Svadharma — one's own path — is found.", details: "The plane of balance. Svadharma (one's own path) is found; the player responds to each situation from unique strengths rather than biases. Head and heart align; mahaloka (cell 32) is itself named the balance plane. Theme: maturation — even the senses refine, taste and fragrance and the texture of perception become subtler. Adharma and nāraka (hell as purification) still lurk for the player who slips. Way out: honesty (svaccha, 36) about one's own strengths and weaknesses opens the door to real jñāna in the next loka." },
  { level: 3, name: "Svarga-loka", sanskrit: "स्वर्ग-लोक", cells: "19–27", description: "The heaven of action. Karma-yoga — finding one's place through doing.", details: "The heaven of action — the realm of karma-yoga, where action becomes deliberate, charitable, atoning, dharmic. The player learns that 'results are not entirely in my hands' and that nobility means asking 'What can I give?' Heaven itself (svarga-loka, cell 23) is here, but bound by time. The whole row teaches that mistakes are lessons. Susanga (good company) lifts; kusangati (bad company) drops. Way out: dharma (22) plus good company (25) plus the shift from 'what can I take?' to 'what can I give?' (27)." },
  { level: 2, name: "Bhuva-loka", sanskrit: "भुव-लोक", cells: "10–18", description: "The lower astral plane. Discipline begins; the mind starts watching itself.", details: "The lower astral plane where the player begins tapas (discipline) and śuddhi (purification). The mind starts to watch itself. Imagination, fantasy and the emotional roller-coaster of bhuva-loka (cell 14) take over the inner life. Theme: self-observation — joy and envy, fantasy and stuckness, jealousy and empathy all live side by side. Way out: dayā (empathy, cell 17) is the single most powerful ladder on this row. It sweeps egotism aside and lifts the player past many traps. Joy (18) is the byproduct." },
  { level: 1, name: "Bhu-loka", sanskrit: "भू-लोक", cells: "1–9", description: "The physical plane. Bound by desire and karma; basic drives run the show.", details: "The physical plane. The player begins here bound by kāma (desire) and the law of karma, unaware that 'I and Brahman are not-two'. Mind is identified with the body and its appetites; cell 5 itself is named bhu-loka, the physical realm. Theme: bondage — anger, greed, delusion, pride, dissatisfaction and lust run the show. Every choice pulls the player either toward purification or deeper into the cycle. Way out: catalyzed by suffering — kāma (cell 9) is both trap and best friend; when guided by the scriptures, desire becomes the engine of growth that propels the player into the next loka." }
];

const getLokaLevel = (squareNum) => Math.floor((squareNum - 1) / COLS) + 1;
const getLoka = (squareNum) => lokasData.find(l => l.level === getLokaLevel(squareNum));

// Row tint per loka — keyed by row index from bottom (0 = loka 1)
const lokaRowTints = {
  0: '#fde6c8', // brown   — Bhu-loka
  1: '#fecaca', // red     — Bhuva-loka
  2: '#fed7aa', // orange  — Svarga-loka
  3: '#fef08a', // yellow  — Mahaloka
  4: '#bbf7d0', // green   — Janaloka
  5: '#bfdbfe', // blue    — Tapa-loka
  6: '#c7d2fe', // indigo  — Satya-loka
  7: '#ddd6fe', // violet  — Brahman-loka
};

const squaresData = {
  1: { name: 'जन्म', translation: 'Birth', meaning: 'The start of your journey.' },
  2: { name: 'माया', translation: 'Illusion', meaning: 'The energy that obscures truth.' },
  3: { name: 'क्रोध', translation: 'Anger', meaning: 'Emotional heat from unmet expectations.' },
  4: { name: 'लोभ', translation: 'Greed', meaning: 'The craving for more than needed.' },
  5: { name: 'भू-लोक', translation: 'Physical Plane', meaning: 'The world of the five senses.' },
  6: { name: 'मोह', translation: 'Delusion', meaning: 'Attachment to worldly objects.' },
  7: { name: 'मद', translation: 'Pride', meaning: 'A sense of superiority over others.' },
  8: { name: 'काम', translation: 'Desire', meaning: 'The cycle of wanting and getting.' },
  9: { name: 'तप', translation: 'Austerity', meaning: 'Disciplining the mind and body.' },
  10: { name: 'गंधर्व', translation: 'Harmony', meaning: 'Joy after overcoming attractions.' },
  11: { name: 'ईर्ष्या', translation: 'Jealousy', meaning: 'Unhappiness at others success.' },
  12: { name: 'अंतरिक्ष', translation: 'Astral', meaning: 'A space of transition.' },
  13: { name: 'भुवलोक', translation: 'Subtle', meaning: 'The plane of inner growth.' },
  14: { name: 'नागलोक', translation: 'Fantasy', meaning: 'Lost in unrealistic daydreams.' },
  15: { name: 'मत्सर्य', translation: 'Envy', meaning: 'Resenting others status.' },
  16: { name: 'दया', translation: 'Compassion', meaning: 'Kindness toward all beings.' },
  17: { name: 'हर्ष', translation: 'Joy', meaning: 'The cheerfulness of youth.' },
  18: { name: 'दाना', translation: 'Charity', meaning: 'Selfless giving.' },
  19: { name: 'कर्म-योग', translation: 'Selfless Action', meaning: 'Duty without attachment.' },
  20: { name: 'सुसंगती', translation: 'Good Company', meaning: 'Wise influences.' },
  21: { name: 'प्रायश्चित्त', translation: 'Atonement', meaning: 'Fixing past mistakes.' },
  22: { name: 'धर्म', translation: 'Righteousness', meaning: 'Living by moral laws.' },
  23: { name: 'स्वर्ग', translation: 'Paradise', meaning: 'Reward for good deeds.' },
  24: { name: 'कुसंगती', translation: 'Bad Company', meaning: 'Negative influences.' },
  25: { name: 'यक्ष', translation: 'Guardian', meaning: 'Guarding inner treasures.' },
  26: { name: 'दुःख', translation: 'Sorrow', meaning: 'Pain from attachment.' },
  27: { name: 'परमार्थ', translation: 'Altruism', meaning: 'Putting others first.' },
  28: { name: 'सुधर्म', translation: 'Right Conduct', meaning: 'Acting on your true strength.' },
  29: { name: 'अधर्म', translation: 'Unrighteous', meaning: 'Harmful actions.' },
  30: { name: 'उत्तमगती', translation: 'Higher Progress', meaning: 'Building positive habits.' },
  31: { name: 'यक्ष', translation: 'Spirit', meaning: 'Connecting with divine energy.' },
  32: { name: 'महालौक', translation: 'Sages Plane', meaning: 'Peace of heart and head.' },
  33: { name: 'गंध', translation: 'Smell', meaning: 'Essence of the earth.' },
  34: { name: 'रस', translation: 'Taste', meaning: 'Balanced enjoyment.' },
  35: { name: 'नरक', translation: 'Purgatory', meaning: 'Suffering from ignoring truth.' },
  36: { name: 'स्वच्छ', translation: 'Purity', meaning: 'Honesty and transparency.' },
  37: { name: 'ज्ञान', translation: 'Wisdom', meaning: 'Understanding the true self.' },
  38: { name: 'प्राण', translation: 'Breath', meaning: 'Vital life energy.' },
  39: { name: 'अपान', translation: 'Elimination', meaning: 'Letting go of the old.' },
  40: { name: 'व्यान', translation: 'Circulation', meaning: 'Distributing life force.' },
  41: { name: 'जनलोक', translation: 'Humanity', meaning: 'Clear, unbiased vision.' },
  42: { name: 'अग्नी', translation: 'Fire', meaning: 'Transformation.' },
  43: { name: 'मनुष्य', translation: 'Humanity', meaning: 'A conscious human being.' },
  44: { name: 'अविद्या', translation: 'Ignorance', meaning: 'Not knowing the truth.' },
  45: { name: 'सुविद्या', translation: 'Higher Learning', meaning: 'Path to liberation.' },
  46: { name: 'विवेक', translation: 'Discrimination', meaning: 'Telling real from illusion.' },
  47: { name: 'सरस्वती', translation: 'Knowledge', meaning: 'Balanced wisdom.' },
  48: { name: 'यमुना', translation: 'Activity', meaning: 'Solar energy.' },
  49: { name: 'गंगा', translation: 'Calmness', meaning: 'Lunar energy.' },
  50: { name: 'तपोलोक', translation: 'Austerity Plane', meaning: 'Purification via discipline.' },
  51: { name: 'पृथ्वी', translation: 'Earth', meaning: 'Material duties.' },
  52: { name: 'हिंसा', translation: 'Violence', meaning: 'Harmful actions.' },
  53: { name: 'जल', translation: 'Water', meaning: 'Flow of life.' },
  54: { name: 'भक्ती', translation: 'Devotion', meaning: 'Total love and surrender.' },
  55: { name: 'अहंकार', translation: 'Ego', meaning: 'False sense of separation.' },
  56: { name: 'ॐ', translation: 'Om', meaning: 'Primordial sound.' },
  57: { name: 'वायु', translation: 'Air', meaning: 'Subtle energy movement.' },
  58: { name: 'तेज', translation: 'Radiance', meaning: 'Your inner light.' },
  59: { name: 'सत्यलोक', translation: 'Truth Plane', meaning: 'Perfect thought management.' },
  60: { name: 'सुबुद्धी', translation: 'Right Intellect', meaning: 'Intelligence used for good.' },
  61: { name: 'दुर्बुद्धी', translation: 'Wrong Intellect', meaning: 'Cleverness that harms.' },
  62: { name: 'सुख', translation: 'Happiness', meaning: 'Steady inner peace.' },
  63: { name: 'तामस', translation: 'Inertia', meaning: 'Stagnation and laziness.' },
  64: { name: 'प्रकृती', translation: 'Nature', meaning: 'Material energy.' },
  65: { name: 'उरंत', translation: 'Inner Space', meaning: 'Expanded consciousness.' },
  66: { name: 'आनंद', translation: 'Bliss', meaning: 'Pure, independent joy.' },
  67: { name: 'शिव', translation: 'Pure Awareness', meaning: 'Free from ignorance.' },
  68: { name: 'ईश्वर', translation: 'Cosmic Lord', meaning: 'Supreme consciousness.' },
  69: { name: 'ब्रह्मा', translation: 'The Creator', meaning: 'Part of intelligent design.' },
  70: { name: 'सत्त्व', translation: 'Goodness', meaning: 'Light and harmony.' },
  71: { name: 'रजस', translation: 'Passion', meaning: 'Activity and desire.' },
  72: { name: 'तमस', translation: 'Darkness', meaning: 'Complete ignorance.' },
};

const ladders = {
  9:  { to: 23, sanskrit: 'तप', name: 'Austerity',          signifies: 'Self-discipline and inner fire elevate the soul straight to the celestial reward.' },
  17: { to: 69, sanskrit: 'दया', name: 'Compassion',         signifies: 'Pure empathy for all beings carries you directly into the embrace of the Creator.' },
  27: { to: 41, sanskrit: 'परमार्थ', name: 'Altruism',       signifies: 'Selfless service to others raises consciousness to the plane of true humanity.' },
  28: { to: 50, sanskrit: 'सुधर्म', name: 'Right Conduct',   signifies: 'Living in line with your true duty accelerates the spiritual journey.' },
  37: { to: 66, sanskrit: 'ज्ञान', name: 'Wisdom',           signifies: 'Knowledge of the true Self leads straight to eternal bliss.' },
  46: { to: 62, sanskrit: 'विवेक', name: 'Discrimination',   signifies: 'Choosing truth over illusion, again and again, brings genuine and lasting happiness.' },
  54: { to: 68, sanskrit: 'भक्ती', name: 'Devotion',         signifies: 'Total love and surrender connect the seeker directly to the Supreme.' },
  60: { to: 67, sanskrit: 'सुबुद्धी', name: 'Right Intellect', signifies: 'A purified mind, used in service of the good, leads at once to pure awareness.' }
};

const snakes = {
  16: { to: 4,  sanskrit: 'मत्सर्य',   name: 'Envy',              color: '#b91c1c', signifies: 'Resenting another\'s joy poisons your own progress and drags you back into greed.' },
  24: { to: 7,  sanskrit: 'कुसंगती',   name: 'Bad Company',       color: '#6d28d9', signifies: 'Negative influences erode your virtue and pull you back into pride and ego.' },
  29: { to: 6,  sanskrit: 'अधर्म',     name: 'Unrighteousness',   color: '#c2410c', signifies: 'Acting against truth and dharma plunges the soul deep into delusion.' },
  44: { to: 22, sanskrit: 'अविद्या',   name: 'Ignorance',         color: '#0369a1', signifies: 'Refusing to see reality knocks you back to relearn the lessons of dharma.' },
  52: { to: 35, sanskrit: 'हिंसा',     name: 'Violence',          color: '#047857', signifies: 'Harming others cycles back as your own suffering — a fall into purgatory.' },
  55: { to: 3,  sanskrit: 'अहंकार',   name: 'Ego',                color: '#be185d', signifies: 'The false sense of "I" hurls the soul into the consuming fires of anger.' },
  61: { to: 13, sanskrit: 'दुर्बुद्धी', name: 'Wrong Intellect',  color: '#4338ca', signifies: 'Cleverness used to harm scatters your mind back into idle fantasy.' },
  63: { to: 2,  sanskrit: 'तामस',     name: 'Inertia',            color: '#7e22ce', signifies: 'Stagnation and laziness drag the soul back into the grip of illusion.' },
  72: { to: 51, sanskrit: 'तमस',     name: 'Darkness',           color: '#111827', signifies: 'Total ignorance is the longest fall — all the way back to bare material existence.' }
};

const getSquareCoords = (num, verticalOffset = 'center') => {
  const rowFromBottom = Math.floor((num - 1) / COLS);
  const colIndex = (num - 1) % COLS;
  const actualCol = rowFromBottom % 2 === 0 ? colIndex : (COLS - 1) - colIndex;

  const cellWidth = 100 / COLS;
  const cellHeight = 100 / ROWS;

  const x = actualCol * cellWidth + (cellWidth / 2);
  let yBase = (ROWS - rowFromBottom - 1) * cellHeight;

  let y;
  if (verticalOffset === 'top') y = yBase + (cellHeight * 0.2);
  else if (verticalOffset === 'bottom') y = yBase + (cellHeight * 0.8);
  else y = yBase + (cellHeight / 2);

  return { x, y };
};

const getCellColor = (num) => {
  if (WINNING_SQUARES.includes(num)) return '#fef3c7';
  const rowFromBottom = Math.floor((num - 1) / COLS);
  return rowFromBottom % 2 === 0 ? '#ffffff' : '#f8fafc';
};

const DiceFace = ({ value, className = "w-14 h-14" }) => {
  const dots = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  return (
    <div className={`${className} bg-red-600 rounded-2xl grid grid-cols-3 grid-rows-3 p-2 gap-1 shadow-inner border-2 border-red-700`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          {dots[value]?.includes(i) && (
            <div className="w-full h-full max-w-[80%] max-h-[80%] bg-white rounded-full shadow-sm" />
          )}
        </div>
      ))}
    </div>
  );
};

const LadderComponent = ({ start, end }) => {
  const s = getSquareCoords(start, 'top');
  const e = getSquareCoords(end, 'bottom');
  const angle = Math.atan2(e.y - s.y, e.x - s.x);
  const dist = Math.sqrt(Math.pow(e.x - s.x, 2) + Math.pow(e.y - s.y, 2));
  const railOffset = 2.5;
  const offsetX = Math.sin(angle) * railOffset;
  const offsetY = -Math.cos(angle) * railOffset;

  const rungCount = Math.max(3, Math.floor(dist / 4));
  const rungs = [];
  for (let i = 1; i < rungCount; i++) {
    const t = i / rungCount;
    const rx = s.x + (e.x - s.x) * t;
    const ry = s.y + (e.y - s.y) * t;
    rungs.push(<line key={i} x1={rx - offsetX} y1={ry - offsetY} x2={rx + offsetX} y2={ry + offsetY} stroke="#451a03" strokeWidth="0.8" strokeLinecap="round" />);
  }

  return (
    <g opacity="0.8">
      <line x1={s.x - offsetX} y1={s.y - offsetY} x2={e.x - offsetX} y2={e.y - offsetY} stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={s.x + offsetX} y1={s.y + offsetY} x2={e.x + offsetX} y2={e.y + offsetY} stroke="#451a03" strokeWidth="1.2" strokeLinecap="round" />
      {rungs}
    </g>
  );
};

const SnakeComponent = ({ start, end, color }) => {
  const s = getSquareCoords(start, 'bottom');
  const e = getSquareCoords(end, 'top');
  const midX = (s.x + e.x) / 2;
  const midY = (s.y + e.y) / 2;
  const cp1x = midX + (s.y - e.y) * 0.25;
  const cp1y = midY + (e.x - s.x) * 0.25;
  const cp2x = midX - (s.y - e.y) * 0.25;
  const cp2y = midY - (e.x - s.x) * 0.25;
  const pathD = `M ${s.x} ${s.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${e.x} ${e.y}`;
  return (
    <g opacity="0.8">
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3,1.5" />
      <circle cx={s.x} cy={s.y} r="2" fill={color} stroke="white" strokeWidth="0.5" />
    </g>
  );
};

export default function MobileApp() {
  const [playerPosition, setPlayerPosition] = useState(1);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [win, setWin] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [highestLokaLevel, setHighestLokaLevel] = useState(1);
  const [celebratingRow, setCelebratingRow] = useState(null);
  const [showLokaDetails, setShowLokaDetails] = useState(false);

  const startReadingPause = () => {
    setFlashing(true);
    setTimeout(() => {
      setFlashing(false);
      setIsAnimating(false);
    }, 2000);
  };

  const settle = (finalPos) => {
    const newLevel = getLokaLevel(finalPos);
    if (newLevel > highestLokaLevel) {
      setHighestLokaLevel(newLevel);
      const loka = getLoka(finalPos);
      setCelebratingRow(newLevel - 1);
      setShowLokaDetails(false);
      setModalData({ type: 'loka', ...loka });
    } else {
      startReadingPause();
    }
  };

  const handleRoll = async () => {
    if (isAnimating || isRolling || win || flashing) return;
    setIsRolling(true);

    let roll = 1;
    for (let i = 0; i < 10; i++) {
      roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      await new Promise(r => setTimeout(r, 80));
    }

    setIsRolling(false);
    let currentPos = playerPosition;
    let target = Math.min(currentPos + roll, TOTAL_SQUARES);

    setIsAnimating(true);
    for (let i = currentPos + 1; i <= target; i++) {
      setPlayerPosition(i);
      await new Promise(r => setTimeout(r, 120));
    }

    if (WINNING_SQUARES.includes(target)) {
      setWin(true);
      setModalData({ type: 'win', ...squaresData[target] });
    } else if (ladders[target]) {
      const lad = ladders[target];
      setTimeout(() => {
        setModalData({ type: 'ladder', from: target, ...lad });
      }, 200);
    } else if (snakes[target]) {
      const snk = snakes[target];
      setTimeout(() => {
        setModalData({ type: 'snake', from: target, ...snk });
      }, 200);
    } else {
      settle(target);
    }
  };

  const closeModal = () => {
    const data = modalData;
    setModalData(null);
    if (data?.type === 'detail' || data?.type === 'lokaDetail') {
      return;
    }
    if (data?.type === 'loka') {
      setCelebratingRow(null);
      setShowLokaDetails(false);
      startReadingPause();
      return;
    }
    if (data?.type === 'win') {
      handleReset();
      return;
    }
    if (data?.to) {
      setPlayerPosition(data.to);
      settle(data.to);
    } else {
      startReadingPause();
    }
  };

  const handleReset = () => {
    setPlayerPosition(1);
    setWin(false);
    setModalData(null);
    setIsAnimating(false);
    setFlashing(false);
    setHighestLokaLevel(1);
    setCelebratingRow(null);
    setShowLokaDetails(false);
  };

  const currentSq = squaresData[playerPosition];

  return (
    <div className="fixed inset-0 bg-white flex flex-col font-sans overflow-hidden">
      <header className="flex-none h-14 bg-white border-b-2 border-slate-100 flex items-center justify-between px-4 z-50">
        <a
          href="https://www.nitidesh.com/mokshapatam/learn-the-game"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 active:opacity-70 transition-opacity"
        >
          <Star className="w-5 h-5 text-blue-700 fill-current" />
          <span className="font-black text-blue-900 tracking-tighter text-sm italic uppercase">MOKSHA PATAM</span>
        </a>
        <button onClick={handleReset} className="p-2 text-slate-600 active:scale-90 transition-transform">
          <RotateCcw className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 relative bg-slate-50 overflow-y-auto overflow-x-hidden">
        <div className="p-4 flex flex-col min-h-full">
          <div className="relative w-full max-w-sm mx-auto aspect-square border-[4px] border-blue-950 rounded-2xl overflow-hidden bg-white shadow-2xl">
            <div className="absolute inset-0 grid grid-cols-9 grid-rows-8">
              {(() => {
                const playerRow = Math.floor((playerPosition - 1) / COLS);
                return Array.from({ length: ROWS * COLS }, (_, idx) => {
                  const r = ROWS - 1 - Math.floor(idx / COLS);
                  const c = Math.floor(idx / COLS) % 2 === 0 ? (COLS - 1 - (idx % COLS)) : (idx % COLS);
                  const num = r * COLS + c + 1;
                  const isPlayerRow = r === playerRow;
                  const isCelebrating = celebratingRow !== null && r === celebratingRow;
                  const bg = WINNING_SQUARES.includes(num)
                    ? '#fef3c7'
                    : isPlayerRow
                      ? lokaRowTints[r]
                      : getCellColor(num);
                  return (
                    <div
                      key={num}
                      style={{ backgroundColor: bg, transition: 'background-color 300ms' }}
                      className={`border-[0.5px] border-slate-100 flex items-center justify-center ${isCelebrating ? 'animate-pulse' : ''}`}
                    >
                      <span className={`text-[9px] font-black ${WINNING_SQUARES.includes(num) ? 'text-amber-700' : 'text-slate-400'}`}>{num}</span>
                    </div>
                  );
                });
              })()}
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {Object.entries(ladders).map(([start, data]) => <LadderComponent key={start} start={parseInt(start)} end={data.to} />)}
              {Object.entries(snakes).map(([start, data]) => <SnakeComponent key={start} start={parseInt(start)} end={data.to} color={data.color} />)}
            </svg>

            {(() => {
              const coords = getSquareCoords(playerPosition);
              return (
                <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 z-40 flex items-center justify-center"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%`, transition: 'left 300ms, top 300ms' }}
                >
                  <div className="w-full h-full bg-blue-700 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-[10px] text-white font-black animate-marker-pulse">
                    P
                  </div>
                </div>
              );
            })()}

            {isRolling && (
              <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-[2px] flex items-center justify-center z-[45]">
                <div className="bg-white p-4 rounded-3xl shadow-2xl animate-bounce scale-110">
                   <DiceFace value={diceValue} className="w-20 h-20" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-blue-900/5 shadow-xl">
            <div className="flex items-center gap-4">
              <DiceFace value={diceValue} className="w-14 h-14" />
              <div>
                <div className="text-[12px] font-black text-blue-950 uppercase tracking-tighter">Roll Dice</div>
                <div className="text-[10px] font-bold text-slate-400 italic">Movement is Karma</div>
              </div>
            </div>
            <button
              onClick={handleRoll}
              disabled={isAnimating || isRolling || win || flashing}
              className={`px-10 py-4 text-white text-sm font-black rounded-2xl shadow-xl active:scale-95 disabled:opacity-30 uppercase tracking-widest ${(!isAnimating && !isRolling && !win && !flashing) ? 'animate-pulse-attract' : 'bg-blue-800 transition-all'}`}
            >
              ROLL
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 text-slate-400">
            <div className="text-[10px] font-black uppercase tracking-widest">Learn about the realms</div>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          <div className="mt-8 pt-8 border-t-2 border-slate-200">
            <h3 className="text-sm font-black text-blue-900 mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Compass className="w-5 h-5" /> THE SPIRITUAL REALMS
            </h3>
            <div className="space-y-4">
              {lokasData.map(l => {
                const palette = {
                  1: { bg: '#fdf6e9', border: '#78350f', num: '#78350f', name: '#451a03' },
                  2: { bg: '#fef2f2', border: '#dc2626', num: '#b91c1c', name: '#7f1d1d' },
                  3: { bg: '#fff7ed', border: '#ea580c', num: '#c2410c', name: '#7c2d12' },
                  4: { bg: '#fefce8', border: '#ca8a04', num: '#a16207', name: '#713f12' },
                  5: { bg: '#f0fdf4', border: '#16a34a', num: '#15803d', name: '#14532d' },
                  6: { bg: '#eff6ff', border: '#2563eb', num: '#1d4ed8', name: '#1e3a8a' },
                  7: { bg: '#eef2ff', border: '#4f46e5', num: '#4338ca', name: '#312e81' },
                  8: { bg: '#f5f3ff', border: '#7c3aed', num: '#6d28d9', name: '#4c1d95' },
                }[l.level];
                return (
                  <div
                    key={l.level}
                    className="rounded-2xl shadow-sm border-l-[6px] border-y-2 border-r-2 border-slate-100 overflow-hidden"
                    style={{ backgroundColor: palette.bg, borderLeftColor: palette.border }}
                  >
                    <div className="p-5 flex gap-4 items-start">
                      <span className="font-black text-2xl flex-none" style={{ color: palette.num }}>0{l.level}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-[11px] font-black uppercase tracking-wide" style={{ color: palette.name }}>{l.name}</span>
                          <span className="text-[9px] font-bold text-slate-400">cells {l.cells}</span>
                        </div>
                        <div className="text-[10px] text-slate-600 leading-snug font-medium mt-1">{l.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalData({ type: 'lokaDetail', level: l.level })}
                      className="w-full py-3 px-5 text-white text-[11px] font-black uppercase tracking-widest shadow-inner active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                      style={{ backgroundColor: palette.border }}
                    >
                      <BookOpen className="w-3.5 h-3.5" strokeWidth={3} /> More about {l.name}
                    </button>
                  </div>
                );
              })}
            </div>
            <a
              href="https://www.linkedin.com/in/deshmukh-nitin/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 mb-12 block w-full py-4 px-6 bg-blue-800 text-white text-center rounded-2xl shadow-lg active:scale-95 transition-transform"
            >
              <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-blue-200">For feedback contact</span>
              <span className="block text-xs font-black uppercase tracking-widest mt-0.5">Author: Nitin T Deshmukh →</span>
            </a>
          </div>
        </div>

        {modalData && modalData.type === 'ladder' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-gradient-to-br from-emerald-600 via-sky-600 to-amber-500 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <Sparkles
                key={i}
                className="absolute text-yellow-200 animate-pulse"
                style={{
                  left: `${(i * 41) % 100}%`,
                  top: `${(i * 29) % 100}%`,
                  width: `${10 + (i * 3) % 14}px`,
                  height: `${10 + (i * 3) % 14}px`,
                  animationDelay: `${(i * 0.15) % 1.4}s`,
                  opacity: 0.85,
                }}
              />
            ))}

            <div className="relative w-full max-w-xs bg-white rounded-[2.5rem] px-7 pt-9 pb-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.4)] border-[3px] border-emerald-300">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-full p-3.5 shadow-2xl border-4 border-white animate-bounce">
                <TrendingUp className="w-8 h-8 text-white" strokeWidth={3} />
              </div>

              <div className="mt-3 mb-4">
                <div className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.3em]">A Ladder Appears</div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">You have climbed</div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-black text-emerald-900 leading-none">{modalData.sanskrit}</div>
                <div className="text-base font-black text-blue-950 uppercase tracking-widest mt-2">{modalData.name}</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-sky-50 border-2 border-emerald-200 rounded-2xl px-3 py-2 mb-4 inline-flex items-center gap-2">
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Lifted</span>
                <span className="text-xs font-black text-emerald-900">{modalData.from}</span>
                <TrendingUp className="w-3 h-3 text-emerald-700" strokeWidth={3} />
                <span className="text-xs font-black text-emerald-900">{modalData.to}</span>
              </div>

              <p className="text-[13px] text-slate-700 mb-6 px-1 leading-relaxed font-medium">"{modalData.signifies}"</p>

              <button
                onClick={closeModal}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-sky-600 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
              >
                Rise & Continue
              </button>
            </div>
          </div>
        )}

        {modalData && modalData.type === 'snake' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-5 bg-gradient-to-br from-red-950 via-rose-950 to-black overflow-hidden">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 rounded-b-full animate-drip"
                style={{
                  left: `${4 + i * 11}%`,
                  width: `${4 + (i % 3) * 2}px`,
                  height: `${22 + (i * 13) % 38}%`,
                  background: 'linear-gradient(to bottom, #b91c1c 0%, #7f1d1d 60%, transparent 100%)',
                  animationDelay: `${(i * 0.27) % 1.6}s`,
                  animationDuration: `${2.4 + (i % 3) * 0.4}s`,
                  opacity: 0.85,
                }}
              />
            ))}

            <div
              className="relative w-full max-w-xs rounded-[2.5rem] px-7 pt-10 pb-6 text-center shadow-[0_20px_80px_rgba(127,29,29,0.7)] border-[3px]"
              style={{
                background: 'linear-gradient(to bottom right, #fef2f2, #ffe4e6)',
                borderColor: modalData.color,
              }}
            >
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full p-3.5 shadow-2xl border-4 border-white"
                style={{ backgroundColor: modalData.color }}
              >
                <Skull className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>

              <div className="mt-2 mb-4">
                <div className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: modalData.color }}>
                  The Serpent Strikes
                </div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">Bitten by</div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-black text-red-950 leading-none">{modalData.sanskrit}</div>
                <div className="text-base font-black text-blue-950 uppercase tracking-widest mt-2">{modalData.name}</div>
              </div>

              <div
                className="border-2 rounded-2xl px-3 py-2 mb-4 inline-flex items-center gap-2"
                style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5' }}
              >
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: modalData.color }}>Pulled Down</span>
                <span className="text-xs font-black text-red-950">{modalData.from}</span>
                <TrendingDown className="w-3 h-3" style={{ color: modalData.color }} strokeWidth={3} />
                <span className="text-xs font-black text-red-950">{modalData.to}</span>
              </div>

              <p className="text-[13px] text-slate-700 mb-6 px-1 leading-relaxed font-medium">"{modalData.signifies}"</p>

              <button
                onClick={closeModal}
                className="w-full py-3.5 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
                style={{
                  background: `linear-gradient(to right, ${modalData.color}, #7f1d1d)`,
                }}
              >
                Endure & Continue
              </button>
            </div>
          </div>
        )}

        {modalData && modalData.type === 'detail' && (() => {
          const sq = squaresData[modalData.num];
          const detailHtml = squareDetails[modalData.num];
          return (
            <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-md">
              <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl border-[3px] border-blue-200 flex flex-col overflow-hidden" style={{ maxHeight: '85vh' }}>
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 transition-transform"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-slate-600" strokeWidth={3} />
                </button>

                <div className="px-6 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-br from-blue-50 to-white">
                  <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em]">Square {modalData.num}</div>
                  <div className="text-3xl font-black text-blue-950 mt-1 leading-tight pr-8">{sq?.name}</div>
                  <div className="text-sm font-bold text-amber-700 mt-1 uppercase tracking-wide">{sq?.translation}</div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5">
                  {detailHtml ? (
                    <div
                      className="square-detail-body text-[13px] text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: detailHtml }}
                    />
                  ) : (
                    <p className="text-[13px] text-slate-500 italic">No extended commentary available for this square.</p>
                  )}
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={closeModal}
                    className="w-full py-3.5 bg-blue-800 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {modalData && modalData.type === 'lokaDetail' && (() => {
          const d = lokaDetails[modalData.level];
          const palette = {
            8: { border: '#7c3aed', accent: '#6d28d9', tint: '#f5f3ff' },
            7: { border: '#4f46e5', accent: '#4338ca', tint: '#eef2ff' },
            6: { border: '#2563eb', accent: '#1d4ed8', tint: '#eff6ff' },
            5: { border: '#16a34a', accent: '#15803d', tint: '#f0fdf4' },
            4: { border: '#ca8a04', accent: '#a16207', tint: '#fefce8' },
            3: { border: '#ea580c', accent: '#c2410c', tint: '#fff7ed' },
            2: { border: '#dc2626', accent: '#b91c1c', tint: '#fef2f2' },
            1: { border: '#78350f', accent: '#78350f', tint: '#fdf6e9' },
          }[modalData.level];
          if (!d) return null;
          return (
            <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-md">
              <div
                className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border-[3px]"
                style={{ borderColor: palette.border, maxHeight: '88vh' }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-90 transition-transform"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-slate-600" strokeWidth={3} />
                </button>

                <div className="px-6 pt-6 pb-4 border-b" style={{ backgroundColor: palette.tint, borderColor: palette.border + '33' }}>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: palette.accent }}>
                    Loka 0{d.num} · {d.cellsRange}
                  </div>
                  <div className="text-2xl font-black mt-1 leading-tight pr-8" style={{ color: palette.accent }}>{d.name}</div>
                  <div className="text-base font-bold text-slate-600 mt-0.5">{d.sanskrit}</div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 square-detail-body">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Essence</div>
                    <p
                      className="text-[13px] text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: d.essence }}
                    />
                  </div>

                  {d.theme && (
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Theme</div>
                      <p
                        className="text-[13px] text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: d.theme }}
                      />
                    </div>
                  )}

                  {d.keyCells && d.keyCells.length > 0 && (
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Key Cells</div>
                      <div className="flex flex-wrap gap-1.5">
                        {d.keyCells.map(c => {
                          const chipColor = c.kind === 'virtues' ? '#15803d' : c.kind === 'vices' ? '#b91c1c' : '#64748b';
                          const chipBg = c.kind === 'virtues' ? '#f0fdf4' : c.kind === 'vices' ? '#fef2f2' : '#f1f5f9';
                          return (
                            <span
                              key={c.n}
                              className="inline-flex items-baseline gap-1 px-2 py-1 rounded-full text-[11px] font-medium border"
                              style={{ borderColor: chipColor + '55', backgroundColor: chipBg, color: '#1e293b' }}
                            >
                              <span className="font-black text-[10px]" style={{ color: chipColor }}>{c.n}</span>
                              <span className="italic">{c.name}</span>
                              {c.label && (
                                <span className="font-bold" style={{ color: chipColor }}>· {c.label}</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {d.wayOut && (
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1.5">Way Out</div>
                      <p
                        className="text-[13px] text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: d.wayOut }}
                      />
                    </div>
                  )}
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={closeModal}
                    className="w-full py-3.5 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
                    style={{ backgroundColor: palette.accent }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {modalData && modalData.type === 'win' && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-5 bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700 overflow-hidden">
            {Array.from({ length: 18 }).map((_, i) => {
              const left = (i * 53) % 100;
              const top = (i * 37) % 100;
              const delay = (i * 0.13) % 1.6;
              const size = 8 + ((i * 5) % 18);
              return (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-200 animate-ping"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: '1.6s',
                    opacity: 0.85,
                  }}
                />
              );
            })}

            <div className="relative w-full max-w-xs bg-white rounded-[2.5rem] px-7 pt-9 pb-7 text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)] border-[3px] border-amber-300">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-4 shadow-2xl border-4 border-white animate-bounce">
                <Crown className="w-9 h-9 text-white fill-white" />
              </div>

              <div className="mt-3 mb-5">
                <div className="text-[11px] font-black text-amber-700 uppercase tracking-[0.3em] mb-2">मोक्ष • Moksha</div>
                <div className="text-3xl font-black text-blue-950 tracking-tight leading-tight">ULTIMATE LIBERATION</div>
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mt-2">You have attained</div>
              </div>

              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 mb-5 border-2 border-amber-200">
                <div className="text-5xl font-black text-amber-900 leading-none">{modalData.name}</div>
                <div className="text-base font-black text-blue-950 uppercase tracking-widest mt-2">{modalData.translation}</div>
                <div className="mt-3 inline-block bg-blue-950 text-amber-300 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full">
                  Brahman-loka • Loka 8 of 8
                </div>
              </div>

              <p className="text-[13px] text-slate-700 mb-2 px-1 leading-relaxed font-medium">"{modalData.meaning}"</p>
              <p className="text-[11px] text-amber-700 font-black uppercase tracking-widest mb-6">
                The soul has merged with the Source
              </p>

              <button
                onClick={closeModal}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-base font-black rounded-2xl uppercase tracking-widest shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          </div>
        )}

        {modalData && modalData.type === 'loka' && (
          <div className="fixed inset-0 bg-gradient-to-br from-amber-950/95 to-blue-950/95 backdrop-blur-md z-[60] flex items-center justify-center p-6">
            <div className="w-full max-w-xs bg-white rounded-[2.5rem] p-7 text-center shadow-2xl border-[3px] border-amber-400 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />
              <Sparkles className="absolute top-4 left-4 w-5 h-5 text-amber-400 animate-pulse" />
              <Sparkles className="absolute top-6 right-5 w-4 h-4 text-amber-300 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <Sparkles className="absolute bottom-24 left-6 w-3 h-3 text-amber-400 animate-pulse" style={{ animationDelay: '0.6s' }} />

              {!showLokaDetails ? (
                <>
                  <div className="mt-2 mb-3">
                    <div className="text-[10px] font-black text-amber-700 uppercase tracking-[0.25em]">You have reached</div>
                    <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Loka {modalData.level} of 8</div>
                  </div>
                  <div className="mb-4">
                    <div className="text-3xl font-black text-blue-950 tracking-tight">{modalData.name}</div>
                    <div className="text-base font-bold text-amber-600 mt-1">{modalData.sanskrit}</div>
                  </div>
                  <div className="flex justify-center gap-1 mb-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i < modalData.level ? 'bg-amber-400 w-3' : 'bg-slate-200 w-2'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 mb-7 px-2 leading-relaxed font-medium">{modalData.description}</p>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setShowLokaDetails(true)}
                      className="w-full py-3.5 bg-amber-500 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" /> More Details
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-full py-3.5 bg-blue-800 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                    >
                      OK
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLokaDetails(false)}
                    className="absolute top-4 left-4 p-2 text-slate-400 active:scale-90"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="mt-6 mb-4">
                    <div className="text-[10px] font-black text-amber-700 uppercase tracking-[0.25em] mb-2">Loka {modalData.level}</div>
                    <div className="text-2xl font-black text-blue-950 tracking-tight">{modalData.name}</div>
                    <div className="text-sm font-bold text-amber-600 mt-1">{modalData.sanskrit}</div>
                  </div>
                  <p className="text-[13px] text-slate-700 mb-7 px-1 leading-relaxed font-medium text-left">{modalData.details}</p>
                  <button
                    onClick={closeModal}
                    className="w-full py-3.5 bg-blue-800 text-white text-sm font-black rounded-2xl uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                  >
                    Continue Journey
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="flex-none bg-white border-t-2 border-slate-100 p-4">
        <div key={`${playerPosition}-${flashing}`} className={`flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 ${flashing ? 'animate-flash' : ''}`}>
          <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md flex-none">
            {playerPosition}
          </div>
          <div className="flex-1 overflow-hidden min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-black text-slate-900 uppercase truncate tracking-tight">{currentSq?.name}</span>
              <span className="text-[10px] font-black text-blue-700">{currentSq?.translation}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold truncate">{currentSq?.meaning}</p>
          </div>
          <button
            onClick={() => setModalData({ type: 'detail', num: playerPosition })}
            className="flex-none flex items-center gap-1 px-3 py-2 bg-blue-700 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow active:scale-95 transition-transform"
            aria-label="More details about this square"
          >
            <Info className="w-3 h-3" strokeWidth={3} /> More
          </button>
        </div>
      </footer>
    </div>
  );
}
