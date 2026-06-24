"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { deleteRecipe } from "@/lib/action/recipe";


export default function DeleteRecipeDialog({ recipeId, recipeName }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (close) => {
        setIsDeleting(true);
        try {
            const result = await deleteRecipe(recipeId);
            if (result?.deletedCount) {
                toast.success(`${recipeName} deleted successfully!`);
                close();
                router.refresh();
            } else {
                toast.error("Could not delete this recipe. Please try again.");
            }
        } catch (err) {
            console.error("DeleteRecipeDialog error:", err);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger-soft"> <TrashBin width={15} height={15} /></Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="bg-white dark:bg-[#252019]">
                        {({ close }) => (
                            <>
                                <AlertDialog.Header>
                                    <AlertDialog.Icon className="bg-[#D64545]/10 text-[#D64545]">
                                        <TrashBin width={20} height={20} />
                                    </AlertDialog.Icon>
                                    <AlertDialog.Heading className="text-[#2B2420] dark:text-[#F4EDE4]">
                                        Delete recipe?
                                    </AlertDialog.Heading>
                                </AlertDialog.Header>

                                <AlertDialog.Body className="text-sm text-[#6B6155] dark:text-[#B8AFA2]">
                                    {recipeName ? (
                                        <>
                                            Are you sure you want to delete &quot;{recipeName}&quot;? This
                                            action cannot be undone.
                                        </>
                                    ) : (
                                        "Are you sure you want to delete this recipe? This action cannot be undone."
                                    )}
                                </AlertDialog.Body>

                                <AlertDialog.Footer>
                                    <Button
                                        slot="close"
                                        className="rounded-xl"
                                        isDisabled={isDeleting}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onPress={() => handleDelete(close)}
                                        isDisabled={isDeleting}
                                        className="rounded-xl bg-[#D64545] text-white hover:bg-[#C13838] disabled:opacity-60"
                                    >
                                        {isDeleting ? "Deleting…" : "Delete"}
                                    </Button>
                                </AlertDialog.Footer>
                            </>
                        )}
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
       
    );
}