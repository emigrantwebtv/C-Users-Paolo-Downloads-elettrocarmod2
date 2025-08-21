import ContentPage from "@/components/ContentPage";
import contattiVideo from "@assets/Video Duplicazione Chiavi_1755684979130_1755772415949.mp4";
import contattiPhoto from "@assets/foto contatti_1755717576894_1755772885332.jpg";

export default function Contatti() {
  return (
    <ContentPage
      title="CONTATTI"
      imageUrl={contattiPhoto}
      imageAlt="Team ELETTROCAR - Pasquale e Antonio con servizi Magneti Marelli e Checkstar"
      description="Contattaci per qualsiasi informazione o per prenotare i nostri servizi. Il nostro team è sempre disponibile per fornire consulenza personalizzata e supporto tecnico. Rispondiamo rapidamente a tutte le richieste."
      videoUrl={contattiVideo}
      videoTitle="Video Duplicazione Chiavi"
    />
  );
}
