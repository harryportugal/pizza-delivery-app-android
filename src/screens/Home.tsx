import { ShoppingBag, Search, MapPin, ChevronDown, User } from 'lucide-react'
import { motion } from 'motion/react'

const FILTERS = ['Todas', 'Calabresa', 'Siciliana', 'Marguerita']

const POPULAR_PIZZAS = [
  {
    id: 'custom',
    title: 'Monte sua Pizza',
    tags: ['Do seu jeito', 'Metades'],
    price: '52',
    cents: ',00',
    image: 'https://pngimg.com/d/pizza_PNG44077.png',
    imageClass: '',
    color: 'bg-orange-500',
    borderColor: 'border-orange-400/50',
    shadowColor: 'shadow-orange-500/30',
    textColor: 'text-orange-500'
  },
  {
    id: 'marguerita',
    title: 'Marguerita',
    tags: ['Tomate', 'Manjericão', 'Queijo'],
    price: '52',
    cents: ',00',
    image: 'https://png.pngtree.com/png-clipart/20250215/original/pngtree-classic-margherita-pizza-with-fresh-basil-png-image_19846487.png',
    imageClass: '',
    color: 'bg-red-500',
    borderColor: 'border-red-400/50',
    shadowColor: 'shadow-red-500/30',
    textColor: 'text-red-500'
  },
  {
    id: 'camarao',
    title: 'Camarão',
    tags: ['Camarão', 'Alho', 'Queijo'],
    price: '66',
    cents: ',99',
    image: 'https://png.pngtree.com/png-clipart/20250130/original/pngtree-classic-shrimp-pizza-loaded-with-garlic-and-cheese-png-image_20109389.png',
    imageClass: '',
    color: 'bg-orange-500',
    borderColor: 'border-orange-400/50',
    shadowColor: 'shadow-orange-500/30',
    textColor: 'text-orange-500'
  }
]

export function Home({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-full bg-[#f8fafc] pt-14 px-6 pb-36"
    >
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-100 bg-zinc-200 flex items-center justify-center text-zinc-400">
          <User size={24} />
        </div>
        <div className="flex flex-col items-center cursor-pointer group">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Entregando em</span>
          <div className="flex items-center gap-1 text-zinc-900 font-bold text-sm group-hover:text-orange-500 transition-colors">
            <MapPin size={16} className="text-orange-500" strokeWidth={2.5} />
            <span>Vera Cruz, BA</span>
            <ChevronDown size={14} className="text-slate-400" strokeWidth={2.5} />
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('cart')}
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 relative hover:bg-slate-50 transition-colors"
        >
          <ShoppingBag size={20} className="text-zinc-900" strokeWidth={2.5} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
        </motion.button>
      </motion.header>

      {/* Search */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative mb-8 group"
      >
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400 group-focus-within:text-orange-500 transition-colors" strokeWidth={2.5} />
        </div>
        <input 
          type="text" 
          placeholder="Busque sua pizza favorita..." 
          className="w-full bg-white py-4 pl-14 pr-4 rounded-full shadow-sm border border-slate-100 text-sm font-semibold text-zinc-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/30 transition-all"
        />
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6"
      >
        {FILTERS.map((filter, i) => (
          <motion.button 
            key={filter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`whitespace-nowrap px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
              i === 0 
                ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 scale-100' 
                : 'bg-white text-slate-500 shadow-sm border border-slate-100 hover:bg-slate-50 hover:text-zinc-900 hover:scale-105'
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      {/* Main Card */}
      <div className="flex justify-between items-end mb-2 mt-8">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Populares</h2>
        <button className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">Ver Tudo</button>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-12 pt-28 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
        {POPULAR_PIZZAS.map((pizza, index) => (
          <motion.div 
            key={pizza.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('details')}
            className="relative cursor-pointer group min-w-[280px] w-[85vw] max-w-[320px] snap-center shrink-0"
          >
            {/* Pizza Image floating above the card */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 z-20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
              <img 
                src={pizza.image} 
                alt={pizza.title} 
                className={`w-full h-full object-contain ${pizza.imageClass}`}
                style={{ filter: 'drop-shadow(0 25px 20px rgba(0,0,0,0.35))' }}
              />
            </div>
            
            {/* Card Background with Concave Top */}
            <div className={`${pizza.color} rounded-[2.5rem] pt-32 pb-6 px-5 shadow-2xl ${pizza.shadowColor} relative overflow-hidden border ${pizza.borderColor}`}>
               {/* Concave mask effect using a pseudo-element */}
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#f8fafc] rounded-b-[3rem] shadow-inner"></div>
               
              <div className="text-center relative z-10 mt-2">
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight">{pizza.title}</h3>
                <div className="flex justify-center flex-wrap gap-2 mb-6">
                  {pizza.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-white/20 text-white rounded-full text-xs font-bold backdrop-blur-md border border-white/10">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center bg-white/10 p-1.5 pl-5 rounded-full backdrop-blur-sm border border-white/10">
                  <span className="text-2xl font-black text-white tracking-tight">R${pizza.price}<span className="text-lg opacity-80">{pizza.cents}</span></span>
                  <button className={`bg-white ${pizza.textColor} px-6 py-3.5 rounded-full text-sm font-extrabold shadow-lg hover:bg-slate-50 transition-colors`}>
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

