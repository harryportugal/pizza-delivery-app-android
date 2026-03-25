import { useState } from 'react'
import { ChevronLeft, MapPin, CreditCard, Banknote, QrCode, Navigation } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserStore'

const PAYMENT_OPTIONS = [
  { id: 'pix', label: 'Pagamento Rápido', icon: QrCode, desc: 'Pix / MBWay' },
  { id: 'card', label: 'Cartão na Entrega', icon: CreditCard, desc: 'TPA / Maquininha' },
  { id: 'cash', label: 'Dinheiro', icon: Banknote, desc: 'Espécie' },
]

export function Checkout({ onBack, onComplete }: { onBack: () => void, onComplete: () => void }) {
  const { items, clearCart } = useCartStore()
  const { name, phone } = useUserStore()
  
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    neighborhood: ''
  })
  
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [changeFor, setChangeFor] = useState('')

  const subtotal = items.reduce((total, item) => total + (item.totalPrice * item.quantity), 0)
  
  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const handleConfirmOrder = () => {
    if (!address.street || !address.number || !address.neighborhood) {
      alert('Por favor, preencha os dados de entrega.')
      return
    }

    let text = `*NOVO PEDIDO*\n\n`
    
    if (name) text += `*Cliente:* ${name}\n`
    if (phone) text += `*Contato:* ${phone}\n\n`

    text += `*ITENS:*\n`
    items.forEach(item => {
      text += `${item.quantity}x ${item.name}\n`
      text += `   Sabores: ${item.flavors.join(', ')}\n`
      if (item.border !== 'Sem Borda') {
        text += `   Borda: ${item.border}\n`
      }
      text += `   Preço: R$ ${formatPrice(item.totalPrice * item.quantity)}\n\n`
    })
    
    text += `*ENTREGA:*\n`
    text += `${address.street}, ${address.number}\n`
    text += `Bairro: ${address.neighborhood}\n`
    if (address.cep) text += `CEP: ${address.cep}\n`
    text += `\n`
    
    text += `*PAGAMENTO:*\n`
    if (paymentMethod === 'pix') text += `Pagamento Rápido (Pix/MBWay)\n`
    if (paymentMethod === 'card') text += `Cartão na Entrega\n`
    if (paymentMethod === 'cash') {
      text += `Dinheiro\n`
      if (changeFor) text += `Troco para: R$ ${changeFor}\n`
    }
    
    text += `\n*TOTAL: R$ ${formatPrice(subtotal)}*`
    
    const encodedText = encodeURIComponent(text)
    const whatsappNumber = '5571992383038' // Número do restaurante
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank')
    
    clearCart()
    onComplete()
  }

  const handleLocationClick = () => {
    // Simulação de busca de localização
    setAddress({
      cep: '01001-000',
      street: 'Praça da Sé',
      number: '',
      neighborhood: 'Sé'
    })
  }

  return (
    <div className="min-h-full bg-slate-50 pb-40">
      {/* Header */}
      <header className="flex items-center pt-14 px-6 pb-6 bg-slate-50 sticky top-0 z-30">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-zinc-900 hover:bg-zinc-50 transition-colors absolute left-6">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-zinc-900 font-bold text-lg tracking-wide w-full text-center">Finalizar Pedido</h1>
      </header>

      <div className="px-6 space-y-6">
        
        {/* Delivery Details */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <MapPin size={18} className="text-orange-500" />
              Endereço de Entrega
            </h2>
            <button 
              onClick={handleLocationClick}
              className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:text-orange-600 transition-colors bg-orange-50 px-2.5 py-1.5 rounded-lg"
            >
              <Navigation size={12} />
              Usar atual
            </button>
          </div>

          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Código Postal (CEP)"
              value={address.cep}
              onChange={(e) => setAddress({...address, cep: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            <input 
              type="text" 
              placeholder="Rua / Morada"
              value={address.street}
              onChange={(e) => setAddress({...address, street: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Número"
                value={address.number}
                onChange={(e) => setAddress({...address, number: e.target.value})}
                className="w-1/3 bg-slate-50 border-none rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <input 
                type="text" 
                placeholder="Complemento"
                className="w-2/3 bg-slate-50 border-none rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
            </div>
            <input 
              type="text" 
              placeholder="Bairro / Zona"
              value={address.neighborhood}
              onChange={(e) => setAddress({...address, neighborhood: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </section>

        {/* Payment Method */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-zinc-100">
          <h2 className="text-base font-bold text-zinc-900 mb-5">Como prefere pagar?</h2>
          
          <div className="space-y-3">
            {PAYMENT_OPTIONS.map((option) => {
              const isActive = paymentMethod === option.id;
              const Icon = option.icon;
              
              return (
                <button
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id)}
                  className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left ${
                    isActive 
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-md' 
                      : 'border-slate-100 bg-white text-zinc-700 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'bg-slate-50 text-zinc-500'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-zinc-900'}`}>{option.label}</h3>
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>{option.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isActive ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                  }`}>
                    {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Cash Change Input */}
          {paymentMethod === 'cash' && (
            <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100 animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-bold text-orange-900 mb-2">Precisa de troco para quanto?</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-700 font-bold">R$</span>
                <input 
                  type="number" 
                  placeholder="50,00"
                  value={changeFor}
                  onChange={(e) => setChangeFor(e.target.value)}
                  className="w-full bg-white border-none rounded-lg py-3 pl-10 pr-4 text-sm font-bold text-zinc-900 placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all shadow-sm"
                />
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] sm:absolute">
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="text-zinc-500 font-medium text-sm">Total a pagar</span>
          <span className="text-xl font-black text-zinc-900">R$ {formatPrice(subtotal)}</span>
        </div>
        <button 
          onClick={handleConfirmOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_16px_rgba(249,115,22,0.3)] hover:bg-orange-600 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  )
}
