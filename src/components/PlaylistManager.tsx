
import React, { useState } from 'react';
import { Plus, Play, Trash2, Edit3, Lock, Users, Globe, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
}

type PlaylistPrivacy = 'public' | 'unlisted' | 'private';

interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoCount: number;
  totalDuration: string;
  privacy: PlaylistPrivacy;
  createdAt: string;
  videos: Video[];
}

const PlaylistManager: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([
    {
      id: '1',
      title: 'My Favorite Tech Videos',
      description: 'Collection of the best technology videos I\'ve watched',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      videoCount: 12,
      totalDuration: '2:45:30',
      privacy: 'public',
      createdAt: '2024-01-15',
      videos: [
        {
          id: '1',
          title: 'Introduction to AI',
          thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
          duration: '12:45',
          views: 45000
        }
      ]
    }
  ]);

  const [newPlaylist, setNewPlaylist] = useState({
    title: '',
    description: '',
    privacy: 'public' as PlaylistPrivacy
  });

  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getPrivacyIcon = (privacy: PlaylistPrivacy) => {
    switch (privacy) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'unlisted':
        return <Users className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
    }
  };

  const getPrivacyColor = (privacy: PlaylistPrivacy) => {
    switch (privacy) {
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'unlisted':
        return 'bg-yellow-100 text-yellow-800';
      case 'private':
        return 'bg-red-100 text-red-800';
    }
  };

  const createPlaylist = () => {
    if (!newPlaylist.title.trim()) {
      toast.error('Please enter a playlist title');
      return;
    }

    const playlist: Playlist = {
      id: Date.now().toString(),
      title: newPlaylist.title,
      description: newPlaylist.description,
      thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
      videoCount: 0,
      totalDuration: '0:00',
      privacy: newPlaylist.privacy,
      createdAt: new Date().toISOString().split('T')[0],
      videos: []
    };

    setPlaylists([...playlists, playlist]);
    setNewPlaylist({ title: '', description: '', privacy: 'public' });
    setIsCreateDialogOpen(false);
    toast.success('Playlist created successfully!');
  };

  const updatePlaylist = () => {
    if (!editingPlaylist) return;

    setPlaylists(playlists.map(p => 
      p.id === editingPlaylist.id ? editingPlaylist : p
    ));
    setEditingPlaylist(null);
    setIsEditDialogOpen(false);
    toast.success('Playlist updated successfully!');
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
    toast.success('Playlist deleted successfully!');
  };

  const playPlaylist = (playlist: Playlist) => {
    if (playlist.videoCount === 0) {
      toast.error('This playlist is empty');
      return;
    }
    toast.success(`Playing: ${playlist.title}`);
    console.log('Playing playlist:', playlist);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Playlists</h1>
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
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={newPlaylist.title}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, title: e.target.value })}
                  placeholder="Enter playlist title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={newPlaylist.description}
                  onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                  placeholder="Enter playlist description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Privacy</label>
                <Select 
                  value={newPlaylist.privacy} 
                  onValueChange={(value: PlaylistPrivacy) => setNewPlaylist({ ...newPlaylist, privacy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createPlaylist}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Playlists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  onClick={() => playPlaylist(playlist)}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play All
                </Button>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getPrivacyColor(playlist.privacy)}>
                  {getPrivacyIcon(playlist.privacy)}
                  <span className="ml-1 capitalize">{playlist.privacy}</span>
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-2">{playlist.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingPlaylist(playlist);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deletePlaylist(playlist.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">{playlist.description}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{playlist.videoCount} videos</span>
                <span>{playlist.totalDuration}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Created: {playlist.createdAt}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Playlist</DialogTitle>
          </DialogHeader>
          {editingPlaylist && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={editingPlaylist.title}
                  onChange={(e) => setEditingPlaylist({ ...editingPlaylist, title: e.target.value })}
                  placeholder="Enter playlist title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={editingPlaylist.description}
                  onChange={(e) => setEditingPlaylist({ ...editingPlaylist, description: e.target.value })}
                  placeholder="Enter playlist description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Privacy</label>
                <Select 
                  value={editingPlaylist.privacy} 
                  onValueChange={(value: PlaylistPrivacy) => setEditingPlaylist({ ...editingPlaylist, privacy: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="unlisted">Unlisted</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={updatePlaylist}>Update</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {playlists.length === 0 && (
        <div className="text-center py-12">
          <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No playlists yet</h3>
          <p className="text-gray-500 mb-4">
            Create your first playlist to organize your favorite videos
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Playlist
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;
