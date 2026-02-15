"use client";

import React, { useState } from 'react';
import './Folder.css';

interface FolderProps {
    color?: string;
    size?: number;
    items?: React.ReactNode[];
    className?: string;
    label?: string;
}

const darkenColor = (hex: string, percent: number): string => {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
        color = color
            .split('')
            .map(c => c + c)
            .join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '', label = '' }) => {
    const maxItems = 4;
    const [open, setOpen] = useState(false);

    // Optimize videos: Only autoPlay if folder is open
    const optimizedItems = React.Children.map(items, (item) => {
        if (React.isValidElement(item) && item.type === 'video') {
            return React.cloneElement(item as React.ReactElement<any>, {
                autoPlay: open,
            });
        }
        return item;
    });

    const papers: React.ReactNode[] = [...(optimizedItems || [])].slice(0, maxItems);
    while (papers.length < maxItems) {
        papers.push(null);
    }

    const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    const [selectedItem, setSelectedItem] = useState<React.ReactNode | null>(null);

    const folderBackColor = darkenColor(color, 0.08);
    const paper1 = darkenColor('#ffffff', 0.1);
    const paper2 = darkenColor('#ffffff', 0.05);
    const paper3 = '#ffffff';

    const handleClick = () => {
        setOpen(prev => !prev);
        if (open) {
            setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
        }
    };

    const handlePaperClick = (e: React.MouseEvent, item: React.ReactNode) => {
        if (!open) return;
        e.stopPropagation();
        setSelectedItem(item);
    };

    const handlePaperMouseMove = (e: React.MouseEvent, index: number) => {
        if (!open) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;
        setPaperOffsets(prev => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: offsetX, y: offsetY };
            return newOffsets;
        });
    };

    const handlePaperMouseLeave = (index: number) => {
        setPaperOffsets(prev => {
            const newOffsets = [...prev];
            newOffsets[index] = { x: 0, y: 0 };
            return newOffsets;
        });
    };

    // Convert string CSS variables to CSSProperties object
    const folderStyle: React.CSSProperties = {
        // @ts-ignore
        '--folder-color': color,
        '--folder-back-color': folderBackColor,
        '--paper-1': paper1,
        '--paper-2': paper2,
        '--paper-3': paper3
    };

    const folderClassName = `folder ${open ? 'open' : ''}`.trim();
    const scaleStyle = { transform: `scale(${size})` };

    return (
        <>
            <div style={scaleStyle} className={className}>
                <div className={folderClassName} style={folderStyle} onClick={handleClick}>
                    <div className="folder__back">
                        {papers.map((item, i) => item && (
                            <div
                                key={i}
                                className={`paper paper-${i + 1}`}
                                onMouseMove={e => handlePaperMouseMove(e, i)}
                                onMouseLeave={() => handlePaperMouseLeave(i)}
                                onClick={(e) => handlePaperClick(e, item)}
                                style={
                                    open
                                        ? {
                                            // @ts-ignore
                                            '--magnet-x': `${paperOffsets[i]?.x || 0}px`,
                                            '--magnet-y': `${paperOffsets[i]?.y || 0}px`
                                        }
                                        : {}
                                }
                            >
                                {item}
                            </div>
                        ))}
                        <div className="folder__front"></div>
                        <div className="folder__front right"></div>
                        {label && <span className="folder-label">{label}</span>}
                    </div>
                </div>
            </div>

            {selectedItem && (
                <div
                    className="chromax-modal-overlay"
                    style={{ zIndex: 1000 }}
                    onClick={() => setSelectedItem(null)}
                >
                    <button
                        className="chromax-modal-close"
                        onClick={() => setSelectedItem(null)}
                    >
                        &times;
                    </button>
                    <div
                        className="chromax-modal-content"
                        style={{ maxWidth: '90vw', maxHeight: '90vh', backgroundColor: 'transparent', boxShadow: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {React.isValidElement(selectedItem) ?
                            React.cloneElement(selectedItem as React.ReactElement<any>, {
                                ...((selectedItem as any).type === 'video' ? { controls: true, autoPlay: true } : {}),
                                style: {
                                    maxWidth: '100%',
                                    maxHeight: '85vh',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    borderRadius: '8px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                }
                            }) : selectedItem
                        }
                    </div>
                </div>
            )}
        </>
    );
};

export default Folder;
