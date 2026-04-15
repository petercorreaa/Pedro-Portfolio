import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import { WORK } from "@/lib/constants";

export default function VisualPage() {
  return (
    <SectionPageTemplate
      title="Visual"
      gradient="linear-gradient(to bottom, transparent, #7a2e0e)"
      accentColor="#f07a3a"
      works={WORK.visual}
    />
  );
}
