// src/app/purchased/page.js
import { getPaymentByUserId } from '@/lib/api/payment';
import { getRecipeByRecipeId } from '@/lib/api/recipe';
import { getServerSession } from '@/lib/core/session';
import Image from 'next/image';
import React from 'react';

const PurchasedPage = async () => {
    const user = await getServerSession();
    
    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-xl">Please log in to view your purchases.</p>
            </div>
        );
    }

    const payments = await getPaymentByUserId(user.id);

    // Fetch recipe details for each purchase
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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Purchases</h1>
                <p className="text-gray-600 mt-2">
                    All recipes and items you have purchased
                </p>
            </div>

            {purchasesWithRecipes.length === 0 ? (
                <div className="text-center py-20 border border-dashed rounded-2xl">
                    <p className="text-xl text-gray-500">No purchases yet</p>
                    <p className="text-sm text-gray-400 mt-2">Your purchased recipes will appear here</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Recipe</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Purchased On</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {purchasesWithRecipes.map((item, index) => (
                                <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        {item.recipe ? (
                                            <div className="flex items-center gap-4">
                                                {item.recipe.image && (
                                                    <Image 
                                                        src={item.recipe.image} 
                                                        alt={item.recipe.title}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-medium">{item.recipe.title}</p>
                                                    <p className="text-sm text-gray-500 line-clamp-1">
                                                        {item.recipe.description?.substring(0, 80)}...
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Recipe not found</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                                            {item.purchaseType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(item.createdAt || item.purchaseDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        ${item.amount || '0.00'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.recipe && (
                                            <a
                                                href={`/recipes/${item.recipe._id}`}
                                                className="inline-flex items-center px-4 py-2 bg-black text-white text-sm rounded-xl hover:bg-gray-800 transition-colors"
                                            >
                                                View Recipe →
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PurchasedPage;