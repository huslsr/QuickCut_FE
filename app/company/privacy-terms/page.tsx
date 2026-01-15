import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivacyTermsContent from "@/components/PrivacyTermsContent";

export const metadata = {
  title: "Privacy Policy & Terms of Service | QuickCut News",
  description:
    "Read QuickCut News' Privacy Policy, Terms of Service, and Community Guidelines.",
};

export default function PrivacyTermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-black font-serif text-center mb-12">
          Privacy & Terms
        </h1>
        <div className="bg-card p-6 md:p-10 rounded-3xl border border-border shadow-sm">
          <PrivacyTermsContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
