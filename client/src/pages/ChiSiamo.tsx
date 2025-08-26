import { useEffect } from "react";
import ContentPage from "@/components/ContentPage";
import FloatingNavigation from "@/components/FloatingNavigation";
import videoChiSiamo from "@assets/video_chi_siamo_1755450804254.mp4";
import imageChiSiamo from "@assets/foto_chi siamo_1755166631504.jpeg";

export default function ChiSiamo() {
  const title = "CHI SIAMO";
  const description = "Elettrocar snc dei fratelli Callara Pasquale & Antonio è una società di persone avente come oggetto l'esercizio di attività commerciali di dimensioni medio piccole, regolarmente iscritta nel registro delle imprese, che opera nel comune di Colle Sattita (BN), dotata di un'Officina Meccanica Specializzata 'Elettrocar' con annesso servizio di Elettrauto, un Autolavaggio manuale e automatico 'Elettrocarwash' e un servizio di vendita e assistenza di biciclette elettriche e monopattini 'Elettrocarbikes' nonchè di un piccolo Bar ove potrete rinfrescarvi e acquistare prodotti per la cura e la pulizia della vostra auto.";

  // Set page identifier on body for CSS targeting
  useEffect(() => {
    document.body.setAttribute('data-page', 'chi-siamo');
    return () => {
      document.body.removeAttribute('data-page');
    };
  }, []);

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
      <main className="container mx-auto px-4 pt-2">
        <div className="bg-transparent shadow-none rounded-xl overflow-hidden">
          {/* Image section */}
          <div className="bg-transparent py-4">
            <img
              src={imageChiSiamo}
              alt="Team ELETTROCAR"
              className="max-w-full h-auto object-cover rounded-t-xl"
            />
          </div>
          
          <div className="p-3 sm:p-6">
            <p className="text-blue-600 leading-relaxed mb-3 sm:mb-6 text-justify" style={{ hyphens: 'auto', wordBreak: 'normal', overflowWrap: 'break-word' }}>
              {description}
            </p>
          </div>
          
          {/* Video section */}
          <div className="bg-transparent py-3 sm:py-4">
            <video
              className="w-full h-[67vh] sm:h-[67vh] md:h-[77vh] object-cover rounded-t-xl slideshow-container"
              controls
              autoPlay
              playsInline
            >
              <source src={videoChiSiamo} type="video/mp4" />
              <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
            </video>
            <p className="text-center text-secondary mt-2 text-sm bg-gray-50 py-2">Video Presentazione Aziendale</p>
          </div>
        </div>
      </main>

      {/* Duplicate video for smartphone landscape - no container, before navigation */}
      <video
        className="landscape-video-duplicate hidden w-full h-auto object-cover"
        controls
        playsInline
        data-testid="video-duplicate-landscape"
      >
        <source src={videoChiSiamo} type="video/mp4" />
        <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
      </video>

      <FloatingNavigation />
    </div>
  );
}
