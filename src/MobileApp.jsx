import React, { useState, useEffect } from 'react';
import {
  Star,
  ShieldCheck,
  Zap,
  RotateCcw,
  Compass,
  ArrowDown
} from 'lucide-react';

// --- CONSTANTS & DATA ---
const ROWS = 8;
const COLS = 9;
const TOTAL_SQUARES = ROWS * COLS;
const WINNING_SQUARES = [67, 68, 69];

const lokasData = [
  { level: 8, name: "Sakti Loka", description: "The Plane of Energy. Pure consciousness." },
  { level: 7, name: "Tapa Loka", description: "The Plane of Penance. Purification through truth." },
  { level: 6, name: "Jana Loka", description: "The Plane of Generation. Cosmic balance." },
  { level: 5, name: "Maha Loka", description: "The Plane of Greatness. Survival beyond destruction." },
  { level: 4, name: "Swarga Loka", description: "The Celestial Plane. The abode of virtuous souls." },
  { level: 3, name: "Bhuva Loka", description: "The Atmospheric Plane. Realm of the sun." },
  { level: 2, name: "Bhu Loka", description: "The Physical Plane. The material world." },
  { level: 1, name: "Patala Loka", description: "The Lower Realms. Basic survival." }
];

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
  9: { to: 23, title: 'तप (Austerity)' },
  17: { to: 69, title: 'दया (Compassion)' },
  27: { to: 41, title: 'परमार्थ (Altruism)' },
  28: { to: 50, title: 'सुधर्म (Right Conduct)' },
  37: { to: 66, title: 'ज्ञान (Wisdom)' },
  46: { to: 62, title: 'विवेक (Discrimination)' },
  54: { to: 68, title: 'भक्ती (Devotion)' },
  60: { to: 67, title: 'सुबुद्धी (Right Intellect)' }
};

const snakes = {
  16: { to: 4, title: 'मत्सर (Envy)', color: '#b91c1c' },
  24: { to: 7, title: 'कुसंगती (Bad Company)', color: '#6d28d9' },
  29: { to: 6, title: 'अधर्म (Unrighteousness)', color: '#c2410c' },
  44: { to: 22, title: 'अविद्या (Ignorance)', color: '#0369a1' },
  52: { to: 35, title: 'हिंसा (Violence)', color: '#047857' },
  55: { to: 3, title: 'अहंकार (Ego)', color: '#be185d' },
  61: { to: 13, title: 'दुर्बुद्धी (Wrong Intellect)', color: '#4338ca' },
  63: { to: 2, title: 'तामस (Inertia)', color: '#7e22ce' },
  72: { to: 51, title: 'तमस (Darkness)', color: '#111827' }
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

  const handleRoll = async () => {
    if (isAnimating || isRolling || win) return;
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
        setModalData({ type: 'ladder', title: lad.title, meaning: squaresData[target].meaning, to: lad.to });
      }, 200);
    } else if (snakes[target]) {
      const snk = snakes[target];
      setTimeout(() => {
        setModalData({ type: 'snake', title: snk.title, meaning: `Pulled back by ${snk.title}.`, to: snk.to });
      }, 200);
    } else {
      setIsAnimating(false);
    }
  };

  const closeModal = () => {
    if (modalData?.to) setPlayerPosition(modalData.to);
    setModalData(null);
    setIsAnimating(false);
  };

  const handleReset = () => {
    setPlayerPosition(1);
    setWin(false);
    setModalData(null);
    setIsAnimating(false);
  };

  const currentSq = squaresData[playerPosition];

  return (
    <div className="fixed inset-0 bg-white flex flex-col font-sans overflow-hidden">
      <header className="flex-none h-14 bg-white border-b-2 border-slate-100 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-blue-700 fill-current" />
          <span className="font-black text-blue-900 tracking-tighter text-sm italic uppercase">MOKSHA PATAM</span>
        </div>
        <button onClick={handleReset} className="p-2 text-slate-600 active:scale-90 transition-transform">
          <RotateCcw className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 relative bg-slate-50 overflow-y-auto overflow-x-hidden">
        <div className="p-4 flex flex-col min-h-full">
          <div className="relative w-full max-w-sm mx-auto aspect-square border-[4px] border-blue-950 rounded-2xl overflow-hidden bg-white shadow-2xl">
            <div className="absolute inset-0 grid grid-cols-9 grid-rows-8">
              {Array.from({ length: ROWS * COLS }, (_, idx) => {
                const r = ROWS - 1 - Math.floor(idx / COLS);
                const c = Math.floor(idx / COLS) % 2 === 0 ? (COLS - 1 - (idx % COLS)) : (idx % COLS);
                const num = r * COLS + c + 1;
                return (
                  <div key={num} style={{ backgroundColor: getCellColor(num) }} className="border-[0.5px] border-slate-100 flex items-center justify-center">
                    <span className={`text-[9px] font-black ${WINNING_SQUARES.includes(num) ? 'text-amber-700' : 'text-slate-400'}`}>{num}</span>
                  </div>
                );
              })}
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {Object.entries(ladders).map(([start, data]) => <LadderComponent key={start} start={parseInt(start)} end={data.to} />)}
              {Object.entries(snakes).map(([start, data]) => <SnakeComponent key={start} start={parseInt(start)} end={data.to} color={data.color} />)}
            </svg>

            {(() => {
              const coords = getSquareCoords(playerPosition);
              return (
                <div
                  className="absolute w-6 h-6 -ml-3 -mt-3 transition-all duration-300 z-40 bg-blue-700 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-[10px] text-white font-black"
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                >
                  P
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
              disabled={isAnimating || isRolling || win}
              className="px-10 py-4 bg-blue-800 text-white text-sm font-black rounded-2xl shadow-xl active:scale-95 disabled:opacity-30 transition-all uppercase tracking-widest"
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
            <div className="space-y-4 pb-12">
              {lokasData.map(l => (
                <div key={l.level} className="p-5 bg-white rounded-2xl flex gap-4 items-start border-2 border-slate-100 shadow-sm">
                  <span className="font-black text-blue-800 text-2xl">0{l.level}</span>
                  <div>
                    <div className="text-[11px] font-black text-blue-900 uppercase tracking-wide">{l.name}</div>
                    <div className="text-[10px] text-slate-600 leading-snug font-medium mt-1">{l.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {modalData && (
          <div className="fixed inset-0 bg-blue-950/90 backdrop-blur-md z-[60] flex items-center justify-center p-8">
            <div className="w-full max-w-xs bg-white rounded-[2.5rem] p-8 text-center shadow-2xl border-b-[8px] border-blue-800">
              <div className="mb-6 inline-block p-4 rounded-full bg-slate-50 border-2 border-slate-100">
                {modalData.type === 'ladder' ? <Zap className="w-10 h-10 text-green-600 fill-current" /> : <ShieldCheck className="w-10 h-10 text-red-600 fill-current" />}
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{modalData.title || modalData.name}</h2>
              <p className="text-sm text-slate-600 mb-8 px-2 leading-relaxed font-medium">"{modalData.meaning}"</p>
              <button onClick={closeModal} className="w-full py-4 bg-blue-800 text-white text-base font-black rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
                OK
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="flex-none bg-white border-t-2 border-slate-100 p-4">
        <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md">
            {playerPosition}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-black text-slate-900 uppercase truncate tracking-tight">{currentSq?.name}</span>
              <span className="text-[10px] font-black text-blue-700">{currentSq?.translation}</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold truncate">{currentSq?.meaning}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
