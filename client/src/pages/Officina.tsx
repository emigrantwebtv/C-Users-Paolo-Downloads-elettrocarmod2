import ContentPage from "@/components/ContentPage";
import videoOfficina from "@assets/video officina_1753348318629.mp4";
import imageOfficina from "@assets/immagine officina_1753352358242.jpeg";

export default function Officina() {
  return (
    <ContentPage
      title="OFFICINA"
      imageUrl={imageOfficina}
      imageAlt="Officina ELETTROCAR"
      description="Elettrocar è un'officina specializzata con servizio elettrauto che si occupa di riparazione a domicilio e pronto intervento, riparazione alternatori e motorini, vendita e installazione kit xeon, controllo regolazione fari, diagnosi e riprogrammazione di centraline motore e airbag, vendita e installazione autoradio con kit vivavoce, comandi vocali, bluetooth, televisore digitale terrestre, lettore dvd, navigatore, telecamera e poggiatesta con videogiochi incorporati, ricariche aria condizionata su auto e mezzi agricoli industriali, montaggio gomme, cambio olio, riparazione impianti mezzi agricoli e industriali."
      videoTitle="Video Tour Officina"
      videoUrl={videoOfficina}
    />
  );
}
