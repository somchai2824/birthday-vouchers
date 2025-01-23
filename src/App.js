import React, { useState, useEffect } from 'react';
import { Heart, Gift, Sparkles, Lock, Unlock } from 'lucide-react';

const BirthdayVouchers = () => {
  // Store both the ID and timestamp of claimed vouchers
  const [claimedVouchers, setClaimedVouchers] = useState(() => {
    const saved = localStorage.getItem('claimedVouchers');
    return saved ? JSON.parse(saved) : {};
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  const [notification, setNotification] = useState(null);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

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

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClaim = (id) => {
    setClaimedVouchers(prev => {
      const newClaimed = {
        ...prev,
        [id]: {
          timestamp: new Date().toISOString(),
          claimed: true
        }
      };
      localStorage.setItem('claimedVouchers', JSON.stringify(newClaimed));
      showNotification('Voucher claimed successfully! 🎉');
      return newClaimed;
    });
  };

  const handleAdminLogin = () => {
    // Replace 'your-secret-password' with your chosen password
    if (adminPassword === 'your-secret-password') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      setShowAdminPrompt(false);
      showNotification('Admin access granted! 🔓', 'success');
    } else {
      showNotification('Incorrect password! 🚫', 'error');
    }
  };

  const resetVouchers = () => {
    setClaimedVouchers({});
    localStorage.setItem('claimedVouchers', JSON.stringify({}));
    showNotification('All vouchers have been reset! 🔄');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Admin Toggle Button */}
        <div className="absolute top-4 right-4">
          {isAdmin ? (
            <button
              onClick={() => {
                setIsAdmin(false);
                localStorage.setItem('isAdmin', 'false');
                showNotification('Admin mode disabled 🔒');
              }}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
            >
              <Lock size={16} />
              Exit Admin
            </button>
          ) : (
            <button
              onClick={() => setShowAdminPrompt(true)}
              className="flex items-center gap-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              <Unlock size={16} />
              Admin
            </button>
          )}
        </div>

        {/* Admin Login Modal */}
        {showAdminPrompt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-bold mb-4">Enter Admin Password</h3>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
                placeholder="Password"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdminLogin}
                  className="bg-pink-500 text-white px-4 py-2 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowAdminPrompt(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {notification.message}
          </div>
        )}

        {/* Admin Reset Button */}
        {isAdmin && (
          <div className="mb-6">
            <button
              onClick={resetVouchers}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Reset All Vouchers
            </button>
          </div>
        )}

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
              {claimedVouchers[voucher.id] && (
                <p className="text-sm text-gray-500 mb-2">
                  Claimed on: {formatDate(claimedVouchers[voucher.id].timestamp)}
                </p>
              )}
              <button
                onClick={() => handleClaim(voucher.id)}
                disabled={claimedVouchers[voucher.id]}
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  claimedVouchers[voucher.id]
                    ? "bg-gray-300 text-gray-600"
                    : "bg-pink-500 hover:bg-pink-600 text-white"
                }`}
              >
                {claimedVouchers[voucher.id] ? "Claimed! 💝" : "Claim Now! 🎁"}
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
