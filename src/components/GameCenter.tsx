import React, { useState } from 'react';
import { Gamepad2, Trophy, Users, Star, Play, Download, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_IMAGES } from '@/lib/constants';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  players: number;
  isPlaying?: boolean;
  achievements?: number;
  totalAchievements?: number;
  lastPlayed?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const GameCenter = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [games] = useState<Game[]>([
    {
      id: '1',
      title: 'Word Puzzle Challenge',
      description: 'Test your vocabulary with challenging word puzzles',
      image: MOCK_IMAGES.POSTS[0],
      category: 'Puzzle',
      rating: 4.5,
      players: 125000,
      isPlaying: true,
      achievements: 8,
      totalAchievements: 15,
      lastPlayed: '2 hours ago'
    },
    {
      id: '2',
      title: 'City Builder',
      description: 'Build and manage your own virtual city',
      image: MOCK_IMAGES.POSTS[1],
      category: 'Strategy',
      rating: 4.8,
      players: 89000,
      achievements: 12,
      totalAchievements: 20,
      lastPlayed: '1 day ago'
    },
    {
      id: '3',
      title: 'Racing Championship',
      description: 'High-speed racing with friends',
      image: MOCK_IMAGES.POSTS[2],
      category: 'Racing',
      rating: 4.3,
      players: 234000
    },
    {
      id: '4',
      title: 'Farm Adventure',
      description: 'Grow crops and raise animals in this farming game',
      image: MOCK_IMAGES.POSTS[3],
      category: 'Simulation',
      rating: 4.6,
      players: 156000
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Victory',
      description: 'Win your first game',
      icon: '🏆',
      unlocked: true
    },
    {
      id: '2',
      title: 'Word Master',
      description: 'Find 100 words in Word Puzzle Challenge',
      icon: '📝',
      unlocked: true
    },
    {
      id: '3',
      title: 'City Planner',
      description: 'Build a city with 10,000 population',
      icon: '🏙️',
      unlocked: false,
      progress: 7500,
      maxProgress: 10000
    },
    {
      id: '4',
      title: 'Speed Demon',
      description: 'Win 10 races in Racing Championship',
      icon: '🏎️',
      unlocked: false,
      progress: 6,
      maxProgress: 10
    }
  ]);

  const [leaderboard] = useState([
    { rank: 1, name: 'Sarah Johnson', avatar: MOCK_IMAGES.AVATARS[0], score: 15420 },
    { rank: 2, name: 'Mike Chen', avatar: MOCK_IMAGES.AVATARS[1], score: 14890 },
    { rank: 3, name: 'Emma Wilson', avatar: MOCK_IMAGES.AVATARS[2], score: 14250 },
    { rank: 4, name: 'You', avatar: MOCK_IMAGES.AVATARS[1], score: 13980 },
    { rank: 5, name: 'David Kim', avatar: MOCK_IMAGES.AVATARS[3], score: 13750 }
  ]);

  const handlePlayGame = (gameId: string) => {
    // Game play logic
  };

  const handleLikeGame = (gameId: string) => {
    // Like game logic
  };

  const myGames = games.filter(game => game.isPlaying || game.achievements);
  const discoverGames = games.filter(game => !game.isPlaying && !game.achievements);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Game Center</h1>
        <p className="text-gray-600">Play games, earn achievements, and compete with friends</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="my-games">My Games ({myGames.length})</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Discover Games */}
        <TabsContent value="discover" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discoverGames.map((game) => (
              <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{game.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{game.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{game.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{game.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{game.players.toLocaleString()} players</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => handlePlayGame(game.id)} className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Play Now
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLikeGame(game.id)}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Games */}
        <TabsContent value="my-games" className="space-y-6">
          {myGames.length > 0 ? (
            <div className="space-y-4">
              {myGames.map((game) => (
                <Card key={game.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{game.title}</h3>
                        <p className="text-gray-600 text-sm">{game.description}</p>
                        {game.lastPlayed && (
                          <p className="text-xs text-gray-500 mt-1">Last played: {game.lastPlayed}</p>
                        )}
                        {game.achievements && (
                          <div className="mt-2">
                            <div className="flex items-center space-x-2">
                              <Trophy className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm">
                                {game.achievements}/{game.totalAchievements} achievements
                              </span>
                            </div>
                            <Progress 
                              value={(game.achievements / (game.totalAchievements || 1)) * 100} 
                              className="mt-1 h-2"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button onClick={() => handlePlayGame(game.id)}>
                          <Play className="w-4 h-4 mr-2" />
                          Continue
                        </Button>
                        <Badge variant="outline">{game.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No games yet</h3>
              <p className="text-gray-500 mb-4">Start playing games to see them here</p>
              <Button onClick={() => setActiveTab('discover')}>
                Discover Games
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.unlocked ? 'bg-yellow-50 border-yellow-200' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`text-3xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.unlocked ? 'text-yellow-800' : 'text-gray-900'}`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                    {achievement.unlocked && (
                      <Trophy className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Weekly Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center space-x-4 p-3 rounded-lg ${
                      player.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      player.rank === 1 ? 'bg-yellow-500 text-white' :
                      player.rank === 2 ? 'bg-gray-400 text-white' :
                      player.rank === 3 ? 'bg-orange-500 text-white' :
                      'bg-gray-200 text-gray-700'
                    }`}>
                      {player.rank}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className={`font-medium ${player.name === 'You' ? 'text-blue-700' : 'text-gray-900'}`}>
                        {player.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{player.score.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameCenter;