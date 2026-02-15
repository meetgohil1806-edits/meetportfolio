"use client";

import React, { useEffect } from 'react';

interface VideoModalProps {
    src: string | null;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ src, onClose }) => {
    useEffect(() => {
        if (src) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [src]);

    if (!src) return null;

    return (
        <div
            className="chromax-modal-overlay"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(8px)'
            }}
            onClick={onClose}
        >
            <button
                className="chromax-modal-close"
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '40px',
                    cursor: 'pointer',
                    zIndex: 10001
                }}
            >
                &times;
            </button>
            <div
                className="chromax-modal-content"
                style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    position: 'relative',
                    zIndex: 10000
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    src={src}
                    controls
                    autoPlay
                    style={{
                        maxWidth: '100%',
                        maxHeight: '85vh',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}
                />
            </div>
        </div>
    );
};

export default VideoModal;
