
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MobileNavigation from '../components/MobileNavigation';
import MemoryCard from '../components/MemoryCard';

const Memories = () => {
  const memories = [
    {
      id: '1',
      type: 'post' as const,
      content: 'Just started my journey into web development! Excited to learn React and build amazing apps.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      yearsAgo: 2,
      date: 'June 14, 2022',
      interactions: {
        likes: 23,
        comments: 8
      }
    },
    {
      id: '2',
      type: 'photo' as const,
      content: 'Summer vacation with friends! What an amazing trip.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
      yearsAgo: 1,
      date: 'June 14, 2023',
      interactions: {
        likes: 45,
        comments: 12
      }
    },
    {
      id: '3',
      type: 'post' as const,
      content: 'Graduated from university today! Ready to take on the world.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      yearsAgo: 3,
      date: 'June 14, 2021',
      interactions: {
        likes: 89,
        comments: 24
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Memories</h1>
              <p className="text-gray-600">Look back on your favorite moments</p>
            </div>
            
            <div className="space-y-6">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Memories;
