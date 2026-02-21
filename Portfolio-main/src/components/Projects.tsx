"use client";

import { motion } from "framer-motion";
import DomeGallery from "./DomeGallery";

// Project Data with Media & Layout Configuration
const projects = [
    {
        id: "Adda247",
        title: "Look Local First",
        category: "Advertisement",
        description: "Advertisement",
        longDescription: "Advertisement",
        techStack: ["Capcut", "Premiere Pro",],
        repo: "https://drive.google.com/file/d/11qynT5LIC1VPV-hYLLbBbFm8RkssGCVZ/view?usp=sharing",
        demo: "#",
        color: "from-blue-600/20 to-cyan-500/20",
        hoverColor: "group-hover:from-blue-600/40 group-hover:to-cyan-500/40",
        span: "md:col-span-2 md:row-span-2",
        mediaType: "video",
        // Abstract Network/Server for Grid
        mediaUrl: "CoverImage.jpeg",
        // Video Demo for Modal
        demoUrl: "/Add.mp4"
    },
    {
        id: "nxtcart",
        title: "Nxtcart",
        category: "E-Commerce",
        description: "Modern shopping platform with automated workflows.",
        longDescription: "A modern e-commerce application featuring secure authentication, payment processing with Stripe/PayPal, and a robust admin dashboard for product management.",
        techStack: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Shadcn UI"],
        repo: "https://github.com/fawazv/nxt-cart",
        demo: "#",
        color: "from-purple-600/20 to-pink-500/20",
        hoverColor: "group-hover:from-purple-600/40 group-hover:to-pink-500/40",
        span: "md:col-span-1 md:row-span-2",
        mediaType: "image",
        // Shopping/Ecommerce Concept
        mediaUrl: "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        // Shopping Interaction
        demoUrl: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "dropbox-clone",
        title: "Dropbox Clone",
        category: "Cloud Storage",
        description: "Secure file storage with drag-and-drop & metadata.",
        longDescription: "A functional clone of Dropbox allowing users to upload, organize, and manage files in the cloud. Features real-time updates and secure authentication.",
        techStack: ["React", "Firebase", "Tailwind CSS"],
        repo: "https://github.com/fawazv/dropbox-clone",
        demo: "#",
        color: "from-orange-500/20 to-red-500/20",
        hoverColor: "group-hover:from-orange-500/40 group-hover:to-red-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        // Cloud/Data Abstract
        mediaUrl: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        // File Management
        demoUrl: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "blog-microservices",
        title: "Blog Platform",
        category: "Microservices",
        description: "Event-driven architecture with RabbitMQ.",
        longDescription: "Built User, Post, and Comment services with API Gateway and RabbitMQ communication. Containerized with Docker Compose and automated pipeline via GitHub Actions.",
        techStack: ["Node.js", "RabbitMQ", "Docker"],
        repo: "https://github.com/fawazv/blog-microservice",
        demo: "#",
        color: "from-green-600/20 to-teal-500/20",
        hoverColor: "group-hover:from-green-600/40 group-hover:to-teal-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        // Typing/Code Abstract
        mediaUrl: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        // Server/Terminal
        demoUrl: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "bookstore-app",
        title: "Bookstore",
        category: "MERN Stack",
        description: "Book management with separate Frontend/Backend.",
        longDescription: "Built RESTful APIs with Express.js and MongoDB for complete book management (CRUD). Developed a responsive React frontend integrated with Axios.",
        techStack: ["MongoDB", "Express", "React"],
        repo: "https://github.com/fawazv/bookstoreapp",
        demo: "#",
        color: "from-indigo-600/20 to-purple-500/20",
        hoverColor: "group-hover:from-indigo-600/40 group-hover:to-purple-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        // Reading/Books
        mediaUrl: "https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        // Library/Shelf
        demoUrl: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "pixabay-gallery",
        title: "Pixabay Gallery",
        category: "API Integration",
        description: "Image search gallery using Pixabay API.",
        longDescription: "Implemented image search and responsive grid gallery using React, Tailwind CSS, and Axios. Integrated Pixabay API for fetching images.",
        techStack: ["React", "Vite", "Tailwind"],
        repo: "https://github.com/fawazv/1.-react-tailwind-pixabay-gallery",
        demo: "#",
        color: "from-pink-600/20 to-rose-500/20",
        hoverColor: "group-hover:from-pink-600/40 group-hover:to-rose-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        // Color/Art
        mediaUrl: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        // Searching/Scanning
        demoUrl: "https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "room-upload",
        title: "Room Upload",
        category: "Cloudinary",
        description: "Secure image upload service details.",
        longDescription: "Built secure image upload flow using Express, Multer, and Cloudinary SDK with TypeScript backend. Developed responsive React + Vite frontend.",
        techStack: ["React", "Multer", "Cloudinary"],
        repo: "https://github.com/fawazv/multer-cloudinary",
        demo: "#",
        color: "from-yellow-600/20 to-orange-500/20",
        hoverColor: "group-hover:from-yellow-600/40 group-hover:to-orange-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        // Data Transfer
        mediaUrl: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        // Upload/Processing
        demoUrl: "https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "karaoke-night",
        title: "Eddie's Karaoke Night",
        category: "Event Poster",
        description: "Retro-style karaoke event poster.",
        longDescription: "A custom poster design for a karaoke event, utilizing retro typography and vibrant colors to create an engaging visual.",
        techStack: ["Photoshop", "Illustrator"],
        repo: "#",
        demo: "#",
        color: "from-yellow-500/20 to-orange-500/20",
        hoverColor: "group-hover:from-yellow-500/40 group-hover:to-orange-500/40",
        span: "md:col-span-1 md:row-span-2",
        mediaType: "image",
        mediaUrl: "/karaoke-night.jpg",
        demoUrl: "/karaoke-night.jpg"
    },
    {
        id: "bmm-8",
        title: "BMM Design 8",
        category: "Graphic Design",
        description: "Creative visual composition.",
        longDescription: "High-quality graphic design work showcasing creative composition and visual storytelling.",
        techStack: ["Photoshop"],
        repo: "#",
        demo: "#",
        color: "from-cyan-500/20 to-blue-500/20",
        hoverColor: "group-hover:from-cyan-500/40 group-hover:to-blue-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/BMM8.png",
        demoUrl: "/BMM8.png"
    },
    {
        id: "bmm-9",
        title: "BMM Design 9",
        category: "Graphic Design",
        description: "Abstract digital art.",
        longDescription: "Digital art piece exploring abstract forms and modern design aesthetics.",
        techStack: ["Photoshop"],
        repo: "#",
        demo: "#",
        color: "from-purple-500/20 to-fuchsia-500/20",
        hoverColor: "group-hover:from-purple-500/40 group-hover:to-fuchsia-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/BMM9.png",
        demoUrl: "/BMM9.png"
    },
    {
        id: "bmm-10",
        title: "BMM Design 10",
        category: "Graphic Design",
        description: "Modern layout design.",
        longDescription: "A showcase of modern layout techniques and visual hierarchy.",
        techStack: ["Photoshop"],
        repo: "#",
        demo: "#",
        color: "from-green-500/20 to-emerald-500/20",
        hoverColor: "group-hover:from-green-500/40 group-hover:to-emerald-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/BMM10.png",
        demoUrl: "/BMM10.png"
    },
];

export default function Projects() {
    const galleryImages = projects.map(project => ({
        src: project.mediaUrl,
        alt: project.title
    }));

    return (
        <section className="relative z-20 bg-[#0a0a0a] min-h-screen pt-24 pb-8 px-4 md:px-12 overflow-hidden" id="projects">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative h-full flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Posters <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400"></span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        A curated collection of impactful poster designs, blending cinematic typography
                        with striking visual compositions to tell unique stories.
                    </p>
                </motion.div>

                <div className="w-full h-[800px] relative">
                    <DomeGallery
                        fit={0.8}
                        minRadius={600}
                        maxVerticalRotationDeg={0}
                        segments={34}
                        dragDampening={2}
                        grayscale={false}
                        autoRotationSpeed={0.5}
                        openedImageWidth="400px"
                        openedImageHeight="566px"
                    />
                </div>
            </div>
        </section>
    );
}
