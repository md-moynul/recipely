// src/app/dashboard/user/purchased/page.js
import { getPaymentByUserId } from '@/lib/api/payment';
import { getRecipeByRecipeId } from '@/lib/api/recipe';
import { getServerSession } from '@/lib/core/session';
import Image from 'next/image';
import Link from 'next/link';

const PurchasedPage = async () => {
    const user = await getServerSession();
   
    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-xl text-gray-600 dark:text-gray-400">Please log in to view your purchases.</p>
            </div>
        );
    }

    const payments = await getPaymentByUserId(user.id);

    const purchasesWithRecipes = await Promise.all(
        payments.map(async (payment) => {
            if (payment.purchaseType === 'recipe' && payment.recipeId) {
                const recipe = await getRecipeByRecipeId(payment.recipeId);
                return { ...payment, recipe };
            }
            return { ...payment, recipe: null };
        })
    );

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#2B2420] dark:text-white">My Purchases</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    All recipes you have purchased
                </p>
            </div>

            {purchasesWithRecipes.length === 0 ? (
                <div className="mt-10 rounded-2xl border border-dashed border-[#EAE0D3] p-12 text-center dark:border-[#3A332A]">
                    <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">
                        You haven&apos;t purchased any recipes yet
                    </p>
                    <p className="mt-1 text-sm text-[#9C9388]">
                        Browse and purchase recipes to see them here.
                    </p>
                    <Link
                        href="/all-recipes"
                        className="mt-5 inline-block rounded-xl bg-[#E85D3D] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#D14E30]"
                    >
                        Browse Recipes
                    </Link>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#252019] rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-orange-100 ">
                                    <th className="px-6 py-5 text-left font-medium">Recipe</th>
                                    <th className="px-6 py-5 text-left font-medium">Purchased On</th>
                                    <th className="px-6 py-5 text-left font-medium">Amount</th>
                                    <th className="px-6 py-5 text-center font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {purchasesWithRecipes.map((item, index) => {
                                    const recipe = item.recipe ?? {};

                                    return (
                                        <tr 
                                            key={item._id || index} 
                                            className="hover:bg-gray-50 dark:hover:bg-[#2A241E] transition-colors"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                                                        {recipe.recipeImage ? (
                                                            <Image
                                                                src={recipe.recipeImage}
                                                                alt={recipe.recipeName}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full bg-[#FBF1E6] dark:bg-[#1A1714] flex items-center justify-center">
                                                                <span className="text-3xl">🍲</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-[#2B2420] dark:text-white text-lg">
                                                            {recipe.recipeName ?? "Untitled Recipe"}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {recipe.cuisineType} • {recipe.preparationTime}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(item.paidAt || item.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </td>

                                            <td className="px-6 py-5 font-bold text-[#E85D3D] text-lg">
                                                ${item.amount || '0'}
                                            </td>

                                            <td className="px-6 py-5 text-center">
                                                {recipe._id && (
                                                    <Link
                                                        href={`/all-recipes/${recipe._id}`}
                                                        className="inline-flex items-center px-6 py-2.5 bg-[#E85D3D] hover:bg-[#D14E30] text-white text-sm font-medium rounded-2xl transition-all active:scale-95"
                                                    >
                                                        View Recipe →
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchasedPage;