import { Link } from "wouter";
import { Home, Users, Wrench, Car, Bike, Coffee, MapPin, Images, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/chi-siamo", icon: Users, label: "Chi Siamo" },
  { path: "/officina", icon: Wrench, label: "Officina" },
  { path: "/autolavaggio", icon: Car, label: "Autolavaggio" },
  { path: "/ebikes", icon: Bike, label: "E-Bikes" },
  { path: "/bar", icon: Coffee, label: "Bar" },
  { path: "/dove-siamo", icon: MapPin, label: "Dove Siamo" },
  { path: "/gallery", icon: Images, label: "Gallery" },
  { path: "/contatti", icon: Phone, label: "Contatti" },
];

export default function FloatingNavigation() {
  return (
    <div className="bg-white rounded-full shadow-2xl border border-gray-200 mx-4">
      <div className="flex justify-around items-center py-2 px-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                size="sm"
                className="p-3 rounded-full hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <IconComponent className="h-5 w-5 text-primary" />
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
