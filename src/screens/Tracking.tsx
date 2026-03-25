import { X, Phone, Clock, MapPin, Bike } from 'lucide-react'

export function Tracking({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-screen relative bg-slate-50 overflow-hidden">
      
      {/* 1. Header Minimalista */}
      <header className="absolute top-0 right-0 p-6 z-20">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm border border-zinc-200 hover:bg-white transition-colors"
        >
          <X size={20} className="text-zinc-900" />
        </button>
      </header>

      {/* 2. O Mapa de Fundo (A Vibe) */}
      <div className="flex-1 relative bg-slate-50">
        {/* Abstract Map Background */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 50 800 C 100 600, 300 400, 200 100" fill="none" stroke="#f97316" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 10" />
        </svg>

        {/* Pizzeria Pin */}
        <div className="absolute top-[100px] left-[200px] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-zinc-900 border-2 border-white shadow-md"></div>
          <div className="text-[10px] font-bold text-zinc-900 bg-white/80 px-2 py-0.5 rounded-full mt-1">Pizzaria</div>
        </div>
      </div>

      {/* 3. O Card de Status (Bottom Sheet Fixo) */}
      <div className="absolute bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-3xl p-6 z-10 h-[45%] flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Pedido Recebido! 🎉</h2>
          <p className="text-zinc-500 font-medium">Previsão de entrega: 40 - 55 min</p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">1</div>
            <span className="text-xs font-bold text-zinc-900">Confirmação</span>
          </div>
          <div className="h-[2px] flex-1 bg-zinc-200 mx-2"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold">2</div>
            <span className="text-xs font-medium text-zinc-400">Forno</span>
          </div>
          <div className="h-[2px] flex-1 bg-zinc-200 mx-2"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-400 font-bold">3</div>
            <span className="text-xs font-medium text-zinc-400">Entrega</span>
          </div>
        </div>

        {/* Card do Motoboy */}
        <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Bike size={20} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-zinc-900">Buscando entregador...</p>
            </div>
          </div>
          <button disabled className="bg-zinc-300 text-white px-4 py-2 rounded-full text-sm font-bold opacity-50 cursor-not-allowed">
            Ligar
          </button>
        </div>

        {/* 4. Ação Secundária */}
        <button className="text-zinc-500 font-medium text-sm hover:text-zinc-900 transition-colors">
          Acompanhar pelo WhatsApp
        </button>
      </div>
    </div>
  )
}

