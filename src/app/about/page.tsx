import { Container, Section } from "@/components/ui/Layout";
import { LogoText } from "@/components/ui/Logo";

export default function AboutPage() {
    const faqs = [
        {
            q: "Is Taco's the group name?",
            a: "Yes. Taco's is the overarching label/group. The individual venues (Afterdark, Underground, etc.) are instances or worlds under the Taco's brand."
        },
        {
            q: "When are events?",
            a: "We run coordinated weekends, typically Friday and Saturday nights starting at 10 PM EST. Check the Events page for the specific schedule."
        },
        {
            q: "How do I join the staff?",
            a: "Go to the Staff page and fill out the quick application form. We review applications weekly."
        },
        {
            q: "Can I DJ here?",
            a: "Absolutely. We are always scouting for talent. Apply as a DJ on the Staff page or drop a mix in our Discord."
        }
    ];

    return (
        <div className="min-h-screen">
            <Section className="pt-32">
                <Container>
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
                        <div className="flex-1 space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold text-white">
                                Tradition Built <span className="text-brand-pink">After Dark</span>.
                            </h1>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Taco's started as a small gathering of friends looking for a better place to hang out late at night.
                                It has evolved into a multi-venue circuit that defines the VRChat nightlife experience.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                We believe in consistency, safety, and high energy. Every weekend, every event, every instance.
                            </p>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative p-12 bg-white/5 rounded-full border border-white/5">
                                <LogoText className="h-48 w-48 opacity-80" />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-12">
                        <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-brand-pink/20 transition-colors">
                                    <h3 className="text-xl font-bold text-white mb-2">{faq.q}</h3>
                                    <p className="text-gray-400">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
