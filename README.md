# 🍳 Recipely

A full-stack recipe-sharing platform where food enthusiasts can create, share, discover, and manage recipes — built with Next.js, MongoDB, and Better Auth.

**Live Site:** [recipely-beta.vercel.app](https://recipely-beta.vercel.app/)
**Server API:** [recipely-server.vercel.app](https://recipely-server.vercel.app/)

---

## 📖 Overview

Recipely is a centralized space for culinary inspiration. Users can publish their own recipes, browse recipes shared by the community, save favorites, purchase premium recipes, and grow their own collection — while admins moderate content and manage the platform.

---

## ✨ Features

### For Users
- 🔐 Secure authentication (email/password + Google) via **Better Auth**
- 📝 Create, edit, and delete recipes with image uploads (via **imgbb**)
- 🔍 Browse and filter recipes by category
- ❤️ Like recipes and bookmark favorites
- 🛒 Purchase premium recipes with **Stripe** (one-time payment)
- ⭐ Upgrade to Premium for unlimited recipe uploads and a profile badge
- 🚩 Report recipes that violate community guidelines
- 📊 Personal dashboard with stats — total recipes, favorites, likes received, and purchases

### For Admins
- 👥 Manage users (block/unblock)
- 📋 Manage all recipes (edit, delete, feature)
- 🚨 Review and resolve recipe reports
- 📈 Platform-wide overview dashboard

### Platform-wide
- 🌓 Light / dark theme support
- 📱 Fully responsive design
- ⚡ Server-side pagination
- 🔒 JWT-based API protection with HttpOnly cookies

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| UI Library | [HeroUI](https://heroui.com/) v3 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| Icons | [Gravity UI Icons](https://gravity-ui.com/icons) |
| Auth | [Better Auth](https://www.better-auth.com/) |
| Database | [MongoDB](https://www.mongodb.com/) |
| Payments | [Stripe](https://stripe.com/) |
| Image Hosting | [imgbb](https://imgbb.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🔗 Links

| Resource | URL |
|---|---|
| 🌐 Live Site (Client) | https://recipely-beta.vercel.app/ |
| 🌐 Live API (Server) | https://recipely-server.vercel.app/ |
| 💻 Client Repository | https://github.com/md-moynul/recipely |
| 💻 Server Repository | https://github.com/md-moynul/recipely-server |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB connection string
- A Better Auth secret
- An imgbb API key
- Stripe API keys (for premium payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/md-moynul/recipely.git
cd recipely

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root with the following:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Image Upload
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> ⚠️ Never commit `.env.local` to version control. Use `.env.example` to document required variables without exposing real secrets.

### Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
recipely/
├── src/
│   ├── app/
│   │   ├── (auth)/            # Login & register pages
│   │   ├── all-recipes/       # Public recipe browsing
│   │   ├── popular/           # Popular/trending recipes
│   │   ├── recipes/[id]/      # Recipe details page
│   │   └── dashboard/
│   │       ├── user/          # User dashboard (overview, my recipes, favorites, etc.)
│   │       └── admin/         # Admin dashboard (users, recipes, reports)
│   ├── components/
│   │   ├── shared/             # Navbar, Footer
│   │   ├── recipes/            # Recipe cards, tables, actions
│   │   ├── dashboard/           # Sidebar, dashboard widgets
│   │   └── ui/                  # Reusable form/dialog components
│   └── lib/
│       ├── api/                 # Data-fetching functions (recipes, payments, reports)
│       ├── core/                # Session helpers
│       └── action/              # Server actions
└── public/                       # Static assets
```

---

## 🗄️ Database Collections

| Collection | Description |
|---|---|
| `users` | User accounts, roles, and premium status |
| `recipes` | Recipe content and metadata |
| `favorites` | User-saved recipe references |
| `reports` | Recipe reports awaiting moderation |
| `payments` | Stripe transaction records |
| `plans` | Free vs Premium plan definitions |

---

## 🤝 Contributing

This project was built as a course assessment. Contributions, issues, and feature suggestions are welcome via the [issues page](https://github.com/md-moynul/recipely/issues).

---

## 👤 Author

**Md. Moynul Islam**
Junior MERN Stack / Next.js Developer — Rangpur, Bangladesh

- Portfolio: [portfolio-alpha-lake-74.vercel.app](https://portfolio-alpha-lake-74.vercel.app)
- GitHub: [@md-moynul](https://github.com/md-moynul)

---

## 📄 License

This project is for educational purposes as part of a course assessment.