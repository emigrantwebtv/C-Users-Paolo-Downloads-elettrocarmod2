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
    <div className="bg-white rounded-full shadow-2xl border border-gray-200 mx-0 sm:mx-4 navigation-container">
      <div className="flex justify-between items-center py-2 px-1 gap-0 sm:px-2 sm:justify-around">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <div className="p-1 sm:p-3 rounded-full hover:bg-gray-100 transition-colors touch-manipulation cursor-pointer">
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
