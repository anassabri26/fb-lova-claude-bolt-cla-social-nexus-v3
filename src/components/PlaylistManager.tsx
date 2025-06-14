
import React, { useState } from 'react';
import { Plus, List, Lock, Globe, Users, MoreHorizontal, Play, Trash2, Edit, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Playlist {
  id: string;
  title: string;
  description: string;
  visibility: 'public' | 'unlisted' | 'private';
  videoCount: number;
  thumbnail: string;
  duration: string;
  createdAt: string;
  videos: PlaylistVideo[];
}

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  addedAt: string;
}

const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      title: 'My Favorite Tech Videos',
      description: 'A collection of the best tech tutorials and reviews',
      visibility: 'public',
      videoCount: 25,
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      duration: '3:45:22',
      createdAt: '2 weeks ago',
      videos: [
        {
          id: 'v1',
          title: 'React Best Practices 2024',
          thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
          duration: '15:30',
          views: 12500,
          addedAt: '3 days ago'
        },
        {
          id: 'v2',
          title: 'JavaScript Advanced Concepts',
          thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&h=200&fit=crop',
          duration: '22:15',
          views: 8900,
          addedAt: '1 week ago'
        }
      ]
    },
    {
      id: '2',
      title: 'Cooking Masterclass',
      description: 'Learn from the best chefs around the world',
      visibility: 'private',
      videoCount: 12,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      duration: '2:15:45',
      createdAt: '1 month ago',
      videos: []
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    title: '',
    description: '',
    visibility: 'public' as const
  });
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const handleCreatePlaylist = () => {
    if (!newPlaylist.title.trim()) {
      toast.error('Please enter a playlist title');
      return;
    }

    const playlist: Playlist = {
      id: Date.now().toString(),
      title: newPlaylist.title,
      description: newPlaylist.description,
      visibility: newPlaylist.visibility,
      videoCount: 0,
      thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
      duration: '0:00',
      createdAt: 'just now',
      videos: []
    };

    setPlaylists([playlist, ...playlists]);
    setNewPlaylist({ title: '', description: '', visibility: 'public' });
    setIsCreateDialogOpen(false);
    toast.success('Playlist created successfully!');
    console.log('Created playlist:', playlist);
  };

  const handleDeletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
    toast.success('Playlist deleted');
    console.log('Deleted playlist:', playlistId);
  };

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.videoCount === 0) {
      toast.info('This playlist is empty');
      return;
    }
    toast.success(`Playing playlist: ${playlist.title}`);
    console.log('Playing playlist:', playlist);
  };

  const handleSharePlaylist = (playlist: Playlist) => {
    navigator.clipboard.writeText(`${window.location.origin}/playlist/${playlist.id}`);
    toast.success('Playlist link copied to clipboard!');
    console.log('Shared playlist:', playlist);
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public': return <Globe className="w-4 h-4" />;
      case 'unlisted': return <Users className="w-4 h-4" />;
      case 'private': return <Lock className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Playlists</h1>
          <p className="text-gray-600">Organize your favorite videos</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Create Playlist</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title*</label>
                <Input
                  value={newPlaylist.title}
                  onChange={(e) => setNewPlaylist({...newPlaylist, title: e.target.value})}
                  placeholder="Enter playlist title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({...newPlaylist, description: e.target.value})}
                  placeholder="Describe your playlist..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Visibility</label>
                <Select 
                  value={newPlaylist.visibility} 
                  onValueChange={(value: 'public' | 'unlisted' | 'private') => 
                    setNewPlaylist({...newPlaylist, visibility: value})
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Public</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="unlisted">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>Unlisted</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Private</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreatePlaylist} className="flex-1">
                  Create Playlist
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative aspect-video">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-full object-cover"
                onClick={() => setSelectedPlaylist(playlist)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="lg"
                  className="opacity-0 hover:opacity-100 text-white"
                  onClick={() => handlePlayPlaylist(playlist)}
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                {playlist.videoCount} videos
              </div>
              <div className="absolute top-2 left-2 flex items-center space-x-1">
                {getVisibilityIcon(playlist.visibility)}
                <Badge variant={playlist.visibility === 'private' ? 'destructive' : 'secondary'}>
                  {playlist.visibility}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{playlist.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{playlist.description}</p>
                  <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                    <span>{playlist.duration}</span>
                    <span>•</span>
                    <span>{playlist.createdAt}</span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePlayPlaylist(playlist)}>
                      <Play className="w-4 h-4 mr-2" />
                      Play all
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSharePlaylist(playlist)}>
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {playlists.length === 0 && (
        <div className="text-center py-12">
          <List className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No playlists yet</h3>
          <p className="text-gray-500 mb-4">Create your first playlist to organize your favorite videos</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Playlist
          </Button>
        </div>
      )}

      {/* Playlist Detail Modal */}
      {selectedPlaylist && (
        <Dialog open={!!selectedPlaylist} onOpenChange={() => setSelectedPlaylist(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedPlaylist.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedPlaylist.thumbnail}
                  alt={selectedPlaylist.title}
                  className="w-32 h-20 object-cover rounded"
                />
                <div>
                  <p className="text-gray-600">{selectedPlaylist.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                    {getVisibilityIcon(selectedPlaylist.visibility)}
                    <span>{selectedPlaylist.visibility}</span>
                    <span>•</span>
                    <span>{selectedPlaylist.videoCount} videos</span>
                    <span>•</span>
                    <span>{selectedPlaylist.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Videos ({selectedPlaylist.videos.length})</h4>
                {selectedPlaylist.videos.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedPlaylist.videos.map((video, index) => (
                      <div key={video.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                        <span className="text-sm text-gray-500 w-6">{index + 1}</span>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{video.title}</p>
                          <p className="text-sm text-gray-500">
                            {video.views.toLocaleString()} views • {video.addedAt}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">{video.duration}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No videos in this playlist</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PlaylistManager;
