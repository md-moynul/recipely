"use client";

import { useState } from "react";
import Image from "next/image";
import {
    AlertDialog,
    Button,
    Form,
    Input,
    Label,
    TextField,
    FieldError,
} from "@heroui/react";
import { Pencil, Person } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

// Inline styles fight off the HeroUI v3 background token override
const fieldStyle = { backgroundColor: "#FFF9F2", color: "#2B2420" };
const fieldClass =
    "rounded-xl border-[#EAE0D3] placeholder:text-[#9C9388] focus-visible:border-[#E85D3D] focus-visible:ring-[#E85D3D]/20 dark:border-[#3A332A]";

export default function EditProfileDialog({ user }) {
    const [name, setName] = useState(user?.name ?? "");
    const [imageUrl, setImageUrl] = useState(user?.image ?? "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const submitProfile = async (close) => {
        setIsSubmitting(true);
        setError("");

        try {
            const payload = { name, image: imageUrl };
            close();
        } catch (err) {
            console.error("EditProfileDialog submit error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 1. Fixed: Now accepts 'close' as an argument from the form submission context
    const handleSubmit = async (e, close) => {
        e.preventDefault();
        const { data, error }= await authClient.updateUser({
            image: imageUrl,
            name,
        })
        if(data){
            toast.success("Profile updated successfully!")
            window.location.reload();
            close();
        }
        if(error){
            toast.error(error.message)
        }
        submitProfile(close);
    };

    return (
        <AlertDialog>
            {/* Trigger must be the first direct child of AlertDialog (HeroUI v3 pattern) */}
            <Button
                style={{ backgroundColor: "#FFFFFF", color: "#2B2420" }}
                className="flex items-center gap-1.5 rounded-xl border border-[#EAE0D3] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#FBF1E6] dark:border-[#3A332A]"
            >
                <Pencil width={15} height={15} />
                Edit Profile
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog
                        style={{ backgroundColor: "#FFFFFF" }}
                        className="dark:bg-[#252019]"
                    >
                        {({ close }) => (
                            <>
                                <AlertDialog.Header>
                                    <AlertDialog.Icon className="bg-[#E85D3D]/10 text-[#E85D3D]">
                                        <Person width={20} height={20} />
                                    </AlertDialog.Icon>
                                    <AlertDialog.Heading className="text-[#2B2420] dark:text-[#F4EDE4]">
                                        Edit Profile
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body>
                                    <Form
                                        className="flex flex-col gap-5"
                                        onSubmit={(e) => handleSubmit(e, close)}
                                    >
                                        {/* Live preview of the image URL */}
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#E85D3D] bg-[#FBF1E6] dark:bg-[#1A1714]">
                                                {imageUrl ? (
                                                    <Image
                                                        src={imageUrl}
                                                        alt="Profile preview"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[#C9BFAF]">
                                                        <Person width={24} height={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-[#9C9388]">
                                                Preview updates as you type the image URL below.
                                            </p>
                                        </div>

                                        {/* 2. Fixed: onChange directly receives the string value string, not the event */}
                                        <TextField
                                            name="name"
                                            isRequired
                                            value={name}
                                            onChange={setName}
                                            className="flex flex-col gap-1.5"
                                        >
                                            <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                                                Name
                                            </Label>
                                            <Input
                                                placeholder="Your name"
                                                style={fieldStyle}
                                                className={fieldClass}
                                            />
                                            <FieldError className="text-xs text-[#D64545]" />
                                        </TextField>

                                        {/* 2. Fixed: onChange directly receives the string value string here too */}
                                        <TextField
                                            name="image"
                                            type="url"
                                            value={imageUrl}
                                            onChange={setImageUrl}
                                            className="flex flex-col gap-1.5"
                                        >
                                            <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                                                Image URL
                                            </Label>
                                            <Input
                                                placeholder="https://example.com/your-photo.jpg"
                                                style={fieldStyle}
                                                className={fieldClass}
                                            />
                                            <FieldError className="text-xs text-[#D64545]" />
                                        </TextField>

                                        {error && <p className="text-sm text-[#D64545]">{error}</p>}
                                        
                                        <AlertDialog.Footer>
                                            <Button
                                                slot="close"
                                                style={{ backgroundColor: "#FFFFFF", color: "#2B2420" }}
                                                isDisabled={isSubmitting}
                                                className="rounded-xl border border-[#EAE0D3] hover:bg-[#FBF1E6] dark:border-[#3A332A]"
                                            >
                                                Cancel
                                            </Button>
                                            {/* 3. Fixed: Changed onPress to type="submit" so it utilizes the Form container */}
                                            <Button
                                                type="submit"
                                                isDisabled={isSubmitting}
                                                style={{ backgroundColor: "#E85D3D", color: "#FFFFFF" }}
                                                className="rounded-xl hover:bg-[#D14E30] disabled:opacity-60"
                                            >
                                                {isSubmitting ? "Saving…" : "Save Changes"}
                                            </Button>
                                        </AlertDialog.Footer>
                                    </Form>
                                </AlertDialog.Body>
                            </>
                        )}
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}