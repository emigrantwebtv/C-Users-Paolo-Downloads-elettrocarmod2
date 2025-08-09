import FloatingNavigation from "@/components/FloatingNavigation";
import PhotoSlideshow from "@/components/PhotoSlideshow";

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
            
            {/* Video section */}
            <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <div className="h-16 w-16 text-primary mb-4 mx-auto">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-secondary">Video Gallery Completa</p>
            </div>
          </div>
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}
