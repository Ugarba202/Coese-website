import type { NavLink } from "@/types";

export const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Administration", href: "/administration" },
    { label: "Committees", href: "/committees" },
    { label: "Staff", href: "/staff" },
    { label: "News & Events", href: "/news" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = {
    twitter: "https://twitter.com/coesa_abu",
    instagram: "https://instagram.com/coesa_abu",
    linkedin: "https://linkedin.com/company/coesa-abu",
    whatsapp: "https://wa.me/2348000000000",
    email: "coesa@abu.edu.ng",
};

export const COMMITTEE_SLUGS = [
    "it-high-skills",
    "editorial",
    "social-welfare",
    "sports",
    "academic",
    "public-relations",
    "finance",
] as const;

export const LEVELS = [
    { level: "100L", number: 100, color: "text-gray-400" },
    { level: "200L", number: 200, color: "text-coesa-sky" },
    { level: "300L", number: 300, color: "text-cyan-400" },
    { level: "400L", number: 400, color: "text-coesa-electric" },
    { level: "500L", number: 500, color: "text-gradient" },
] as const;

export const SITE_CONFIG = {
    name: "COESA",
    fullName: "Computer Engineering Student Association",
    chapter: "ABU Zaria",
    tagline: "Engineering the Future, One Line at a Time.",
    description:
        "Official website of the Computer Engineering Student Association, Ahmadu Bello University, Zaria.",
    url: "https://coesa.com.ng",
};
