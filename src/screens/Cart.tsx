import { useState } from 'react'
import { ChevronLeft, Trash2, Minus, Plus, Tag, ShoppingBag, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { Drawer } from 'vaul'
import { useCartStore } from '../store/useCartStore'

const drinks = [
  { id: 'coca350', name: 'Coca Cola Lata', price: 6.00, image: 'https://pngimg.com/d/cocacola_PNG22.png' },
  { id: 'guarana1l', name: 'Guaraná Antarctica 1L', price: 9.99, image: 'https://www.guaranaantarctica.com.br/sites/g/files/wnfebl12341/files/styles/webp/public/paragraphs/product_size/2021-05/1l.png.webp?itok=ZbVZG7qD' },
  { id: 'agua', name: 'Água sem gás', price: 3.00, image: 'https://pngimg.com/d/water_bottle_PNG98953.png' }
];

export function Cart({ onBack, onCheckout }: { onBack: () => void, onCheckout: () => void }) {
  const { items, updateQuantity, removeFromCart, clearCart, addToCart } = useCartStore()
  const [addedDrinks, setAddedDrinks] = useState<Record<string, boolean>>({})
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const subtotal = items.reduce((total, item) => total + (item.totalPrice * item.quantity), 0)
  
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const handleAddDrink = (drink: typeof drinks[0]) => {
    addToCart({
      type: 'drink',
      name: drink.name,
      basePrice: drink.price,
      totalPrice: drink.price,
      quantity: 1,
      image: drink.image
    });
    
    setAddedDrinks(prev => ({ ...prev, [drink.id]: true }));
    
    setTimeout(() => {
      setAddedDrinks(prev => ({ ...prev, [drink.id]: false }));
    }, 2000);
  };

  const handleFinalCheckout = () => {
    setIsDrawerOpen(false);
    onCheckout();
  };

  return (
    <div className="min-h-full bg-slate-50 pb-56">
      {/* Header */}
      <header className="flex justify-between items-center pt-14 px-6 pb-6 bg-slate-50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-zinc-900 font-bold text-lg tracking-wide">Sua Sacola</h1>
        {items.length > 0 ? (
          <button onClick={clearCart} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={20} />
          </button>
        ) : (
          <div className="w-10 h-10"></div>
        )}
      </header>

      <div className="px-6 space-y-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2">Sua sacola está vazia</h2>
            <p className="text-zinc-500">Adicione algumas pizzas deliciosas para continuar.</p>
            <button 
              onClick={onBack}
              className="mt-8 bg-zinc-900 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-zinc-800 transition-colors shadow-lg"
            >
              Ver Cardápio
            </button>
          </div>
        ) : (
          <>
            {/* Item List */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    className="bg-white p-4 rounded-3xl shadow-sm border border-zinc-100 flex gap-4 items-center"
                  >
                    <img 
                      src={item.image || "https://pngimg.com/d/pizza_PNG44077.png"} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-2xl object-contain bg-slate-50 p-2"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-zinc-900">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {item.type !== 'drink' && (
                        <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                          {item.flavors?.join(', ')}
                          {item.border && item.border !== 'Sem Borda' && <><br/>Borda: {item.border}</>}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-bold text-zinc-900">R$ {formatPrice(item.totalPrice * item.quantity)}</span>
                        <div className="flex items-center gap-3 bg-slate-50 rounded-full px-2 py-1 border border-zinc-100">
                          <button 
                            onClick={() => updateQuantity(item.id, 'decrement')}
                            className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-600 hover:bg-slate-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold text-zinc-900 w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 'increment')}
                            className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-600 hover:bg-slate-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Coupon Field */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Tag size={18} className="text-zinc-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Tem um cupom?" 
                  className="w-full bg-white border border-zinc-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>
              <button className="bg-zinc-900 text-white px-6 rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-colors">
                Aplicar
              </button>
            </div>

            {/* Financial Summary */}
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-zinc-900">R$ {formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500">Taxa de Entrega</span>
                <span className="font-bold text-green-500">Grátis</span>
              </div>
              <div className="h-px w-full bg-zinc-100 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-zinc-900">Total</span>
                <span className="text-xl font-black text-zinc-900">R$ {formatPrice(subtotal)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky Footer with Drawer */}
      {items.length > 0 && (
        <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <div className="sticky bottom-[130px] left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-40">
            <Drawer.Trigger asChild>
              <button 
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_16px_rgba(249,115,22,0.3)] hover:bg-orange-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Finalizar Pedido • R$ {formatPrice(subtotal)}
              </button>
            </Drawer.Trigger>
          </div>

          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 fixed bottom-0 left-0 right-0 z-50 outline-none">
              <div className="p-4 bg-white rounded-t-[32px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-200 mb-8" />
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-bold text-2xl text-zinc-900 mb-6 px-4">
                    Vai uma gelada para acompanhar?
                  </Drawer.Title>
                  
                  {/* Drinks Carousel */}
                  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-8 scrollbar-hide">
                    {drinks.map((drink) => (
                      <div 
                        key={drink.id} 
                        className="snap-start shrink-0 w-36 bg-white border border-zinc-100 rounded-3xl p-3 shadow-sm flex flex-col"
                      >
                        <div className="bg-slate-50 rounded-2xl p-2 mb-3 h-28 flex items-center justify-center">
                          <img 
                            src={drink.image} 
                            alt={drink.name} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-sm text-zinc-900 leading-tight mb-1 flex-1">
                          {drink.name}
                        </h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-zinc-900 text-sm">
                            R$ {formatPrice(drink.price)}
                          </span>
                          <button 
                            onClick={() => handleAddDrink(drink)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              addedDrinks[drink.id] 
                                ? 'bg-green-500 text-white' 
                                : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                            }`}
                          >
                            <AnimatePresence mode="wait">
                              {addedDrinks[drink.id] ? (
                                <motion.div
                                  key="check"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <Check size={16} strokeWidth={3} />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="plus"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                >
                                  <Plus size={16} strokeWidth={2.5} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Sticky Footer */}
              <div className="p-6 bg-white border-t border-zinc-100 pb-10">
                <button 
                  onClick={handleFinalCheckout}
                  className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-zinc-800 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Ir para o Pagamento • R$ {formatPrice(subtotal)}
                </button>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}
    </div>
  )
}
