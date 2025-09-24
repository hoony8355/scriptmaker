
import React from 'react';

const ClipboardIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25H9A2.25 2.25 0 016.75 4.5v0a2.25 2.25 0 012.25-2.25h3.879a2.25 2.25 0 012.121.75l2.121 2.121A2.25 2.25 0 0118 8.25v3.375c0 .621-.504 1.125-1.125 1.125h-3.75a1.125 1.125 0 01-1.125-1.125V8.25a2.25 2.25 0 012.25-2.25h2.25a2.25 2.25 0 002.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25h-3.879z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13.5H3.75A2.25 2.25 0 001.5 15.75v3.75c0 1.242 1.008 2.25 2.25 2.25h3.75c1.242 0 2.25-1.008 2.25-2.25V19.5m-3.75-3.75h3.75m-3.75 0V15m3.75 0v1.5m0 0v1.5m-3.75-3.75h3.75" />
    </svg>
);

export default ClipboardIcon;
