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
  secondImageClickUrl?: string;
  secondImageTooltip?: string;
  leftImageUrl?: string;
  leftImageAlt?: string;
  rightImageUrl?: string;
  rightImageAlt?: string;
  reducedTopSpacing?: boolean;
  transparentSpacing?: boolean;
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
  secondImageClickUrl,
  secondImageTooltip,
  leftImageUrl,
  leftImageAlt,
  rightImageUrl,
  rightImageAlt,
  reducedTopSpacing = false,
  transparentSpacing = false,
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
      <main className={`container mx-auto px-4 pb-24 ${reducedTopSpacing ? 'pt-2' : transparentSpacing ? 'pt-2' : 'py-6'}`}>
        <div className={`${reducedTopSpacing ? 'bg-transparent shadow-none' : transparentSpacing ? 'bg-transparent shadow-none' : 'bg-white shadow-lg'} rounded-xl overflow-hidden`}>
          {/* Second image first (if exists) */}
          {secondImageUrl && (
            <div className={`flex justify-center ${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              {secondImageClickUrl ? (
                <img
                  src={secondImageUrl}
                  alt={secondImageAlt || "Immagine aggiuntiva"}
                  title={secondImageTooltip}
                  className="max-w-full h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-t-xl"
                  onClick={() => window.open(secondImageClickUrl, '_blank')}
                />
              ) : (
                <img
                  src={secondImageUrl}
                  alt={secondImageAlt || "Immagine aggiuntiva"}
                  className="max-w-full h-auto object-contain rounded-t-xl"
                />
              )}
            </div>
          )}
          
          {/* Three column layout */}
          {(leftImageUrl || rightImageUrl) ? (
            <div className={`flex gap-2 ${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              {/* Left image */}
              <div className="flex-1 flex justify-center">
                {leftImageUrl && (
                  <img
                    src={leftImageUrl}
                    alt={leftImageAlt || "Immagine sinistra"}
                    className="max-w-full h-auto object-contain rounded-t-xl"
                  />
                )}
              </div>
              
              {/* Center image */}
              <div className="flex-1 flex justify-center">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="max-w-full h-auto object-contain rounded-t-xl"
                />
              </div>
              
              {/* Right image */}
              <div className="flex-1 flex justify-center">
                {rightImageUrl && (
                  <img
                    src={rightImageUrl}
                    alt={rightImageAlt || "Immagine destra"}
                    className="max-w-full h-auto object-contain rounded-t-xl"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className={`flex justify-center ${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full h-auto object-contain rounded-t-xl"
              />
            </div>
          )}
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6">
              {description}
            </p>
            
            {/* Video section */}
            {videoUrl && videoTitle ? (
              <div className="rounded-t-lg overflow-hidden">
                <video
                  className="w-full h-96 object-cover rounded-t-lg"
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