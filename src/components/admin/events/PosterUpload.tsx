"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface PosterUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export function PosterUpload({ value, onChange }: PosterUploadProps) {
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('posters')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from('posters').getPublicUrl(filePath);
            onChange(data.publicUrl);

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                <div className="flex items-start gap-4">
                    {/* Preview Area */}
                    <div className="relative w-32 h-48 bg-black/50 border border-white/10 rounded-md overflow-hidden flex items-center justify-center group">
                        {value ? (
                            <>
                                <Image
                                    src={value}
                                    alt="Poster Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => onChange("")}
                                    className="absolute top-2 right-2 bg-black/80 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <ImageIcon className="w-8 h-8 text-gray-600" />
                        )}

                        {uploading && (
                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-brand-pink animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-white">Event Poster</label>
                        <p className="text-xs text-gray-500 mb-4">
                            Recommended size: 1080x1920px (Portrait). Max 5MB.
                        </p>

                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={uploading}
                            />
                            <Button type="button" variant="outline" className="pointer-events-none w-full border-dashed">
                                <Upload className="w-4 h-4 mr-2" />
                                {uploading ? "Uploading..." : "Click to Upload"}
                            </Button>
                        </div>

                        <div className="text-xs text-gray-600 text-center">
                            OR
                        </div>

                        <input
                            type="text"
                            placeholder="Paste Image URL directly"
                            className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
