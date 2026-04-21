import React, { useState, useEffect } from 'react';
import { Scroll, History, Compass, Linkedin, ArrowUpCircle, ArrowDownCircle, Sparkles, X, Star } from 'lucide-react';

// --- CONSTANTS & DATA ---
const ROWS = 8;
const COLS = 9;
const TOTAL_SQUARES = ROWS * COLS; // 72
const WINNING_SQUARES = [67, 68, 69];

const squaresData = {
  1: { name: 'जन्म', translation: 'Birth', meaning: 'The start of your journey where you begin to discover "Who am I?"' },
  2: { name: 'माया', translation: 'Illusion', meaning: 'The powerful energy that makes things appear different from what they truly are.' },
  3: { name: 'क्रोध', translation: 'Anger', meaning: 'A hot emotion that arises when things don’t match our expectations.' },
  4: { name: 'लोभ', translation: 'Greed', meaning: 'The feeling of never having enough and always wanting more for yourself.' },
  5: { name: 'भू-लोक', translation: 'Physical Plane', meaning: 'The physical world where we experience life through our five senses.' },
  6: { name: 'मोह', translation: 'Delusion', meaning: 'Giving too much power to worldly objects and getting lost in them.' },
  7: { name: 'मद', translation: 'Pride', meaning: 'An exaggerated sense of your own qualities that makes you feel superior.' },
  8: { name: 'काम', translation: 'Desire', meaning: 'A craving for things that keeps you busy in the cycle of wanting and getting.' },
  9: { name: 'तप', translation: 'Austerity', meaning: 'Disciplining your mind and body to reach a higher goal.' },
  10: { name: 'गंधर्व', translation: 'Celestial Musician', meaning: 'A state of joy and harmony after overcoming worldly attractions.' },
  11: { name: 'ईर्ष्या', translation: 'Jealousy', meaning: 'Feeling unhappy because of someone else’s success or possessions.' },
  12: { name: 'अंतरिक्ष', translation: 'Astral Plane', meaning: 'A space of indecision where you decide your next direction.' },
  13: { name: 'भुवलोक', translation: 'Subtle Plane', meaning: 'The plane of thoughts and imagination where your inner life begins to grow.' },
  14: { name: 'नागलोक', translation: 'Fantasy', meaning: 'Getting lost in daydreams where everything seems possible but isn’t real.' },
  15: { name: 'मत्सर्य', translation: 'Envy', meaning: 'Resenting others because of perceived threats to your own status.' },
  16: { name: 'दया', translation: 'Compassion', meaning: 'Feeling and acting with kindness toward all living beings.' },
  17: { name: 'हर्ष', translation: 'Joy', meaning: 'The excitement and cheerfulness of youth before adult responsibilities.' },
  18: { name: 'दाना', translation: 'Charity', meaning: 'Giving to others selflessly to help the world.' },
  19: { name: 'कर्म-योग', translation: 'Selfless Action', meaning: 'Doing your duty carefully without worrying about what you get back.' },
  20: { name: 'सुसंगती', translation: 'Good Company', meaning: 'Being with wise people who help you stay on the right path.' },
  21: { name: 'प्रायश्चित्त', translation: 'Atonement', meaning: 'Taking responsibility for mistakes and working to fix them.' },
  22: { name: 'धर्म', translation: 'Righteousness', meaning: 'Living by natural laws and moral values that support the world.' },
  23: { name: 'स्वर्ग', translation: 'Paradise', meaning: 'A temporary place of rest and reward for your good deeds.' },
  24: { name: 'कुसंगती', translation: 'Bad Company', meaning: 'Associating with negative influences that lead you away from truth.' },
  25: { name: 'यक्ष', translation: 'Guardian Spirit', meaning: 'The state of guarding your inner treasures and values.' },
  26: { name: 'दुःख', translation: 'Sorrow', meaning: 'The emotional pain that comes from being too attached to the world.' },
  27: { name: 'परमार्थ', translation: 'Altruism', meaning: 'The highest good where you put others’ needs before your own.' },
  28: { name: 'सुधर्म', translation: 'Right Conduct', meaning: 'Acting according to your unique strengths and talents for the good of all.' },
  29: { name: 'अधर्म', translation: 'Unrighteousness', meaning: 'Acting in ways that go against the truth and cause harm.' },
  30: { name: 'उत्तमगती', translation: 'Higher Progress', meaning: 'Moving forward by building positive and constructive habits.' },
  31: { name: 'यक्ष', translation: 'Spirit', meaning: 'Connecting with the divine energy that protects life.' },
  32: { name: 'महालौक', translation: 'Plane of Sages', meaning: 'A peaceful state where your heart and head work together.' },
  33: { name: 'गंध', translation: 'Smell', meaning: 'The essence of the earth that can trigger deep memories.' },
  34: { name: 'रस', translation: 'Taste', meaning: 'Enjoying the different "flavors" of life in a balanced way.' },
  35: { name: 'नरक', translation: 'Purgatory', meaning: 'A state of suffering caused by ignoring your own inner truth.' },
  36: { name: 'स्वच्छ', translation: 'Purity', meaning: 'Being honest and transparent about your strengths and weaknesses.' },
  37: { name: 'ज्ञान', translation: 'Wisdom', meaning: 'Understanding your true self and your place in the universe.' },
  38: { name: 'प्राण', translation: 'Vital Breath', meaning: 'The energy that flows through you and keeps you alive.' },
  39: { name: 'अपान', translation: 'Elimination', meaning: 'The force that helps you let go of what you no longer need.' },
  40: { name: 'व्यान', translation: 'Circulation', meaning: 'The energy that distributes life-force throughout your whole being.' },
  41: { name: 'जनलोक', translation: 'Human Consciousness', meaning: 'The plane where you begin to see the world with a clear, unbiased vision.' },
  42: { name: 'अग्नी', translation: 'Fire', meaning: 'The energy of transformation that burns away ignorance.' },
  43: { name: 'मनुष्य', translation: 'Humanity', meaning: 'The state of being a responsible, conscious human being.' },
  44: { name: 'अविद्या', translation: 'Ignorance', meaning: 'Not knowing the truth, which keeps you stuck in old habits.' },
  45: { name: 'सुविद्या', translation: 'Higher Learning', meaning: 'Direct knowledge that leads you toward liberation.' },
  46: { name: 'विवेक', translation: 'Discrimination', meaning: 'The ability to tell what is real from what is just an illusion.' },
  47: { name: 'सरस्वती', translation: 'Knowledge', meaning: 'Wisdom that helps you stay neutral and balanced.' },
  48: { name: 'यमुना', translation: 'Activity', meaning: 'The solar side of your energy that represents activity.' },
  49: { name: 'गंगा', translation: 'Calmness', meaning: 'The lunar side of your energy that represents calmness.' },
  50: { name: 'तपोलोक', translation: 'Austerity Plane', meaning: 'Purifying yourself through discipline and focus.' },
  51: { name: 'पृथ्वी', translation: 'Earth', meaning: 'The material world where we must fulfill our physical duties.' },
  52: { name: 'हिंसा', translation: 'Violence', meaning: 'Harmful actions that pull you down to lower states of being.' },
  53: { name: 'जल', translation: 'Water', meaning: 'The element that represents purity and the flow of life.' },
  54: { name: 'भक्ती', translation: 'Devotion', meaning: 'Total love and surrender to a higher purpose.' },
  55: { name: 'अहंकार', translation: 'Ego', meaning: 'The false sense of "I" that makes you feel separate from others.' },
  56: { name: 'ॐ', translation: 'Om', meaning: 'The primordial sound that connects everything in existence.' },
  57: { name: 'वायु', translation: 'Air', meaning: 'The subtle energy that moves through the universe and your body.' },
  58: { name: 'तेज', translation: 'Radiance', meaning: 'Your inner light that shines when you are focused and pure.' },
  59: { name: 'सत्यलोक', translation: 'Truth Plane', meaning: 'The highest created plane where you manage your thoughts perfectly.' },
  60: { name: 'सुबुद्धी', translation: 'Right Intellect', meaning: 'Using your intelligence to do good for the world.' },
  61: { name: 'दुर्बुद्धी', translation: 'Wrong Intellect', meaning: 'Using your cleverness in a way that harms yourself or others.' },
  62: { name: 'सुख', translation: 'Happiness', meaning: 'A steady state of contentment that comes from inner peace.' },
  63: { name: 'तामस', translation: 'Inertia', meaning: 'Feeling lazy or stuck in old ways that stop your progress.' },
  64: { name: 'प्रकृती', translation: 'Nature', meaning: 'The material energy that makes up everything we see.' },
  65: { name: 'उरंत', translation: 'Inner Space', meaning: 'Expanding your consciousness beyond your small, separate self.' },
  66: { name: 'आनंद', translation: 'Bliss', meaning: 'Pure joy that doesn’t depend on anything outside of you.' },
  67: { name: 'शिव', translation: 'Pure Awareness', meaning: 'The state of being totally aware and free from ignorance.' },
  68: { name: 'ईश्वर', translation: 'Cosmic Lord', meaning: 'Connecting with the supreme consciousness that runs the universe.' },
  69: { name: 'ब्रह्मा', translation: 'The Creator', meaning: 'Realizing you are part of the intelligent design of the world.' },
  70: { name: 'सत्त्व', translation: 'Goodness', meaning: 'The quality of light, peace, and harmony in the soul.' },
  71: { name: 'रजस', translation: 'Passion', meaning: 'The energy of activity, desire, and restlessness.' },
  72: { name: 'तमस', translation: 'Darkness', meaning: 'The state of complete ignorance and confusion.' },
};

const ladders = {
  9: { to: 23, title: 'तप (Austerity)', meaning: 'Self-discipline and focus elevate the soul to celestial rewards.' },
  17: { to: 69, title: 'दया (Compassion)', meaning: 'Pure empathy for all beings leads directly to the Creator.' },
  27: { to: 41, title: 'परमार्थ (Altruism)', meaning: 'Selfless service raises consciousness to the plane of humanity.' },
  28: { to: 50, title: 'सुधर्म (Right Conduct)', meaning: 'Following your true duty accelerates spiritual progress.' },
  37: { to: 66, title: 'ज्ञान (Wisdom)', meaning: 'Deep understanding of reality leads to eternal bliss.' },
  46: { to: 62, title: 'विवेक (Discrimination)', meaning: 'Choosing truth over illusion results in genuine happiness.' },
  54: { to: 68, title: 'भक्ती (Devotion)', meaning: 'Absolute love and surrender connect the seeker to the Supreme.' },
  60: { to: 67, title: 'सुबुद्धी (Right Intellect)', meaning: 'A purified mind leads directly to pure awareness.' }
};

const snakes = {
  16: { to: 4, title: 'मत्सर (Envy)', color: '#DC2626' },
  24: { to: 7, title: 'कुसंगती (Bad Company)', color: '#8B5CF6' },
  29: { to: 6, title: 'अधर्म (Unrighteousness)', color: '#F97316' },
  44: { to: 22, title: 'अविद्या (Ignorance)', color: '#0EA5E9' },
  52: { to: 35, title: 'हिंसा (Violence)', color: '#10B981' },
  55: { to: 3, title: 'अहंकार (Ego)', color: '#EC4899' },
  61: { to: 13, title: 'दुर्बुद्धी (Wrong Intellect)', color: '#6366F1' },
  63: { to: 2, title: 'तामस (Inertia)', color: '#A855F7' },
  72: { to: 51, title: 'तमस (Darkness)', color: '#1F2937' }
};

// --- HELPER FUNCTIONS ---

const getSquareCoords = (num, verticalOffset = 'center') => {
  const rowFromBottom = Math.floor((num - 1) / COLS);
  const colIndex = (num - 1) % COLS;
  const actualCol = rowFromBottom % 2 === 0 ? colIndex : (COLS - 1) - colIndex;

  const cellWidth = 900 / COLS;
  const cellHeight = 800 / ROWS;

  const x = actualCol * cellWidth + (cellWidth / 2);
  let yBase = (ROWS - rowFromBottom - 1) * cellHeight;

  let y;
  if (verticalOffset === 'top') {
    y = yBase + (cellHeight * 0.25);
  } else if (verticalOffset === 'bottom') {
    y = yBase + (cellHeight * 0.75);
  } else {
    y = yBase + (cellHeight / 2);
  }

  return { x, y };
};

const getCellColor = (num) => {
  if (WINNING_SQUARES.includes(num)) return '#fcd34d';
  const rowFromBottom = Math.floor((num - 1) / COLS);

  const rowColors = [
    '#dbeafe', '#dcfce7', '#fef9c3', '#ffedd5',
    '#fee2e2', '#f3e8ff', '#fce7f3', '#ecfeff'
  ];

  const colIndex = (num - 1) % COLS;
  const isEven = (rowFromBottom + colIndex) % 2 === 0;

  if (isEven) return rowColors[rowFromBottom % 8];

  const darkerColors = [
    '#bfdbfe', '#bbf7d0', '#fef08a', '#fed7aa', '#fecaca', '#e9d5ff', '#fbcfe8', '#cffafe'
  ];
  return darkerColors[rowFromBottom % 8];
};

// --- COMPONENTS ---

const LadderComponent = ({ start, end }) => {
  const s = getSquareCoords(start, 'top');
  const e = getSquareCoords(end, 'bottom');
  const angle = Math.atan2(e.y - s.y, e.x - s.x);
  const dist = Math.sqrt(Math.pow(e.x - s.x, 2) + Math.pow(e.y - s.y, 2));
  const railOffset = 12;
  const offsetX = Math.sin(angle) * railOffset;
  const offsetY = -Math.cos(angle) * railOffset;

  const rungCount = Math.max(3, Math.floor(dist / 30));
  const rungs = [];

  const woodDark = "#A16207";
  const woodLight = "#EAB308";

  for (let i = 1; i < rungCount; i++) {
    const t = i / rungCount;
    const rx = s.x + (e.x - s.x) * t;
    const ry = s.y + (e.y - s.y) * t;
    rungs.push(
      <line
        key={i}
        x1={rx - offsetX} y1={ry - offsetY}
        x2={rx + offsetX} y2={ry + offsetY}
        stroke={woodDark}
        strokeWidth="6"
        strokeLinecap="round"
      />
    );
  }

  return (
    <g className="ladder-group">
      <line x1={s.x - offsetX} y1={s.y - offsetY} x2={e.x - offsetX} y2={e.y - offsetY} stroke={woodDark} strokeWidth="8" strokeLinecap="round" />
      <line x1={s.x + offsetX} y1={s.y + offsetY} x2={e.x + offsetX} y2={e.y + offsetY} stroke={woodDark} strokeWidth="8" strokeLinecap="round" />
      <line x1={s.x - offsetX + 2} y1={s.y - offsetY} x2={e.x - offsetX + 2} y2={e.y - offsetY} stroke={woodLight} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {rungs}
    </g>
  );
};

const SnakeComponent = ({ start, end, color }) => {
  const s = getSquareCoords(start, 'bottom');
  const e = getSquareCoords(end, 'top');
  const midX = (s.x + e.x) / 2;
  const midY = (s.y + e.y) / 2;

  const cp1x = midX + (s.y - e.y) * 0.4;
  const cp1y = midY + (e.x - s.x) * 0.4;
  const cp2x = midX - (s.y - e.y) * 0.4;
  const cp2y = midY - (e.x - s.x) * 0.4;

  const pathD = `M ${s.x} ${s.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${e.x} ${e.y}`;

  return (
    <g className="snake-group">
      <path d={pathD} fill="none" stroke="black" strokeWidth="16" strokeLinecap="round" opacity="0.1" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray="15,5" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.6" />
      <circle cx={s.x} cy={s.y} r="10" fill={color} />
      <circle cx={s.x - 3} cy={s.y - 3} r="2.5" fill="white" />
      <circle cx={s.x + 3} cy={s.y - 3} r="2.5" fill="white" />
      <path d={`M ${s.x} ${s.y+2} L ${s.x} ${s.y+10}`} stroke="#ef4444" strokeWidth="2" />
    </g>
  );
};

const Dice = ({ rolling, value, onRoll, disabled, currentPlayer }) => {
  const [displayValue, setDisplayValue] = useState(value);
  useEffect(() => {
    let interval;
    if (rolling) { interval = setInterval(() => setDisplayValue(Math.floor(Math.random() * 6) + 1), 80); }
    else { setDisplayValue(value); }
    return () => clearInterval(interval);
  }, [rolling, value]);

  const positions = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[20, 20], [50, 50], [80, 80]],
    4: [[25, 25], [25, 75], [75, 25], [75, 75]],
    5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
    6: [[25, 20], [25, 50], [25, 80], [75, 20], [75, 50], [75, 80]]
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={`w-28 h-28 bg-white rounded-3xl shadow-2xl border-8 flex items-center justify-center transition-all ${currentPlayer === 1 ? "border-blue-600 shadow-blue-200" : "border-red-600 shadow-red-200"} ${rolling ? 'animate-bounce' : ''}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full p-3">
          {positions[displayValue]?.map((pos, i) => <circle key={i} cx={pos[0]} cy={pos[1]} r="10" fill={currentPlayer === 1 ? '#2563eb' : '#dc2626'} />)}
        </svg>
      </div>
      <button
        onClick={onRoll}
        disabled={disabled || rolling}
        className={`px-12 py-5 text-white font-black text-xl rounded-2xl shadow-xl transition-all disabled:opacity-50 active:scale-95 uppercase tracking-widest ${currentPlayer === 1 ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-200' : 'bg-red-600 hover:bg-red-500 shadow-red-200'}`}
      >
        {rolling ? 'SHAKING...' : `ROLL!`}
      </button>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('game');
  const [playerPositions, setPlayerPositions] = useState({ 1: 1, 2: 1 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isTwoPlayer, setIsTwoPlayer] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [win, setWin] = useState(false);
  const [rollAnnouncer, setRollAnnouncer] = useState(null);

  const showModal = (type, data, onAction) => setModalData({ type, ...data, onAction });
  const closeModal = () => {
    if (modalData?.onAction) modalData.onAction();
    setModalData(null);
  };

  const handleRoll = async () => {
    if (isAnimating || isRolling || win) return;
    setIsRolling(true);
    const roll = Math.floor(Math.random() * 6) + 1;
    await new Promise(r => setTimeout(r, 1000));
    setDiceValue(roll);
    setIsRolling(false);

    let currentPos = playerPositions[currentPlayer];
    let target = Math.min(currentPos + roll, TOTAL_SQUARES);

    setRollAnnouncer({ roll, target, targetName: squaresData[target].name });
    await new Promise(r => setTimeout(r, 2000));
    setRollAnnouncer(null);

    setIsAnimating(true);
    for (let i = currentPos + 1; i <= target; i++) {
      setPlayerPositions(prev => ({ ...prev, [currentPlayer]: i }));
      await new Promise(r => setTimeout(r, 150));
    }

    if (WINNING_SQUARES.includes(target)) {
      setWin(true);
      showModal('win', { title: squaresData[target].name, englishTitle: squaresData[target].translation, description: squaresData[target].meaning });
    } else if (ladders[target]) {
      const lad = ladders[target];
      setTimeout(() => {
        showModal('ladder', { title: lad.title, englishTitle: squaresData[target].translation, description: lad.meaning }, () => {
          setPlayerPositions(prev => ({ ...prev, [currentPlayer]: lad.to }));
          nextTurn();
        });
      }, 400);
    } else if (snakes[target]) {
      const snk = snakes[target];
      const sqInfo = squaresData[target];
      setTimeout(() => {
        showModal('snake', { title: snk.title, englishTitle: sqInfo.translation, description: sqInfo.meaning }, () => {
          setPlayerPositions(prev => ({ ...prev, [currentPlayer]: snk.to }));
          nextTurn();
        });
      }, 400);
    } else {
      nextTurn();
    }
  };

  const nextTurn = () => {
    setIsAnimating(false);
    if (isTwoPlayer) setCurrentPlayer(p => p === 1 ? 2 : 1);
  };

  const handleReset = () => {
    setPlayerPositions({ 1: 1, 2: 1 });
    setCurrentPlayer(1);
    setWin(false);
    setModalData(null);
    setRollAnnouncer(null);
  };

  const currentSquareInfo = squaresData[playerPositions[currentPlayer]];

  return (
    <div className="min-h-screen bg-[#f0f9ff] flex flex-col font-sans overflow-x-hidden">
      <div className="h-3 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400" />

      <nav className="h-24 bg-white shadow-lg flex items-center justify-between px-8 sticky top-0 z-50 border-b-4 border-blue-100">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg rotate-3">
              <Star className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-3xl text-blue-900 tracking-tight leading-none italic">MOKSHA PATAM</span>
              <span className="text-xs font-black text-blue-500 tracking-widest uppercase mt-1">THE GREAT JOURNEY</span>
            </div>
          </div>
          <div className="flex bg-blue-50 p-2 rounded-3xl border-2 border-blue-100">
            <button onClick={() => setActiveTab('game')} className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'game' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-blue-900 opacity-50'}`}>PLAY BOARD</button>
            <button onClick={() => setActiveTab('knowledge')} className={`px-8 py-3 rounded-2xl text-sm font-black transition-all ${activeTab === 'knowledge' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-blue-900 opacity-50'}`}>LEARN</button>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-12 max-w-[1700px] mx-auto w-full">
        {activeTab === 'game' ? (
          <div className="flex flex-col xl:flex-row gap-16 justify-center items-start">
            <div className="relative w-full max-w-[1000px] group">
              <div className="relative aspect-[9/8] bg-white rounded-[3rem] shadow-2xl border-[16px] border-blue-900 overflow-hidden ring-[12px] ring-white">
                <div className="absolute inset-0 grid grid-cols-9 grid-rows-8">
                  {Array.from({ length: ROWS * COLS }, (_, idx) => {
                    const r = ROWS - 1 - Math.floor(idx / COLS);
                    const c = Math.floor(idx / COLS) % 2 === 0 ? (COLS - 1 - (idx % COLS)) : (idx % COLS);
                    const num = r * COLS + c + 1;
                    const sq = squaresData[num];
                    const isTarget = rollAnnouncer?.target === num;
                    return (
                      <div
                        key={num}
                        onClick={() => showModal('info', { title: sq.name, englishTitle: sq.translation, description: sq.meaning })}
                        className={`relative border-2 border-white/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${isTarget ? 'z-40 ring-8 ring-yellow-400 scale-110 shadow-2xl' : 'hover:scale-105 hover:z-30 hover:shadow-xl'}`}
                        style={{ backgroundColor: getCellColor(num) }}
                      >
                        <span className="absolute top-1 left-2 text-xs font-black text-blue-900/30">{num}</span>
                        <span className="text-sm md:text-lg font-black text-blue-950 font-serif mb-0.5">{sq.name}</span>
                        <span className="text-[9px] text-blue-800 font-bold bg-white/40 px-1.5 py-0.5 rounded-full uppercase">{sq.translation}</span>
                      </div>
                    );
                  })}
                </div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 900 800">
                  {Object.entries(ladders).map(([start, data]) => <LadderComponent key={start} start={parseInt(start)} end={data.to} />)}
                  {Object.entries(snakes).map(([start, data]) => <SnakeComponent key={start} start={parseInt(start)} end={data.to} color={data.color} />)}
                </svg>

                {[1, 2].map(p => {
                  if (p === 2 && !isTwoPlayer) return null;
                  const coords = getSquareCoords(playerPositions[p]);
                  const active = currentPlayer === p;
                  return (
                    <div key={p} className={`absolute w-14 h-14 -ml-7 -mt-7 transition-all duration-300 z-40 flex items-center justify-center ${active ? 'scale-125 z-50' : 'opacity-80'}`} style={{ left: `${(coords.x/900)*100}%`, top: `${(coords.y/800)*100}%` }}>
                      <div className={`w-full h-full rounded-full border-4 border-white shadow-2xl ${p === 1 ? 'bg-blue-600' : 'bg-red-600'} flex items-center justify-center text-white text-lg font-black animate-pulse`}>P{p}</div>
                    </div>
                  );
                })}

                {rollAnnouncer && (
                  <div className="absolute inset-0 z-[60] bg-blue-950/40 backdrop-blur-[2px] flex items-center justify-center animate-in fade-in duration-300">
                    <div className="bg-white p-12 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] border-b-[12px] border-yellow-400 scale-125 animate-in zoom-in-75 duration-300 flex flex-col items-center">
                      <div className="text-8xl font-black text-blue-600 mb-4">{rollAnnouncer.roll}</div>
                      <div className="text-2xl font-black text-blue-950 uppercase tracking-widest mb-2">You Rolled!</div>
                      <div className="flex items-center gap-2 text-blue-500 font-bold">
                        <span>Moving to</span>
                        <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800">#{rollAnnouncer.target}</span>
                      </div>
                      <div className="mt-6 text-4xl font-serif font-black text-blue-900 border-t-2 border-blue-50 pt-4">
                        {rollAnnouncer.targetName}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-8 py-2 rounded-full font-black text-sm shadow-xl z-30">
                FINISH AT THE GOLDEN SQUARES!
              </div>
            </div>

            <div className="w-full xl:w-[400px] space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border-4 border-blue-50 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
                <div className="flex bg-blue-50 p-2 rounded-2xl mb-8">
                  <button onClick={() => { setIsTwoPlayer(false); handleReset(); }} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${!isTwoPlayer ? 'bg-white shadow-md text-blue-600 scale-105' : 'text-blue-900 opacity-30'}`}>SOLO MODE</button>
                  <button onClick={() => { setIsTwoPlayer(true); handleReset(); }} className={`flex-1 py-3 text-xs font-black rounded-xl transition-all ${isTwoPlayer ? 'bg-white shadow-md text-blue-600 scale-105' : 'text-blue-900 opacity-30'}`}>DUO MODE</button>
                </div>
                <Dice rolling={isRolling} value={diceValue} onRoll={handleRoll} disabled={isAnimating || win || rollAnnouncer} currentPlayer={currentPlayer} />
              </div>

              <div className={`bg-gradient-to-br p-10 rounded-[3.5rem] text-white shadow-2xl border-b-8 transition-colors duration-500 relative overflow-hidden ${currentPlayer === 1 ? 'from-blue-600 to-indigo-700 border-blue-900' : 'from-red-600 to-rose-700 border-red-900'}`}>
                <div className="absolute top-0 right-0 p-6 opacity-20 rotate-12">
                  <Sparkles className="w-24 h-24" />
                </div>

                <h4 className="text-xs font-black uppercase text-white/60 mb-6 tracking-[0.3em] flex items-center gap-3">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  CURRENT STATE
                </h4>

                <div className="relative z-10 space-y-4">
                  <div className="text-5xl font-serif font-black drop-shadow-lg">{currentSquareInfo?.name}</div>
                  <div className="text-xl font-bold text-white uppercase tracking-widest">{currentSquareInfo?.translation}</div>
                  <div className="h-1 bg-white/20 w-16 rounded-full my-6" />
                  <p className="text-lg text-white/90 leading-relaxed font-medium">
                    {currentSquareInfo?.meaning}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-inner ${currentPlayer === 1 ? 'bg-blue-400' : 'bg-red-400'}`}>P{currentPlayer}</div>
                  <span className="text-xs font-black uppercase tracking-widest">Your Turn to Advance</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-12 pb-24">
            <h2 className="text-6xl font-black text-blue-950 font-serif text-center uppercase tracking-tighter">THE ANCIENT WISDOM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[3rem] border-4 border-blue-100 shadow-2xl hover:border-blue-300 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <History className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 mb-4 uppercase">The History</h3>
                <p className="text-lg text-slate-600 leading-relaxed">This game was born in India hundreds of years ago! It wasn't just for fun—it was like a map of the heart, showing how good choices (Ladders) help us grow and mistakes (Snakes) help us learn.</p>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border-4 border-green-100 shadow-2xl hover:border-green-300 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Compass className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-green-900 mb-4 uppercase">The Goal</h3>
                <p className="text-lg text-slate-600 leading-relaxed">Try to reach the top where the golden squares are. Each square tells a story about life. The ladders take you up fast, but be careful of the colored snakes!</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-16 bg-blue-950 text-white mt-auto">
        <div className="flex flex-col items-center gap-6">
          <div className="text-2xl font-serif font-black uppercase tracking-[0.5em] text-blue-400">NITIN DESHMUKH</div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/deshmukh-nitin" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/10 px-8 py-3 rounded-2xl text-xs font-black uppercase hover:bg-white/20 transition-all border border-white/5 shadow-2xl">
              <Linkedin className="w-5 h-5 text-blue-400" />
              <span>CONNECT ON LINKEDIN</span>
            </a>
          </div>
        </div>
      </footer>

      {modalData && (
        <div className="fixed inset-0 bg-blue-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in zoom-in-95 duration-200">
          <div className="bg-white rounded-[4rem] p-10 md:p-14 max-w-xl w-full shadow-[0_0_100px_rgba(37,99,235,0.3)] border-b-[16px] border-blue-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-400 via-green-400 to-yellow-400" />
            <button onClick={closeModal} className="absolute top-10 right-10 p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
              <X className="w-8 h-8 text-blue-900" />
            </button>

            <div className="space-y-4 mb-10">
              <div className="text-7xl font-black text-blue-950 font-serif tracking-tighter">{modalData.title}</div>
              <div className="text-2xl font-black text-blue-600 uppercase tracking-widest">{modalData.englishTitle}</div>
            </div>

            <div className="space-y-6 mb-12">
              <div className="inline-block px-4 py-1 bg-blue-900 text-white text-xs font-black rounded-full uppercase tracking-widest">THE WISDOM</div>
              <p className="text-2xl text-slate-700 font-bold leading-tight">"{modalData.description}"</p>
            </div>

            <button onClick={closeModal} className="w-full py-6 bg-blue-600 text-white font-black rounded-[2rem] shadow-2xl hover:bg-blue-500 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-lg ring-4 ring-blue-100">CONTINUE JOURNEY</button>
          </div>
        </div>
      )}
    </div>
  );
}
