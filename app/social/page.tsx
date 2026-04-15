import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import { WORK } from "@/lib/constants";

export default function SocialPage() {
  return (
    <SectionPageTemplate
      title="Social"
      gradient="linear-gradient(to bottom, transparent, #1e3a5f)"
      accentColor="#4a8fd4"
      works={WORK.social}
    />
  );
}
