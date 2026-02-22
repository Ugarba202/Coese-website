// Fallback hook implementation since no Supabase details are provided yet.
import {
    MOCK_MEMBERS,
    MOCK_COMMITTEES,
    MOCK_NEWS_EVENTS,
    MOCK_GALLERY,
    MOCK_ADMINISTRATIONS,
    MOCK_LECTURERS,
    MOCK_LEVEL_COORDINATORS,
    MOCK_PROGRAMS,
    MOCK_STATS,
} from "@/lib/mock-data";

// Simple artificial delay to simulate network requests
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getMembers(adminId?: string) {
    await delay(500);
    let res = [...MOCK_MEMBERS];
    if (adminId) res = res.filter(m => m.administration_id === adminId);
    return res.sort((a, b) => a.order_index - b.order_index);
}

export async function getCommittees() {
    await delay(500);
    return [...MOCK_COMMITTEES].sort((a, b) => a.order_index - b.order_index);
}

export async function getCommitteeBySlug(slug: string) {
    await delay(500);
    return MOCK_COMMITTEES.find(c => c.slug === slug) || null;
}

export async function getNewsEvents(type?: "news" | "event") {
    await delay(500);
    let res = MOCK_NEWS_EVENTS.filter(p => p.published);
    if (type) res = res.filter(p => p.type === type);
    return res.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getNewsEventById(id: string) {
    await delay(500);
    return MOCK_NEWS_EVENTS.find(p => p.id === id || p.slug === id) || null;
}

export async function getGalleryImages(albumId?: string) {
    await delay(500);
    let res = [...MOCK_GALLERY];
    if (albumId && albumId !== "all") res = res.filter(img => img.album_id === albumId);
    return res.sort((a, b) => a.order_index - b.order_index);
}

export async function getAdministrations() {
    await delay(500);
    return [...MOCK_ADMINISTRATIONS].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getStaff() {
    await delay(500);
    return {
        lecturers: [...MOCK_LECTURERS].sort((a, b) => a.order_index - b.order_index),
        coordinators: [...MOCK_LEVEL_COORDINATORS].sort((a, b) => a.level_number - b.level_number)
    };
}

export async function getActivePrograms() {
    await delay(500);
    return MOCK_PROGRAMS.filter(p => p.is_active).sort((a, b) => new Date(b.start_date || "").getTime() - new Date(a.start_date || "").getTime());
}

export async function getStats() {
    await delay(500);
    return MOCK_STATS;
}
