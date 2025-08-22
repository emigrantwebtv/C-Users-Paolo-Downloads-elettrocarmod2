import ContentPage from "@/components/ContentPage";
import videoAutolavaggio from "@assets/video_autolavaggio_1755451124305.mp4";
import imageAutolavaggio from "@assets/foto_autolavaggio_1755167189124.jpeg";

export default function Autolavaggio() {
  return (
    <ContentPage
      title="AUTOLAVAGGIO"
      secondImageUrl="/attached_assets/logo_autolavaggio_1755608277413.jpg"
      secondImageAlt="Logo ELETTROCARWASH"
      secondImageClickUrl="http://elettrocarwash.altervista.org/360/app-files/index.html"
      secondImageTooltip="clicca per aprire la visualizzazione a 360 gradi dell'autolavaggio"
      imageUrl={imageAutolavaggio}
      imageAlt="Servizio Autolavaggio"
      description="Elettrocarwash è un servizio di autolavaggio che in modalità manuale ti permette di lavare la tua auto con pochi euro o di scegliere in modalità automatica un programma preimpostato. Per la pulizia degli interni c'è un'apposita area munita di aspirapolvere, profumo antibatterico, area ompressa, nero gomme, e lavatappeti, nonchè una serie di prodotti specifici per la cura e la bellezza della vostra auto."
      videoTitle="Video Processo di Lavaggio"
      videoUrl={videoAutolavaggio}
      transparentSpacing={true}
      imageHeight="h-[506px]"
    />
  );
}
