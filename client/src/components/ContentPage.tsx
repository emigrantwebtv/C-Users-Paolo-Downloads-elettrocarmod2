import { ReactNode } from "react";
import FloatingNavigation from "@/components/FloatingNavigation";
import { Play } from "lucide-react";

interface ContentPageProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  videoTitle?: string;
  videoUrl?: string;
  secondImageUrl?: string;
  secondImageAlt?: string;
  leftImageUrl?: string;
  leftImageAlt?: string;
  rightImageUrl?: string;
  rightImageAlt?: string;
}

export default function ContentPage({
  title,
  imageUrl,
  imageAlt,
  description,
  videoTitle,
  videoUrl,
  secondImageUrl,
  secondImageAlt,
  leftImageUrl,
  leftImageAlt,
  rightImageUrl,
  rightImageAlt,
}: ContentPageProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">ELETTROCAR</h1>
          <h2 className="text-xl text-blue-200 text-center mt-2">{title}</h2>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Three column layout */}
          {(leftImageUrl || rightImageUrl) ? (
            <div className="flex bg-gray-50 py-4 gap-2">
              {/* Left image */}
              <div className="flex-1 flex justify-center">
                {leftImageUrl && (
                  <img
                    src={leftImageUrl}
                    alt={leftImageAlt || "Immagine sinistra"}
                    className="max-w-full h-auto object-contain"
                  />
                )}
              </div>
              
              {/* Center image */}
              <div className="flex-1 flex justify-center">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="max-w-full h-auto object-contain"
                />
              </div>
              
              {/* Right image */}
              <div className="flex-1 flex justify-center">
                {rightImageUrl && (
                  <img
                    src={rightImageUrl}
                    alt={rightImageAlt || "Immagine destra"}
                    className="max-w-full h-auto object-contain"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center bg-gray-50 py-4">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full h-auto object-contain"
              />
            </div>
          )}
          
          {secondImageUrl && (
            <div className="flex justify-center bg-gray-50 py-4">
              <img
                src={secondImageUrl}
                alt={secondImageAlt || "Immagine aggiuntiva"}
                className="max-w-full h-auto object-contain"
              />
            </div>
          )}
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6">
              {description}
            </p>
            
            {/* Video section */}
            {videoUrl && videoTitle ? (
              <div className="rounded-lg overflow-hidden">
                <video
                  className="w-full h-96 object-cover rounded-lg"
                  controls
                  autoPlay
                  playsInline
                >
                  <source src={videoUrl} type="video/mp4" />
                  <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
                </video>
                <p className="text-center text-secondary mt-2 text-sm">{videoTitle}</p>
              </div>
            ) : videoTitle ? (
              <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
                <Play className="h-16 w-16 text-primary mb-4 mx-auto" />
                <p className="text-secondary">{videoTitle}</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}
