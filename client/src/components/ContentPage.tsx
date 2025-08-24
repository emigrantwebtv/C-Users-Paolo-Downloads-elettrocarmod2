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
  imageHeight?: string;
  secondImageHeight?: string;
  imageWidth?: string;
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
  imageHeight = "h-auto",
  secondImageHeight = "h-auto",
  imageWidth = "max-w-full",
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
      <main className={`container mx-auto px-4 ${reducedTopSpacing ? 'pt-2' : transparentSpacing ? 'pt-2' : 'py-6'}`}>
        <div className={`${reducedTopSpacing ? 'bg-transparent shadow-none' : transparentSpacing ? 'bg-transparent shadow-none' : 'bg-white shadow-lg'} rounded-xl overflow-hidden`}>
          {/* Second image first (if exists) */}
          {secondImageUrl && (
            <div className={`flex justify-center ${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              {secondImageClickUrl ? (
                <img
                  src={secondImageUrl}
                  alt={secondImageAlt || "Immagine aggiuntiva"}
                  title={secondImageTooltip}
                  className={`max-w-full ${secondImageHeight} object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200 rounded-t-xl`}
                  onClick={() => window.open(secondImageClickUrl, '_blank')}
                />
              ) : (
                <img
                  src={secondImageUrl}
                  alt={secondImageAlt || "Immagine aggiuntiva"}
                  className={`max-w-full ${secondImageHeight} object-cover rounded-t-xl`}
                />
              )}
            </div>
          )}
          
          {/* Three column layout */}
          {(leftImageUrl || rightImageUrl) ? (
            <div className={`flex gap-2 ${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              {/* Left image */}
              <div className="flex-1">
                {leftImageUrl && (
                  <img
                    src={leftImageUrl}
                    alt={leftImageAlt || "Immagine sinistra"}
                    className="w-full h-[60vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-t-xl slideshow-container"
                  />
                )}
              </div>
              
              {/* Center image */}
              <div className="flex-1">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className={`w-full ${imageHeight} object-cover rounded-t-xl slideshow-container`}
                />
              </div>
              
              {/* Right image */}
              <div className="flex-1">
                {rightImageUrl && (
                  <img
                    src={rightImageUrl}
                    alt={rightImageAlt || "Immagine destra"}
                    className="w-full h-[60vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-t-xl slideshow-container"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className={`${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              <img
                src={imageUrl}
                alt={imageAlt}
                className={`w-full ${imageHeight} object-cover rounded-t-xl slideshow-container`}
              />
            </div>
          )}
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6 text-justify">
              {description}
            </p>
          </div>
          
          {/* Video section - now outside the white container, same as images */}
          {videoUrl && videoTitle ? (
            <div className={`${reducedTopSpacing ? 'bg-transparent py-0' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              <video
                className="w-full h-[60vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-t-xl slideshow-container"
                controls
                autoPlay
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
                <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
              </video>
              <p className="text-center text-secondary mt-2 text-sm bg-gray-50 py-2">{videoTitle}</p>
            </div>
          ) : videoTitle ? (
            <div className={`${reducedTopSpacing ? 'bg-transparent py-4' : transparentSpacing ? 'bg-transparent py-4' : 'bg-gray-50 py-4'}`}>
              <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300 mx-4">
                <Play className="h-16 w-16 text-primary mb-4 mx-auto" />
                <p className="text-secondary">{videoTitle}</p>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}