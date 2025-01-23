import React, { useState } from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';

const BirthdayVouchers = () => {
  const [claimedVouchers, setClaimedVouchers] = useState(new Set());
  
  const vouchers = [
    {
      id: 1,
      title: "Movie Night",
      description: "Your choice of movie and snacks included! 🎬",
      icon: "🎬"
    },
    {
      id: 2,
      title: "Haidilao Supper",
      description: "Late night Haidilao feast together! 🍲",
      icon: "🥘"
    },
    {
      id: 3,
      title: "1 Special Request",
      description: "One special request of your choice! (within reason 😉)",
      icon: "✨"
    },
    {
      id: 4,
      title: "Farm In The City Date",
      description: "A fun day out at Farm In The City! 🐰",
      icon: "🌾"
    }
  ];

  const handleClaim = (id) => {
    setClaimedVouchers(prev => new Set([...prev, id]));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-4">
            <Sparkles className="text-pink-500" size={32} />
            <Heart className="text-pink-500" size={32} />
            <Gift className="text-pink-500" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            Happy Birthday, Bestie! 🎂
          </h1>
          <p className="text-lg text-gray-700">
            Birthday vouchers just for you! Click to claim and send to me to claim it! ❤️
          </p>
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vouchers.map((voucher) => (
            <div 
              key={voucher.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="text-4xl mb-4">{voucher.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-pink-600">
                {voucher.title}
              </h3>
              <p className="text-gray-600 mb-4">{voucher.description}</p>
              <button
                onClick={() => handleClaim(voucher.id)}
                disabled={claimedVouchers.has(voucher.id)}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  claimedVouchers.has(voucher.id)
                    ? "bg-gray-300 text-gray-600"
                    : "bg-pink-500 hover:bg-pink-600 text-white"
                }`}
              >
                {claimedVouchers.has(voucher.id) ? "Claimed! 💝" : "Claim Now! 🎁"}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12 text-gray-600">
          <p>Made with lots of love for your special day! 💕</p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayVouchers;
