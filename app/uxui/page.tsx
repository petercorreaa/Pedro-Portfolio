import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import { WORK } from "@/lib/constants";

export default function UXUIPage() {
  return (
    <SectionPageTemplate
      title="UX/UI"
      gradient="linear-gradient(to bottom, transparent, #3b1f6b)"
      accentColor="#9b6bff"
      works={WORK.uxui}
    />
  );
}
