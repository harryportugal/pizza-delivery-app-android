import { ChevronLeft, Bell, Check, Plus, Minus, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useMemo } from 'react'
import { useCartStore } from '../store/useCartStore'

const SIZES = [
  { id: 'media', name: 'Média', price: 52, maxFlavors: 2 },
  { id: 'familia', name: 'Família', price: 72, maxFlavors: 4 }
]

const FREE_FLAVORS = [
  'Mussarela', 'Calabresa', 'Frango com Catupiry', 'Bacon', 
  'Marguerita', '3 Queijos', 'Pitstop', 'Chocolate com Oreo'
]

const PREMIUM_FLAVORS = [
  { name: 'Atum', addon: 9.99 }, 
  { name: 'Costela Acebolada', addon: 12.00 }, 
  { name: 'Camarão à Moda', addon: 14.99 }
]

const BORDERS = [
  { name: 'Sem Borda', price: 0 }, 
  { name: 'Catupiry', price: 12 }, 
  { name: 'Cream Cheese', price: 15 }, 
  { name: 'Cheddar', price: 20 }
]

export function Details({ onBack, onAddToCart }: { onBack: () => void, onAddToCart: () => void }) {
  const [sizeId, setSizeId] = useState('media')
  const [flavors, setFlavors] = useState<string[]>([])
  const [border, setBorder] = useState('Sem Borda')
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const addToCart = useCartStore(state => state.addToCart)
  
  const currentSize = useMemo(() => SIZES.find(s => s.id === sizeId)!, [sizeId])

  const handleSizeChange = (newSizeId: string) => {
    setSizeId(newSizeId)
    const newSize = SIZES.find(s => s.id === newSizeId)!
    if (flavors.length > newSize.maxFlavors) {
      setFlavors(flavors.slice(0, newSize.maxFlavors))
    }
  }

  const toggleFlavor = (flavorName: string) => {
    if (flavors.includes(flavorName)) {
      setFlavors(flavors.filter(f => f !== flavorName))
    } else {
      if (flavors.length < currentSize.maxFlavors) {
        setFlavors([...flavors, flavorName])
      }
    }
  }

  const totalPrice = useMemo(() => {
    const sizePrice = currentSize.price;
    const borderPrice = BORDERS.find(b => b.name === border)?.price || 0;
    const premiumAddons = flavors.reduce((total, flavorName) => {
      const premium = PREMIUM_FLAVORS.find(p => p.name === flavorName);
      return total + (premium ? premium.addon : 0);
    }, 0);
    return (sizePrice + borderPrice + premiumAddons) * quantity;
  }, [currentSize, border, flavors, quantity]);

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const handleAddToCart = () => {
    const sizePrice = currentSize.price;
    const borderPrice = BORDERS.find(b => b.name === border)?.price || 0;
    const premiumAddons = flavors.reduce((total, flavorName) => {
      const premium = PREMIUM_FLAVORS.find(p => p.name === flavorName);
      return total + (premium ? premium.addon : 0);
    }, 0);

    addToCart({
      name: `Pizza ${currentSize.name}`,
      size: currentSize.name,
      flavors,
      border,
      basePrice: sizePrice,
      extrasPrice: borderPrice + premiumAddons,
      totalPrice: sizePrice + borderPrice + premiumAddons,
      quantity
    });

    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
      onAddToCart();
    }, 800);
  }

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-zinc-950 relative font-sans">
      {/* Header */}
      <header className="flex justify-between items-center pt-14 px-6 absolute top-0 left-0 right-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-slate-100 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <button className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-slate-100 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-50 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
          <Bell size={18} strokeWidth={2.5} />
        </button>
      </header>

      {/* Top Image Section (Matching Design) */}
      <div className="pt-28 pb-10 flex flex-col items-center relative shrink-0">
        {/* Background Pattern (Simulated with a subtle radial gradient for depth) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="relative w-[280px] h-[280px]">
          {/* Pan */}
          <div className="absolute inset-0 bg-[#222222] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-[6px] border-[#333333]"></div>
          
          {/* Pizza Image */}
          <motion.img 
            key={sizeId}
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            src="https://pngimg.com/d/pizza_PNG44077.png" 
            alt="Pizza" 
            className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-contain drop-shadow-xl"
          />

          {/* Size Buttons hugging the pan */}
          <button
            onClick={() => handleSizeChange('media')}
            className={`absolute -bottom-2 left-12 w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shadow-lg transition-all duration-300 z-10 ${
              sizeId === 'media' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 scale-110' : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800'
            }`}
          >
            M
          </button>
          <button
            onClick={() => handleSizeChange('familia')}
            className={`absolute -bottom-2 right-12 w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shadow-lg transition-all duration-300 z-10 ${
              sizeId === 'familia' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 scale-110' : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800'
            }`}
          >
            F
          </button>
        </div>
      </div>

      {/* Bottom Card (Configurator) */}
      <div className="flex-1 bg-white dark:bg-zinc-900 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-slate-100 dark:border-zinc-800 px-6 pt-8 pb-48 overflow-y-auto relative z-20">
        
        {/* Flavors Selector */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50">Sabores</h3>
            <span className="text-sm font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 rounded-full">
              {flavors.length} / {currentSize.maxFlavors}
            </span>
          </div>
          
          <div className="flex flex-col gap-2">
            {/* Free Flavors */}
            {FREE_FLAVORS.map(flavor => {
              const isSelected = flavors.includes(flavor);
              const isDisabled = !isSelected && flavors.length >= currentSize.maxFlavors;
              return (
                <label key={flavor} className={`flex items-center p-3 rounded-2xl transition-all cursor-pointer border border-transparent ${isSelected ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20' : 'bg-slate-50 dark:bg-zinc-950 border-slate-100 dark:border-zinc-800'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={isSelected} 
                    disabled={isDisabled}
                    onChange={() => toggleFlavor(flavor)} 
                  />
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${isSelected ? 'bg-orange-500' : 'bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-700'}`}>
                    {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`font-semibold flex-1 ${isSelected ? 'text-orange-500' : 'text-zinc-700 dark:text-zinc-300'}`}>{flavor}</span>
                </label>
              )
            })}
            
            {/* Premium Flavors */}
            {PREMIUM_FLAVORS.map(flavor => {
              const isSelected = flavors.includes(flavor.name);
              const isDisabled = !isSelected && flavors.length >= currentSize.maxFlavors;
              return (
                <label key={flavor.name} className={`flex items-center p-3 rounded-2xl transition-all cursor-pointer border border-transparent ${isSelected ? 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20' : 'bg-slate-50 dark:bg-zinc-950 border-slate-100 dark:border-zinc-800'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={isSelected} 
                    disabled={isDisabled}
                    onChange={() => toggleFlavor(flavor.name)} 
                  />
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${isSelected ? 'bg-orange-500' : 'bg-white dark:bg-zinc-900 border-2 border-slate-200 dark:border-zinc-700'}`}>
                    {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className={`font-semibold flex-1 ${isSelected ? 'text-orange-500' : 'text-zinc-700 dark:text-zinc-300'}`}>{flavor.name}</span>
                  <span className="text-zinc-500 dark:text-zinc-400 font-bold text-sm">+ R$ {flavor.addon.toFixed(2).replace('.', ',')}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Border Selector */}
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 mb-4">Borda</h3>
          <div className="flex flex-wrap gap-2">
            {BORDERS.map(b => (
              <button
                key={b.name}
                onClick={() => setBorder(b.name)}
                className={`px-5 py-3 rounded-full font-bold text-sm transition-all border ${
                  border === b.name 
                    ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-md border-zinc-900 dark:border-zinc-50' 
                    : 'bg-slate-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-slate-100 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                {b.name} {b.price > 0 && <span className={border === b.name ? 'text-slate-300 dark:text-zinc-500' : 'text-zinc-400 dark:text-zinc-500'}> (+R${b.price})</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action (Matching the vibe of the design's bottom bar) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 p-6 pb-8 z-40 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.08)] border-t border-slate-100 dark:border-zinc-800">
        
        {/* Free Delivery & Add to Cart row */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-slate-100 dark:bg-zinc-800 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-700">
            <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">Entrega Grátis</span>
          </div>
          <button
            disabled={flavors.length === 0 || isAdding}
            onClick={handleAddToCart}
            className={`px-8 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
              isAdding 
                ? 'bg-green-500 text-white shadow-green-500/30'
                : flavors.length > 0
                  ? 'bg-orange-500 text-white shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 active:scale-95'
                  : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 cursor-not-allowed shadow-none'
            }`}
          >
            {isAdding ? (
              <>
                <CheckCircle2 size={18} />
                Adicionado!
              </>
            ) : (
              'Adicionar à sacola'
            )}
          </button>
        </div>

        {/* Title, Price, Quantity row */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">Monte sua Pizza</h3>
            <div className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-1 flex items-center">
              <span className="text-orange-500 text-lg mr-1">R$</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={totalPrice}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {formatPrice(totalPrice)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Quantity selector */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-zinc-950 rounded-full p-1.5 border border-slate-100 dark:border-zinc-800">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors"
            >
              <Minus size={16} strokeWidth={3} />
            </button>
            <span className="font-bold text-zinc-900 dark:text-zinc-50 w-4 text-center">{quantity.toString().padStart(2, '0')}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30 hover:bg-orange-600 transition-colors"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}


