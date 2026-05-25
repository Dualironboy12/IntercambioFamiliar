import { RulesSection } from "@/figmaTemplate/src/app/components/rules-section";
import { WishlistSection } from "@/figmaTemplate/src/app/components/wishlist-section";
import { PotluckSection } from "@/figmaTemplate/src/app/components/potluck-section";

export default function Home() {
  return (
    <div>
      <RulesSection />
      <WishlistSection />
      <PotluckSection />
    </div>
  );
}
