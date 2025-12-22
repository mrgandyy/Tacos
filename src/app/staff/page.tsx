"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { staffRoles } from "@/data/staff";
import { Loader2, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StaffPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        discord: "",
        role: staffRoles[0].id,
        experience: "",
        availability: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            alert("Error submitting form.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="min-h-screen">
            <Section className="pt-32 pb-16 bg-gradient-to-b from-brand-pink/5 to-transparent">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Join the Team
                        </h1>
                        <p className="text-xl text-gray-400">
                            We're building a legacy. If you have the passion and the skills, we want you on the floor.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Roles List */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-4">Open Roles</h2>
                            {staffRoles.map((role) => (
                                <Card key={role.id} className="border-white/5 hover:border-brand-pink/30 bg-black/40">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-brand-pink">{role.title}</CardTitle>
                                        <CardDescription>{role.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>

                        {/* Application Form */}
                        <div>
                            <Card className="sticky top-24 border-white/10 bg-black/60 shadow-xl">
                                <CardHeader>
                                    <CardTitle>Application Form</CardTitle>
                                    <CardDescription>Simple intake. We'll reach out on Discord.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {success ? (
                                        <div className="text-center py-12 space-y-4">
                                            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                                                <CheckCircle className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">Application Received</h3>
                                            <p className="text-gray-400">Sit tight. We'll be in touch soon.</p>
                                            <Button variant="outline" onClick={() => setSuccess(false)} className="mt-4">
                                                Send Another
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">VRChat Display Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
                                                    placeholder="e.g. TacoLover99"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Discord Username</label>
                                                <input
                                                    type="text"
                                                    name="discord"
                                                    required
                                                    value={formData.discord}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
                                                    placeholder="e.g. taco#1234"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Role of Interest</label>
                                                <select
                                                    name="role"
                                                    value={formData.role}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
                                                >
                                                    {staffRoles.map(role => (
                                                        <option key={role.id} value={role.id} className="bg-neutral-900">{role.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Previous Experience</label>
                                                <textarea
                                                    name="experience"
                                                    rows={3}
                                                    value={formData.experience}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
                                                    placeholder="What clubs have you worked at?"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Availability</label>
                                                <input
                                                    type="text"
                                                    name="availability"
                                                    value={formData.availability}
                                                    onChange={handleChange}
                                                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
                                                    placeholder="e.g. Fridays 9PM EST"
                                                />
                                            </div>

                                            <Button type="submit" variant="solid" className="w-full mt-2" disabled={isSubmitting}>
                                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                                                {isSubmitting ? "Sending..." : "Submit Application"}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
