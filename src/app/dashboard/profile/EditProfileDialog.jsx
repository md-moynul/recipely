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

// Cleaned up classes to support absolute dark mode toggles seamlessly
const fieldBg = "bg-[#FFF9F2] dark:bg-background";
const fieldClass = `rounded-xl border-[#EAE0D3] dark:border-[#3A332A] ${fieldBg} text-[#2B2420] dark:text-[#F4EDE4] placeholder:text-[#9C9388] focus-visible:border-[#E85D3D] focus-visible:ring-[#E85D3D]/20`;
const labelClass = "text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]";

export default function EditProfileDialog({ user }) {
  const [name, setName] = useState(user?.name ?? "");
  const [imageUrl, setImageUrl] = useState(user?.image ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitProfile = async (close) => {
    setIsSubmitting(true);
    setError("");

    try {
      close();
    } catch (err) {
      console.error("EditProfileDialog submit error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { data, error } = await authClient.updateUser({
        image: imageUrl,
        name,
      });

      if (data) {
        toast.success("Profile updated successfully!");
        window.location.reload();
        close();
      }
      if (error) {
        toast.error(error.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      await submitProfile(close);
    }
  };

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <Button
        className="flex items-center gap-1.5 rounded-xl border bg-[#E85D3D] "
      >
        <Pencil width={15} height={15} />
        Edit Profile
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog
            className="w-full max-w-md border border-[#EAE0D3] bg-white p-6 dark:border-[#3A332A] dark:bg-[#252019]"
          >
            {({ close }) => (
              <>
                <AlertDialog.Header className="flex items-center gap-3 pb-4">
                  <AlertDialog.Icon className="bg-[#E85D3D]/10 text-[#E85D3D]">
                    <Person width={20} height={20} />
                  </AlertDialog.Icon>
                  <AlertDialog.Heading className="text-xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
                    Edit Profile
                  </AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <Form
                    className="mt-2 flex flex-col gap-5"
                    onSubmit={(e) => handleSubmit(e, close)}
                  >
                    {/* Live Preview Avatar */}
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
                      <p className="text-xs text-[#6B6155] dark:text-[#B8AFA2]">
                        Preview updates as you type your image link below.
                      </p>
                    </div>

                    {/* Name Input */}
                    <TextField
                      name="name"
                      isRequired
                      value={name}
                      onChange={setName}
                      className="flex flex-col gap-1.5"
                    >
                      <Label className={labelClass}>Name</Label>
                      <Input
                        placeholder="Your name"
                        className={fieldClass}
                      />
                      <FieldError className="text-xs text-[#D64545]" />
                    </TextField>

                    {/* Image URL Input */}
                    <TextField
                      name="image"
                      type="url"
                      value={imageUrl}
                      onChange={setImageUrl}
                      className="flex flex-col gap-1.5"
                    >
                      <Label className={labelClass}>Image URL</Label>
                      <Input
                        placeholder="https://example.com/your-photo.jpg"
                        className={fieldClass}
                      />
                      <FieldError className="text-xs text-[#D64545]" />
                    </TextField>

                    {error && <p className="text-sm text-[#D64545]">{error}</p>}

                    {/* Dialog Actions */}
                    <AlertDialog.Footer className="mt-2 flex justify-end gap-3">
                      <Button
                        slot="close"
                        isDisabled={isSubmitting}
                        className="rounded-xl border-2 bg-background text-foreground "
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isDisabled={isSubmitting}
                        className="rounded-xl bg-[#E85D3D] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#D14E30] disabled:opacity-60"
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