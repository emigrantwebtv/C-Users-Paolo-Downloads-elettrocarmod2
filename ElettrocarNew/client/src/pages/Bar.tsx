import ContentPage from "@/components/ContentPage";
import barPhoto from "@assets/foto_bar_1755167727857.jpg";
import barVideo from "@assets/Video Bar-1_1755675910363_1755772792446.mp4";

export default function Bar() {
  return (
    <ContentPage
      title="BAR"
      imageUrl={barPhoto}
      imageAlt="Bar ELETTROCAR - Area relax con distributori automatici"
      description="Mentre aspetti il completamento dei servizi, rilassati nel nostro accogliente bar. Offriamo caffè di qualità, bevande fresche e snack deliziosi in un ambiente confortevole con Wi-Fi gratuito e zona lettura."
      videoUrl={barVideo}
      videoTitle="Video Tour Bar"
      transparentSpacing={true}
    />
  );
}
