// ── COESA Type Definitions ──────────────────────

export interface Administration {
    id: string;
    year: string;
    theme?: string;
    is_current: boolean;
    created_at: string;
    members?: Member[];
}

export interface Member {
    id: string;
    full_name: string;
    role: string;
    role_short?: string;
    photo_url?: string;
    bio?: string;
    email?: string;
    phone?: string;
    linkedin_url?: string;
    twitter_url?: string;
    is_executive: boolean;
    order_index: number;
    administration_id: string;
    committee_id?: string;
}

export interface Committee {
    id: string;
    name: string;
    slug: string;
    short_name?: string;
    mandate?: string;
    icon?: string;
    cover_image_url?: string;
    order_index: number;
    members?: Member[];
}

export interface Lecturer {
    id: string;
    full_name: string;
    title: string;
    photo_url?: string;
    role?: string;
    designation?: string;
    email?: string;
    office?: string;
    courses_taught: string[];
    specialization?: string;
    order_index: number;
}

export interface LevelCoordinator {
    id: string;
    level: string;
    level_number: number;
    full_name: string;
    title: string;
    photo_url?: string;
    email?: string;
    office?: string;
    office_hours?: string;
}

export interface NewsEvent {
    id: string;
    title: string;
    slug?: string;
    content?: string;
    cover_image_url?: string;
    excerpt?: string;
    type: "news" | "event";
    event_date?: string;
    event_venue?: string;
    event_time?: string;
    is_featured: boolean;
    published: boolean;
    author_id?: string;
    created_at: string;
    updated_at: string;
}

export interface GalleryImage {
    id: string;
    url: string;
    caption?: string;
    album_id: string;
    width?: number;
    height?: number;
    order_index: number;
    uploaded_at: string;
}

export interface Program {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    duration_label?: string;
    venue?: string;
    mode?: string;
    enrollment_fee?: { internal: number; external: number };
    payment_details?: { account: string; name: string; bank: string };
    contact_phone?: string[];
    slots_limited: boolean;
    is_active: boolean;
    cover_image_url?: string;
    created_at: string;
}

export interface AdminProfile {
    id: string;
    full_name?: string;
    role: "superadmin" | "editor";
    avatar_url?: string;
    created_at: string;
}

// ── Component Props ─────────────────────────────

export interface NavLink {
    label: string;
    href: string;
}

export interface StatItem {
    value: number;
    suffix?: string;
    label: string;
}

export interface CoreValue {
    icon: string;
    title: string;
    description: string;
}

export interface CommunityItem {
    id: string;
    title: string;
    description?: string;
    image_url: string;
    year?: string;
    location?: string;
}
