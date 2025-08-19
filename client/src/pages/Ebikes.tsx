import ContentPage from "@/components/ContentPage";
import videoEbikes from "@assets/video_ebikes_1755451281208.mp4";

export default function Ebikes() {
  return (
    <ContentPage
      title="EBIKES"
      imageUrl="/attached_assets/animazionebikesOK_1755600733976.gif"
      imageAlt="E-Bikes ELETTROCAR"
      description="da Elettrocarbikes è possibile acquistare biciclette elettriche pieghevoli a pedalata assistita in telaio di alluminio da 20 pollici con motore da 750 watt, 3 modalità di guida, 5 livelli di potenza, cambio scimano a 7 velocità, freni a disco meccanici, batteria a litio rimovibile da 13 Ah con ricarica rigenerativa tramite motore. Autonomia 50/70 km in modalità elettrica e 100/120 km in modalità a pedalata assistita, velocità massima 45 km/h in modalità elettrica. Display LCD, Cruise Control e forcella anteriore in acciaio di carbonio ad alta resistenza, confort assorbimento degli urti. Vendita e assistenza su e-bikes e monopattini."
      videoTitle="Video Gamma E-Bikes"
      videoUrl={videoEbikes}
    />
  );
}
