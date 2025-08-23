import FloatingNavigation from "@/components/FloatingNavigation";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import VideoSlideshow from "@/components/VideoSlideshow";

export default function Gallery() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">ELETTROCAR</h1>
          <h2 className="text-xl text-blue-200 text-center mt-2">GALLERY</h2>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 pb-24">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Slideshow sostituisce l'immagine */}
          <PhotoSlideshow className="w-full" />
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6">
              Sfoglia la nostra gallery per vedere i risultati dei nostri servizi. Dalle trasformazioni più spettacolari alle manutenzioni di routine, ogni immagine racconta la storia della qualità e dell'attenzione ai dettagli che ci contraddistingue.
            </p>
            
            {/* Video Gallery - Empty slideshow for videos */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-primary mb-4">Gestione Video</h3>
              <VideoSlideshow className="w-full" />
            </div>
          </div>
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}
