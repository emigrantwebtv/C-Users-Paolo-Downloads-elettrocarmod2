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
      <main className="container mx-auto px-4 pt-2 pb-24">
        <div className="bg-transparent shadow-none rounded-xl overflow-hidden">
          {/* Main image */}
          <div className="flex justify-center bg-transparent py-4">
            <img
              src={contattiPhoto}
              alt="Team ELETTROCAR - Pasquale e Antonio con servizi Magneti Marelli e Checkstar"
              className="max-w-full h-[506px] object-cover rounded-t-xl"
            />
          </div>
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6">
              Contattaci per qualsiasi informazione o per prenotare i nostri servizi. Il nostro team è sempre disponibile per fornire consulenza personalizzata e supporto tecnico. Rispondiamo rapidamente a tutte le richieste.
            </p>
            
            {/* Video section */}
            <div className="rounded-t-lg overflow-hidden">
              <video
                className="w-full h-[506px] object-cover rounded-t-lg"
                controls
                autoPlay
                playsInline
              >
                <source src={contattiVideo} type="video/mp4" />
                <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
              </video>
              <p className="text-center text-secondary mt-2 text-sm">Video Duplicazione Chiavi</p>
            </div>

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
          </div>
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}
