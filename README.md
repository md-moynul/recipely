# 🍳 RecipeHub - Recipe Sharing Platform

**A beautiful & modern full-stack recipe sharing community for food lovers.**

Discover, create, share, and manage delicious recipes from around the world.

![RecipeHub Banner](https://recipely-beta.vercel.app/banner.jpg) <!-- banner image যোগ করো -->

## ✨ Live Demo

- **Live Website**: [https://recipely-beta.vercel.app](https://recipely-beta.vercel.app)
- **Backend API**: [https://recipely-server.vercel.app](https://recipely-server.vercel.app)

---

## 🌟 Features

### **Public Features**
- Browse all recipes with advanced filtering (Category, Cuisine, Difficulty)
- Search recipes by name or ingredients
- View detailed recipe information (Ingredients, Instructions, Time, etc.)
- Featured Recipes section on homepage
- Popular & Trending recipes
- Responsive design for all devices

### **User Features**
- Secure authentication (Email + Google Login)
- Create recipes (Free users: max 2 recipes)
- **Premium Membership** → Unlimited recipe uploads
- My Recipes (View, Update, Delete)
- Save recipes to Favorites
- Like recipes with real-time count
- Purchase individual recipes using **Stripe**
- Personal Dashboard with statistics
- Profile update (Name, Photo)

### **Admin Features**
- Complete User Management (Block / Unblock users)
- Recipe Moderation (Approve, Feature, Delete)
- Report Management System (Spam, Offensive, Copyright)
- View all Transactions & Payment History
- Platform Analytics & Statistics

### **Technical Features**
- Dark / Light Theme Toggle
- Smooth animations with Framer Motion
- Secure JWT Authentication (HTTPOnly Cookie)
- Server-side Pagination
- Proper Error Handling
- Fully Responsive UI/UX

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT + jose
- **Payment**: Stripe Checkout
- **Image Upload**: imgBB
- **Deployment**: Vercel

---

## 🚀 Installation & Setup

### 1. Clone the Repositories
```bash
# Client
git clone https://github.com/md-moynul/recipely.git
cd recipely

# Server (new terminal)
git clone https://github.com/md-moynul/recipely-server.git
cd recipely-server