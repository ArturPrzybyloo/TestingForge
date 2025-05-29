import React, { useState } from 'react';

const FLAG = 'FLAG-MUTATION-OBS';

type Product = { name: string; flag?: string };

const Challenge17DOMMutationObserver: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const [products, setProducts] = useState<Product[]>([
    { name: 'Product 1' },
    { name: 'Product 2' },
  ]);
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadMore = () => {
    setProducts(prev => [...prev, { name: 'Product 3', flag: FLAG }]);
  };

  const checkFlag = () => {
    if (flagInput.trim() === FLAG) {
      setFeedback('Challenge passed! 🎉');
      if (onComplete) onComplete();
      const done = JSON.parse(localStorage.getItem('forge_completed_challenges') || '{}');
      localStorage.setItem('forge_completed_challenges', JSON.stringify({ ...done, 17: true }));
    } else {
      setFeedback('Incorrect flag, try again. ❌');
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border-2 border-gray-700 max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2 text-green-400">DOM Mutation Observer</h2>
      <p className="text-gray-300 mb-4">On the product list, click "Load more". In the console, run the provided MutationObserver code. Then click "Load more" again – the flag will appear in the console.</p>
      <div className="mb-4 product-list">
        {products.map((prod, idx) => (
          <div key={idx} data-flag={prod.flag || undefined} className="bg-gray-700 rounded p-2 mb-2">{prod.name}</div>
        ))}
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium mt-2" onClick={loadMore}>Load more</button>
      </div>
      <pre className="bg-gray-900 text-yellow-400 rounded p-2 text-xs mb-2">{`const obs = new MutationObserver(ms=>{\n  ms.forEach(m=>m.addedNodes.forEach(n=>{\n    if(n.dataset.flag) console.log("FLAG:", n.dataset.flag);\n  }));\n});\nobs.observe(document.querySelector(".product-list"), { childList:true });`}</pre>
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-700 text-white mb-2"
        placeholder="Enter the flag..."
        value={flagInput}
        onChange={e => setFlagInput(e.target.value)}
      />
      <button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium shadow py-2 transition-colors" onClick={checkFlag}>Check Flag</button>
      <div className={`min-h-[24px] text-sm ${feedback.includes('passed') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</div>
    </div>
  );
};

export default Challenge17DOMMutationObserver; 