
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import RightSidebar from '../components/RightSidebar';
import MobileNavigation from '../components/MobileNavigation';
import MemoryCard from '../components/MemoryCard';

interface Memory {
  id: string;
  date: string;
  year: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

const Memories = () => {
  const [memories] = useState<Memory[]>([
    {
      id: '1',
      date: 'June 14, 2023',
      year: '1 year ago',
      content: 'Started my journey learning React! Amazing how far I\'ve come since then.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      date: 'June 14, 2022',
      year: '2 years ago',
      content: 'Beautiful sunset from my first apartment. Miss this view!',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      likes: 67,
      comments: 12
    },
    {
      id: '3',
      date: 'June 14, 2021',
      year: '3 years ago',
      content: 'Graduated from college today! Ready to take on the world 🎓',
      likes: 89,
      comments: 23
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Memories</h1>
            </div>
            
            <div className="space-y-6">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <MobileNavigation />
    </div>
  );
};

export default Memories;
