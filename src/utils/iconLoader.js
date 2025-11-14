// Centralized icon loader for tree-shaking optimization
// Icons are grouped by usage context for better code splitting

// Import all icons using Vite's asset handling
import iconGithub from '../assets/images/icon-github.svg';
import iconTwitter from '../assets/images/icon-twitter.svg';
import iconLinkedIn from '../assets/images/icon-linkedin.svg';
import iconYouTube from '../assets/images/icon-youtube.svg';
import iconFacebook from '../assets/images/icon-facebook.svg';
import iconTwitch from '../assets/images/icon-twitch.svg';
import iconDevTo from '../assets/images/icon-devto.svg';
import iconCodeWars from '../assets/images/icon-codewars.svg';
import iconCodePen from '../assets/images/icon-codepen.svg';
import iconFreeCodeCamp from '../assets/images/icon-freecodecamp.svg';
import iconGitLab from '../assets/images/icon-gitlab.svg';
import iconHashnode from '../assets/images/icon-hashnode.svg';
import iconStackOverflow from '../assets/images/icon-stack-overflow.svg';
import iconFrontendMentor from '../assets/images/icon-frontend-mentor.svg';
import iconWhatsApp from '../assets/images/icon-whatsapp.svg';
import iconXDA from '../assets/images/icon-xda.svg';
import iconInstagram from '../assets/images/icon-instagram.svg';
import iconDiscord from '../assets/images/icon-discord.svg';
import iconTelegram from '../assets/images/icon-telegram.svg';
import iconThreads from '../assets/images/icon-threads.svg';
import iconWebsite from '../assets/images/icon-website.svg';
import iconReddit from '../assets/images/icon-reddit.svg';
import iconQuora from '../assets/images/icon-quora.svg';
import iconTikTok from '../assets/images/icon-tiktok.svg';
import iconSnapchat from '../assets/images/icon-snapchat.svg';
import iconTumblr from '../assets/images/icon-tumblr.svg';
import iconFiverr from '../assets/images/icon-fiverr.svg';
import iconUpwork from '../assets/images/icon-upwork.svg';
import iconMedium from '../assets/images/icon-medium.svg';

// White variants
import iconGithubWhite from '../assets/images/icon-github-white.svg';
import iconTwitterWhite from '../assets/images/icon-twitter-white.svg';
import iconLinkedInWhite from '../assets/images/icon-linkedin-white.svg';
import iconYouTubeWhite from '../assets/images/icon-youtube-white.svg';
import iconFacebookWhite from '../assets/images/icon-facebook-white.svg';
import iconTwitchWhite from '../assets/images/icon-twitch-white.svg';
import iconDevToWhite from '../assets/images/icon-devto-white.svg';
import iconCodeWarsWhite from '../assets/images/icon-codewars-white.svg';
import iconCodePenWhite from '../assets/images/icon-codepen-white.svg';
import iconFreeCodeCampWhite from '../assets/images/icon-freecodecamp-white.svg';
import iconGitLabWhite from '../assets/images/icon-gitlab-white.svg';
import iconHashnodeWhite from '../assets/images/icon-hashnode-white.svg';
import iconStackOverflowWhite from '../assets/images/icon-stack-white-overflow.svg';
import iconFrontendMentorWhite from '../assets/images/icon-frontend-white-mentor.svg';
import iconWhatsAppWhite from '../assets/images/icon-whatsapp-white.svg';
import iconXDAWhite from '../assets/images/icon-xda-white.svg';
import iconInstagramWhite from '../assets/images/icon-instagram-white.svg';
import iconDiscordWhite from '../assets/images/icon-discord-white.svg';
import iconTelegramWhite from '../assets/images/icon-telegram-white.svg';
import iconThreadsWhite from '../assets/images/icon-threads-white.svg';
import iconWebsiteWhite from '../assets/images/icon-website-white.svg';
import iconRedditWhite from '../assets/images/icon-reddit-white.svg';
import iconQuoraWhite from '../assets/images/icon-quora-white.svg';
import iconTikTokWhite from '../assets/images/icon-tiktok-white.svg';
import iconSnapchatBlack from '../assets/images/icon-snapchat-black.svg';
import iconTumblrWhite from '../assets/images/icon-tumblr-white.svg';
import iconFiverrWhite from '../assets/images/icon-fiverr-white.svg';
import iconUpworkWhite from '../assets/images/icon-upwork-white.svg';
import iconMediumWhite from '../assets/images/icon-medium-white.svg';

const iconCache = {};

export const getPlatformIcon = (platformName, variant = 'default') => {
    const cacheKey = `${platformName}-${variant}`;
    
    if (iconCache[cacheKey]) {
        return iconCache[cacheKey];
    }

    const iconMap = {
        // Default (colored) icons for dropdown
        'GitHub-default': iconGithub,
        'Twitter-default': iconTwitter,
        'LinkedIn-default': iconLinkedIn,
        'YouTube-default': iconYouTube,
        'Facebook-default': iconFacebook,
        'Twitch-default': iconTwitch,
        'DevTo-default': iconDevTo,
        'CodeWars-default': iconCodeWars,
        'CodePen-default': iconCodePen,
        'FreeCodeCamp-default': iconFreeCodeCamp,
        'GitLab-default': iconGitLab,
        'Hashnode-default': iconHashnode,
        'StackOverflow-default': iconStackOverflow,
        'FrontendMentor-default': iconFrontendMentor,
        'WhatsApp-default': iconWhatsApp,
        'XDA-default': iconXDA,
        'Instagram-default': iconInstagram,
        'Discord-default': iconDiscord,
        'Telegram-default': iconTelegram,
        'Threads-default': iconThreads,
        'Website-default': iconWebsite,
        'Reddit-default': iconReddit,
        'Quora-default': iconQuora,
        'TikTok-default': iconTikTok,
        'Snapchat-default': iconSnapchat,
        'Tumblr-default': iconTumblr,
        'Fiverr-default': iconFiverr,
        'Upwork-default': iconUpwork,
        'Medium-default': iconMedium,
        
        // White icons for preview/display
        'GitHub-white': iconGithubWhite,
        'Twitter-white': iconTwitterWhite,
        'LinkedIn-white': iconLinkedInWhite,
        'YouTube-white': iconYouTubeWhite,
        'Facebook-white': iconFacebookWhite,
        'Twitch-white': iconTwitchWhite,
        'DevTo-white': iconDevToWhite,
        'CodeWars-white': iconCodeWarsWhite,
        'CodePen-white': iconCodePenWhite,
        'FreeCodeCamp-white': iconFreeCodeCampWhite,
        'GitLab-white': iconGitLabWhite,
        'Hashnode-white': iconHashnodeWhite,
        'StackOverflow-white': iconStackOverflowWhite,
        'FrontendMentor-white': iconFrontendMentorWhite,
        'WhatsApp-white': iconWhatsAppWhite,
        'XDA-white': iconXDAWhite,
        'Instagram-white': iconInstagramWhite,
        'Discord-white': iconDiscordWhite,
        'Telegram-white': iconTelegramWhite,
        'Threads-white': iconThreadsWhite,
        'Website-white': iconWebsiteWhite,
        'Reddit-white': iconRedditWhite,
        'Quora-white': iconQuoraWhite,
        'TikTok-white': iconTikTokWhite,
        'Snapchat-white': iconSnapchatBlack,
        'Tumblr-white': iconTumblrWhite,
        'Fiverr-white': iconFiverrWhite,
        'Upwork-white': iconUpworkWhite,
        'Medium-white': iconMediumWhite,
    };

    const icon = iconMap[cacheKey] || null;
    iconCache[cacheKey] = icon;
    return icon;
};

// For dropdown usage - loads only used icons
export const getDropdownIcon = (platformName) => getPlatformIcon(platformName, 'default');

// For preview/mockup usage - loads white variants
export const getPreviewIcon = (platformName) => getPlatformIcon(platformName, 'white');
