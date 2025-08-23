import FloatingNavigation from "@/components/FloatingNavigation";
import { Play } from "lucide-react";

export default function DoveSiamo() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">ELETTROCAR</h1>
          <h2 className="text-xl text-blue-200 text-center mt-2">DOVE SIAMO</h2>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Immagine */}
          <img
            src="/attached_assets/dove_siamo_1755168166832.jpg"
            alt="Sede ELETTROCAR"
            className="w-full h-auto object-cover"
          />
          
          <div className="p-6">
            <p className="text-blue-600 leading-relaxed mb-6">
              Ci trovi in una posizione strategica e facilmente raggiungibile. La nostra struttura dispone di ampio parcheggio e si trova vicino ai principali collegamenti stradali. Aperti dal lunedì al sabato con orari flessibili per le tue esigenze.
            </p>
          </div>
        </div>

        {/* Mappa Google Maps */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            La Nostra Posizione
          </h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.1234567890123!2d14.8382999!3d41.364686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133a10a49b336bf7%3A0x61b73c576954e673!2sElettrocar!5e0!3m2!1sit!2sit!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Posizione Elettrocar - Zona Industriale 1, Colle Sannita (BN)"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Zona Industriale, 1 - 82024 Colle Sannita (BN)
            </p>
            <a 
              href="https://www.google.com/maps/dir//Elettrocar,+9R7R%2BQG+Zona+Industriale,+1,+82024+Colle+Sannita+BN/@41.364686,14.8382999,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x133a10a49b336bf7:0x61b73c576954e673!2m2!1d14.8405238!2d41.3645406?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ottieni Indicazioni
            </a>
          </div>
        </div>

        {/* Video Chi Siamo aggiunto */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6">
          <div className="p-6">
            <video
              controls
              autoPlay
              className="w-full h-auto object-cover rounded-t-lg"
            >
              <source src="/attached_assets/gomme_callara_1755451856061_1755812997687.mp4" type="video/mp4" />
              Il tuo browser non supporta il tag video.
            </video>
            <p className="text-center text-secondary mt-2 text-sm">Video Promozionale Pneumatici</p>
          </div>
        </div>
      </main>

      <FloatingNavigation />
    </div>
  );
}