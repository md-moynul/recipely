import { Star, StarFill } from "@gravity-ui/icons";
import Image from "next/image";

const reviews = [
    {
        id: 1,
        name: "Ayesha Khan",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        comment: "This biryani recipe is absolutely amazing! My family loved it. The spices were perfectly balanced.",
        recipe: "Kacchi Biryani",
        time: "2 days ago"
    },
    {
        id: 2,
        name: "Rahim Uddin",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4,
        comment: "Very easy to follow and tasted delicious. Will definitely make it again.",
        recipe: "Beef Kala Bhuna",
        time: "1 week ago"
    },
    {
        id: 3,
        name: "Nadia Islam",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
        comment: "The best mango dessert I've ever made at home. My kids are asking for it every weekend!",
        recipe: "Mango Bhapa Doi",
        time: "3 days ago"
    }
];

const ReviewSection = () => {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#2B2420] dark:text-white">
                        What Our Users Say
                    </h2>
                    <p className="mt-3 text-[#6B6155] dark:text-[#B8AFA2] max-w-md mx-auto">
                        Real stories from real home cooks who love RecipeHub
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div 
                            key={review.id} 
                            className="bg-[#FBF1E6] dark:bg-[#252019] p-8 rounded-3xl border border-[#EAE0D3] dark:border-[#3A332A] hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                                    <Image 
                                        src={review.avatar} 
                                        alt={review.name}
                                        fill 
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-[#2B2420] dark:text-white">{review.name}</p>
                                    <p className="text-sm text-[#9C9388]">{review.time}</p>
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <StarFill 
                                        key={i}
                                        width={22} 
                                        height={22} 
                                        className={`${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`} 
                                    />
                                ))}
                            </div>

                            <p className="text-[#2B2420] dark:text-[#F4EDE4] leading-relaxed mb-4">
                                “{review.comment}”
                            </p>

                            <p className="text-sm text-[#E85D3D] font-medium">
                                — {review.recipe}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Trust Bar */}
                <div className="mt-16 text-center border-t border-[#EAE0D3] dark:border-[#3A332A] pt-8">
                    <p className="text-[#6B6155] dark:text-[#B8AFA2] text-sm">
                        Join <span className="font-semibold text-[#2B2420] dark:text-white">10,000+</span> happy home cooks
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;