import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface VideoSlideshowProps {
  className?: string;
}

export default function VideoSlideshow({ className = "" }: VideoSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Empty video list for now - can be populated later
  const videos: any[] = [];

  const nextSlide = () => {
    if (videos.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const prevSlide = () => {
    if (videos.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
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

  const handleUpload = async () => {
    if (!selectedFile || !password) {
      toast({
        title: "Errore",
        description: "Seleziona un file video e inserisci la password",
        variant: "destructive",
      });
      return;
    }

    // Here you would implement video upload logic
    toast({
      title: "Info",
      description: "Funzionalità upload video in sviluppo",
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        {videos.length === 0 ? (
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nessun video caricato</p>
              <p className="text-sm text-gray-400 mt-2">Usa il pulsante upload per aggiungere video</p>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-black flex items-center justify-center">
            {/* Video player would go here */}
            <Play className="h-16 w-16 text-white" />
          </div>
        )}
        
        {/* Navigation controls */}
        {videos.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost" 
              size="sm"
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
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
            className="bg-black/50 text-white hover:bg-black/70"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUpload(!showUpload)}
            className="bg-black/50 text-white hover:bg-black/70"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        {/* Video counter */}
        {videos.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {currentIndex + 1} / {videos.length}
          </div>
        )}
      </div>

      {/* Upload panel */}
      {showUpload && (
        <div className="absolute top-0 left-0 right-0 bg-white border rounded-lg shadow-lg p-4 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Carica Video</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowUpload(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
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
              disabled={!selectedFile || !password}
              className="w-full"
            >
              Carica Video
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}