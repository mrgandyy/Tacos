"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Loader2, Save, Users, Zap } from "lucide-react";
import { updateGroup } from "@/app/actions/groups";
import { AvatarUpload } from "./AvatarUpload";

export function GroupEditor({ group }: { group: any }) {
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

    // Simple controlled form
    const [formData, setFormData] = useState({
        name: group.name || "",
        description: group.description || "",
        logo_url: group.logo_url || "",
        social_link: group.social_link || "",
        discord_link: group.discord_link || ""
    });

    const isApproved = group.application_status === 'approved';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus("idle");

        const res = await updateGroup(group.id, formData);

        if (res.error) {
            alert(res.error);
            setStatus("error");
        } else {
            setStatus("saved");
            setTimeout(() => setStatus("idle"), 2000);
        }
        setSubmitting(false);
    };

    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-cyber-cyan" /> My Group / Club
                        </CardTitle>
                        <CardDescription>
                            Manage your group's public listing.
                        </CardDescription>
                    </div>
                    <Badge variant={isApproved ? "default" : "secondary"} className={
                        isApproved ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                    }>
                        {group.application_status.toUpperCase()}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center mb-6">
                        <div className="text-center space-y-2">
                            <Label>Group Logo</Label>
                            <AvatarUpload
                                value={formData.logo_url}
                                onChange={(url) => setFormData(prev => ({ ...prev, logo_url: url }))}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Group Name</Label>
                        <Input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className="bg-black/50 border-zinc-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            className="bg-black/50 border-zinc-700 min-h-[100px]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Social/Website Link</Label>
                            <Input
                                value={formData.social_link}
                                onChange={e => setFormData({ ...formData, social_link: e.target.value })}
                                className="bg-black/50 border-zinc-700"
                                placeholder="https://..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Discord Invite</Label>
                            <Input
                                value={formData.discord_link}
                                onChange={e => setFormData({ ...formData, discord_link: e.target.value })}
                                className="bg-black/50 border-zinc-700"
                                placeholder="https://discord.gg/..."
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        <div className="text-sm">
                            {status === 'saved' && <span className="text-green-400">Saved successfully!</span>}
                        </div>

                        <Button type="submit" variant="solid" className="bg-cyber-cyan text-black hover:bg-cyber-cyan/80" disabled={submitting}>
                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Update Group Details
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
