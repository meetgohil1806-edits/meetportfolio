"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform, Geometry } from 'ogl';
import { useEffect, useRef, useState } from 'react';

import './CircularGallery.css';

interface GalleryItem {
    image: string;
    text: string;
    type?: 'image' | 'video';
}

interface CircularGalleryProps {
    items?: GalleryItem[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
    onItemClick?: (item: GalleryItem) => void;
}

function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function lerp(p1: number, p2: number, t: number) {
    return p1 + (p2 - p1) * t;
}

function autoBind(instance: any) {
    const proto = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(proto).forEach(key => {
        if (key !== 'constructor' && typeof instance[key] === 'function') {
            instance[key] = instance[key].bind(instance);
        }
    });
}

function createTextTexture(gl: any, text: string, font = 'bold 30px monospace', color = 'black') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = font;
    const metrics = context.measureText(text);
    const textWidth = Math.ceil(metrics.width);
    const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
    canvas.width = textWidth + 20;
    canvas.height = textHeight + 20;
    context.font = font;
    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new Texture(gl, { generateMipmaps: false });
    texture.image = canvas;
    return { texture, width: canvas.width, height: canvas.height };
}

class Title {
    gl: any;
    plane: Mesh;
    renderer: Renderer;
    text: string;
    textColor: string;
    font: string;
    mesh!: Mesh;

    constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: any) {
        autoBind(this);
        this.gl = gl;
        this.plane = plane;
        this.renderer = renderer;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.createMesh();
    }
    createMesh() {
        const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
        const geometry = new Plane(this.gl);
        const program = new Program(this.gl, {
            vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
            uniforms: { tMap: { value: texture } },
            transparent: true
        });
        this.mesh = new Mesh(this.gl, { geometry, program });
        const aspect = width / height;
        const textHeight = this.plane.scale.y * 0.15;
        const textWidth = textHeight * aspect;
        this.mesh.scale.set(textWidth, textHeight, 1);
        this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05;
        this.mesh.setParent(this.plane);
    }
}

class Media {
    extra: number;
    geometry: Geometry;
    gl: any;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: any;
    text: string;
    viewport: any;
    bend: number;
    textColor: string;
    borderRadius: number;
    font: string;
    program!: Program;
    plane!: Mesh;
    title!: Title;
    x!: number;
    speed!: number;
    widthTotal!: number;
    width!: number;
    scale!: number;
    padding!: number;
    isBefore!: boolean;
    isAfter!: boolean;
    isVideo!: boolean;
    video!: HTMLVideoElement;
    texture!: Texture;

    constructor({
        geometry,
        gl,
        image,
        index,
        length,
        renderer,
        scene,
        screen,
        text,
        viewport,
        bend,
        textColor,
        borderRadius = 0,
        font
    }: any) {
        this.extra = 0;
        this.geometry = geometry;
        this.gl = gl;
        this.image = image;
        this.index = index;
        this.length = length;
        this.renderer = renderer;
        this.scene = scene;
        this.screen = screen;
        this.text = text;
        this.viewport = viewport;
        this.bend = bend;
        this.textColor = textColor;
        this.borderRadius = borderRadius;
        this.font = font;
        this.createShader();
        this.createMesh();
        // this.createTitle();
        this.onResize();
    }
    createShader() {
        this.isVideo = this.image.endsWith('.mp4') || this.image.endsWith('.webm') || this.image.endsWith('.ogg');

        this.texture = new Texture(this.gl, {
            generateMipmaps: !this.isVideo
        });

        this.program = new Program(this.gl, {
            depthTest: false,
            depthWrite: false,
            vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
            fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          
          // Smooth antialiasing for edges
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
            uniforms: {
                tMap: { value: this.texture },
                uPlaneSizes: { value: [0, 0] },
                uImageSizes: { value: [0, 0] },
                uSpeed: { value: 0 },
                uTime: { value: 100 * Math.random() },
                uBorderRadius: { value: this.borderRadius }
            },
            transparent: true
        });

        if (this.isVideo) {
            this.video = document.createElement('video');
            this.video.src = this.image;
            this.video.muted = true;
            this.video.loop = true;
            this.video.playsInline = true;
            this.video.crossOrigin = 'anonymous';
            this.video.preload = 'none';
            this.video.muted = true;
            this.video.playsInline = true;

            this.video.onseeked = () => {
                this.texture.needsUpdate = true;
            };

            this.video.oncanplay = () => {
                this.program.uniforms.uImageSizes.value = [this.video.videoWidth, this.video.videoHeight];
                // Seek to a small offset to ensure a frame is decoded
                if (this.video.currentTime === 0) {
                    this.video.currentTime = 0.5;
                }
            };

            // Force texture update for the first few seconds to catch the frame
            let frameCount = 0;
            const forceUpdate = () => {
                if (frameCount < 60) {
                    this.texture.needsUpdate = true;
                    frameCount++;
                    requestAnimationFrame(forceUpdate);
                }
            };

            this.video.onloadeddata = () => {
                this.texture.needsUpdate = true;
                forceUpdate();
            };

            // Do not call play() immediately
            this.texture.image = this.video;
            // this.video.load(); // Do not force load
        } else {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = this.image;
            img.onload = () => {
                this.texture.image = img;
                this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
            };
        }
    }
    createMesh() {
        this.plane = new Mesh(this.gl, {
            geometry: this.geometry,
            program: this.program
        });
        this.plane.setParent(this.scene);
    }
    createTitle() {
        this.title = new Title({
            gl: this.gl,
            plane: this.plane,
            renderer: this.renderer,
            text: this.text,
            textColor: this.textColor,
            fontFamily: this.font
        });
    }
    update(scroll: any, direction: string) {
        this.plane.position.x = this.x - scroll.current - this.extra;

        const x = this.plane.position.x;
        const H = this.viewport.width / 2;

        if (this.bend === 0) {
            this.plane.position.y = 0;
            this.plane.rotation.z = 0;
        } else {
            const B_abs = Math.abs(this.bend);
            const R = (H * H + B_abs * B_abs) / (2 * B_abs);
            const effectiveX = Math.min(Math.abs(x), H);

            const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
            if (this.bend > 0) {
                this.plane.position.y = -arc;
                this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
            } else {
                this.plane.position.y = arc;
                this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
            }
        }

        this.speed = scroll.current - scroll.last;
        this.program.uniforms.uTime.value += 0.04;
        this.program.uniforms.uSpeed.value = this.speed;

        if (this.isVideo && this.video.readyState >= this.video.HAVE_CURRENT_DATA) {
            // Only update if playing or visible to save resources
            if (!this.video.paused) {
                this.texture.needsUpdate = true;
            }
        }

        const planeOffset = this.plane.scale.x / 2;
        const viewportOffset = this.viewport.width / 2;
        this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
        this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

        // Play video only when it's relatively centered
        if (this.isVideo && this.video) {
            const distFromCenter = Math.abs(this.plane.position.x);
            if (distFromCenter < this.viewport.width * 0.4 && !this.isBefore && !this.isAfter) {
                if (this.video.paused) {
                    this.video.play().catch(() => { });
                }
            } else {
                if (!this.video.paused) {
                    this.video.pause();
                }
            }
        }

        if (direction === 'right' && this.isBefore) {
            this.extra -= this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
        if (direction === 'left' && this.isAfter) {
            this.extra += this.widthTotal;
            this.isBefore = this.isAfter = false;
        }
    }
    onResize({ screen, viewport }: any = {}) {
        if (screen) this.screen = screen;
        if (viewport) {
            this.viewport = viewport;
            if (this.plane.program.uniforms.uViewportSizes) {
                this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
            }
        }
        this.scale = this.screen.height / 1500;
        this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
        this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
        this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
        this.padding = 2;
        this.width = this.plane.scale.x + this.padding;
        this.widthTotal = this.width * this.length;
        this.x = this.width * this.index;
    }
}

class App {
    container: HTMLElement;
    scrollSpeed: number;
    scroll: { ease: number; current: number; target: number; last: number; position?: number };
    onCheckDebounce: Function;
    renderer!: Renderer;
    gl: any;
    camera!: Camera;
    scene!: Transform;
    screen!: { width: number; height: number };
    viewport!: { width: number; height: number };
    planeGeometry!: Plane;
    mediasImages!: GalleryItem[];
    medias!: Media[];
    isDown: boolean = false;
    start: number = 0;
    raf: number = 0;
    boundOnResize: any;
    boundOnWheel: any;
    boundOnTouchDown: any;
    boundOnTouchMove: any;
    boundOnTouchUp: any;
    onItemClick: ((item: GalleryItem) => void) | undefined;
    clickStartX: number = 0;
    clickStartTime: number = 0;

    constructor(
        container: HTMLElement,
        {
            items,
            bend,
            textColor = '#ffffff',
            borderRadius = 0,
            font = 'bold 30px Figtree',
            scrollSpeed = 2,
            scrollEase = 0.05,
            onItemClick
        }: any = {}
    ) {
        document.documentElement.classList.remove('no-js');
        this.container = container;
        this.scrollSpeed = scrollSpeed;
        this.onItemClick = onItemClick;
        this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
        this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.onResize();
        this.createGeometry();
        this.createMedias(items, bend, textColor, borderRadius, font);
        this.update();
        this.addEventListeners();
    }
    createRenderer() {
        this.renderer = new Renderer({
            alpha: true,
            antialias: true,
            dpr: Math.min(window.devicePixelRatio || 1, 2)
        });
        this.gl = this.renderer.gl;
        this.gl.clearColor(0, 0, 0, 0);
        this.container.appendChild(this.gl.canvas);
    }
    createCamera() {
        this.camera = new Camera(this.gl);
        this.camera.fov = 45;
        this.camera.position.z = 20;
    }
    createScene() {
        this.scene = new Transform();
    }
    createGeometry() {
        this.planeGeometry = new Plane(this.gl, {
            heightSegments: 50,
            widthSegments: 100
        });
    }
    createMedias(items: GalleryItem[], bend = 1, textColor: string, borderRadius: number, font: string) {
        const defaultItems = [
            { image: `https://picsum.photos/seed/1/800/600?grayscale`, text: 'Bridge' },
            { image: `https://picsum.photos/seed/2/800/600?grayscale`, text: 'Desk Setup' },
            { image: `https://picsum.photos/seed/3/800/600?grayscale`, text: 'Waterfall' },
            { image: `https://picsum.photos/seed/4/800/600?grayscale`, text: 'Strawberries' },
            { image: `https://picsum.photos/seed/5/800/600?grayscale`, text: 'Deep Diving' },
            { image: `https://picsum.photos/seed/16/800/600?grayscale`, text: 'Train Track' },
            { image: `https://picsum.photos/seed/17/800/600?grayscale`, text: 'Santorini' },
            { image: `https://picsum.photos/seed/8/800/600?grayscale`, text: 'Blurry Lights' },
            { image: `https://picsum.photos/seed/9/800/600?grayscale`, text: 'New York' },
            { image: `https://picsum.photos/seed/10/800/600?grayscale`, text: 'Good Boy' },
            { image: `https://picsum.photos/seed/21/800/600?grayscale`, text: 'Coastline' },
            { image: `https://picsum.photos/seed/12/800/600?grayscale`, text: 'Palm Trees' }
        ];
        const galleryItems = items && items.length ? items : defaultItems;
        this.mediasImages = galleryItems.concat(galleryItems);
        this.medias = this.mediasImages.map((data, index) => {
            return new Media({
                geometry: this.planeGeometry,
                gl: this.gl,
                image: data.image,
                index,
                length: this.mediasImages.length,
                renderer: this.renderer,
                scene: this.scene,
                screen: this.screen,
                text: data.text,
                viewport: this.viewport,
                bend,
                textColor,
                borderRadius,
                font
            });
        });
    }
    onTouchDown(e: any) {
        this.isDown = true;
        this.scroll.position = this.scroll.current;
        this.start = e.touches ? e.touches[0].clientX : e.clientX;
        this.clickStartX = this.start;
        this.clickStartTime = Date.now();
    }
    onTouchMove(e: any) {
        if (!this.isDown) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const distance = (this.start - x) * (this.scrollSpeed * 0.025);
        this.scroll.target = (this.scroll.position || 0) + distance;
    }
    onTouchUp(e: any) {
        this.isDown = false;
        this.onCheck();

        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const timeDiff = Date.now() - this.clickStartTime;
        const distDiff = Math.abs(endX - this.clickStartX);

        if (timeDiff < 250 && distDiff < 10) {
            this.handleClick(endX, e.changedTouches ? e.changedTouches[0].clientY : e.clientY);
        }
    }
    handleClick(x: number, y: number) {
        if (!this.onItemClick) return;

        // Custom hit detection based on plane positions
        const rect = this.container.getBoundingClientRect();
        const mouseX = ((x - rect.left) / rect.width) * 2 - 1;

        // Find the media item that is closest to the screen center or the click position
        // Since it's a 1D scroll, we just check which plane's screen X matches the click X
        let closestMedia = null;
        let minDistance = Infinity;

        this.medias.forEach(media => {
            // Project plane's world position to NDC
            const planeX = media.plane.position.x;
            const ndcX = (planeX / (this.viewport.width / 2));
            const dist = Math.abs(ndcX - mouseX);

            if (dist < minDistance) {
                minDistance = dist;
                closestMedia = media;
            }
        });

        if (closestMedia && minDistance < 0.3) {
            const mediaItem = closestMedia as Media;
            const originalIndex = mediaItem.index % (this.mediasImages.length / 2);
            this.onItemClick(this.mediasImages[originalIndex]);
        }
    }
    onWheel(e: any) {
        const delta = e.deltaY || e.wheelDelta || e.detail;
        this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
        this.onCheckDebounce();
    }
    onCheck() {
        if (!this.medias || !this.medias[0]) return;
        const width = this.medias[0].width;
        const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
        const item = width * itemIndex;
        this.scroll.target = this.scroll.target < 0 ? -item : item;
    }
    onResize() {
        this.screen = {
            width: this.container.clientWidth,
            height: this.container.clientHeight
        };
        this.renderer.setSize(this.screen.width, this.screen.height);
        this.camera.perspective({
            aspect: this.screen.width / this.screen.height
        });
        const fov = (this.camera.fov * Math.PI) / 180;
        const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
        const width = height * this.camera.aspect;
        this.viewport = { width, height };
        if (this.medias) {
            this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
        }
    }
    update() {
        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
        const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
        if (this.medias) {
            this.medias.forEach(media => media.update(this.scroll, direction));
        }
        this.renderer.render({ scene: this.scene, camera: this.camera });
        this.scroll.last = this.scroll.current;
        this.raf = window.requestAnimationFrame(this.update.bind(this));
    }
    addEventListeners() {
        this.boundOnResize = this.onResize.bind(this);
        this.boundOnWheel = this.onWheel.bind(this);
        this.boundOnTouchDown = this.onTouchDown.bind(this);
        this.boundOnTouchMove = this.onTouchMove.bind(this);
        this.boundOnTouchUp = this.onTouchUp.bind(this);
        window.addEventListener('resize', this.boundOnResize);
        this.container.addEventListener('mousewheel', this.boundOnWheel);
        this.container.addEventListener('wheel', this.boundOnWheel);
        this.container.addEventListener('mousedown', this.boundOnTouchDown);
        this.container.addEventListener('mousemove', this.boundOnTouchMove);
        this.container.addEventListener('mouseup', this.boundOnTouchUp);
        this.container.addEventListener('touchstart', this.boundOnTouchDown);
        this.container.addEventListener('touchmove', this.boundOnTouchMove);
        this.container.addEventListener('touchend', this.boundOnTouchUp);
    }
    destroy() {
        window.cancelAnimationFrame(this.raf);
        window.removeEventListener('resize', this.boundOnResize);
        this.container.removeEventListener('mousewheel', this.boundOnWheel);
        this.container.removeEventListener('wheel', this.boundOnWheel);
        this.container.removeEventListener('mousedown', this.boundOnTouchDown);
        this.container.removeEventListener('mousemove', this.boundOnTouchMove);
        this.container.removeEventListener('mouseup', this.boundOnTouchUp);
        this.container.removeEventListener('touchstart', this.boundOnTouchDown);
        this.container.removeEventListener('touchmove', this.boundOnTouchMove);
        this.container.removeEventListener('touchend', this.boundOnTouchUp);
        if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
            this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
        }
    }
}

export default function CircularGallery({
    items,
    bend = 3,
    textColor = '#ffffff',
    borderRadius = 0.05,
    font = 'bold 30px Figtree',
    scrollSpeed = 2,
    scrollEase = 0.05
}: CircularGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const app = new App(containerRef.current, {
            items,
            bend,
            textColor,
            borderRadius,
            font,
            scrollSpeed,
            scrollEase,
            onItemClick: (item: GalleryItem) => setSelectedItem(item)
        });
        return () => {
            app.destroy();
        };
    }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

    return (
        <div className="circular-gallery-wrapper w-full h-full relative">
            <div className="circular-gallery" ref={containerRef} />

            {selectedItem && (
                <div
                    className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
                    onClick={() => setSelectedItem(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-white/50 hover:text-white text-4xl p-4 transition-colors z-[2010]"
                        onClick={() => setSelectedItem(null)}
                    >
                        ×
                    </button>

                    <div className="relative w-full max-w-5xl aspect-video md:aspect-[21/9] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 mx-4">
                        {selectedItem.image.endsWith('.mp4') ? (
                            <video
                                src={selectedItem.image}
                                autoPlay
                                controls
                                className="w-full h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.text}
                                className="w-full h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                        {/* Modal title removed for a cleaner look if requested, 
                            but keeping it here for now as the screenshot focused on the gallery. 
                            If the user wants it gone from the modal too, I can remove it. */}
                        {/* <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                            <h3 className="text-white text-3xl font-bold font-outfit">{selectedItem.text}</h3>
                        </div> */}
                    </div>
                </div>
            )}
        </div>
    );
}
