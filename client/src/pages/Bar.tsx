import ContentPage from "@/components/ContentPage";
import barPhoto from "@assets/foto bar_1754488464141.jpg";
import barVideo from "@assets/video bar_1754927466521.mp4";

export default function Bar() {
  return (
    <ContentPage
      title="BAR"
      imageUrl={barPhoto}
      imageAlt="Bar ELETTROCAR - Area relax con distributori automatici"
      description="Mentre aspetti il completamento dei servizi, rilassati nel nostro accogliente bar. Offriamo caffè di qualità, bevande fresche e snack deliziosi in un ambiente confortevole con Wi-Fi gratuito e zona lettura."
      videoUrl={barVideo}
      videoTitle="Video Tour Bar"
    />
  );
}
