'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import './ChromaGrid.css';

interface ChromaGridItem {
    image: string;
    title: string;
    subtitle: string;
    handle?: string;
    borderColor?: string;
    gradient: string;
    url?: string;
    location?: string;
    type?: 'image' | 'video';
    poster?: string;
}

interface ChromaGridProps {
    items?: ChromaGridItem[];
    className?: string;
    radius?: number;
    columns?: number;
    rows?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
}

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = '',
    radius = 300,
    columns = 3,
    rows = 2,
    damping = 0.45,
    fadeOut = 0.6,
    ease = 'power3.out'
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(null);
    const [coloredCards, setColoredCards] = useState<Set<number>>(new Set());
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const fadeRef = useRef<HTMLDivElement>(null);
    const setX = useRef<((value: number) => void) | null>(null);
    const setY = useRef<((value: number) => void) | null>(null);
    const pos = useRef({ x: 0, y: 0 });

    const demo: ChromaGridItem[] = [
        {
            image: 'https://i.pravatar.cc/300?img=8',
            title: 'Alex Rivera',
            subtitle: 'Full Stack Developer',
            handle: '@alexrivera',
            borderColor: '#4F46E5',
            gradient: 'linear-gradient(145deg, #4F46E5, #000)',
            url: 'https://github.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=11',
            title: 'Jordan Chen',
            subtitle: 'DevOps Engineer',
            handle: '@jordanchen',
            borderColor: '#10B981',
            gradient: 'linear-gradient(210deg, #10B981, #000)',
            url: 'https://linkedin.com/in/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=3',
            title: 'Morgan Blake',
            subtitle: 'UI/UX Designer',
            handle: '@morganblake',
            borderColor: '#F59E0B',
            gradient: 'linear-gradient(165deg, #F59E0B, #000)',
            url: 'https://dribbble.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=16',
            title: 'Casey Park',
            subtitle: 'Data Scientist',
            handle: '@caseypark',
            borderColor: '#EF4444',
            gradient: 'linear-gradient(195deg, #EF4444, #000)',
            url: 'https://kaggle.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=25',
            title: 'Sam Kim',
            subtitle: 'Mobile Developer',
            handle: '@thesamkim',
            borderColor: '#8B5CF6',
            gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
            url: 'https://github.com/'
        },
        {
            image: 'https://i.pravatar.cc/300?img=60',
            title: 'Tyler Rodriguez',
            subtitle: 'Cloud Architect',
            handle: '@tylerrod',
            borderColor: '#06B6D4',
            gradient: 'linear-gradient(135deg, #06B6D4, #000)',
            url: 'https://aws.amazon.com/'
        }
    ];
    const data = items?.length ? items : demo;

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            // Modal removed
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        setX.current = gsap.quickSetter(el, '--x', 'px') as (value: number) => void;
        setY.current = gsap.quickSetter(el, '--y', 'px') as (value: number) => void;
        const { width, height } = el.getBoundingClientRect();
        pos.current = { x: width / 2, y: height / 2 };
        if (setX.current) setX.current(pos.current.x);
        if (setY.current) setY.current(pos.current.y);
    }, []);

    const moveTo = (x: number, y: number) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x);
                setY.current?.(pos.current.y);
            },
            overwrite: true
        });
    };

    const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!rootRef.current) return;
        const r = rootRef.current.getBoundingClientRect();
        moveTo(e.clientX - r.left, e.clientY - r.top);
        gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    };

    const handleLeave = () => {
        gsap.to(fadeRef.current, {
            opacity: 1,
            duration: fadeOut,
            overwrite: true
        });
    };

    const handleCardClick = (item: ChromaGridItem, index: number) => {
        if (item.url && item.url !== '#') {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        }
    };


    const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={rootRef}
            className={`chroma-grid ${className}`}
            style={{
                '--r': `${radius}px`,
                '--cols': columns, // Fix: Ensure this is correctly typed in CSS via style
            } as React.CSSProperties}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
        >
            {data.map((c, i) => (
                <article
                    key={i}
                    className="chroma-card"
                    onMouseMove={handleCardMove}
                    onMouseEnter={() => c.type === 'video' && setHoveredCard(i)}
                    onMouseLeave={() => c.type === 'video' && setHoveredCard(null)}
                    onClick={() => handleCardClick(c, i)}
                    style={{
                        '--card-border': c.borderColor || 'transparent',
                        '--card-gradient': c.gradient,
                        cursor: (c.url || c.type === 'video') ? 'pointer' : 'default',
                        filter: c.type === 'video' && !coloredCards.has(i) && hoveredCard !== i ? 'grayscale(1)' : 'grayscale(0)'
                    } as React.CSSProperties}
                >
                    <div className="chroma-img-wrapper">
                        {c.type === 'video' ? (
                            <video
                                ref={(el) => { videoRefs.current[i] = el; }}
                                src={c.image}
                                poster={c.poster}
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="chroma-video"
                            />
                        ) : (
                            <Image
                                src={c.image}
                                alt={c.title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>
                </article>
            ))}
            <div className="chroma-overlay" />
            <div ref={fadeRef} className="chroma-fade" />
        </div>
    );
};

export default ChromaGrid;
