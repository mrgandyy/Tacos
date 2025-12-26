"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Upload, X, Loader2, User, Camera } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export function AvatarUpload({ value, onChange }: AvatarUploadProps) {
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `avatar-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            // Try 'avatars' bucket first, fallback to 'posters' if needed or handle error
            // We assume 'avatars' bucket exists (user will run migration)
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                console.error("Upload error:", uploadError);
                throw uploadError;
            }

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            onChange(data.publicUrl);

        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Error uploading avatar. Please ensure the "avatars" bucket is created in Supabase.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="relative group">
                <Avatar className="w-24 h-24 border-2 border-zinc-800">
                    <AvatarImage src={value} className="object-cover" />
                    <AvatarFallback className="bg-zinc-900 text-zinc-500">
                        <User className="w-8 h-8" />
                    </AvatarFallback>
                </Avatar>

                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    {uploading ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                        <Camera className="w-6 h-6 text-white" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                    />
                </div>
            </div>

            <div className="text-center">
                <p className="text-xs text-zinc-500">Click to upload new picture</p>
                <input type="hidden" name="avatar_url" value={value} />
            </div>
        </div>
    );
}
