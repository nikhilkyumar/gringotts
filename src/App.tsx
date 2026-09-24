
import Calculator from "./components/calculator/Calculator";

function VaultKeeper() {
  return (
    <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
      {/* Soft glow */}
      <div className="absolute inset-1 rounded-full bg-[#ad8750]/10 blur-xl" />

      <svg
        viewBox="0 0 120 120"
        className="relative h-full w-full drop-shadow-[0_8px_10px_rgba(42,35,25,0.2)]"
        aria-label="Gringotts vault keeper"
      >
        <defs>
          {/* Skin shading */}
          <radialGradient id="skin" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#e0a17f" />
            <stop offset="70%" stopColor="#c17b60" />
            <stop offset="100%" stopColor="#a96550" />
          </radialGradient>

          {/* Coat */}
          <linearGradient id="coat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#40594e" />
            <stop offset="100%" stopColor="#253b34" />
          </linearGradient>

          {/* Hat */}
          <linearGradient id="hat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#40584e" />
            <stop offset="100%" stopColor="#253b34" />
          </linearGradient>

          {/* Gold */}
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8b96f" />
            <stop offset="50%" stopColor="#ad8750" />
            <stop offset="100%" stopColor="#8d6d3e" />
          </linearGradient>
        </defs>

        {/* ================= HAT ================= */}

        <path
          d="M35 39 Q39 18 60 9 Q81 18 85 39 Q60 31 35 39Z"
          fill="url(#hat)"
          stroke="#263a33"
          strokeWidth="2"
        />

        {/* Hat brim */}
        <ellipse
          cx="60"
          cy="39"
          rx="29"
          ry="7"
          fill="#30483e"
          stroke="#8d6d3e"
          strokeWidth="1.5"
        />

        {/* Hat band */}
        <path
          d="M34 35 Q60 29 86 35 L85 42 Q60 36 35 42Z"
          fill="url(#gold)"
        />

        {/* ================= EARS ================= */}

        <path
          d="M39 51 Q28 42 24 40 Q24 52 31 63 Q35 60 42 58Z"
          fill="url(#skin)"
          stroke="#70483b"
          strokeWidth="1.5"
        />

        <path
          d="M81 51 Q92 42 96 40 Q96 52 89 63 Q85 60 78 58Z"
          fill="url(#skin)"
          stroke="#70483b"
          strokeWidth="1.5"
        />

        {/* Ear details */}
        <path
          d="M31 48 Q34 51 36 56"
          fill="none"
          stroke="#9d604e"
          strokeWidth="1"
        />

        <path
          d="M89 48 Q86 51 84 56"
          fill="none"
          stroke="#9d604e"
          strokeWidth="1"
        />

        {/* ================= NECK ================= */}

        <path
          d="M50 79 L50 94 Q60 101 70 94 L70 79Z"
          fill="#b8755b"
        />

        {/* ================= FACE ================= */}

        <ellipse
          cx="60"
          cy="61"
          rx="24"
          ry="27"
          fill="url(#skin)"
          stroke="#70483b"
          strokeWidth="1.5"
        />

        {/* ================= HAIR ================= */}

        <path
          d="
            M37 53
            Q39 35 52 35
            Q60 31 68 35
            Q81 36 83 53
            Q76 47 68 47
            Q59 43 51 47
            Q43 47 37 53Z
          "
          fill="#302722"
        />

        {/* Side hair */}
        <path
          d="M38 49 Q34 59 39 68 L44 60 L43 50Z"
          fill="#302722"
        />

        <path
          d="M82 49 Q86 59 81 68 L76 60 L77 50Z"
          fill="#302722"
        />

        {/* ================= EYEBROWS ================= */}

        <path
          d="M45 55 Q51 51 56 55"
          fill="none"
          stroke="#5d4036"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M64 55 Q69 51 75 55"
          fill="none"
          stroke="#5d4036"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ================= EYES ================= */}

        <ellipse cx="51" cy="59" rx="4" ry="3" fill="#f4ead9" />
        <ellipse cx="69" cy="59" rx="4" ry="3" fill="#f4ead9" />

        <circle cx="51" cy="59" r="2" fill="#292720" />
        <circle cx="69" cy="59" r="2" fill="#292720" />

        {/* Eye highlights */}
        <circle cx="51.7" cy="58.3" r="0.6" fill="#ffffff" />
        <circle cx="69.7" cy="58.3" r="0.6" fill="#ffffff" />

        {/* ================= NOSE ================= */}

        <path
          d="M60 59 Q57 68 56 70 Q60 72 64 70"
          fill="none"
          stroke="#8b5647"
          strokeWidth="1.7"
          strokeLinecap="round"
        />

        {/* ================= MOUSTACHE ================= */}

        <path
          d="
            M59 72
            Q54 70 50 73
            Q54 78 60 75
            Q66 78 70 73
            Q66 70 61 72Z
          "
          fill="#302722"
        />

        {/* Mouth */}
        <path
          d="M55 78 Q60 80 65 78"
          fill="none"
          stroke="#6e4037"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ================= COAT ================= */}

        <path
          d="
            M35 91
            Q44 84 50 84
            L60 96
            L70 84
            Q76 85 85 91
            Q91 99 95 118
            H25
            Q29 99 35 91Z
          "
          fill="url(#coat)"
          stroke="#263a33"
          strokeWidth="1.5"
        />

        {/* Shirt */}
        <path
          d="M50 85 L60 98 L70 85 L66 82 L60 89 L54 82Z"
          fill="#f4eddf"
        />

        {/* Tie */}
        <path
          d="M57 91 L63 91 L65 108 L60 113 L55 108Z"
          fill="url(#gold)"
        />

        {/* Tie highlight */}
        <path
          d="M59 93 L61 93 L62 106"
          fill="none"
          stroke="#e3ca8b"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Buttons */}
        <circle cx="60" cy="99" r="1.7" fill="#d9b96d" />
        <circle cx="60" cy="107" r="1.7" fill="#d9b96d" />

        {/* Shoulder details */}
        <path
          d="M36 94 Q42 91 47 91"
          fill="none"
          stroke="#8d6d3e"
          strokeWidth="1"
          opacity="0.7"
        />

        <path
          d="M84 94 Q78 91 73 91"
          fill="none"
          stroke="#8d6d3e"
          strokeWidth="1"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#eee8da]">
      {/* ================= HEADER ================= */}

      <header className="relative border-b border-[#d9d0bd] bg-[#f2ead8]">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#ad8750]/[0.06] blur-3xl" />

          <div className="absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#31483f]/[0.05] blur-3xl" />
        </div>

        {/* Header content */}
        <div className="relative mx-auto flex max-w-6xl items-center px-5 py-4 sm:px-6 sm:py-5 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <VaultKeeper />

            <div>
              <h1 className="gringotts-display text-3xl leading-none text-[#292720] sm:text-4xl">
                Gringotts
              </h1>

              <p className="mt-1 text-xs font-medium tracking-wide text-[#777267] sm:text-sm">
                SIP & Corpus Calculator
              </p>
            </div>
          </div>
        </div>

        <div className="gringotts-divider" />
      </header>

      {/* ================= CALCULATOR ================= */}

      <main>
        <Calculator />
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#d9d0bd] bg-[#e6decd] px-5 py-7">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <p className="text-xs text-[#777267]">
            © {new Date().getFullYear()} Gringotts. Plan wisely. Grow steadily.
          </p>

          {/* Links */}
          <div className="flex items-center gap-2">
            {/* GitHub */}
            <a
              href="https://github.com/nikhilkyumar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub repository"
              className="group flex items-center gap-2 rounded-full border border-[#cfc4ad] bg-[#f2ead8] px-4 py-2 text-xs font-medium text-[#4d4a42] transition-all duration-200 hover:border-[#ad8750] hover:bg-[#fbf7ec] hover:text-[#292720]"
            >
              <span
                aria-hidden="true"
                className="text-sm transition-transform duration-200 group-hover:scale-110"
              >
                ⌘
              </span>

              GitHub
            </a>

            {/* Contact */}
            <a
              href="mailto:nikhilkumar.cout@gmail.com"
              aria-label="Contact Gringotts"
              className="group flex items-center gap-2 rounded-full border border-[#cfc4ad] bg-[#f2ead8] px-4 py-2 text-xs font-medium text-[#4d4a42] transition-all duration-200 hover:border-[#ad8750] hover:bg-[#fbf7ec] hover:text-[#292720]"
            >
              <span
                aria-hidden="true"
                className="text-sm transition-transform duration-200 group-hover:scale-110"
              >
                ✉
              </span>

              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

