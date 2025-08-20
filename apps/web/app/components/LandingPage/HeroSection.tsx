    "use client";

    import { Book, FileText, Quote, Receipt, Image as ImageIcon } from "lucide-react";
    import { motion } from "framer-motion";
    import { useEffect, useMemo, useState } from "react";

    const VASE_PATH =
    "M110 18 \
    Q150 10 190 18 \
    Q182 35 174 52 \
    Q166 70 164 90 \
    Q160 125 178 165 \
    Q192 195 212 230 \
    Q232 268 212 305 \
    Q195 337 165 358 \
    Q150 369 150 385 \
    Q150 369 135 358 \
    Q105 337 88 305 \
    Q68 268 88 230 \
    Q108 195 122 165 \
    Q140 125 136 90 \
    Q134 70 126 52 \
    Q118 35 110 18 Z";

    const CAP_PATH = `
    M112 18 
    Q150 2 188 18
    Q150 -10 112 18 Z
    `;

    const ICONS = [Book, FileText, Receipt, ImageIcon, Quote];

    type CollectedItem = {
    id: number;
    startX: number;
    finalX: number;
    finalY: number;
    size: number;
    iconIndex: number;
    hasLanded: boolean;
    };

    function rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
    }

    function createFixedPositions(): { x: number; y: number }[] {
    const positions = [
        { x: 150, y: 350 },
        { x: 110, y: 330 },
        { x: 190, y: 330 },
        { x: 125, y: 310 },
        { x: 175, y: 310 },
        { x: 150, y: 290 },
        { x: 95, y: 315 },
        { x: 205, y: 315 },
        { x: 115, y: 270 },
        { x: 185, y: 270 },
        { x: 150, y: 250 },
        { x: 130, y: 230 },
        { x: 170, y: 230 },
        { x: 150, y: 210 },
        { x: 150, y: 190 },
    ];
    return positions;
    }

    export default function HeroSection() {
    const fixedPositions = useMemo(createFixedPositions, []);
    const [collectedItems, setCollectedItems] = useState<CollectedItem[]>([]);
    const [nextItemIndex, setNextItemIndex] = useState(0);
    const [capOpen, setCapOpen] = useState(true);

    useEffect(() => {
        if (collectedItems.length < 15) {
        let delay: number;
        if (collectedItems.length < 10) {
            delay = 50 + collectedItems.length * 150;
        } else {
            delay = 200 + (collectedItems.length - 10) * 400;
        }

        const timer = setTimeout(() => {
            const position = fixedPositions[collectedItems.length];
            const newItem: CollectedItem = {
            id: nextItemIndex,
            startX: 150 + rand(-6, 6),
            finalX: position?.x !== undefined ? position.x + rand(-2, 2) : 150 + rand(-2, 2),
            finalY: position?.y !== undefined ? position.y + rand(-1, 1) : 350 + rand(-1, 1),
            size: rand(22, 28),
            iconIndex: Math.floor(rand(0, ICONS.length)),
            hasLanded: false,
            };
            setCollectedItems((prev) => [...prev, newItem]);
            setNextItemIndex((prev) => prev + 1);
        }, delay);
        return () => clearTimeout(timer);
        } else {
        setTimeout(() => setCapOpen(false), 2000);
        }
    }, [collectedItems.length, fixedPositions, nextItemIndex]);

    return (
        <section className="w-full flex flex-col items-center gap-8  mt-20">
        <div className="text-center  ">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight"><span className="text-red-400">Fast</span> <span className="text-green-400">. Private .</span> <span className="text-purple-400">Enduring.</span> </h1>
            <p className="mt-3 text-muted-foreground">
            A transparent vessel that collects books, notes, photos, quotes &amp; more.
            </p>
        </div>

        <div className="relative mt-10 ml-20 ">
            <svg viewBox="0 0 440 400" className="w-[390px] h-[546px] overflow-visible" aria-label="Vessel animation">
            <defs>
                <linearGradient id="capStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9aa3ad" stopOpacity="0.55" />
                <stop offset="50%" stopColor="#e9eef3" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#9aa3ad" stopOpacity="0.55" />
                </linearGradient>
            </defs>

            {collectedItems.map((item) => {
                const Icon = ICONS[item.iconIndex];
                return (
                <motion.g
                    key={item.id}
                    initial={{ x: item.startX, y: -60, opacity: 0, rotate: rand(-15, 15) }}
                    animate={{ x: item.finalX, y: item.finalY, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    onAnimationComplete={() =>
                    setCollectedItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, hasLanded: true } : i)))
                    }
                >
                    <svg x={-item.size / 2} y={-item.size / 2} width={item.size} height={item.size} viewBox="0 0 24 24">
                    {Icon ? <Icon className="w-6 h-6" /> : null}
                    </svg>
                </motion.g>
                );
            })}

            <g style={{ transform: "scale(1.3)", transformOrigin: "150px 200px" }}>
                <path d={VASE_PATH} fill="none" stroke="#9aa3ad" strokeWidth="3.2" />

                <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "150px 18px" }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={capOpen ? { x: 80, y: -50, rotate: -18, opacity: 1 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 1.05, ease: "easeInOut" }}
                pointerEvents="none"
                >
                <path d={CAP_PATH} fill="transparent" stroke="url(#capStroke)" strokeWidth="3" />
                <path d="M130 2 A10 10 0 0 1 170 2" fill="none" stroke="url(#capStroke)" strokeWidth="2" opacity={0.95} />
                </motion.g>
            </g>
            </svg>
        </div>
        </section>
    );
    }