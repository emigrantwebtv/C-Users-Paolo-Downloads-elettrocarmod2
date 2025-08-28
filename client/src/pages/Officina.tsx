import { useEffect } from "react";
import FloatingNavigation from "@/components/FloatingNavigation";
import videoOfficina from "@assets/video_officina_1755450938248.mp4";
import imageOfficina from "@assets/foto_officina_1755166872764.jpeg";

export default function Officina() {
  const title = "OFFICINA";
  const description = "Elettrocar è un'officina specializzata con servizio elettrauto che si occupa di riparazione a domicilio e pronto intervento, riparazione alternatori e motorini, vendita e installazione kit xeon, controllo regolazione fari, diagnosi e riprogrammazione di centraline motore e airbag, vendita e installazione autoradio con kit vivavoce, comandi vocali, bluetooth, televisore digitale terrestre, lettore dvd, navigatore, telecamera e poggiatesta con videogiochi incorporati, ricariche aria condizionata su auto e mezzi agricoli industriali, montaggio gomme, cambio olio, riparazione impianti mezzi agricoli e industriali.";

  // Set page identifier on body for CSS targeting
  useEffect(() => {
    document.body.setAttribute('data-page', 'officina');
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

      {/* Content - Container interrupted for landscape */}
      <main className="container mx-auto px-4 pt-2">
        <div className="bg-transparent shadow-none rounded-xl overflow-hidden">
          {/* Image section */}
          <div className="bg-transparent py-4">
            <img
              src={imageOfficina}
              alt="Officina ELETTROCAR"
              className="max-w-full h-auto object-cover rounded-t-xl"
            />
          </div>
          
          {/* Description container - interrupted in landscape */}
          <div className="description-container p-3 sm:p-6">
            <p className="text-blue-600 leading-relaxed mb-3 sm:mb-6 text-justify" style={{ hyphens: 'auto', wordBreak: 'normal', overflowWrap: 'break-word' }}>
              {description}
            </p>
          </div>
          
          {/* Video section - inside container for portrait */}
          <div className="video-container-original bg-transparent py-3 sm:py-4">
            <video
              className="w-full h-[67vh] sm:h-[67vh] md:h-[77vh] object-cover rounded-t-xl slideshow-container"
              controls
              autoPlay
              playsInline
            >
              <source src={videoOfficina} type="video/mp4" />
              <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
            </video>
            <p className="text-center text-secondary mt-2 text-sm bg-gray-50 py-2">Video Tour Officina</p>
          </div>
        </div>
      </main>

      {/* Video before navigation - 20% reduced, for landscape smartphones */}
      <video
        className="landscape-video-before-nav hidden"
        controls
        playsInline
        data-testid="video-before-navigation"
        id="video-officina-before-nav"
      >
        <source src={videoOfficina} type="video/mp4" />
        <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
      </video>

      <FloatingNavigation />
    </div>
  );
}
