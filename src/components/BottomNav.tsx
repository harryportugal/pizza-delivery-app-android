import { Home, MapPinned, ShoppingBag, User } from 'lucide-react'
import { motion } from 'motion/react'

const TABS = [
  { id: 'home', icon: Home },
  { id: 'tracking', icon: MapPinned },
  { id: 'cart', icon: ShoppingBag },
  { id: 'profile', icon: User },
]

// Mathematically perfect centers for 4 buttons in a 328px container
const CENTERS = [41, 123, 205, 287]

export function BottomNav({ activeTab, onChange }: { activeTab: string, onChange: (id: string) => void }) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[328px] h-[88px] z-50">
      {/* Exact Scalloped SVG Background */}
      <svg 
        viewBox="0 0 328 88" 
        className="absolute inset-0 w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.3)] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <path 
          d="
            M 41 3 
            C 55 3, 68 17, 82 17 
            C 96 17, 109 3, 123 3 
            C 137 3, 150 17, 164 17 
            C 178 17, 191 3, 205 3 
            C 219 3, 232 17, 246 17 
            C 260 17, 273 3, 287 3 
            A 41 41 0 0 1 287 85 
            C 273 85, 260 71, 246 71 
            C 232 71, 219 85, 205 85 
            C 191 85, 178 71, 164 71 
            C 150 71, 137 85, 123 85 
            C 109 85, 96 71, 82 71 
            C 68 71, 55 85, 41 85 
            A 41 41 0 0 1 41 3 
            Z
          " 
          fill="#18181b" 
          stroke="#3f3f46" 
          strokeWidth="2" 
        />
      </svg>

      {/* Buttons Container */}
      <div className="absolute inset-0 w-full h-full">
        {TABS.map((tab, index) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          const leftPos = `${CENTERS[index]}px`

          return (
            <motion.button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-[44px] -translate-y-1/2 -translate-x-1/2 w-[56px] h-[56px] rounded-full flex items-center justify-center tap-highlight-transparent transition-transform group"
              style={{ left: leftPos }}
            >
              {/* Inactive White Background */}
              <div className="absolute inset-0 rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-105" />
              
              {/* Active Orange Background (Animated) */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-bg"
                  className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(249,115,22,0.4)]"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              
              {/* Icon */}
              <Icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2} 
                fill={isActive ? "currentColor" : "none"}
                className={`relative z-10 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-zinc-600 scale-100'}`} 
              />
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}


