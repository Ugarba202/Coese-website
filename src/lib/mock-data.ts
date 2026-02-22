import type {
    Administration,
    Member,
    Committee,
    Lecturer,
    LevelCoordinator,
    NewsEvent,
    GalleryImage,
    Program,
    StatItem,
    CoreValue,
    CommunityItem,
} from "@/types";

// ── STATS ──────────────────────────────────────
export const MOCK_STATS: StatItem[] = [
    { value: 340, suffix: "+", label: "Active Members" },
    { value: 7, label: "Committees" },
    { value: 12, label: "Years Active" },
    { value: 24, suffix: "+", label: "Events This Year" },
];

// ── CORE VALUES ────────────────────────────────
export const MOCK_CORE_VALUES: CoreValue[] = [
    {
        icon: "🔧",
        title: "Technical Excellence",
        description:
            "We push boundaries in software, hardware, and systems design — building projects that matter.",
    },
    {
        icon: "🤝",
        title: "Community & Mentorship",
        description:
            "From 100L to 500L, we create pathways for every student to grow, learn, and lead.",
    },
    {
        icon: "🚀",
        title: "Innovation First",
        description:
            "Hackathons, bootcamps, and open-source — we foster a culture where ideas become reality.",
    },
];

// ── ADMINISTRATIONS ────────────────────────────
export const MOCK_ADMINISTRATIONS: Administration[] = [
    { id: "admin-1", year: "2025/2026", theme: "Building Bridges", is_current: true, created_at: "2025-09-01T00:00:00Z" },
    { id: "admin-2", year: "2024/2025", theme: "Innovation Forward", is_current: false, created_at: "2024-09-01T00:00:00Z" },
    { id: "admin-3", year: "2023/2024", theme: "Digital Renaissance", is_current: false, created_at: "2023-09-01T00:00:00Z" },
];

// ── MEMBERS ────────────────────────────────────
export const MOCK_MEMBERS: Member[] = [
    {
        id: "m1", full_name: "Ahmad Ibrahim Musa", role: "President", role_short: "PRES",
        photo_url: "/images/committees/exec4.jpeg", bio: "Visionary leader driving COESA's mission to empower every Computer Engineering student.",
        email: "president@coesa.com.ng", phone: "+234 800 000 1001", is_executive: true, order_index: 4, administration_id: "admin-1",
    },
    {
        id: "m2", full_name: "Fatima Abdullahi", role: "Vice President", role_short: "VP",
        photo_url: "/images/committees/exec1.jpeg", bio: "Passionate about bridging the gap between academic theory and real-world engineering.",
        email: "vp@coesa.com.ng", phone: "+234 800 000 1002", is_executive: true, order_index: 1, administration_id: "admin-1",
    },
    {
        id: "m3", full_name: "Usman Bello Abubakar", role: "General Secretary", role_short: "SEC",
        photo_url: "/images/committees/exec2.jpeg", bio: "Keeping COESA organized and on track with meticulous planning.",
        email: "secretary@coesa.com.ng", phone: "+234 800 000 1003", is_executive: true, order_index: 2, administration_id: "admin-1",
    },
    {
        id: "m4", full_name: "Amina Yusuf Sani", role: "Public Relations Officer", role_short: "PRO",
        photo_url: "/images/committees/exec3.jpeg", bio: "Amplifying COESA's voice across campus and beyond.",
        email: "pro@coesa.com.ng", phone: "+234 800 000 1004", is_executive: true, order_index: 3, administration_id: "admin-1",
    },
    {
        id: "m5", full_name: "Mohammed Lawal Kano", role: "Treasurer", role_short: "TREAS",
        photo_url: "/images/committees/exec5.jpeg", bio: "Managing COESA's resources with transparency and accountability.",
        email: "treasurer@coesa.com.ng", phone: "+234 800 000 1005", is_executive: true, order_index: 5, administration_id: "admin-1",
    },
    {
        id: "m6", full_name: "Halima Suleiman", role: "Financial Secretary", role_short: "FINSEC",
        photo_url: "/images/committees/exec6.jpeg", bio: "Ensuring every kobo is tracked and accounted for.",
        email: "finsec@coesa.com.ng", phone: "+234 800 000 1006", is_executive: true, order_index: 6, administration_id: "admin-1",
    },
    {
        id: "m7", full_name: "Ibrahim Danjuma", role: "Social Director", role_short: "SOC",
        photo_url: "/images/committees/exec7.jpeg", bio: "Making sure COESA events are unforgettable.",
        email: "social@coesa.com.ng", phone: "+234 800 000 1007", is_executive: true, order_index: 7, administration_id: "admin-1",
    },
    {
        id: "m8", full_name: "Aisha Garba", role: "Welfare Secretary", role_short: "WELF",
        photo_url: "/images/committees/exec8.jpeg", bio: "Champion for student welfare and wellbeing.",
        email: "welfare@coesa.com.ng", phone: "+234 800 000 1008", is_executive: true, order_index: 8, administration_id: "admin-1",
    },
];

// ── COMMITTEES ─────────────────────────────────
export const MOCK_COMMITTEES: Committee[] = [
    {
        id: "c1", name: "IT & High Skills Committee", slug: "it-high-skills", short_name: "IT Committee",
        mandate: "Driving technical skill development through workshops, bootcamps, and hands-on projects in software, hardware, and emerging technologies.",
        icon: "💻", order_index: 1,
    },
    {
        id: "c2", name: "Editorial Committee", slug: "editorial", short_name: "Editorial",
        mandate: "Creating, curating, and publishing content that tells the COESA story — from newsletters to social media campaigns.",
        icon: "📝", order_index: 2,
    },
    {
        id: "c3", name: "Social & Welfare Committee", slug: "social-welfare", short_name: "Social Welfare",
        mandate: "Organizing social events and ensuring the welfare of all association members through outreach programs.",
        icon: "🤗", order_index: 3,
    },
    {
        id: "c4", name: "Sports Committee", slug: "sports", short_name: "Sports",
        mandate: "Promoting physical fitness and sportsmanship through inter-departmental competitions and fitness programs.",
        icon: "⚽", order_index: 4,
    },
    {
        id: "c5", name: "Academic Committee", slug: "academic", short_name: "Academic",
        mandate: "Supporting academic excellence through tutorials, study groups, past question compilations, and faculty collaborations.",
        icon: "📚", order_index: 5,
    },
    {
        id: "c6", name: "Public Relations Committee", slug: "public-relations", short_name: "PR Committee",
        mandate: "Managing COESA's public image, external partnerships, and inter-organizational relationships.",
        icon: "📢", order_index: 6,
    },
    {
        id: "c7", name: "Finance Committee", slug: "finance", short_name: "Finance",
        mandate: "Overseeing financial planning, budgeting, fundraising, and transparent reporting of association funds.",
        icon: "💰", order_index: 7,
    },
];

// ── ACADEMIC STAFF ─────────────────────────────
export const MOCK_PATRON = {
    id: "p1",
    full_name: "Prof. MB Muazu",
    title: "Prof.",
    role: "Grand Patron (COESA)",
    designation: "Director, Distance Learning, ABU Zaria",
    specialization: "Distributed Systems & Networking",
    courses_taught: ["COEN 502", "COEN 504"],
    photo_url: "/images/lecturers/Profmb1.jpeg",
    order_index: 0,
};

export const MOCK_HOD = {
    id: "h1",
    full_name: "Dr. Abubakar S. Magaji",
    title: "Dr.",
    role: "Head of Department",
    designation: "Computer Engineering, ABU Zaria",
    specialization: "Digital Signal Processing",
    courses_taught: ["COEN 501", "COEN 401"],
    photo_url: "/images/lecturers/hod.jpg",
    order_index: 0,
};

export const MOCK_LECTURERS: Lecturer[] = [
    {
        id: "l1",
        full_name: "Engr. Yusuf Ibrahim",
        title: "Engr.",
        photo_url: "/images/lecturers/lec1.jpg",
        email: "yibrahim@abu.edu.ng",
        office: "Room 302",
        specialization: "Software Engineering",
        courses_taught: ["COEN 201", "COEN 301"],
        order_index: 1
    },
    {
        id: "l2",
        full_name: "Prof. Sani M. Abdullahi",
        title: "Prof.",
        photo_url: "/images/lecturers/lec2.jpg",
        email: "smabdullahi@abu.edu.ng",
        office: "Room 105",
        specialization: "Computer Architecture",
        courses_taught: ["COEN 301", "COEN 501"],
        order_index: 2
    },
    {
        id: "l3",
        full_name: "Dr. Fatima B. Umar",
        title: "Dr.",
        photo_url: "/images/lecturers/lec3.jpg",
        email: "fbumar@abu.edu.ng",
        office: "Room 108",
        specialization: "Artificial Intelligence",
        courses_taught: ["COEN 401", "COEN 501"],
        order_index: 3
    },
    {
        id: "l4",
        full_name: "Engr. Musa Adamu",
        title: "Engr.",
        photo_url: "/images/lecturers/lec4.jpg",
        email: "madamu@abu.edu.ng",
        office: "Room 110",
        specialization: "Embedded Systems & Control",
        courses_taught: ["COEN 331", "COEN 337", "COEN 335"],
        order_index: 4
    },
];

export const MOCK_STAFF_GRID_HOD: Lecturer[] = [
    {
        id: "l5",
        full_name: "Dr. Aminu Bello",
        title: "Dr.",
        photo_url: "/images/lecturers/lec1.jpg",
        email: "abello@abu.edu.ng",
        office: "Room 301",
        specialization: "Microprocessors",
        courses_taught: ["COEN 401", "COEN 407"],
        order_index: 5
    },
    {
        id: "l6",
        full_name: "Engr. Bashir Suleiman",
        title: "Engr.",
        photo_url: "/images/lecturers/lec2.jpg",
        email: "bsuleiman@abu.edu.ng",
        office: "Room 205",
        specialization: "Control Engineering",
        courses_taught: ["COEN 331", "COEN 431"],
        order_index: 6
    },
    {
        id: "l7",
        full_name: "Dr. Hauwa Garba",
        title: "Dr.",
        photo_url: "/images/lecturers/lec3.jpg",
        email: "hgarba@abu.edu.ng",
        office: "Room 112",
        specialization: "Computer Networks",
        courses_taught: ["COEN 337", "COEN 537"],
        order_index: 7
    },
    {
        id: "l8",
        full_name: "Prof. Zainab Aliyu",
        title: "Prof.",
        photo_url: "/images/lecturers/lec4.jpg",
        email: "zaliyu@abu.edu.ng",
        office: "Room 103",
        specialization: "Information Security",
        courses_taught: ["COEN 535", "COEN 538"],
        order_index: 8
    },
];

// ── LEVEL COORDINATORS ─────────────────────────
export const MOCK_LEVEL_COORDINATORS: LevelCoordinator[] = [
    { id: "lc1", level: "100L", level_number: 100, full_name: "Engr. Musa Adamu", title: "Engr.", email: "madamu@abu.edu.ng", office: "Room 110", office_hours: "Mon & Wed, 10AM–12PM" },
    { id: "lc2", level: "200L", level_number: 200, full_name: "Dr. Hauwa Garba", title: "Dr.", email: "hgarba@abu.edu.ng", office: "Room 112", office_hours: "Tue & Thu, 2PM–4PM" },
    { id: "lc3", level: "300L", level_number: 300, full_name: "Engr. Bashir Suleiman", title: "Engr.", email: "bsuleiman@abu.edu.ng", office: "Room 205", office_hours: "Mon & Fri, 9AM–11AM" },
    { id: "lc4", level: "400L", level_number: 400, full_name: "Dr. Aminu Bello", title: "Dr.", email: "abello@abu.edu.ng", office: "Room 301", office_hours: "Wed & Fri, 1PM–3PM" },
    { id: "lc5", level: "500L", level_number: 500, full_name: "Prof. Zainab Aliyu", title: "Prof.", email: "zaliyu@abu.edu.ng", office: "Room 103", office_hours: "Tue & Thu, 10AM–12PM" },
];

// ── NEWS & EVENTS ──────────────────────────────
export const MOCK_NEWS_EVENTS: NewsEvent[] = [
    {
        id: "n1", title: "COESA Tech Week 2026 Kicks Off!", slug: "tech-week-2026",
        content: "<p>The annual COESA Tech Week begins next Monday with a series of workshops, hackathons, and guest lectures from industry leaders.</p>",
        cover_image_url: "/placeholders/news-1.jpg",
        excerpt: "The annual COESA Tech Week begins next Monday with workshops, hackathons, and guest lectures.",
        type: "event", event_date: "2026-03-15", event_venue: "CompEng Auditorium", event_time: "9:00 AM",
        is_featured: true, published: true, created_at: "2026-02-20T10:00:00Z", updated_at: "2026-02-20T10:00:00Z",
    },
    {
        id: "n2", title: "Python Bootcamp Registration Now Open", slug: "python-bootcamp-2026",
        content: "<p>Register now for the COESA Python Bootcamp 2026. Learn from scratch to advanced in 6 weeks.</p>",
        cover_image_url: "/placeholders/news-2.jpg",
        excerpt: "Register now for the COESA Python Bootcamp 2026. Learn from scratch to advanced in 6 weeks.",
        type: "news", is_featured: false, published: true, created_at: "2026-02-18T08:00:00Z", updated_at: "2026-02-18T08:00:00Z",
    },
    {
        id: "n3", title: "Orientation Week for New Students", slug: "orientation-2026",
        content: "<p>Welcome to the Department of Computer Engineering! Join us for orientation activities throughout the week.</p>",
        cover_image_url: "/placeholders/news-3.jpg",
        excerpt: "Welcome to the Department of Computer Engineering! Join us for orientation activities.",
        type: "event", event_date: "2026-04-01", event_venue: "Department Hall", event_time: "10:00 AM",
        is_featured: false, published: true, created_at: "2026-02-15T12:00:00Z", updated_at: "2026-02-15T12:00:00Z",
    },
];

// ── GALLERY ────────────────────────────────────
export const MOCK_GALLERY: GalleryImage[] = [
    { id: "g1", url: "/placeholders/gallery-1.jpg", caption: "Tech Week 2025 Opening Ceremony", album_id: "Tech Week 2025", width: 800, height: 600, order_index: 1, uploaded_at: "2025-11-01T00:00:00Z" },
    { id: "g2", url: "/placeholders/gallery-2.jpg", caption: "Hackathon Teams at Work", album_id: "Tech Week 2025", width: 800, height: 533, order_index: 2, uploaded_at: "2025-11-01T00:00:00Z" },
    { id: "g3", url: "/placeholders/gallery-3.jpg", caption: "Orientation Day 2025", album_id: "Orientation 2025", width: 800, height: 600, order_index: 3, uploaded_at: "2025-09-15T00:00:00Z" },
    { id: "g4", url: "/placeholders/gallery-4.jpg", caption: "Workshop on Embedded Systems", album_id: "Workshops", width: 800, height: 450, order_index: 4, uploaded_at: "2025-10-20T00:00:00Z" },
    { id: "g5", url: "/placeholders/gallery-5.jpg", caption: "COESA Sports Day", album_id: "Sports Day 2025", width: 800, height: 600, order_index: 5, uploaded_at: "2025-10-05T00:00:00Z" },
    { id: "g6", url: "/placeholders/gallery-6.jpg", caption: "Guest Lecture Series", album_id: "Tech Week 2025", width: 800, height: 533, order_index: 6, uploaded_at: "2025-11-02T00:00:00Z" },
    { id: "g7", url: "/placeholders/gallery-7.jpg", caption: "End of Year Dinner", album_id: "Social Events", width: 800, height: 600, order_index: 7, uploaded_at: "2025-07-15T00:00:00Z" },
    { id: "g8", url: "/placeholders/gallery-8.jpg", caption: "Community Outreach", album_id: "Social Events", width: 800, height: 450, order_index: 8, uploaded_at: "2025-06-10T00:00:00Z" },
];

// ── PROGRAMS ───────────────────────────────────
export const MOCK_PROGRAMS: Program[] = [
    {
        id: "p1", title: "Python Bootcamp 2026", subtitle: "From Zero to Python Hero",
        description: "A comprehensive 6-week bootcamp covering Python fundamentals, data structures, and web development.",
        start_date: "2026-03-01", end_date: "2026-04-12", duration_label: "6 Weeks",
        venue: "CompEng Computer Lab", mode: "Physical",
        enrollment_fee: { internal: 3000, external: 5000 },
        payment_details: { account: "1234567890", name: "COESA ABU Zaria", bank: "GTBank" },
        contact_phone: ["+234 800 000 0001"],
        slots_limited: true, is_active: true, created_at: "2026-02-01T00:00:00Z",
        cover_image_url: "/images/programs/1 image.png"
    },
    {
        id: "p2", title: "IoT & Embedded Systems", subtitle: "Building the Future",
        description: "Learn to design and build internet-connected devices using Arduino, Raspberry Pi, and ESP32.",
        start_date: "2026-05-15", end_date: "2026-06-30", duration_label: "8 Weeks",
        venue: "Hardware Lab", mode: "Hybrid",
        enrollment_fee: { internal: 5000, external: 8000 },
        payment_details: { account: "1234567890", name: "COESA ABU Zaria", bank: "GTBank" },
        contact_phone: ["+234 800 000 0002"],
        slots_limited: true, is_active: true, created_at: "2026-02-05T00:00:00Z",
        cover_image_url: "/images/programs/1 image.png"
    },
    {
        id: "p3", title: "AI & Machine Learning", subtitle: "Intelligence Reimagined",
        description: "An intensive dive into neural networks, computer vision, and NLP using PyTorch and TensorFlow.",
        start_date: "2026-08-10", end_date: "2026-09-20", duration_label: "6 Weeks",
        venue: "Main Auditorium", mode: "Online",
        enrollment_fee: { internal: 4000, external: 7000 },
        payment_details: { account: "1234567890", name: "COESA ABU Zaria", bank: "GTBank" },
        contact_phone: ["+234 800 000 0003"],
        slots_limited: true, is_active: true, created_at: "2026-02-10T00:00:00Z",
        cover_image_url: "/images/programs/1 image.png"
    },
];

// ── ALBUMS (derived) ───────────────────────────
export const MOCK_ALBUMS = Array.from(new Set(MOCK_GALLERY.map((img) => img.album_id))).map(id => ({ id, title: id }));

// ── COMMUNITY IMPACT ───────────────────────────
export const MOCK_COMMUNITY_IMPACT: CommunityItem[] = [
    {
        id: "ci1",
        title: "Technical Workshop 2024",
        description: "Hands-on session on disruptive engineering techniques and system design.",
        image_url: "/images/community/community.jpg",
        year: "2024",
        location: "Engineering Complex",
    },
    {
        id: "ci2",
        title: "Community Outreach",
        description: "Providing technical support and digital literacy programs to local communities.",
        image_url: "/images/community/community2.jpg",
        year: "2024",
        location: "Zaria City",
    },
    {
        id: "ci3",
        title: "Rural Water Project",
        description: "Designing and implementing sustainable water solutions for rural areas.",
        image_url: "/images/community/community3.jpg",
        year: "2023",
        location: "Kano State",
    },
    {
        id: "ci4",
        title: "Solar Installation",
        description: "Renewable energy project powering local schools with solar technology.",
        image_url: "/images/community/community4.jpg",
        year: "2024",
        location: "ABU Campus",
    },
    {
        id: "ci5",
        title: "Engineering Visitation",
        description: "Connecting students with industry professionals through site visits.",
        image_url: "/images/community/community5.jpg",
        year: "2024",
        location: "Digital Hub",
    },
    {
        id: "ci6",
        title: "Innovation Hackathon",
        description: "Annual competition solving local problems with engineering solutions.",
        image_url: "/images/community/community6.jpg",
        year: "2023",
        location: "CompEng Auditorium",
    },
];
