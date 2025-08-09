import { Link } from "wouter";
import { Users, Wrench, Car, Bike, Coffee, MapPin, Images, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { path: "/chi-siamo", icon: Users, label: "CHI SIAMO" },
  { path: "/officina", icon: Wrench, label: "OFFICINA" },
  { path: "/autolavaggio", icon: Car, label: "AUTOLAVAGGIO" },
  { path: "/ebikes", icon: Bike, label: "EBIKES" },
  { path: "/bar", icon: Coffee, label: "BAR" },
  { path: "/dove-siamo", icon: MapPin, label: "DOVE SIAMO" },
  { path: "/gallery", icon: Images, label: "GALLERY" },
  { path: "/contatti", icon: Phone, label: "CONTATTI" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white shadow-xl">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide">ELETTROCAR</h1>
          <p className="text-blue-200 mt-2 text-lg">Officina, autolavaggio, codifica chiavi, e-bikes</p>
        </div>
      </header>

      {/* Navigation Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.path} href={item.path}>
                <Button
                  variant="outline"
                  className="nav-card bg-white rounded-xl shadow-lg p-6 h-auto hover:shadow-xl transition-all duration-300 hover:scale-105 touch-manipulation border-none w-full min-w-[140px]"
                >
                  <div className="text-center flex flex-col items-center w-full">
                    <IconComponent className="h-10 w-10 text-primary mb-3" />
                    <h3 className="font-semibold text-secondary text-sm break-words">{item.label}</h3>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
