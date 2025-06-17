import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Users, MessageCircle, Heart, Share, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface LiveStreamingProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveStreaming: React.FC<LiveStreamingProps> = ({ isOpen, onClose }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamTitle, setStreamTitle] = useState('');
  const [comments, setComments] = useState<Array<{id: string, user: string, message: string}>>([]);
  const [newComment, setNewComment] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isStreaming) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isStreaming) {
      // Simulate viewers joining
      const interval = setInterval(() => {
        setViewerCount(prev => {
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          return Math.max(1, prev + change);
        });
      }, 5000);
      
      // Simulate comments
      const commentInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomComments = [
            "Great stream!",
            "Hello from California!",
            "What's your opinion on React vs Vue?",
            "Can you explain that again?",
            "Love the content!",
            "First time watching, this is awesome",
            "How long have you been coding?",
            "Do you have a YouTube channel?",
            "Thanks for sharing your knowledge!"
          ];
          
          const randomNames = [
            "Sarah",
            "Mike",
            "Emma",
            "David",
            "Lisa",
            "Alex",
            "Jessica",
            "Robert"
          ];
          
          const comment = {
            id: Date.now().toString(),
            user: randomNames[Math.floor(Math.random() * randomNames.length)],
            message: randomComments[Math.floor(Math.random() * randomComments.length)]
          };
          
          setComments(prev => [...prev, comment]);
        }
      }, 8000);
      
      return () => {
        clearInterval(interval);
        clearInterval(commentInterval);
      };
    }
  }, [isStreaming]);

  // Auto-scroll comments
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
    }
  }, [comments]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera or microphone');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const startStream = () => {
    if (!streamTitle.trim()) {
      toast.error('Please enter a stream title');
      return;
    }
    setIsStreaming(true);
    setViewerCount(Math.floor(Math.random() * 10) + 1);
    toast.success('You are now live!');
  };

  const endStream = () => {
    setIsStreaming(false);
    setViewerCount(0);
    stopCamera();
    toast.info('Stream ended');
    onClose();
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
      }
    }
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
      }
    }
  };

  const sendComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        user: 'You',
        message: newComment
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>{isStreaming ? 'Live Streaming' : 'Go Live'}</span>
              {isStreaming && (
                <Badge variant="destructive" className="animate-pulse">
                  LIVE
                </Badge>
              )}
            </div>
            {isStreaming && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{viewerCount} viewers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Duration: </span>
                  <span className="font-mono">00:12:34</span>
                </div>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[70vh]">
          {/* Video Preview/Stream */}
          <div className="lg:col-span-2 relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <VideoOff className="w-16 h-16 text-gray-400" />
                <p className="text-gray-400 mt-4">Camera is off</p>
              </div>
            )}

            {/* Stream Info Overlay */}
            {isStreaming && (
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {viewerCount} watching
                </div>
              </div>
            )}

            {/* Stream Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant={isVideoEnabled ? "secondary" : "destructive"}
                  size="sm"
                  onClick={toggleVideo}
                  className="bg-black/70 hover:bg-black/90"
                >
                  {isVideoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </Button>
                <Button
                  variant={isAudioEnabled ? "secondary" : "destructive"}
                  size="sm"
                  onClick={toggleAudio}
                  className="bg-black/70 hover:bg-black/90"
                >
                  {isAudioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm" className="bg-black/70 hover:bg-black/90">
                  <Settings className="w-4 h-4" />
                </Button>
                {isStreaming ? (
                  <Button variant="destructive" onClick={endStream}>
                    End Stream
                  </Button>
                ) : (
                  <Button onClick={startStream} disabled={!streamTitle.trim()}>
                    Go Live
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stream Info & Chat */}
          <div className="flex flex-col h-full">
            {/* Stream Setup */}
            {!isStreaming ? (
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle className="text-base">Stream Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Stream Title</label>
                    <Input
                      placeholder="What's your stream about?"
                      value={streamTitle}
                      onChange={(e) => setStreamTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Privacy</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Public</option>
                      <option>Friends</option>
                      <option>Only Me</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      rows={3}
                      placeholder="Tell viewers what your stream is about..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tags (Optional)</label>
                    <Input
                      placeholder="gaming, tech, music, etc."
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Live Chat */}
                <Card className="flex-1 flex flex-col">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>Live Chat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 flex-1 flex flex-col">
                    <div 
                      ref={commentsRef}
                      className="flex-1 overflow-y-auto space-y-2 border rounded p-2 mb-3"
                    >
                      {comments.length === 0 ? (
                        <p className="text-center text-gray-500 text-sm py-4">
                          Comments will appear here
                        </p>
                      ) : (
                        comments.map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">{comment.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">
                                <span className="font-medium">{comment.user}:</span> {comment.message}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Say something..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendComment()}
                      />
                      <Button size="sm" onClick={sendComment}>
                        Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Stream Actions */}
                <Card className="mt-3">
                  <CardContent className="p-3">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveStreaming;