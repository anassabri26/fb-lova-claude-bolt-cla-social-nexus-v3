
import React from 'react';
import CreatePost from './CreatePost';
import Post from './Post';

const NewsFeed = () => {
  const posts = [
    {
      id: 1,
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      content: 'Just finished building an amazing React application! The satisfaction of seeing your code come to life is unmatched. 🚀 #ReactJS #WebDevelopment',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
      timestamp: '2h',
      likes: 42,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        verified: false
      },
      content: 'Beautiful sunset from my office window today. Sometimes you need to pause and appreciate the simple moments. 🌅',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      timestamp: '4h',
      likes: 127,
      comments: 23,
      shares: 12
    },
    {
      id: 3,
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=400&fit=crop&crop=face',
        verified: true
      },
      content: 'Excited to share my latest home renovation project! Finally got the living room looking exactly how I envisioned it. What do you think?',
      timestamp: '6h',
      likes: 89,
      comments: 15,
      shares: 7
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default NewsFeed;
