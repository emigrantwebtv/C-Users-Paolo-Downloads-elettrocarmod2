import ContentPage from "@/components/ContentPage";
import videoChiSiamo from "@assets/video_chi_siamo_1755450804254.mp4";
import imageChiSiamo from "@assets/foto_chi siamo_1755166631504.jpeg";

export default function ChiSiamo() {
  return (
    <ContentPage
      title="CHI SIAMO"
      imageUrl={imageChiSiamo}
      imageAlt="Team ELETTROCAR"
      description="Elettrocar snc dei fratelli Callara Pasquale & Antonio è una società di persone avente come oggetto l'esercizio di attività commerciali di dimensioni medio piccole, regolarmente iscritta nel registro delle imprese, che opera nel comune di Colle Sattita (BN), dotata di un'Officina Meccanica Specializzata 'Elettrocar' con annesso servizio di Elettrauto, un Autolavaggio manuale e automatico 'Elettrocarwash' e un servizio di vendita e assistenza di biciclette elettriche e monopattini 'Elettrocarbikes' nonchè di un piccolo Bar ove potrete rinfrescarvi e acquistare prodotti per la cura e la pulizia della vostra auto."
      videoTitle="Video Presentazione Aziendale"
      videoUrl={videoChiSiamo}
      transparentSpacing={true}
      pageId="chi-siamo"
    />
  );
}
