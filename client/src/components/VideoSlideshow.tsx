import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Upload, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Video {
  id: number;
  filename: string;
  originalName: string;
  uploadedAt: string;
}

// Fallback videos - hardcoded list as backup for mobile issues
const fallbackVideos = [
  '1755883308360-449609960.mp4'
];

interface VideoSlideshowProps {
  className?: string;
}

export default function VideoSlideshow({ className = "" }: VideoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [password, setPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Helper function to generate full URL for mobile compatibility
  const getVideoUrl = (filename: string) => {
    // Use current window location to build absolute URL for mobile compatibility
    const baseUrl = window.location.origin;
    return `${baseUrl}/uploads/${filename}`;
  };

  // Fetch videos from API with forced refresh for mobile
  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache the data (TanStack Query v5)
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gets focus
  });

  // Ensure we have videos to display, with fallback
  const displayVideos = videos && videos.length > 0 ? videos : 
    (!isLoading ? fallbackVideos.map((filename, index) => ({
      id: index + 1000, // Use high IDs to avoid conflicts
      filename,
      originalName: filename,
      uploadedAt: new Date().toISOString()
    })) : []);

  const nextSlide = () => {
    if (displayVideos.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % displayVideos.length);
    }
  };

  const prevSlide = () => {
    if (displayVideos.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + displayVideos.length) % displayVideos.length);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if it's a video file
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Errore",
          description: "Seleziona solo file video (mp4, mov, avi, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Errore durante upload');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({
        title: "Successo",
        description: "Video caricato con successo!",
      });
      setSelectedFile(null);
      setPassword("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleUpload = async () => {
    if (!selectedFile || !password) {
      toast({
        title: "Errore",
        description: "Seleziona un file video e inserisci la password",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('password', password);

    uploadMutation.mutate(formData);
  };

  const deleteMutation = useMutation({
    mutationFn: async ({ id, password }: { id: number; password: string }) => {
      const response = await fetch(`/api/videos/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Errore durante eliminazione');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      toast({
        title: "Successo",
        description: "Video eliminato con successo!",
      });
      setDeletePassword("");
    },
    onError: (error: Error) => {
      toast({
        title: "Errore", 
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = async (videoId: number) => {
    if (!deletePassword) {
      toast({
        title: "Errore",
        description: "Inserisci la password per eliminare il video",
        variant: "destructive",
      });
      return;
    }

    deleteMutation.mutate({ id: videoId, password: deletePassword });
  };

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gray-100 rounded-t-lg overflow-hidden">
        {displayVideos.length === 0 ? (
          <div className="h-auto bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nessun video caricato</p>
              <p className="text-sm text-gray-400 mt-2">Usa il pulsante upload per aggiungere video</p>
            </div>
          </div>
        ) : (
          <div className="h-auto bg-black flex items-center justify-center relative">
            <video
              key={displayVideos[currentIndex]?.filename}
              className="w-full h-auto object-contain"
              controls
              playsInline
            >
              <source src={getVideoUrl(displayVideos[currentIndex]?.filename)} type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
          </div>
        )}
        
        {/* Navigation arrows - always visible when there are videos */}
        {displayVideos.length > 0 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-20"
              disabled={displayVideos.length <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-20"
              disabled={displayVideos.length <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Control buttons */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlayPause}
            className="text-white hover:bg-white/20"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUpload(!showUpload)}
            className="text-white hover:bg-white/20"
          >
            <Upload className="h-4 w-4" />
          </Button>
          {displayVideos.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowManage(!showManage)}
              className="text-white hover:bg-white/20"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Video counter */}
        {displayVideos.length > 0 && (
          <div className="absolute bottom-4 right-4 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {displayVideos.length}
          </div>
        )}
      </div>

      {/* Upload/Manage panel */}
      {(showUpload || showManage) && (
        <div className="absolute top-0 left-0 right-0 bg-white border rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Gestione Video</h3>
            <Button variant="ghost" size="sm" onClick={() => {
              setShowUpload(false);
              setShowManage(false);
            }}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'upload' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('upload')}
            >
              <Upload className="h-4 w-4 mr-1" />
              Carica
            </Button>
            {displayVideos.length > 0 && (
              <Button
                variant={activeTab === 'manage' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('manage')}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Elimina
              </Button>
            )}
          </div>
          
          {/* Upload tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  className="mb-2"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600">File selezionato: {selectedFile.name}</p>
                )}
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password di amministratore"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-2"
                />
              </div>
              
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !password || uploadMutation.isPending}
                className="w-full"
              >
                {uploadMutation.isPending ? "Caricamento..." : "Carica Video"}
              </Button>
            </div>
          )}
          
          {/* Manage tab */}
          {activeTab === 'manage' && displayVideos.length > 0 && (
            <div className="space-y-4">
              <div className="max-h-40 overflow-y-auto space-y-2">
                {displayVideos.map((video, index) => (
                  <div key={video.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{video.originalName || `Video ${index + 1}`}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(video.id)}
                      disabled={!deletePassword || deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div>
                <Input
                  type="password"
                  placeholder="Password per eliminare"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="mb-2"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}