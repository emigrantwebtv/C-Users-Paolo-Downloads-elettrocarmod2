import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Upload, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Photo } from "@shared/schema";
import photo1 from "@assets/11_1754458316126.jpg";
import photo2 from "@assets/44_1754458325476.jpg";
import photo3 from "@assets/22_1754458363654.jpg";

interface PhotoSlideshowProps {
  className?: string;
}

// Fallback photos - hardcoded list as backup for mobile issues
const fallbackPhotos = [
  '1755780899013-989095684.jpg',
  '1755781076723-597670082.jpg', 
  '1755781097392-27817653.jpg',
  '1755781109597-245662168.jpg',
  '1755781155038-940114711.jpg',
  '1755781177627-772231227.jpg'
];

const defaultPhotos: string[] = [];

// Add some debug logging for mobile troubleshooting
const DEBUG_PHOTOS = true;

export default function PhotoSlideshow({ className = "" }: PhotoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [password, setPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch photos from API with forced refresh for mobile
  const { data: photos = [], isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"],
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache the data (TanStack Query v5)
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window gets focus
  });

  // Debug logging
  if (DEBUG_PHOTOS) {
    console.log('PhotoSlideshow - photos from API:', photos);
    console.log('PhotoSlideshow - isLoading:', isLoading);
  }

  // Helper function to generate full URL for mobile compatibility
  const getImageUrl = (filename: string) => {
    // Use attached_assets path which is proven to work
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/attached_assets/gallery_uploads/${filename}`;
    // Debug logging for mobile troubleshooting
    if (DEBUG_PHOTOS) {
      console.log('Generated image URL:', url);
    }
    return url;
  };

  // Create combined photo list with URLs using useMemo to prevent infinite re-renders
  const allPhotos = useMemo(() => {
    // Start with default photos
    let result = [
      ...defaultPhotos.map((url, index) => ({ 
        id: `default-${index}`, 
        url, 
        isDefault: true 
      }))
    ];
    
    // Add API photos if available
    if (photos && photos.length > 0) {
      result.push(...photos.map((photo: Photo) => ({ 
        id: photo.id.toString(), 
        url: getImageUrl(photo.filename), 
        isDefault: false 
      })));
    } else if (!isLoading) {
      // Fallback: if API fails, use hardcoded list
      result.push(...fallbackPhotos.map((filename, index) => ({ 
        id: `fallback-${index}`, 
        url: getImageUrl(filename), 
        isDefault: false 
      })));
      
      if (DEBUG_PHOTOS) {
        console.log('PhotoSlideshow - Using fallback photos');
      }
    }
    
    if (DEBUG_PHOTOS) {
      console.log('PhotoSlideshow - allPhotos computed:', result);
      console.log('PhotoSlideshow - photos length:', photos?.length);
      console.log('PhotoSlideshow - isLoading:', isLoading);
    }
    
    return result;
  }, [photos, isLoading]);

  // Shuffle photos randomly
  const [shuffledPhotos, setShuffledPhotos] = useState<typeof allPhotos>([]);

  useEffect(() => {
    if (allPhotos.length > 0) {
      setShuffledPhotos(prev => {
        // Only shuffle if the array length has changed or it's empty - prevent infinite loops
        if (prev.length !== allPhotos.length || prev.length === 0) {
          const shuffled = [...allPhotos].sort(() => Math.random() - 0.5);
          setCurrentIndex(0);
          return shuffled;
        }
        return prev;
      });
    } else {
      setShuffledPhotos([]);
    }
  }, [allPhotos.length]); // Only depend on length to prevent infinite re-renders

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && shuffledPhotos.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % shuffledPhotos.length);
      }, 5000); // Change photo every 5 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, shuffledPhotos.length]);

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/photos/upload', {
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
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      setPassword("");
      setSelectedFile(null);
      toast({
        title: "Successo",
        description: "Foto caricata con successo!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ photoId, password }: { photoId: number; password: string }) => {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Errore durante eliminazione');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      setDeletePassword("");
      toast({
        title: "Successo",
        description: "Foto eliminata con successo!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Errore",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? shuffledPhotos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledPhotos.length);
  };

  const handleUpload = () => {
    if (!selectedFile || !password) {
      toast({
        title: "Errore",
        description: "Seleziona un file e inserisci la password",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('password', password);
    
    uploadMutation.mutate(formData);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDeletePhoto = (photoId: number) => {
    if (!deletePassword) {
      toast({
        title: "Errore",
        description: "Inserisci la password per eliminare",
        variant: "destructive",
      });
      return;
    }

    deleteMutation.mutate({ photoId, password: deletePassword });
  };

  if (isLoading) {
    return (
      <div className={`bg-gray-200 animate-pulse rounded-t-lg h-[506px] ${className}`}>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500">Caricamento...</span>
        </div>
      </div>
    );
  }

  if (shuffledPhotos.length === 0) {
    return (
      <div className={`bg-gray-100 rounded-t-lg flex items-center justify-center h-[506px] ${className}`}>
        <span className="text-gray-500">Nessuna foto disponibile</span>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-t-lg overflow-hidden h-[506px] ${className}`}>
      {/* Main image */}
      <div className="relative h-full">
        <img
          src={shuffledPhotos[currentIndex].url}
          alt={`Foto ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to default image if upload fails to load
            e.currentTarget.src = defaultPhotos[0];
          }}
        />
        
        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 text-white p-3">
        <div className="flex items-center justify-between">
          {/* Photo counter */}
          <span className="text-sm">
            {currentIndex + 1} / {shuffledPhotos.length}
          </span>

          {/* Control buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpload(true)}
              className="text-white hover:bg-white/20"
            >
              <Upload className="h-4 w-4" />
            </Button>

          </div>
        </div>
      </div>

      {/* Upload/Management modal */}
      {showUpload && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Gestisci Foto</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowUpload(false);
                  setActiveTab('upload');
                  setPassword("");
                  setDeletePassword("");
                  setSelectedFile(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Tab navigation */}
            <div className="flex space-x-1 mb-4">
              <Button
                variant={activeTab === 'manage' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('manage')}
                className="flex-1"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Rimuovi
              </Button>
            </div>

            {/* Upload tab */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Seleziona foto
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Inserisci password"
                  />
                </div>
                
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || !password || uploadMutation.isPending}
                  className="w-full"
                >
                  {uploadMutation.isPending ? "Caricamento..." : "Carica"}
                </Button>
              </div>
            )}

            {/* Management tab */}
            {activeTab === 'manage' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password per eliminare
                  </label>
                  <Input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Inserisci password"
                  />
                </div>
                
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded p-2">
                  <h4 className="text-sm font-medium">Foto caricate da utenti:</h4>
                  {(photos || []).length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nessuna foto caricata tramite upload.<br/>
                      Le foto della gallery predefinite non possono essere eliminate.
                    </p>
                  ) : (
                    (photos || []).map((photo: Photo) => (
                      <div key={photo.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-2">
                          <img
                            src={`${window.location.origin}/attached_assets/gallery_uploads/${photo.filename}`}
                            alt={photo.originalName}
                            className="w-12 h-12 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div>
                            <p className="text-sm font-medium truncate max-w-32">
                              {photo.originalName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(photo.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePhoto(photo.id)}
                          disabled={!deletePassword || deleteMutation.isPending}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}