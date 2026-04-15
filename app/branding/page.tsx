import SectionPageTemplate from "@/components/sections/SectionPageTemplate";
import { WORK } from "@/lib/constants";

export default function BrandingPage() {
  return (
    <SectionPageTemplate
      title="Branding"
      gradient="linear-gradient(to bottom, transparent, #1a4d2e)"
      accentColor="#3db56a"
      works={WORK.branding}
    />
  );
}
