import { useEffect, useState } from "react";

import "../styles/Accommodation.css";

const ACCOMMODATION_PORTAL_KEY = "accommodation_portal_state_v2";
const ACCOMMODATION_ROOMS_KEY = "accommodation_rooms";

const ROOM_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1400",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1400",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1400",
  "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1400",
];

const HOTEL_SEED_DATA = [
  {
    id: "hotel-ratna",
    name: "Hotel Ratna",
    city: "Ayodhya",
    accent: "#f5c842",
    tagline: "Temple-side premium stay with multiple branches",
    summary: "3 branches, 28 rooms, 7 rooms under review",
    branches: [
      {
        id: "ratna-ghat-road",
        name: "Ghat Road Branch",
        location: "Ghat Road",
        landmark: "Near temple corridor",
        branchType: "Premium Tower",
        rooms: [
          ["101", "Standard Room", "2 pax", "1200", "AC", "Ground", "available", "approved", "Bright rooms for short pilgrim stays."],
          ["102", "Family Suite", "5 pax", "2200", "AC", "1st", "occupied", "approved", "Large suite for family groups."],
          ["103", "Deluxe Room", "3 pax", "1700", "AC", "1st", "cleaning", "approved", "Freshly cleaned and ready soon."],
          ["104", "VIP Cottage", "4 pax", "3600", "AC", "Garden", "available", "pending", "Premium cottage awaiting admin review."],
        ],
      },
      {
        id: "ratna-lakshman-park",
        name: "Lakshman Park Branch",
        location: "Lakshman Park",
        landmark: "Market side entrance",
        branchType: "City Wing",
        rooms: [
          ["201", "Standard Room", "2 pax", "1100", "Non AC", "2nd", "available", "approved", "Budget friendly city wing room."],
          ["202", "Family Suite", "6 pax", "2400", "AC", "2nd", "maintenance", "approved", "Maintenance in progress for a quick refresh."],
          ["203", "Deluxe Room", "3 pax", "1600", "AC", "3rd", "available", "rejected", "Rejected listing can be reopened after edits."],
        ],
      },
    ],
  },
  {
    id: "sacred-stay",
    name: "Sacred Stay",
    city: "Ayodhya",
    accent: "#3b82f6",
    tagline: "Comfort-first business and pilgrimage branch network",
    summary: "2 branches, 18 rooms, 4 rooms pending approval",
    branches: [
      {
        id: "sacred-near-ghat",
        name: "Near Ghat Branch",
        location: "Ram Path",
        landmark: "Opposite parking bay",
        branchType: "Courtyard Block",
        rooms: [
          ["11", "Executive Room", "2 pax", "1900", "AC", "1st", "available", "approved", "Quiet room with work desk and fast check-in."],
          ["12", "Family Suite", "4 pax", "2800", "AC", "1st", "occupied", "approved", "Family space with temple view."],
          ["13", "Standard Room", "2 pax", "1300", "Non AC", "Ground", "available", "pending", "Fresh listing waiting for approval."],
        ],
      },
      {
        id: "sacred-civil-lines",
        name: "Civil Lines Branch",
        location: "Civil Lines",
        landmark: "Business district",
        branchType: "Annex Block",
        rooms: [
          ["21", "Deluxe Room", "3 pax", "1750", "AC", "2nd", "cleaning", "approved", "Turnaround in progress after checkout."],
          ["22", "Executive Room", "2 pax", "2000", "AC", "2nd", "available", "approved", "Good fit for solo and business guests."],
        ],
      },
    ],
  },
  {
    id: "ganga-darshan",
    name: "Ganga Darshan",
    city: "Ayodhya",
    accent: "#16a34a",
    tagline: "River-facing stays with mixed room categories",
    summary: "3 branches, 24 rooms, 5 rooms pending review",
    branches: [
      {
        id: "ganga-west-wing",
        name: "West Wing",
        location: "River Road",
        landmark: "Near ghat steps",
        branchType: "River Block",
        rooms: [
          ["301", "Standard Room", "2 pax", "1150", "Non AC", "Ground", "available", "approved", "Simple rooms for short stays."],
          ["302", "Deluxe Room", "3 pax", "1650", "AC", "1st", "occupied", "approved", "Comfort with partial river view."],
          ["303", "Family Suite", "5 pax", "2500", "AC", "1st", "available", "approved", "Family-friendly suite with lounge."],
        ],
      },
      {
        id: "ganga-north-block",
        name: "North Block",
        location: "Haridwar Link",
        landmark: "Backside lane",
        branchType: "Heritage Block",
        rooms: [
          ["304", "VIP Cottage", "4 pax", "3800", "AC", "Garden", "maintenance", "approved", "Garden cottages under maintenance."],
          ["305", "Executive Room", "2 pax", "2050", "AC", "2nd", "available", "pending", "Pending approval for launch."],
        ],
      },
    ],
  },
  {
    id: "ram-path-inn",
    name: "Ram Path Inn",
    city: "Ayodhya",
    accent: "#c0392b",
    tagline: "Fast-turnover inn with compact room blocks",
    summary: "2 branches, 20 rooms, 3 rooms under review",
    branches: [
      {
        id: "rpi-ground-block",
        name: "Ground Block",
        location: "Ram Path",
        landmark: "Opposite taxi stand",
        branchType: "Main Block",
        rooms: [
          ["401", "Standard Room", "2 pax", "1000", "Non AC", "Ground", "available", "approved", "Ideal for budget pilgrims."],
          ["402", "Standard Room", "2 pax", "1000", "Non AC", "Ground", "occupied", "approved", "Short stay occupancy."],
          ["403", "Family Suite", "4 pax", "2100", "AC", "1st", "available", "approved", "Compact family suite."],
        ],
      },
      {
        id: "rpi-annex",
        name: "Annex Block",
        location: "West Gate",
        landmark: "Near parking",
        branchType: "Annex Wing",
        rooms: [
          ["404", "Deluxe Room", "3 pax", "1550", "AC", "2nd", "cleaning", "approved", "Fresh linen and turnover in progress."],
          ["405", "VIP Cottage", "4 pax", "3400", "AC", "Garden", "available", "pending", "Awaiting admin approval."],
        ],
      },
    ],
  },
  {
    id: "shri-janmabhoomi",
    name: "Shri Janmabhoomi",
    city: "Ayodhya",
    accent: "#8b5cf6",
    tagline: "Spacious family stays with temple access",
    summary: "3 branches, 30 rooms, 6 rooms pending review",
    branches: [
      {
        id: "sj-east-tower",
        name: "East Tower",
        location: "Temple Road",
        landmark: "Facing entrance arch",
        branchType: "Tower Block",
        rooms: [
          ["501", "Executive Room", "2 pax", "1950", "AC", "1st", "available", "approved", "Executive comfort with temple access."],
          ["502", "Family Suite", "6 pax", "2900", "AC", "2nd", "occupied", "approved", "Large suite for group families."],
          ["503", "VIP Cottage", "4 pax", "4200", "AC", "Garden", "available", "pending", "Premium cottage awaiting review."],
        ],
      },
      {
        id: "sj-west-block",
        name: "West Block",
        location: "Brahma Kund",
        landmark: "Near water promenade",
        branchType: "Courtyard Block",
        rooms: [
          ["504", "Standard Room", "2 pax", "1250", "Non AC", "Ground", "available", "approved", "Quiet and economical."],
          ["505", "Deluxe Room", "3 pax", "1750", "AC", "1st", "cleaning", "approved", "Cleaning queue room."],
        ],
      },
    ],
  },
  {
    id: "sita-residency",
    name: "Sita Residency",
    city: "Ayodhya",
    accent: "#ea580c",
    tagline: "Resident-style stay for longer pilgrim visits",
    summary: "2 branches, 16 rooms, 2 rooms pending review",
    branches: [
      {
        id: "sr-residence",
        name: "Residence Wing",
        location: "Civil Lines",
        landmark: "Near school junction",
        branchType: "Residential Wing",
        rooms: [
          ["601", "Standard Room", "2 pax", "1350", "AC", "Ground", "available", "approved", "Extended stay room."],
          ["602", "Executive Room", "2 pax", "1800", "AC", "1st", "occupied", "approved", "Business-style room."],
          ["603", "Family Suite", "4 pax", "2600", "AC", "1st", "available", "approved", "Family suite with kitchenette."],
        ],
      },
      {
        id: "sr-annex-lake",
        name: "Annex Lake",
        location: "Lake View Road",
        landmark: "Behind clinic",
        branchType: "Annex Block",
        rooms: [
          ["604", "Deluxe Room", "3 pax", "1700", "AC", "2nd", "available", "pending", "Pending approval for opening."],
          ["605", "VIP Cottage", "4 pax", "3900", "AC", "Garden", "maintenance", "approved", "Cottage refresh in progress."],
        ],
      },
    ],
  },
  {
    id: "prem-nivas",
    name: "Prem Nivas",
    city: "Ayodhya",
    accent: "#0ea5e9",
    tagline: "Blue-accented stay with clear room zoning",
    summary: "2 branches, 22 rooms, 4 rooms under review",
    branches: [
      {
        id: "pn-main-block",
        name: "Main Block",
        location: "Darshan Marg",
        landmark: "Temple parking side",
        branchType: "Main Wing",
        rooms: [
          ["701", "Standard Room", "2 pax", "1200", "Non AC", "Ground", "available", "approved", "Neat standard room."],
          ["702", "Deluxe Room", "3 pax", "1750", "AC", "1st", "occupied", "approved", "Popular deluxe room."],
          ["703", "Executive Room", "2 pax", "2100", "AC", "2nd", "available", "pending", "Ready after approval."],
        ],
      },
      {
        id: "pn-garden-villa",
        name: "Garden Villa",
        location: "Garden Road",
        landmark: "Rear gate",
        branchType: "Villa Block",
        rooms: [
          ["704", "Family Suite", "5 pax", "2700", "AC", "Garden", "available", "approved", "Garden-facing family suite."],
          ["705", "VIP Cottage", "4 pax", "4100", "AC", "Garden", "maintenance", "approved", "Maintenance scheduled."],
        ],
      },
    ],
  },
  {
    id: "radha-palace",
    name: "Radha Palace",
    city: "Ayodhya",
    accent: "#14b8a6",
    tagline: "Palace-style property with mixed wings",
    summary: "3 branches, 26 rooms, 5 rooms under review",
    branches: [
      {
        id: "rp-grand-wing",
        name: "Grand Wing",
        location: "Pilgrim Avenue",
        landmark: "Main square",
        branchType: "Grand Block",
        rooms: [
          ["801", "Executive Room", "2 pax", "1850", "AC", "1st", "available", "approved", "Elegant executive room."],
          ["802", "Family Suite", "6 pax", "3000", "AC", "2nd", "occupied", "approved", "Family suite for group stays."],
          ["803", "Deluxe Room", "3 pax", "1650", "AC", "1st", "cleaning", "approved", "Fresh turnover in progress."],
        ],
      },
      {
        id: "rp-east-block",
        name: "East Block",
        location: "Heritage Lane",
        landmark: "Near museum",
        branchType: "Heritage Wing",
        rooms: [
          ["804", "Standard Room", "2 pax", "1100", "Non AC", "Ground", "available", "approved", "Budget-friendly heritage room."],
          ["805", "VIP Cottage", "4 pax", "4000", "AC", "Garden", "available", "pending", "Pending review before launch."],
        ],
      },
    ],
  },
];

function createRoom(roomData, branchId, roomIndex) {
  const [num, roomType, capacity, price, acType, floor, status, reviewStatus, description] = roomData;
  return {
    id: `${branchId}-room-${roomIndex}`,
    num,
    roomType,
    capacity,
    price,
    acType,
    floor,
    status,
    reviewStatus,
    description,
    image: resolveRoomImage(roomType, num),
  };
}

const DEFAULT_HOTELS = HOTEL_SEED_DATA.map((hotel) => ({
  ...hotel,
  branches: hotel.branches.map((branch) => ({
    ...branch,
    rooms: branch.rooms.map((room, index) => createRoom(room, branch.id, index)),
  })),
}));

const ROOM_BADGE_LABEL = {
  available: "Available",
  occupied: "Occupied",
  cleaning: "Cleaning",
  maintenance: "Maintenance",
};

const ROOM_BADGE_CLASS = {
  available: "badge-blue",
  occupied: "badge-green",
  cleaning: "badge-soft",
  maintenance: "badge-warn",
};

const TABS = ["Properties", "Manual Rooms", "Bookings", "Pricing", "Export"];

const EXPORT_OPTIONS = [
  {
    label: "PDF Report",
    icon: "ti ti-file-text",
    desc: "Create a branded occupancy and revenue snapshot.",
  },
  {
    label: "Excel Sheet",
    icon: "ti ti-table",
    desc: "Download room, branch, and booking data in a sheet.",
  },
  {
    label: "Print View",
    icon: "ti ti-printer",
    desc: "Open a clean print layout for meetings and audits.",
  },
  {
    label: "Daily Summary",
    icon: "ti ti-report-analytics",
    desc: "Export the branch summary with occupancy trends.",
  },
];

const BOOKING_ROWS = [
  {
    guest: "Rajesh Singh",
    room: "101",
    branch: "Ghat Road Branch",
    hotel: "Hotel Ratna",
    stay: "14 May - 17 May",
    status: "Checked In",
    color: "badge-green",
  },
  {
    guest: "Pradeep Das",
    room: "104",
    branch: "Ghat Road Branch",
    hotel: "Hotel Ratna",
    stay: "14 May - 16 May",
    status: "Pending",
    color: "badge-soft",
  },
  {
    guest: "Meena Joshi",
    room: "11",
    branch: "Near Ghat Branch",
    hotel: "Sacred Stay",
    stay: "13 May - 18 May",
    status: "Staying",
    color: "badge-blue",
  },
  {
    guest: "Anil Kumar",
    room: "22",
    branch: "Civil Lines Branch",
    hotel: "Sacred Stay",
    stay: "15 May - 19 May",
    status: "Checked Out",
    color: "badge-warn",
  },
];

const PRICING_ROWS = [
  {
    icon: "ti ti-home",
    label: "Standard Room",
    sub: "2 pax - AC / Non AC",
    price: "1200",
  },
  {
    icon: "ti ti-users",
    label: "Family Suite",
    sub: "4-6 pax - group stays",
    price: "2400",
  },
  {
    icon: "ti ti-crown",
    label: "VIP Cottage",
    sub: "Premium stay with quiet access",
    price: "3600",
  },
  {
    icon: "ti ti-bell",
    label: "Executive Room",
    sub: "Business class comfort",
    price: "1900",
  },
];

function safeParse(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function getRoomSeed(value = 0) {
  const digits = String(value ?? "").replace(/[^0-9]/g, "");
  const seed = Number(digits || value || 0);
  return Number.isFinite(seed) ? Math.abs(seed) : 0;
}

function resolveRoomImage(roomType, seed = 0) {
  const name = String(roomType || "").toLowerCase();
  const baseIndex = name.includes("vip")
    ? 2
    : name.includes("family")
      ? 1
      : name.includes("executive")
        ? 3
        : name.includes("deluxe")
          ? 4
          : 0;
  const offset = getRoomSeed(seed);
  return ROOM_IMAGE_POOL[(baseIndex + offset) % ROOM_IMAGE_POOL.length];
}

function cloneHotels(source) {
  return source.map((hotel) => ({
    ...hotel,
    branches: (hotel.branches || []).map((branch) => ({
      ...branch,
      rooms: (branch.rooms || []).map((room) => ({ ...room })),
    })),
  }));
}

function mergeSeedHotels(seedHotels, storedHotels) {
  const storedById = new Map((storedHotels || []).map((hotel) => [hotel.id, hotel]));
  const mergedHotels = seedHotels.map((seedHotel) => {
    const storedHotel = storedById.get(seedHotel.id);
    if (!storedHotel) {
      return {
        ...seedHotel,
        branches: seedHotel.branches.map((branch) => ({
          ...branch,
          rooms: branch.rooms.map((room) => ({ ...room })),
        })),
      };
    }

    const storedBranches = new Map((storedHotel.branches || []).map((branch) => [branch.id, branch]));
    return {
      ...seedHotel,
      ...storedHotel,
      branches: seedHotel.branches.map((seedBranch) => {
        const storedBranch = storedBranches.get(seedBranch.id);
        if (!storedBranch) {
          return {
            ...seedBranch,
            rooms: seedBranch.rooms.map((room) => ({ ...room })),
          };
        }

        const storedRooms = new Map((storedBranch.rooms || []).map((room) => [room.id, room]));
        return {
          ...seedBranch,
          ...storedBranch,
          rooms: seedBranch.rooms.map((seedRoom) => {
            const storedRoom = storedRooms.get(seedRoom.id);
            return storedRoom ? { ...seedRoom, ...storedRoom } : { ...seedRoom };
          }),
        };
      }),
    };
  });

  const seedIds = new Set(seedHotels.map((hotel) => hotel.id));
  const extraHotels = (storedHotels || [])
    .filter((hotel) => !seedIds.has(hotel.id))
    .map((hotel) => ({
      ...hotel,
      branches: (hotel.branches || []).map((branch) => ({
        ...branch,
        rooms: (branch.rooms || []).map((room) => ({ ...room })),
      })),
    }));

  return [...mergedHotels, ...extraHotels];
}

function normalizeHotels(rawHotels) {
  const hotels = Array.isArray(rawHotels) ? rawHotels : [];
  return hotels.map((hotel, hotelIndex) => {
    const hotelId = hotel.id || `hotel-${hotelIndex}`;
    return {
      ...hotel,
      id: hotelId,
      branches: (hotel.branches || []).map((branch, branchIndex) => {
        const branchId = branch.id || `${hotelId}-branch-${branchIndex}`;
        return {
          ...branch,
          id: branchId,
          rooms: (branch.rooms || []).map((room, roomIndex) => ({
            ...room,
            id: room.id || `${branchId}-room-${roomIndex}`,
            reviewStatus: room.reviewStatus || "approved",
            status: String(room.status || "available").toLowerCase(),
            roomType: room.roomType || "Standard Room",
            capacity: room.capacity || "",
            price: String(room.price || ""),
            acType: room.acType || "AC",
            floor: room.floor || "",
            description:
              room.description || "Comfortable spiritual stay near temple area.",
            image: room.image || resolveRoomImage(room.roomType, room.num || roomIndex),
          })),
        };
      }),
    };
  });
}

function loadAccommodationPortal() {
  const savedHotels = safeParse(ACCOMMODATION_PORTAL_KEY, null);
  if (savedHotels && Array.isArray(savedHotels)) {
    const normalizedSaved = normalizeHotels(savedHotels);
    return mergeSeedHotels(cloneHotels(DEFAULT_HOTELS), normalizedSaved);
  }

  const hotels = cloneHotels(DEFAULT_HOTELS);
  const legacyRooms = safeParse(ACCOMMODATION_ROOMS_KEY, []);

  if (Array.isArray(legacyRooms) && legacyRooms.length) {
    const firstHotel = hotels[0];
    const defaultBranch = firstHotel?.branches[0];
    if (defaultBranch) {
      defaultBranch.rooms = [
        ...defaultBranch.rooms,
        ...legacyRooms.map((room, index) => ({
          id: room.id || `legacy-room-${index}`,
          num: room.roomNumber || room.roomNo || `L-${index + 1}`,
          roomType: room.roomType || "Standard Room",
          capacity: room.capacity || room.beds || "",
          price: String(room.price || ""),
          acType: room.acType || "AC",
          floor: room.floor || "",
          status: String(room.status || "available").toLowerCase(),
          reviewStatus: "pending",
          description: room.description || "Imported from legacy room entry.",
          image: room.image || resolveRoomImage(room.roomType, room.roomNumber || index),
        })),
      ];
    }
  }

  return normalizeHotels(hotels);
}

function calcBranchStats(branch) {
  const rooms = branch?.rooms || [];
  return {
    total: rooms.length,
    available: rooms.filter((room) => room.status === "available").length,
    occupied: rooms.filter((room) => room.status === "occupied").length,
    pending: rooms.filter((room) => room.reviewStatus === "pending").length,
    rejected: rooms.filter((room) => room.reviewStatus === "rejected").length,
  };
}

function createEmptyRoomDraft(hotel = null) {
  return {
    branchId: hotel?.branches?.[0]?.id || "",
    num: "",
    roomType: "Standard Room",
    capacity: "2 pax",
    price: "",
    acType: "AC",
    floor: "Ground",
    status: "available",
    reviewStatus: "pending",
    description: "",
  };
}

function formatRoomStatus(room) {
  if (room.reviewStatus === "pending") return "Pending Review";
  if (room.reviewStatus === "rejected") return "Rejected";
  return ROOM_BADGE_LABEL[room.status] || room.status;
}

function getInitialState() {
  const hotels = loadAccommodationPortal();
  return {
    hotels,
    selectedHotelId: "",
    selectedRoomId: "",
  };
}

export default function Accommodation() {
  const initialState = getInitialState();
  const [hotels, setHotels] = useState(initialState.hotels);
  const [selectedHotelId, setSelectedHotelId] = useState(initialState.selectedHotelId);
  const [selectedRoomId, setSelectedRoomId] = useState(initialState.selectedRoomId);
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [editingPrice, setEditingPrice] = useState(false);
  const [pricingData, setPricingData] = useState(PRICING_ROWS);
  const [bookingFilter, setBookingFilter] = useState("All");
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [roomDraft, setRoomDraft] = useState(createEmptyRoomDraft());
  const [manualRooms, setManualRooms] = useState(() => safeParse(ACCOMMODATION_ROOMS_KEY, []));

  useEffect(() => {
    localStorage.setItem(ACCOMMODATION_PORTAL_KEY, JSON.stringify(hotels));
  }, [hotels]);

  useEffect(() => {
    localStorage.setItem(ACCOMMODATION_ROOMS_KEY, JSON.stringify(manualRooms));
  }, [manualRooms]);

  useEffect(() => {
    if (!selectedHotelId) return;

    const currentHotel = hotels.find((hotel) => hotel.id === selectedHotelId);
    if (!currentHotel) {
      setSelectedHotelId("");
      setSelectedRoomId("");
      return;
    }

    const currentRoomExists = currentHotel.branches.some((branch) =>
      branch.rooms.some((room) => room.id === selectedRoomId)
    );
    if (!currentRoomExists) {
      setSelectedRoomId(currentHotel.branches[0]?.rooms[0]?.id || "");
    }
  }, [hotels, selectedHotelId, selectedRoomId]);

  const selectedHotel = selectedHotelId
    ? hotels.find((hotel) => hotel.id === selectedHotelId) || null
    : null;
  const selectedRoom = selectedHotel?.branches
    .flatMap((branch) => branch.rooms)
    .find((room) => room.id === selectedRoomId) ||
    null;
  const selectedBranch = selectedHotel?.branches.find((branch) => branch.id === selectedBranchId) || null;

  useEffect(() => {
    if (!selectedHotelId) return;

    const currentHotel = hotels.find((hotel) => hotel.id === selectedHotelId);
    if (!currentHotel) return;

    const currentBranchExists = currentHotel.branches.some((branch) => branch.id === selectedBranchId);
    if (!currentBranchExists) {
      setSelectedBranchId(currentHotel.branches[0]?.id || "");
    }
  }, [hotels, selectedHotelId, selectedBranchId]);

  const allRooms = hotels.flatMap((hotel) =>
    hotel.branches.flatMap((branch) => branch.rooms)
  );

  const totalRooms = allRooms.length;
  const occupiedRooms = allRooms.filter((room) => room.status === "occupied").length;
  const availableRooms = allRooms.filter((room) => room.status === "available").length;
  const pendingRooms = allRooms.filter((room) => room.reviewStatus === "pending").length;

  const filteredBookings = BOOKING_ROWS.filter((booking) => {
    if (bookingFilter === "All") return true;
    return booking.status === bookingFilter;
  });

  function persistHotels(nextHotels) {
    setHotels(nextHotels);
  }
  function updateManualRoomField(id, field, value) {
    setManualRooms((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function acceptManualRoom(roomId) {
    const room = manualRooms.find((r) => r.id === roomId);
    if (!room) return;

    // Create a new hotel (with a single branch) from the submission data
    const now = Date.now();
    const slugify = (s) => String(s || "manual-hotel").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const hotelId = `${slugify(room.hotelName || room.hotel || 'manual')}-${now}`;
    const branchId = `${hotelId}-branch-0`;

    const newRoom = {
      id: `${branchId}-room-${now}`,
      num: room.roomNumber || room.num || room.roomNo || `M-${now}`,
      roomType: room.roomType || room.roomTypeName || "Standard Room",
      capacity: room.capacity || room.beds || "",
      price: String(room.price || ""),
      acType: room.acType || "AC",
      floor: room.floor || "",
      status: room.status || "available",
      reviewStatus: "approved",
      description: room.description || "Manual entry approved by admin",
      image: room.image || resolveRoomImage(room.roomType || room.roomTypeName || "", room.roomNumber || room.num || 0),
    };

    const newHotel = {
      id: hotelId,
      name: room.hotelName || room.hotel || `Manual Hotel ${now}`,
      city: room.city || "",
      accent: room.accent || "#f5c842",
      tagline: room.tagline || room.summary || `Added from manual submission` ,
      summary: room.summary || `1 branch, 1 room`,
      branches: [
        {
          id: branchId,
          name: room.branchName || room.branch || "Manual Branch",
          location: room.location || "",
          landmark: room.landmark || "",
          branchType: room.branchType || "Manual Block",
          rooms: [newRoom],
        },
      ],
    };

    const nextHotels = [...hotels, newHotel];
    persistHotels(nextHotels);
    setManualRooms((prev) => prev.filter((r) => r.id !== roomId));

    // Open the newly created hotel and room
    setSelectedHotelId(newHotel.id);
    setSelectedBranchId(branchId);
    setSelectedRoomId(newRoom.id);
  }

  function rejectManualRoom(roomId) {
    // mark as rejected or simply remove from pending list
    setManualRooms((prev) => prev.filter((r) => r.id !== roomId));
  }

  function updateSelectedRoom(updater) {
    if (!selectedHotel || !selectedRoom) return;

    const nextHotels = hotels.map((hotel) => {
      if (hotel.id !== selectedHotel.id) return hotel;
      return {
        ...hotel,
        branches: hotel.branches.map((branch) => {
          return {
            ...branch,
            rooms: branch.rooms.map((room) => {
              if (room.id !== selectedRoom.id) return room;
              return updater(room);
            }),
          };
        }),
      };
    });

    persistHotels(nextHotels);
  }

  function selectHotel(hotelId) {
    const nextHotel = hotels.find((hotel) => hotel.id === hotelId);
    if (!nextHotel) return;

    setSelectedHotelId(nextHotel.id);
    setSelectedBranchId(nextHotel.branches[0]?.id || "");
    setSelectedRoomId(nextHotel.branches[0]?.rooms[0]?.id || "");
    setShowAddRoomForm(false);
  }

  function openRoom(roomId) {
    setSelectedRoomId(roomId);

    const roomMatch = hotels
      .flatMap((hotel) =>
        hotel.branches.flatMap((branch) =>
          branch.rooms.map((room) => ({
            hotelId: hotel.id,
            branchId: branch.id,
            roomId: room.id,
          }))
        )
      )
      .find((entry) => entry.roomId === roomId);

    if (roomMatch) {
      setSelectedHotelId(roomMatch.hotelId);
      setSelectedBranchId(roomMatch.branchId);
    }
  }

  function selectBranch(branchId) {
    if (!selectedHotel) return;
    const nextBranch = selectedHotel.branches.find((branch) => branch.id === branchId);
    if (!nextBranch) return;

    setSelectedBranchId(nextBranch.id);
    setSelectedRoomId(nextBranch.rooms[0]?.id || "");
    setShowAddRoomForm(false);
  }

  function handleExport(kind) {
    const hotelName = selectedHotel?.name || "Accommodation";
    if (kind === "Print") {
      window.print();
      return;
    }
    alert(`${kind} export prepared for ${hotelName}.`);
  }

  function handleAddRoom() {
    if (!selectedHotel) {
      setActiveTab(0);
      alert("Select a hotel first, then add the room inside its branch view.");
      return;
    }

    const branchId = selectedBranch?.id || selectedHotel.branches[0]?.id || "";
    setRoomDraft({
      ...createEmptyRoomDraft(selectedHotel),
      branchId,
    });
    setShowAddRoomForm(true);
  }

  function handleAddRoomSubmit() {
    if (!selectedHotel) return;

    const nextBranchId = roomDraft.branchId || selectedBranch?.id || selectedHotel.branches[0]?.id;
    const nextBranch = selectedHotel.branches.find((branch) => branch.id === nextBranchId);
    if (!nextBranch || !roomDraft.num.trim()) {
      alert("Please choose a branch and enter a room number.");
      return;
    }

    const newRoom = {
      id: `${nextBranch.id}-room-${Date.now()}`,
      num: roomDraft.num.trim(),
      roomType: roomDraft.roomType.trim() || "Standard Room",
      capacity: roomDraft.capacity.trim() || "2 pax",
      price: String(roomDraft.price || ""),
      acType: roomDraft.acType.trim() || "AC",
      floor: roomDraft.floor.trim() || "Ground",
      status: roomDraft.status,
      reviewStatus: roomDraft.reviewStatus,
      description:
        roomDraft.description.trim() || "New room added by admin and waiting for review.",
      image: resolveRoomImage(roomDraft.roomType, roomDraft.num),
    };

    const nextHotels = hotels.map((hotel) => {
      if (hotel.id !== selectedHotel.id) return hotel;
      return {
        ...hotel,
        branches: hotel.branches.map((branch) => {
          if (branch.id !== nextBranch.id) return branch;
          return {
            ...branch,
            rooms: [...branch.rooms, newRoom],
          };
        }),
      };
    });

    persistHotels(nextHotels);
    setSelectedHotelId(selectedHotel.id);
    setSelectedBranchId(nextBranch.id);
    setSelectedRoomId(newRoom.id);
    setRoomDraft(createEmptyRoomDraft(selectedHotel));
    setShowAddRoomForm(false);
  }

  const selectedBranchRooms = selectedBranch?.rooms || [];

  return (
    <div className="accommodation-page">
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#f5c842" }} />
          <div className="kpi-icon" style={{ background: "#fef4c9" }}>
            <i className="ti ti-building" style={{ color: "#b5860d" }} />
          </div>
          <div className="kpi-label">Total Rooms</div>
          <div className="kpi-value">{totalRooms}</div>
          <div className="kpi-sub">Across all branches</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#c0392b" }} />
          <div className="kpi-icon" style={{ background: "#fee2e2" }}>
            <i className="ti ti-home-filled" style={{ color: "#b91c1c" }} />
          </div>
          <div className="kpi-label">Occupied</div>
          <div className="kpi-value">{occupiedRooms}</div>
          <div className="kpi-sub">Active occupancy</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#16a34a" }} />
          <div className="kpi-icon" style={{ background: "#dcfce7" }}>
            <i className="ti ti-door" style={{ color: "#15803d" }} />
          </div>
          <div className="kpi-label">Available</div>
          <div className="kpi-value">{availableRooms}</div>
          <div className="kpi-sub">{pendingRooms} pending review</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-accent" style={{ background: "#3b82f6" }} />
          <div className="kpi-icon" style={{ background: "#dbeafe" }}>
            <i className="ti ti-map-pin" style={{ color: "#1d4ed8" }} />
          </div>
          <div className="kpi-label">Branches</div>
          <div className="kpi-value">{hotels.reduce((sum, hotel) => sum + hotel.branches.length, 0)}</div>
          <div className="kpi-sub">Hotel locations in network</div>
        </div>
      </div>

      <div className="accommodation-hero card">
        <div className="accommodation-hero-copy">
          <div className="eyebrow">Admin portal / Accommodation workflow</div>
          <h1>Accommodation</h1>
          <p>
            Select a hotel first, then open its branches and room grid in the next step.
            Pricing, approvals, and exports stay in their own tabs so the workflow stays clean.
          </p>
        </div>
        <div className="accommodation-hero-actions">
          <button className="btn-outline" onClick={() => setActiveTab(TABS.indexOf('Bookings'))}>
            Bookings
          </button>
          <button className="btn-outline" onClick={() => setActiveTab(TABS.indexOf('Pricing'))}>
            Pricing
          </button>
          <button className="btn-yellow" onClick={handleAddRoom}>
            + Add Room
          </button>
        </div>

      </div>

      <div className="tabs-actions">
        <div className="tab-bar" style={{ marginBottom: 0 }}>
          {TABS.map((tab, index) => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === index ? "active" : ""}`}
              onClick={() => {
                setActiveTab(index);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

      </div>

      {activeTab === TABS.indexOf('Manual Rooms') && (
        <div className="workflow-grid">
          <aside className="workflow-sidebar">
            <div className="card">
              <div className="card-head">
                <div className="card-title">Manual Room Submissions</div>
                <div className="card-subtitle">Vendor-submitted rooms awaiting admin approval.</div>
              </div>

              <div className="branch-block-stack">
                {manualRooms && manualRooms.length ? (
                  manualRooms.map((r) => (
                    <div key={r.id} className="branch-block-card">
                      <div className="branch-card-top">
                        <div>
                          <div className="branch-name">{r.roomNumber || r.num || r.roomNo || 'Room'}</div>
                          <div className="branch-meta">{r.roomType || r.roomTypeName || 'Standard Room'}</div>
                        </div>
                        <div style={{display: 'flex', gap: 8}}>
                          <button className="btn-outline" onClick={() => rejectManualRoom(r.id)}>Reject</button>
                          <button className="btn-yellow" onClick={() => acceptManualRoom(r.id)}>Approve</button>
                        </div>
                      </div>
                      <div style={{marginTop:8,color:'#6e645a',fontSize:13}}>{r.description || ''}</div>
                      <div style={{marginTop:10,fontSize:12,color:'#8d847a'}}>Price: {r.price || '-'}</div>

                      <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}> 
                        <div style={{minWidth:160}}>
                          <label className="form-label">Submission Hotel</label>
                          <div style={{padding:8,background:'#fff',borderRadius:8,border:'1px solid #eee'}}>
                            {r.hotelName || r.hotelId || 'Unknown Hotel'}
                          </div>
                        </div>

                        {/* Admin target selects removed: approvals will create a separate hotel from the submission */}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-room-state">No manual submissions found.</div>
                )}
              </div>
            </div>
          </aside>

          <section className="workflow-main">
            <div className="card">
              <div className="card-title">Manual Rooms</div>
              <div className="card-subtitle">Approve vendor rooms to add to hotel listings and make them visible to tourists.</div>
            </div>
          </section>

          {/* Inspector removed for Manual Rooms tab - submissions show full details in the sidebar card */}
        </div>
      )}

      {activeTab === 0 && (
        <div className="workflow-grid">
          <aside className="workflow-sidebar">
            <div className="card">
              <div className="card-head">
                <div className="card-title">Hotels</div>
                <div className="card-subtitle">Choose one hotel to open its branch workflow.</div>
              </div>

              <div className="hotel-stack">
                {hotels.map((hotel) => {
                  const totalHotelRooms = hotel.branches.reduce(
                    (sum, branch) => sum + branch.rooms.length,
                    0
                  );
                  const isActive = hotel.id === selectedHotel?.id;
                  return (
                    <button
                      key={hotel.id}
                      className={`hotel-card ${isActive ? "active" : ""}`}
                      onClick={() => selectHotel(hotel.id)}
                    >
                      <div className="hotel-card-top">
                        <div>
                          <div className="hotel-name">{hotel.name}</div>
                          <div className="hotel-meta">{hotel.city} - {hotel.branches.length} branches</div>
                        </div>
                        <span className="hotel-chip">{totalHotelRooms} rooms</span>
                      </div>
                      <p className="hotel-tagline">{hotel.tagline}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>

          <section className="workflow-main">
            {!selectedHotel ? (
              <div className="card empty-room-state">
                Pick a hotel from the left panel to open the next step with its branches and room grid.
              </div>
            ) : (
              <>
                <div className="card hotel-overview">
                  <div className="hotel-overview-copy">
                    <div className="eyebrow">Selected hotel</div>
                    <h2>{selectedHotel.name}</h2>
                    <p>{selectedHotel.summary}</p>
                  </div>

                  <div className="hotel-overview-stats">
                    <div className="overview-stat">
                      <span>City</span>
                      <strong>{selectedHotel.city}</strong>
                    </div>
                    <div className="overview-stat">
                      <span>Branches</span>
                      <strong>{selectedHotel.branches.length}</strong>
                    </div>
                    <div className="overview-stat">
                      <span>Rooms</span>
                      <strong>
                        {selectedHotel.branches.reduce((sum, branch) => sum + branch.rooms.length, 0)}
                      </strong>
                    </div>
                  </div>
                </div>
                <div className="card workflow-stage-card">
                  <div className="card-head workflow-stage-head">
                    <div>
                      <div className="card-title">Branches</div>
                      <div className="card-subtitle">Pick one branch to open its room grid.</div>
                    </div>
                    <div className="branch-block-pills">
                      <span className="branch-chip">{selectedHotel.branches.length} branches</span>
                    </div>
                  </div>

                  <div className="branch-selector-grid">
                    {selectedHotel.branches.map((branch) => {
                      const stats = calcBranchStats(branch);
                      const isActive = branch.id === selectedBranch?.id;
                      return (
                        <button
                          key={branch.id}
                          className={`branch-card ${isActive ? "active" : ""}`}
                          onClick={() => selectBranch(branch.id)}
                        >
                          <div className="branch-card-top">
                            <div>
                              <div className="branch-name">{branch.name}</div>
                              <div className="branch-meta">{branch.location} - {branch.landmark}</div>
                            </div>
                            <span className="branch-status">{branch.branchType}</span>
                          </div>
                          <div className="branch-footer">
                            <span>{stats.total} rooms</span>
                            <span>{stats.available} available</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="card selected-branch-card">
                  <div className="card-head">
                    <div>
                      <div className="card-title">{selectedBranch?.name || "Branch details"}</div>
                      <div className="card-subtitle">
                        {selectedBranch ? `${selectedBranch.location} - ${selectedBranch.landmark}` : "Choose a branch to continue."}
                      </div>
                    </div>
                    <div className="branch-block-pills">
                      <span className="branch-chip">{selectedBranch?.branchType || "Branch"}</span>
                      <span className="branch-chip branch-chip-soft">{selectedBranchRooms.length} rooms</span>
                    </div>
                  </div>

                  

                  <div className="room-grid room-grid-modern room-grid-tight selected-room-grid">
                    {selectedBranchRooms.map((room) => {
                      const isSelected = room.id === selectedRoom?.id;
                      return (
                        <button
                          key={room.id}
                          className={`room-card-modern ${ROOM_BADGE_CLASS[room.status] || ""} ${isSelected ? "active" : ""}`}
                          onClick={() => openRoom(room.id)}
                        >
                          <div className="room-card-head">
                            <span className="room-number">{room.num}</span>
                            <span className={`badge ${ROOM_BADGE_CLASS[room.status] || "badge-soft"}`}>
                              {formatRoomStatus(room)}
                            </span>
                          </div>

                          <div className="room-card-type">{room.roomType}</div>
                          <div className="room-card-meta">{room.capacity} - {room.acType}</div>
                          <div className="room-card-floor">{room.floor || "Floor not set"}</div>
                          <div className="room-card-price">Rs. {room.price || "-"}</div>
                          {room.reviewStatus !== "approved" && (
                            <div className="room-card-note">
                              {room.reviewStatus === "pending" ? "Awaiting approval" : "Rejected by admin"}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </section>

          <aside className="workflow-inspector">
            <div className="card">
              <div className="card-head">
                <div className="card-title">Room inspector</div>
              </div>

              {selectedRoom ? (
                <div className="inspector-panel">
                  <img
                    src={selectedRoom.image || resolveRoomImage(selectedRoom.roomType, selectedRoom.num)}
                    alt=""
                    className="inspector-image"
                  />
                  <div className="inspector-room-no">Room {selectedRoom.num}</div>
                  <div className="inspector-room-type">{selectedRoom.roomType}</div>
                  <div className="inspector-tags">
                    <span>{selectedRoom.capacity}</span>
                    <span>{selectedRoom.acType}</span>
                    <span>{selectedRoom.floor || "Floor N/A"}</span>
                  </div>
                  <p className="inspector-desc">{selectedRoom.description}</p>

                  <label className="form-label">Price</label>
                  <input
                    className="price-input price-input-wide"
                    value={selectedRoom.price}
                    onChange={(e) =>
                      updateSelectedRoom((room) => ({
                        ...room,
                        price: e.target.value,
                      }))
                    }
                  />

                  <label className="form-label">Occupancy status</label>
                  <select
                    className="form-select"
                    value={selectedRoom.status}
                    onChange={(e) =>
                      updateSelectedRoom((room) => ({
                        ...room,
                        status: e.target.value,
                      }))
                    }
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                  </select>

                  <div className="inspector-actions">
                    <button
                      className="btn-outline"
                      onClick={() =>
                        updateSelectedRoom((room) => ({
                          ...room,
                          reviewStatus: "approved",
                          status: room.status === "maintenance" ? "available" : room.status,
                        }))
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn-outline"
                      onClick={() =>
                        updateSelectedRoom((room) => ({
                          ...room,
                          reviewStatus: "rejected",
                          status: "maintenance",
                        }))
                      }
                    >
                      Reject
                    </button>
                  </div>

                  <div className="room-detail-footer">
                    Review: {selectedRoom.reviewStatus}
                  </div>
                </div>
              ) : selectedHotel ? (
                <div className="empty-inspector">Select a room from any block to edit its price, review status, or occupancy state.</div>
              ) : (
                <div className="empty-inspector">Choose a hotel first to load the room blocks and inspector.</div>
              )}
            </div>

          </aside>
        </div>
      )}

      {activeTab === TABS.indexOf('Bookings') && (
        <div className="card accommodation-panel">
          <div className="card-head">
            <div className="card-title">Bookings</div>
            <div className="tab-filter-row">
              {["All", "Checked In", "Staying", "Pending", "Checked Out"].map((item) => (
                <button
                  key={item}
                  className={`filter-pill ${bookingFilter === item ? "active" : ""}`}
                  onClick={() => setBookingFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="booking-board">
            {filteredBookings.map((booking) => (
              <div className="booking-card" key={`${booking.guest}-${booking.room}`}>
                <div className="booking-main">
                  <div className="booking-name">{booking.guest}</div>
                  <div className="booking-meta">
                    Room {booking.room} - {booking.branch} - {booking.hotel}
                  </div>
                  <div className="booking-meta light">{booking.stay}</div>
                </div>
                <span className={`badge ${booking.color}`}>{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === TABS.indexOf('Pricing') && (
        <div className="pricing-workspace">
          <div className="card pricing-hero">
            <div>
              <div className="eyebrow">Pricing studio</div>
              <h2>Room type pricing</h2>
              <p>Keep the brand tone consistent while editing the base rates for every room class.</p>
            </div>
            <button className="btn-outline" onClick={() => setEditingPrice((value) => !value)}>
              {editingPrice ? "Finish edits" : "Edit pricing"}
            </button>
          </div>

          <div className="pricing-grid">
            {pricingData.map((item, index) => (
              <div className="pricing-card" key={item.label}>
                <div className="pricing-card-top">
                  <div className="pricing-icon">
                    <i className={`ti ${item.icon}`} />
                  </div>
                  <div>
                    <div className="pricing-title">{item.label}</div>
                    <div className="pricing-sub">{item.sub}</div>
                  </div>
                </div>

                {editingPrice ? (
                  <input
                    className="price-input price-input-wide"
                    value={item.price}
                    onChange={(e) => {
                      const updated = [...pricingData];
                      updated[index] = { ...updated[index], price: e.target.value };
                      setPricingData(updated);
                    }}
                  />
                ) : (
                  <div className="pricing-value">Rs. {item.price}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === TABS.indexOf('Export') && (
        <div className="export-workspace">
          <div className="card export-hero">
            <div>
              <div className="eyebrow">Export center</div>
              <h2>Share polished reports</h2>
              <p>
                Generate occupancy, room, and booking exports without the clutter from the old grid-first layout.
              </p>
            </div>
              <div className="export-summary">
                <div>
                  <span>Selected hotel</span>
                  <strong>{selectedHotel?.name || "-"}</strong>
                </div>
                <div>
                  <span>Primary block</span>
                  <strong>{selectedHotel?.branches[0]?.name || "-"}</strong>
                </div>
              </div>
            </div>

          <div className="export-grid">
            {EXPORT_OPTIONS.map((item) => (
              <div className="export-card" key={item.label}>
                <div className="export-card-top">
                  <div className="export-icon">
                    <i className={item.icon} />
                  </div>
                  <div>
                    <div className="export-title">{item.label}</div>
                    <div className="export-sub">{item.desc}</div>
                  </div>
                </div>
                <button className="btn-outline export-btn" onClick={() => handleExport(item.label)}>
                  Generate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddRoomForm && (
        <div className="add-room-modal-overlay" onClick={() => setShowAddRoomForm(false)}>
          <div className="add-room-modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-subtitle add-room-panel-title">
              Add a new room into {selectedBranch?.name || "the selected branch"}.
            </div>
            <div className="accommodation-form-grid">
              <div>
                <label className="form-label">Branch</label>
                <select
                  className="form-select"
                  value={roomDraft.branchId}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, branchId: e.target.value }))}
                >
                  {(selectedHotel?.branches || []).map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Room number</label>
                <input
                  className="form-input"
                  value={roomDraft.num}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, num: e.target.value }))}
                  placeholder="e.g. 208"
                />
              </div>
              <div>
                <label className="form-label">Room type</label>
                <input
                  className="form-input"
                  value={roomDraft.roomType}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, roomType: e.target.value }))}
                  placeholder="Standard Room"
                />
              </div>
              <div>
                <label className="form-label">Capacity</label>
                <input
                  className="form-input"
                  value={roomDraft.capacity}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, capacity: e.target.value }))}
                  placeholder="2 pax"
                />
              </div>
              <div>
                <label className="form-label">Price</label>
                <input
                  className="form-input"
                  value={roomDraft.price}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, price: e.target.value }))}
                  placeholder="1200"
                />
              </div>
              <div>
                <label className="form-label">Floor</label>
                <input
                  className="form-input"
                  value={roomDraft.floor}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, floor: e.target.value }))}
                  placeholder="Ground"
                />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={roomDraft.status}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, status: e.target.value }))}
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="form-label">Review</label>
                <select
                  className="form-select"
                  value={roomDraft.reviewStatus}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, reviewStatus: e.target.value }))}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-span-full">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input add-room-textarea"
                  rows={3}
                  value={roomDraft.description}
                  onChange={(e) => setRoomDraft((draft) => ({ ...draft, description: e.target.value }))}
                  placeholder="Short room note for the inspector"
                />
              </div>
            </div>

            <div className="form-actions" style={{marginTop:12}}>
              <button type="button" className="btn-outline" onClick={() => setShowAddRoomForm(false)}>
                Cancel
              </button>
              <button type="button" className="btn-yellow" onClick={handleAddRoomSubmit}>
                Save Room
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
