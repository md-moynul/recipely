"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Button,
    Card,
    Form,
    Input,
    InputGroup,
    Label,
    ListBox,
    Select,
    TextField,
    TextArea,
    FieldError,
} from "@heroui/react";
import { Plus, TrashBin, FolderArrowUp, Clock } from "@gravity-ui/icons";
import { getRecipeByRecipeId } from "@/lib/api/recipe";
import { updateRecipe } from "@/lib/action/recipe";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Appetizer", "Beverage"];
const CUISINES = ["Bengali", "Indian", "Italian", "Chinese", "Mexican", "Thai", "Continental"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const fieldBg = "bg-[#FFF9F2]";
const fieldClass = `rounded-xl border-[#EAE0D3] ${fieldBg} text-[#2B2420] placeholder:text-[#9C9388] focus-visible:border-[#E85D3D] focus-visible:ring-[#E85D3D]/20`;

const EditRecipeForm = ({ id }) => {
    const [recipeId, setRecipeId] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [ingredients, setIngredients] = useState([""]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Resolve the async `params` (Next.js 15+ passes params as a Promise)
    useEffect(() => {
        (async () => {
            setRecipeId(id);

            const data = await getRecipeByRecipeId(id);

            setRecipe(data);
            setIngredients(data.ingredients?.length ? data.ingredients : [""]);
            setImagePreview(data.recipeImage ?? null);
            setIsLoading(false);
        })();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const uploadToImgbb = async () => {
        if (!imageFile) return null;
        setIsUploading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("image", imageFile);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await res.json();

            if (!data.success) throw new Error("Image upload failed");

            return data.data.url;
        } catch (err) {
            console.error("uploadToImgbb error:", err);
            setError("Image upload failed. Please try again.");
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    const addIngredientField = () => {
        setIngredients((prev) => [...prev, ""]);
    };

    const removeIngredientField = (index) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const updateIngredient = (index, value) => {
        setIngredients((prev) => prev.map((item, i) => (i === index ? value : item)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Only upload to imgbb if the user picked a new file. Otherwise keep
            // whatever image URL the recipe already had.
            let imageUrl = recipe.recipeImage ?? null;
            if (imageFile) {
                const uploadedUrl = await uploadToImgbb();
                if (!uploadedUrl) {
                    setIsSubmitting(false);
                    return;
                }
                imageUrl = uploadedUrl;
            }

            const formData = new FormData(e.target);
            const payload = {
                recipeName: formData.get("recipeName"),
                recipeImage: imageUrl,
                category: formData.get("category"),
                cuisineType: formData.get("cuisineType"),
                difficultyLevel: formData.get("difficultyLevel"),
                preparationTime: formData.get("preparationTime"),
                price: formData.get("price"), // <-- Added price field logic here
                ingredients: ingredients.filter((i) => i.trim() !== ""),
                instructions: formData.get("instructions"),
                updatedAt: new Date(),
            };

            const result = await updateRecipe(recipeId, payload);
            if (result.modifiedCount) {
                toast.success("Recipe updated successfully!");
                router.push("/dashboard/user/my-recipes");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !recipe) {
        return (
            <div className="mx-auto w-full max-w-5xl px-6 py-10">
                <p className="text-sm text-[#9C9388]">Loading recipe…</p>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-6 py-10">
            <Card className="w-full border border-[#EAE0D3] bg-white p-6 sm:p-8">
                <Card.Header>
                    <Card.Title className="text-2xl font-semibold text-[#2B2420]">
                        Edit Recipe
                    </Card.Title>
                    <Card.Description className="text-sm text-[#6B6155]">
                        Update the details of &quot;{recipe.recipeName}&quot;.
                    </Card.Description>
                </Card.Header>

                <Card.Content>
                    <Form className="mt-2 flex flex-col gap-6" onSubmit={handleSubmit}>
                        {/* Recipe Name */}
                        <TextField
                            name="recipeName"
                            isRequired
                            defaultValue={recipe.recipeName}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#2B2420]">Recipe Name</Label>
                            <Input placeholder="e.g. Spicy Beef Bhuna" className={fieldClass} />
                            <FieldError className="text-xs text-[#D64545]" />
                        </TextField>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-[#2B2420]">Recipe Image</Label>

                            <label
                                htmlFor="recipe-image"
                                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#EAE0D3] ${fieldBg} p-6 text-center transition-colors hover:border-[#E85D3D]`}
                            >
                                {imagePreview ? (
                                    <div className="relative h-40 w-full overflow-hidden rounded-lg">
                                        <Image src={imagePreview} alt="Recipe preview" fill className="object-cover" />
                                    </div>
                                ) : (
                                    <>
                                        <FolderArrowUp width={22} height={22} className="text-[#9C9388]" />
                                        <span className="text-sm text-[#6B6155]">Click to upload a new image</span>
                                        <span className="text-xs text-[#9C9388]">PNG or JPG, up to 5MB</span>
                                    </>
                                )}
                            </label>
                            <input
                                id="recipe-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            {isUploading && <p className="text-xs text-[#9C9388]">Uploading image…</p>}
                        </div>

                        {/* Category + Cuisine */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Select
                                name="category"
                                isRequired
                                defaultSelectedKey={recipe.category}
                                placeholder="Select category"
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="text-sm font-medium text-[#2B2420]">Category</Label>
                                <Select.Trigger className={fieldClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        {CATEGORIES.map((cat) => (
                                            <ListBox.Item key={cat} id={cat}>
                                                <Label>{cat}</Label>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select
                                name="cuisineType"
                                isRequired
                                defaultSelectedKey={recipe.cuisineType}
                                placeholder="Select cuisine"
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="text-sm font-medium text-[#2B2420]">Cuisine Type</Label>
                                <Select.Trigger className={fieldClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        {CUISINES.map((cuisine) => (
                                            <ListBox.Item key={cuisine} id={cuisine}>
                                                <Label>{cuisine}</Label>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Difficulty + Prep time */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <Select
                                name="difficultyLevel"
                                isRequired
                                defaultSelectedKey={recipe.difficultyLevel}
                                placeholder="Select difficulty"
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="text-sm font-medium text-[#2B2420]">Difficulty Level</Label>
                                <Select.Trigger className={fieldClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>
                                <Select.Popover>
                                    <ListBox>
                                        {DIFFICULTIES.map((level) => (
                                            <ListBox.Item key={level} id={level}>
                                                <Label>{level}</Label>
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <TextField
                                name="preparationTime"
                                isRequired
                                defaultValue={recipe.preparationTime}
                                className="flex flex-col gap-1.5"
                            >
                                <Label className="text-sm font-medium text-[#2B2420]">Preparation Time</Label>
                                <InputGroup>
                                    <InputGroup.Prefix className={`${fieldBg} text-[#9C9388]`}>
                                        <Clock width={16} height={16} />
                                    </InputGroup.Prefix>
                                    <InputGroup.Input placeholder="e.g. 30 mins" className={fieldClass} />
                                </InputGroup>
                                <FieldError className="text-xs text-[#D64545]" />
                            </TextField>
                        </div>

                        {/* Price Option Added Here */}
                        <TextField
                            name="price"
                            isRequired
                            defaultValue={recipe.price}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#2B2420]">Price</Label>
                            <InputGroup>
                                <InputGroup.Prefix className={`${fieldBg} font-medium text-[#9C9388]`}>
                                    $
                                </InputGroup.Prefix>
                                <InputGroup.Input 
                                    type="number" 
                                    step="0.01" 
                                    min="0"
                                    placeholder="e.g. 15.99" 
                                    className={fieldClass} 
                                />
                            </InputGroup>
                            <FieldError className="text-xs text-[#D64545]" />
                        </TextField>

                        {/* Ingredients - dynamic list, pre-filled */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-sm font-medium text-[#2B2420]">Ingredients</Label>

                            <div className="flex flex-col gap-2.5">
                                {ingredients.map((ingredient, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input
                                            value={ingredient}
                                            onChange={(e) => updateIngredient(index, e.target.value)}
                                            placeholder={`Ingredient ${index + 1}, e.g. 2 cups rice`}
                                            className={`flex-1 ${fieldClass}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeIngredientField(index)}
                                            disabled={ingredients.length === 1}
                                            aria-label="Remove ingredient"
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#EAE0D3] text-[#9C9388] transition-colors hover:bg-[#FBF1E6] hover:text-[#D64545] disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            <TrashBin width={16} height={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addIngredientField}
                                className="mt-1 flex items-center gap-1.5 self-start rounded-lg px-2 py-1 text-sm font-medium text-[#E85D3D] transition-colors hover:bg-[#FBF1E6]"
                            >
                                <Plus width={16} height={16} />
                                Add ingredient
                            </button>
                        </div>

                        {/* Instructions */}
                        <TextField
                            name="instructions"
                            isRequired
                            defaultValue={recipe.instructions}
                            className="flex flex-col gap-1.5"
                        >
                            <Label className="text-sm font-medium text-[#2B2420]">Instructions</Label>
                            <TextArea
                                rows={6}
                                placeholder="Write the steps to make this recipe..."
                                className={fieldClass}
                            />
                            <FieldError className="text-xs text-[#D64545]" />
                        </TextField>

                        {error && <p className="text-sm text-[#D64545]">{error}</p>}

                        <Button
                            type="submit"
                            isDisabled={isSubmitting || isUploading}
                            className="mt-2 w-full rounded-xl bg-[#E85D3D] py-3 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-[#D14E30] disabled:opacity-60"
                        >
                            {isSubmitting ? "Saving…" : "Save Changes"}
                        </Button>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    );
};

export default EditRecipeForm;