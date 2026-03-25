import { ChevronLeft, Clock, RotateCcw } from 'lucide-react'
import { motion } from 'motion/react'
import { useUserDataStore } from '../store/useUserDataStore'
import { useCartStore } from '../store/useCartStore'

export function Orders({ onBack, onNavigate }: { onBack: () => void, onNavigate: (tab: string) => void }) {
  const { orders } = useUserDataStore()
  const { addToCart } = useCartStore()

  const handleReorder = (order: any) => {
    order.items.forEach((item: any) => addToCart(item))
    onNavigate('checkout')
  }

  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="min-h-full bg-slate-50 pb-32">
      <header className="flex items-center pt-14 px-6 pb-6 bg-slate-50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 transition-colors absolute left-6">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-zinc-900 font-bold text-lg tracking-wide w-full text-center">Meus Pedidos</h1>
      </header>

      <div className="px-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-3xl shadow-sm border border-zinc-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-zinc-500 text-sm">
                <Clock size={16} />
                {order.date}
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {order.status}
              </span>
            </div>
            <div className="mb-4">
              {order.items.map((item, idx) => (
                <p key={idx} className="font-medium text-zinc-900">{item.quantity}x {item.name}</p>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
              <span className="font-bold text-lg text-zinc-900">R$ {order.total.toFixed(2)}</span>
              <button 
                onClick={() => handleReorder(order)}
                className="bg-zinc-100 text-zinc-900 py-2.5 px-4 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Pedir Novamente
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
