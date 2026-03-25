/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react'
import { Home } from './screens/Home'
import { Details } from './screens/Details'
import { Tracking } from './screens/Tracking'
import { Cart } from './screens/Cart'
import { Profile } from './screens/Profile'
import { Checkout } from './screens/Checkout'
import { Settings } from './screens/Settings'
import { Addresses } from './screens/Addresses'
import { Cards } from './screens/Cards'
import { Orders } from './screens/Orders'
import { BottomNav } from './components/BottomNav'
import { LoadingScreen } from './components/LoadingScreen'
import { AnimatePresence } from 'motion/react'

const IMAGES_TO_PRELOAD = [
  'https://pngimg.com/d/pizza_PNG44077.png',
  'https://png.pngtree.com/png-clipart/20250215/original/pngtree-classic-margherita-pizza-with-fresh-basil-png-image_19846487.png',
  'https://png.pngtree.com/png-clipart/20250130/original/pngtree-classic-shrimp-pizza-loaded-with-garlic-and-cheese-png-image_20109389.png',
  'https://i.pravatar.cc/150?img=32'
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const preloadImages = async () => {
      const promises = IMAGES_TO_PRELOAD.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = reject
        })
      })

      try {
        await Promise.all(promises)
      } catch (error) {
        console.error('Error preloading images', error)
      } finally {
        // Add a small delay to ensure smooth transition
        setTimeout(() => setIsLoading(false), 1000)
      }
    }

    preloadImages()
  }, [])

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center font-sans text-slate-900 sm:p-8">
      <div className="w-full max-w-[400px] bg-[#f8fafc] relative overflow-hidden sm:rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] h-[100dvh] sm:h-[850px] flex flex-col sm:border-[6px] border-white">
        {/* Fake Status Bar / Notch for desktop preview */}
        <div className="hidden sm:flex absolute top-0 inset-x-0 h-7 justify-center z-50 pointer-events-none">
          <div className="w-32 h-6 bg-white rounded-b-3xl"></div>
        </div>

        <AnimatePresence>
          {isLoading && <LoadingScreen />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
              {activeTab === 'home' && <Home onNavigate={setActiveTab} />}
              {activeTab === 'details' && <Details onBack={() => setActiveTab('home')} onAddToCart={() => setActiveTab('cart')} />}
              {activeTab === 'tracking' && <Tracking onBack={() => setActiveTab('home')} />}
              {activeTab === 'cart' && <Cart onBack={() => setActiveTab('home')} onCheckout={() => setActiveTab('checkout')} />}
              {activeTab === 'checkout' && <Checkout onBack={() => setActiveTab('cart')} onComplete={() => setActiveTab('tracking')} />}
              {activeTab === 'profile' && <Profile onNavigate={setActiveTab} />}
              {activeTab === 'settings' && <Settings onBack={() => setActiveTab('profile')} />}
              {activeTab === 'addresses' && <Addresses onBack={() => setActiveTab('profile')} />}
              {activeTab === 'cards' && <Cards onBack={() => setActiveTab('profile')} />}
              {activeTab === 'orders' && <Orders onBack={() => setActiveTab('profile')} onNavigate={setActiveTab} />}
            </main>
            
            {activeTab !== 'details' && activeTab !== 'checkout' && activeTab !== 'tracking' && activeTab !== 'settings' && activeTab !== 'addresses' && activeTab !== 'cards' && activeTab !== 'orders' && <BottomNav activeTab={activeTab} onChange={setActiveTab} />}
          </>
        )}
      </div>
    </div>
  )
}


