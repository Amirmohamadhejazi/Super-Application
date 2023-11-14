import React, { useState } from 'react';

interface SpoilerProps {
    children: React.ReactNode;
}

const Spoiler: React.FC<SpoilerProps> = ({ children }) => {
    const [isSpoilerVisible, setSpoilerVisible] = useState(false);

    const toggleSpoiler = () => {
        setSpoilerVisible(!isSpoilerVisible);
    };

    return (
        <div
            style={{
                cursor: 'pointer',
                filter: isSpoilerVisible ? 'none' : 'blur(5px)',
                transition: 'filter 0.3s ease-in-out'
            }}
            onClick={toggleSpoiler}
        >
            {children}
        </div>
    );
};

export default Spoiler;
