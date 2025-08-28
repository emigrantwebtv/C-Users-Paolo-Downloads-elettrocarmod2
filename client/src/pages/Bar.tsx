import { useEffect } from "react";
import FloatingNavigation from "@/components/FloatingNavigation";
import barPhoto from "@assets/foto_bar_1755167727857.jpg";
import barVideo from "@assets/Video Bar-1_1755675910363_1755772792446.mp4";

export default function Bar() {
  const title = "BAR";
  const description = "Mentre aspetti il completamento dei servizi, rilassati nel nostro accogliente bar. Offriamo caffè di qualità, bevande fresche e snack deliziosi in un ambiente confortevole con Wi-Fi gratuito e zona lettura.";

  // Set page identifier on body for CSS targeting
  useEffect(() => {
    document.body.setAttribute('data-page', 'bar');
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
              src={barPhoto}
              alt="Bar ELETTROCAR - Area relax con distributori automatici"
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
              <source src={barVideo} type="video/mp4" />
              <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
            </video>
            <p className="text-center text-secondary mt-2 text-sm bg-gray-50 py-2">Video Tour Bar</p>
          </div>
        </div>
      </main>

      {/* Video before navigation - 20% reduced width only, for landscape smartphones */}
      <video
        className="landscape-video-before-nav hidden"
        controls
        playsInline
        data-testid="video-before-navigation"
        id="video-bar-before-nav"
      >
        <source src={barVideo} type="video/mp4" />
        <p className="text-secondary p-4">Il tuo browser non supporta i video HTML5.</p>
      </video>

      <FloatingNavigation />
    </div>
  );
}
