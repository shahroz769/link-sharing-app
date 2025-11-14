// Centralized icon loader for tree-shaking optimization
// Icons are grouped by usage context for better code splitting

const iconCache = {};

export const getPlatformIcon = (platformName, variant = 'default') => {
    const cacheKey = `${platformName}-${variant}`;
    
    if (iconCache[cacheKey]) {
        return iconCache[cacheKey];
    }

    const iconMap = {
        // Default (colored) icons for dropdown
        'GitHub-default': '/src/assets/images/icon-github.svg',
        'Twitter-default': '/src/assets/images/icon-twitter.svg',
        'LinkedIn-default': '/src/assets/images/icon-linkedin.svg',
        'YouTube-default': '/src/assets/images/icon-youtube.svg',
        'Facebook-default': '/src/assets/images/icon-facebook.svg',
        'Twitch-default': '/src/assets/images/icon-twitch.svg',
        'DevTo-default': '/src/assets/images/icon-devto.svg',
        'CodeWars-default': '/src/assets/images/icon-codewars.svg',
        'CodePen-default': '/src/assets/images/icon-codepen.svg',
        'FreeCodeCamp-default': '/src/assets/images/icon-freecodecamp.svg',
        'GitLab-default': '/src/assets/images/icon-gitlab.svg',
        'Hashnode-default': '/src/assets/images/icon-hashnode.svg',
        'StackOverflow-default': '/src/assets/images/icon-stack-overflow.svg',
        'FrontendMentor-default': '/src/assets/images/icon-frontend-mentor.svg',
        'WhatsApp-default': '/src/assets/images/icon-whatsapp.svg',
        'XDA-default': '/src/assets/images/icon-xda.svg',
        'Instagram-default': '/src/assets/images/icon-instagram.svg',
        'Discord-default': '/src/assets/images/icon-discord.svg',
        'Telegram-default': '/src/assets/images/icon-telegram.svg',
        'Threads-default': '/src/assets/images/icon-threads.svg',
        'Website-default': '/src/assets/images/icon-website.svg',
        'Reddit-default': '/src/assets/images/icon-reddit.svg',
        'Quora-default': '/src/assets/images/icon-quora.svg',
        'TikTok-default': '/src/assets/images/icon-tiktok.svg',
        'Snapchat-default': '/src/assets/images/icon-snapchat.svg',
        'Tumblr-default': '/src/assets/images/icon-tumblr.svg',
        'Fiverr-default': '/src/assets/images/icon-fiverr.svg',
        'Upwork-default': '/src/assets/images/icon-upwork.svg',
        'Medium-default': '/src/assets/images/icon-medium.svg',
        
        // White icons for preview/display
        'GitHub-white': '/src/assets/images/icon-github-white.svg',
        'Twitter-white': '/src/assets/images/icon-twitter-white.svg',
        'LinkedIn-white': '/src/assets/images/icon-linkedin-white.svg',
        'YouTube-white': '/src/assets/images/icon-youtube-white.svg',
        'Facebook-white': '/src/assets/images/icon-facebook-white.svg',
        'Twitch-white': '/src/assets/images/icon-twitch-white.svg',
        'DevTo-white': '/src/assets/images/icon-devto-white.svg',
        'CodeWars-white': '/src/assets/images/icon-codewars-white.svg',
        'CodePen-white': '/src/assets/images/icon-codepen-white.svg',
        'FreeCodeCamp-white': '/src/assets/images/icon-freecodecamp-white.svg',
        'GitLab-white': '/src/assets/images/icon-gitlab-white.svg',
        'Hashnode-white': '/src/assets/images/icon-hashnode-white.svg',
        'StackOverflow-white': '/src/assets/images/icon-stack-white-overflow.svg',
        'FrontendMentor-white': '/src/assets/images/icon-frontend-white-mentor.svg',
        'WhatsApp-white': '/src/assets/images/icon-whatsapp-white.svg',
        'XDA-white': '/src/assets/images/icon-xda-white.svg',
        'Instagram-white': '/src/assets/images/icon-instagram-white.svg',
        'Discord-white': '/src/assets/images/icon-discord-white.svg',
        'Telegram-white': '/src/assets/images/icon-telegram-white.svg',
        'Threads-white': '/src/assets/images/icon-threads-white.svg',
        'Website-white': '/src/assets/images/icon-website-white.svg',
        'Reddit-white': '/src/assets/images/icon-reddit-white.svg',
        'Quora-white': '/src/assets/images/icon-quora-white.svg',
        'TikTok-white': '/src/assets/images/icon-tiktok-white.svg',
        'Snapchat-white': '/src/assets/images/icon-snapchat-black.svg',
        'Tumblr-white': '/src/assets/images/icon-tumblr-white.svg',
        'Fiverr-white': '/src/assets/images/icon-fiverr-white.svg',
        'Upwork-white': '/src/assets/images/icon-upwork-white.svg',
        'Medium-white': '/src/assets/images/icon-medium-white.svg',
    };

    const icon = iconMap[cacheKey] || null;
    iconCache[cacheKey] = icon;
    return icon;
};

// For dropdown usage - loads only used icons
export const getDropdownIcon = (platformName) => getPlatformIcon(platformName, 'default');

// For preview/mockup usage - loads white variants
export const getPreviewIcon = (platformName) => getPlatformIcon(platformName, 'white');
