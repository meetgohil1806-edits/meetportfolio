"use client";

import { useState, useRef, useEffect } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ChromaGrid from "@/components/ChromaGrid";
import Image from "next/image";

import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Dock from "@/components/Dock";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";

import CircularGallery from "@/components/CircularGallery";
import Folder from "@/components/Folder";
import Masonry from "@/components/Masonry";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const upcomingProjects = [
    { src: '/um1.mp4', url: 'https://drive.google.com/file/d/1P_oIyRs2CoHrNdUWwSIqFuNwkGH69if9/view?usp=drivesdk' },
    { src: '/um2.mp4', url: 'https://drive.google.com/file/d/1iMffJOux1uoz5UaWVmwkXJ31JYLQkU9D/view?usp=drivesdk' },
    { src: '/um3.mp4', url: 'https://drive.google.com/file/d/1Z0mzCD3iJwb_07YLLCLKRUke12dWBFAK/view?usp=drivesdk' },
  ];

  useEffect(() => {
    // Force scroll to top on refresh and handle scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all videos with the 'scroll-reset-video' class
    const videos = document.querySelectorAll('.scroll-reset-video');
    videos.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, []);

  const masonryItems = [
    { id: "1", img: "/p1.jpg", url: "#", height: 400 },
    { id: "2", img: "/p2.jpg", url: "#", height: 250 },
    { id: "3", img: "/p3.jpg", url: "#", height: 600 },
    { id: "4", img: "/p4.jpg", url: "#", height: 400 },
    { id: "5", img: "/p5.jpg", url: "#", height: 300 },
    { id: "6", img: "/p6.jpg", url: "#", height: 500 },
    { id: "7", img: "/p7.jpg", url: "#", height: 450 },
    { id: "8", img: "/p8.jpg", url: "#", height: 350 },
    { id: "9", img: "/p9.jpg", url: "#", height: 400 },
    { id: "10", img: "/p10.jpg", url: "#", height: 600 },
    { id: "11", img: "/p11.jpg", url: "#", height: 300 },
    { id: "12", img: "/p12.jpg", url: "#", height: 550 },
    { id: "13", img: "/p13.jpg", url: "#", height: 480 },
    { id: "14", img: "/p14.JPG", url: "#", height: 420 },
    { id: "15", img: "/p15.JPG", url: "#", height: 500 },
    { id: "16", img: "/p16.png", url: "#", height: 350 },
    { id: "17", img: "/p17.jpg", url: "#", height: 450 },
    { id: "18", img: "/p18.jpg", url: "#", height: 600 },
    { id: "19", img: "/p19.jpg", url: "#", height: 300 },
    { id: "20", img: "/p20.jpg", url: "#", height: 480 },
    { id: "21", img: "/p21.jpg", url: "#", height: 520 },
    { id: "22", img: "/p22.jpg", url: "#", height: 400 },
    { id: "23", img: "/p23.jpg", url: "#", height: 380 },
    { id: "24", img: "/p24.jpg", url: "#", height: 550 },
    { id: "25", img: "/p25.jpeg", url: "#", height: 400 },
    { id: "26", img: "/p26.jpeg", url: "#", height: 300 },
    { id: "27", img: "/p27.jpeg", url: "#", height: 450 },
    { id: "28", img: "/p28.jpeg", url: "#", height: 500 },
    { id: "29", img: "/p29.jpeg", url: "#", height: 350 },
    { id: "30", img: "/p30.jpeg", url: "#", height: 600 },
    { id: "31", img: "/p31.jpeg", url: "#", height: 420 },
    { id: "32", img: "/p32.jpeg", url: "#", height: 480 },
    { id: "33", img: "/p33.jpeg", url: "#", height: 380 },
    { id: "34", img: "/p34.jpeg", url: "#", height: 550 },
    { id: "35", img: "/p35.jpeg", url: "#", height: 430 },
    { id: "36", img: "/p36.jpg", url: "#", height: 400 },
    { id: "37", img: "/p37.jpg", url: "#", height: 550 },
    { id: "38", img: "/p38.png", url: "#", height: 480 },
  ];

  const galleryItems = [
    { image: "/e1.mp4", text: "Project e1", url: "https://drive.google.com/file/d/15UEajZ_Qis-FLyk2Q2BEf1_xtzNkc2Fd/view?usp=drivesdk" },
    { image: "/e2.mp4", text: "Project e2", url: "https://drive.google.com/file/d/1ZuyLgUu_HGhMwOIpC50_2iFR4HWl7ffr/view?usp=drivesdk" },
    { image: "/e3.mp4", text: "Project e3", url: "https://drive.google.com/file/d/1WWw25tH6v20kPFq2B9EpQRuRdc8nZJGq/view?usp=drivesdk" },
    { image: "/e4.mp4", text: "Project e4", url: "https://drive.google.com/file/d/1iIDzM69p8T2xrGnweP_HZGBv4XkK0-eA/view?usp=drivesdk" },
    { image: "/e5.mp4", text: "Project e5", url: "https://drive.google.com/file/d/1lLI_FPEQwOv-rpVhkJydSF4VHKS84iZj/view?usp=drivesdk" },
    { image: "/e6.mp4", text: "Project e6", url: "https://drive.google.com/file/d/1SCNI6IAEjj9iFVNQBy9mSsI3kqoBnqxu/view?usp=drivesdk" },
    { image: "/e7.mp4", text: "Project e7", url: "https://drive.google.com/file/d/10uatyvSmDutQURLu6QczYbeeqx8QFNdb/view?usp=drivesdk" },
    { image: "/e8.mp4", text: "Project e8", url: "https://drive.google.com/file/d/1uMfIg3_ycxshEY1fgRsjVILYaTl2hfCM/view?usp=drivesdk" },
    { image: "/e9.mp4", text: "Project e9", url: "https://drive.google.com/file/d/1RTQ3vld6L7mQhmmsgO9dVPZat-OCe38t/view?usp=drivesdk" },
    { image: "/e10.mp4", text: "Project e10", url: "https://drive.google.com/file/d/1_7V7kni195LlKYjaxwTtF315yvZG2P3A/view?usp=drivesdk" },
    { image: "/e11.mp4", text: "Project e11", url: "https://drive.google.com/file/d/1MNdf4oe_Nx3vPC-N65-0Ldszqnhor6oF/view?usp=drivesdk" },
  ];

  const items = [
    {
      image: "/v1.mp4",
      title: "Meet Gohil",
      subtitle: "Director & Editor",
      handle: "@meetgohil",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://drive.google.com/file/d/1XhDF0dpEFbhvfagIYCFYW87VXebym3iU/view?usp=drivesdk",
      type: 'video' as const
    },
    {
      image: "/v2.mp4",
      title: "Team Session",
      subtitle: "Creative Direction",
      handle: "@creative",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://drive.google.com/file/d/1IBuQJYTmgEq9VmhWc6uLJAjPXL2HG3MC/view?usp=drivesdk",
      type: 'video' as const
    },
    {
      image: '/v3.mp4',
      title: 'Cinematography',
      subtitle: 'Visual Storytelling',
      handle: '@visuals',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',
      url: 'https://drive.google.com/file/d/1JAfdVM4DMeOnnJpFBrHvMo6NO9SEtgdV/view?usp=drivesdk',
      type: 'video' as const
    },
    {
      image: '/v4.mp4',
      title: 'Post-Production',
      subtitle: 'Grading & Cuts',
      handle: '@editflow',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg, #EF4444, #000)',
      url: 'https://drive.google.com/file/d/1G3a7n0oBW8ugMEcCAHLkX52_8WzIDQ-Z/view?usp=drivesdk',
      type: 'video' as const
    },
    {
      image: '/v5.mp4',
      title: 'Fashion Edit',
      subtitle: 'Modern Styling',
      handle: '@fashion',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
      url: 'https://drive.google.com/file/d/1fLPta--Bs8rlgjBRro1fWef1qKtrfz_2/view?usp=drivesdk',
      type: 'video' as const
    },
    {
      image: '/v6.mp4',
      title: 'Short Film',
      subtitle: 'Award Winning',
      handle: '@filmworks',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #000)',
      url: 'https://drive.google.com/file/d/1g9BCwEj9739-TN5n_d5-_FbYrC_xeqf9/view?usp=drivesdk',
      type: 'video' as const
    }
  ];

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Projects />
      <div style={{ padding: '4rem 2rem 0', backgroundColor: '#000' }}>
        <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Videography</h2>
      </div>
      <div style={{ height: '600px', position: 'relative', backgroundColor: '#000' }}>
        <ChromaGrid
          items={items}
          radius={300}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
        />
      </div>


      <div style={{ padding: '4rem 2rem 0', backgroundColor: '#000' }}>
        <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Editing</h2>
      </div>
      <div style={{ height: '600px', position: 'relative', backgroundColor: '#000' }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>

      <div style={{ padding: '8rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8rem', flexWrap: 'wrap' }}>
        <Folder
          size={2}
          color="#777777"
          label="Act in Reel"
          url="https://drive.google.com/file/d/1ad0OM8ozK3BapSAvljL1mXuV1HtiGHYd/view?usp=drivesdk"
          className="custom-folder"
          items={[
            <video key="1" src="/Act in Reel.mp4" autoPlay loop muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
          ]}
        />
        <Folder
          size={2}
          color="#777777"
          label="Achievement"
          url="https://drive.google.com/drive/folders/1rQ8xBP5AkLcZ9nPqy-sWQsAHtpaCEw5n"
          className="custom-folder"
          items={[
            <Image key="1" src="/a1.jpeg" alt="Project A1" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />,
            <Image key="2" src="/a2.jpeg" alt="Project A2" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />,
            <Image key="3" src="/a3.jpeg" alt="Project A3" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />,
            <Image key="4" src="/a4.jpeg" alt="Project A4" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />
          ]}
        />
        <Folder
          size={2}
          color="#777777"
          label="2d/3d Animation"
          url="https://drive.google.com/drive/folders/1mR2b_AqpzU6z2ImTUWaRbF_EDUhblsNF"
          className="custom-folder"
          items={[
            <video key="1" src="/mm1.mp4" autoPlay loop muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />,
            <video key="2" src="/mm2.mp4" autoPlay loop muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />,
            <Image key="3" src="/mm3.png" alt="Project MM3" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />,
            <Image key="4" src="/mm4.png" alt="Project MM4" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff', padding: '8px', borderRadius: '4px' }} />
          ]}
        />
      </div>

      <div style={{ padding: '4rem 2rem', backgroundColor: '#000', minHeight: '600px' }}>
        <h2 style={{ color: 'white', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>Photography</h2>
        <div style={{ width: '100%' }}>
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </div>

      <div style={{ height: '800px', backgroundColor: '#000' }}>
        <ScrollStack
          itemDistance={50}
          itemStackDistance={20}
          stackPosition="20%"
          useWindowScroll={false}
        >
          <ScrollStackItem itemClassName="bg-white flex flex-col md:flex-row items-center gap-8 overflow-hidden">
            <div className="flex-1 p-8 md:p-12">
              <h2 className="text-3xl font-bold text-black mb-2">ATB Podcast</h2>
              <div className="text-sm text-gray-500 mb-4 font-medium">
                <p>Shot & Edited by Meet Gohil</p>
                <p>Featuring Dharmik & Rudra</p>
                <p>Co-Host: Dharmik | Guest: Rudra</p>
              </div>
              <p className="text-gray-600 italic text-sm border-l-4 border-gray-200 pl-4">
                "Everything in this podcast is for fun and entertainment only. No one is being targeted, no harm intended just good laughs and fun conversations. All in good spirit!"
              </p>
            </div>
            <div className="w-full md:w-[45%] flex items-center justify-center bg-gray-50 p-4 md:pr-12">
              <a
                href="https://drive.google.com/file/d/1VK2tw5pJoQeLlm4dD8peh-LMTzNo3jBb/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl"
              >
                <video
                  src="/podcast.mp4"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="scroll-reset-video w-full h-auto object-contain transition-all duration-300 transform group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300" />
              </a>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="bg-neutral-900 border border-neutral-800 text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden">
            <div className="flex-1 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-2">Look Local First</h2>
              <div className="text-sm text-neutral-400 mb-4 font-medium">
                <p>Direction & Edited By Meet Gohil</p>
                <p>Featuring: MEET, KHUSHI, SWAYAM, BHOOMI, SHUBHAM</p>
              </div>
              <p className="text-neutral-300 italic text-sm border-l-4 border-neutral-700 pl-4">
                "Advertisement highlights a creative outfit concept where tradition meets modern fashion, made for confident styling."
              </p>
            </div>
            <div className="w-full md:w-[45%] flex items-center justify-center bg-transparent p-4 md:pr-12">
              <a
                href="https://drive.google.com/file/d/10d8MQ4gxCnF5G3CYEv1RPmh8oIwUXVrx/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl"
              >
                <video
                  src="/LLF Ads.mp4"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="scroll-reset-video w-full h-auto object-contain transition-all duration-300 transform group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-300" />
              </a>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="bg-zinc-950 border border-zinc-900 text-white flex flex-col md:flex-row items-center gap-8 overflow-hidden">
            <div className="flex-1 p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Behind the Scenes</h2>
              <p className="text-zinc-400 italic text-sm border-l-4 border-zinc-700 pl-4">
                "Capturing the energy and coordination behind every shot. A glimpse into the creative process and the team effort that brings these visuals to life."
              </p>
            </div>
            <div className="w-full md:w-[40%] flex flex-col gap-4 p-4 md:pr-12">
              <a
                href="https://drive.google.com/file/d/1RCHrKPhPU_zTwuCj1gUPFFKJpLKv9haS/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Image src="/m1.jpeg" alt="BTS 1" width={400} height={300} className="w-full h-auto object-contain" />
              </a>
              <a
                href="https://drive.google.com/file/d/1UT-SSYkX1M2VMK4dIlIMbF9qgxrjVM7y/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Image src="/m2.jpeg" alt="BTS 2" width={400} height={300} className="w-full h-auto object-contain" />
              </a>
            </div>
          </ScrollStackItem>
          <ScrollStackItem itemClassName="bg-black border border-neutral-900 text-white flex flex-col items-center gap-6 overflow-hidden">
            <div className="w-full p-8 md:p-12 pb-0 text-center">
              <h2 className="text-3xl font-bold mb-2">Upcoming Projects</h2>
              <p className="text-neutral-500 italic text-sm max-w-2xl mx-auto">

              </p>
            </div>
            <div className="w-full flex flex-row justify-center gap-4 p-8 pt-4 overflow-x-auto pb-12">
              {upcomingProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group cursor-pointer w-[30%] min-w-[200px] aspect-video rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105"
                >
                  <video
                    src={project.src}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="scroll-reset-video w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6L10 18L18 12L10 6Z" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>

      <Testimonials />
      <Pricing />
      <Skills />
      <Timeline />
      <Dock />
      <Contact />

    </main >
  );
}
