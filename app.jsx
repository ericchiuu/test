import React, { useState } from 'react';

export default function DateInvite() {
  const [stage, setStage] = useState('envelope');
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    { emoji: '🎬', text: 'Late night movie and dinner' },
    { emoji: '🎨', text: 'Clay date' },
    { emoji: '🍽️', text: 'All you can eat' },
    { emoji: '🍰', text: 'Baking/cooking together' },
    { emoji: '⭐', text: 'Star/moon gazing' },
    { emoji: '⛳', text: 'Mini golf and hangout' },
    { emoji: '☕', text: 'Cafe/picnic' },
    { emoji: '🕹️', text: 'Arcade' },
    { emoji: '🌳', text: 'Park/botanical/museum' },
    { emoji: '🎲', text: 'Board game night' },
    { emoji: '💕', text: 'Let me pick' }
  ];

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);
    setTimeout(() => setStage('invitation'), 600);
  };

  const handleNoClick = (e) => {
    e.stopPropagation();
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    
    if (newCount >= 15) {
      setStage('activity');
    }
  };

  const handleYesClick = () => {
    setStage('activity');
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivity(activity);
  };

  const handleContinue = () => {
    if (selectedActivity) {
      setStage('final');
    }
  };

  const handleRestart = () => {
    setStage('envelope');
    setEnvelopeOpened(false);
    setNoClickCount(0);
    setSelectedActivity(null);
  };

  const growthFactor = 1 + (noClickCount * 0.3);
  const shrinkFactor = Math.max(0.3, 1 - (noClickCount * 0.05));

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    }}>
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 5}s infinite`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          >
            {['💕', '💖', '💗', '✨'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(100vh) rotate(0deg); }
          50% { transform: translateY(-100vh) rotate(180deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease; }
        .animate-shake { animation: shake 0.5s ease; }
      `}</style>

      {/* Stage 1: Envelope */}
      {stage === 'envelope' && (
        <div className="text-center z-10 animate-fade-in">
          <div 
            onClick={handleEnvelopeClick}
            className="inline-block cursor-pointer transition-transform hover:scale-105"
          >
            <div className="w-80 h-56 bg-white rounded-2xl shadow-2xl relative flex items-center justify-center">
              <div 
                className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center transition-opacity duration-600 ${envelopeOpened ? 'opacity-0' : 'opacity-100'}`}
                style={{ background: 'linear-gradient(135deg, #ffb3ba 0%, #ff6b9d 100%)' }}
              >
                <div className="text-5xl mb-3">💌</div>
                <div className="text-white text-3xl font-semibold mb-2">For Joyce</div>
                <div className="text-white text-base">Click to open</div>
              </div>
              <div className="text-center text-pink-500 text-xl">
                ✨ Click to reveal ✨
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Invitation */}
      {stage === 'invitation' && (
        <div className="bg-white rounded-3xl p-12 max-w-lg w-full shadow-2xl z-10 animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-pink-500 text-2xl font-semibold mb-4">Dear Joyce 💐</div>
            <div className="text-pink-400 text-3xl font-semibold mb-6">Hi Poo! 🥰</div>
          </div>
          <div className="text-gray-600 leading-relaxed mb-8 text-center text-lg">
            I miss you a lot still and was wondering if you'd be down to go on a date with me again? 🌸
            <br /><br />
            No pressure, just thought we could hang out as best friends again. 💕
          </div>
          <div className="flex gap-4 relative">
            <button
              onClick={handleYesClick}
              className="flex-1 px-6 py-4 rounded-2xl text-xl font-semibold text-white shadow-lg transition-all hover:scale-105 hover:-translate-y-1 z-10"
              style={{
                background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                transform: `scale(${growthFactor})`,
                flex: growthFactor
              }}
            >
              Yes♥
            </button>
            <button
              onClick={handleNoClick}
              className="flex-1 px-6 py-4 rounded-2xl text-xl font-semibold text-gray-600 shadow-lg transition-all hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                transform: `scale(${shrinkFactor})`
              }}
            >
              No&lt;3
            </button>
          </div>
        </div>
      )}

      {/* Stage 3: Activity Selection */}
      {stage === 'activity' && (
        <div className="bg-white rounded-3xl p-12 max-w-2xl w-full shadow-2xl z-10 animate-fade-in">
          <h2 className="text-pink-500 text-3xl text-center font-semibold mb-3">Pick a Date Activity! ✨</h2>
          <p className="text-pink-400 text-center mb-8">What sounds fun to you?</p>
          
          <div className="grid grid-cols-2 gap-3 mb-5">
            {activities.map((activity, idx) => (
              <div
                key={idx}
                onClick={() => handleActivitySelect(activity.text)}
                className={`rounded-2xl p-5 cursor-pointer transition-all text-center font-medium border-3 ${
                  selectedActivity === activity.text
                    ? 'text-white border-pink-500'
                    : 'text-gray-600 border-pink-300 hover:-translate-y-1'
                }`}
                style={{
                  background: selectedActivity === activity.text
                    ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)'
                    : 'linear-gradient(135deg, #fff5f7 0%, #ffe8f0 100%)',
                  gridColumn: activity.text === 'Let me pick' ? '1 / -1' : 'auto'
                }}
              >
                {activity.emoji} {activity.text}
              </div>
            ))}
          </div>
          
          <button
            onClick={handleContinue}
            disabled={!selectedActivity}
            className="w-full px-6 py-4 rounded-2xl text-xl font-semibold text-white shadow-lg transition-all mt-5 disabled:opacity-50 disabled:cursor-not-allowed hover:enabled:-translate-y-1"
            style={{
              background: selectedActivity 
                ? 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)'
                : 'linear-gradient(135deg, #ddd 0%, #ccc 100%)'
            }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* Stage 4: Final Details */}
      {stage === 'final' && (
        <div className="bg-white rounded-3xl p-12 max-w-xl w-full shadow-2xl z-10 animate-fade-in">
          <h2 className="text-pink-500 text-4xl text-center font-semibold mb-8">Joyce and Eric's Date Details 💕</h2>
          
          <div className="rounded-3xl p-8 mb-6 border-3 border-pink-300" style={{
            background: 'linear-gradient(135deg, #fff5f7 0%, #ffe8f0 100%)'
          }}>
            <div className="mb-5">
              <div className="text-pink-500 font-semibold text-lg mb-1">Selected Activity:</div>
              <div className="text-gray-600 text-xl">{selectedActivity}</div>
            </div>
            <div className="mb-5">
              <div className="text-pink-500 font-semibold text-lg mb-1">Date Details:</div>
              <div className="text-gray-600 text-xl">Winter Break</div>
            </div>
            <div className="mb-5">
              <div className="text-pink-500 font-semibold text-lg mb-1">Where:</div>
              <div className="text-gray-600 text-xl">TBD</div>
            </div>
            <div className="mb-5">
              <div className="text-pink-500 font-semibold text-lg mb-1">What to bring:</div>
              <div className="text-gray-600 text-xl">Your lovely self</div>
            </div>
            <div className="mt-5 pt-5 border-t-2 border-dashed border-pink-300 font-bold" style={{ color: '#d1477a' }}>
              P.S. Send me a screenshot of this bc the website doesn't actually send me any updates &lt;3 :)
            </div>
          </div>
          
          <div className="text-center text-pink-500 text-2xl font-semibold italic my-6">
            I'm SO EXCITED!!!!!!!!!
          </div>
          
          <button
            onClick={handleRestart}
            className="w-full px-6 py-4 rounded-2xl text-lg font-semibold text-gray-600 shadow-lg transition-all hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)' }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
