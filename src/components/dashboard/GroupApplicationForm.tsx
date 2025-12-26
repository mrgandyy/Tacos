"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createGroupApplication } from "@/app/actions/groups";
import { Loader2, Send, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export function GroupApplicationForm({ onCancel }: { onCancel?: () => void }) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo_url: "",
        social_link: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const res = await createGroupApplication(formData);

        if (res.error) {
            alert(res.error);
            setSubmitting(false);
        } else {
            router.refresh(); // Refresh to show pending state
            if (onCancel) onCancel();
        }
    };

    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyber-cyan" /> Partner Application
                </CardTitle>
                <CardDescription>
                    Apply to list your VRChat Group or Club on Taco's Nightlife.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Group Name *</Label>
                        <Input
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="bg-black/50 border-zinc-700"
                            placeholder="e.g. The Midnight Club"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="bg-black/50 border-zinc-700"
                            placeholder="What vibe does your group bring to the scene?"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Logo URL</Label>
                            <Input
                                value={formData.logo_url}
                                onChange={e => setFormData({ ...formData, logo_url: e.target.value })}
                                className="bg-black/50 border-zinc-700"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Discord/Social Link</Label>
                            <Input
                                value={formData.social_link}
                                onChange={e => setFormData({ ...formData, social_link: e.target.value })}
                                className="bg-black/50 border-zinc-700"
                                placeholder="https://discord.gg/..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        {onCancel && (
                            <Button type="button" variant="ghost" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                        <Button type="submit" variant="solid" className="bg-cyber-cyan text-black hover:bg-cyber-cyan/80" disabled={submitting}>
                            {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            Submit Application
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
