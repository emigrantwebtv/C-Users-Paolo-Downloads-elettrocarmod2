import ContentPage from "@/components/ContentPage";
import FloatingNavigation from "@/components/FloatingNavigation";
import contattiVideo from "@assets/Video Duplicazione Chiavi_1755684979130_1755772415949.mp4";
import contattiPhoto from "@assets/foto contatti_1755717576894_1755772885332.jpg";

export default function Contatti() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">ELETTROCAR</h1>
          <h2 className="text-xl text-blue-200 text-center mt-2">CONTATTI</h2>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 pt-2">
        <div className="bg-transparent shadow-none rounded-xl overflow-hidden">
          {/* Main image */}
          <div className="bg-transparent py-4">
            <img
              src={contattiPhoto}
              alt="Team ELETTROCAR - Pasquale e Antonio con servizi Magneti Marelli e Checkstar"
              className="w-full h-[60vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-t-xl slideshow-container"
            />
          </div>
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6 text-justify" style={{ hyphens: 'auto', wordBreak: 'normal', overflowWrap: 'break-word' }}>
              Contattaci per qualsiasi informazione o per prenotare i nostri servizi. Il nostro team è sempre disponibile per fornire consulenza personalizzata e supporto tecnico. Rispondiamo rapidamente a tutte le richieste.
            </p>
          </div>
          
          {/* Video section - now outside white container, same as photo */}
          <div className="bg-transparent py-4">
            <video
              className="w-full h-[60vh] sm:h-[60vh] md:h-[70vh] object-cover rounded-t-xl slideshow-container"
              controls
              autoPlay
              playsInline
            >
              <source src={contattiVideo} type="video/mp4" />
              <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
            </video>
            <p className="text-center text-secondary mt-2 text-sm bg-gray-50 py-2">Video Duplicazione Chiavi</p>
          </div>
          
          <div className="p-6">

            {/* EmigrantWebTV Logo */}
            <div className="mt-8 flex justify-center">
              <img
                src="/attached_assets/logoemigrant_1755813935121.jpg"
                alt="EmigrantWebTV Logo"
                title="App realizzata da EmigrantWebTV"
                className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onClick={() => window.open('http://www.emigrantwebtv.com', '_blank')}
              />
            </div>

            {/* QR Code per l'app */}
            <div className="mt-8 flex flex-col items-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://h1.nu/elettrocar"
                alt="QR Code per scaricare l'app Elettrocar"
                className="w-50 h-50"
              />
              <p className="text-center text-gray-600 mt-3 text-sm font-medium">
                Scansiona per scaricare l'app Elettrocar
              </p>
            </div>
          </div>
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}
