# Rutuja Bhagat | Digital Portfolio

A minimalist, high-performance personal portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**. Designed with an editorial aesthetic, featuring smooth animations and a responsive layout.

![Tech Stack](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Tech Stack](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Website

[**View Live Portfolio**](https://rutuja-bhagat.vercel.app/)  

## ✨ Features

-   **Architectural Design:** Clean, editorial layout with luxury typography (*Cormorant Garamond*).
-   **Smooth Animations:** Staggered entry animations and hover effects using Framer Motion.
-   **Responsive:** Fully optimized for Desktops, Tablets, and Mobile devices (includes Mobile Hamburger Menu).
-   **Continuous Timeline:** Custom-built vertical timeline for Experience and Education history.
-   **Working Contact Form:** Integrated with **Formspree** for real-time email delivery.
-   **Dynamic Projects:** Grid layout showcasing GitHub projects with direct links.

## 🛠️ Tech Stack

-   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Fonts:** `next/font` (Cormorant Garamond)
-   **Form Handling:** [Formspree](https://formspree.io/)

## 📂 Project Structure

```bash
rutuja-portfolio/
├── public/              # Static assets (Images, Resume PDF)
│   ├── profile.jpg
│   ├── pwc.png
│   ├── calibers.png
│   ├── pes.png
│   ├── met.png
│   ├── school.png
│   └── resume.pdf
├── src/
│   └── app/
│       ├── globals.css  # Global styles
│       ├── layout.tsx   # Root layout & Fonts
│       └── page.tsx     # Main portfolio page (Single Page)
└── tailwind.config.ts   # Tailwind configuration
