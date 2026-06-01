import { HeroCountdown } from "./components/hero-countdown";
import { RulesSection } from "./components/rules-section";
import { WishlistSection } from "./components/wishlist-section";
import { PotluckSection } from "./components/potluck-section";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroCountdown />
      <RulesSection />
      <WishlistSection />
      <PotluckSection scope="all" />
    </main>
  );
}
