/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useUserStore } from "@/store/store"
import LogOut from "./LogOut"
import { Home, User, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const user = useUserStore((state: any) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white dark:bg-card shadow-sm border-b border-border/30 dark:border-border/10 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            <div className="text-2xl font-bold text-primary dark:text-primary/80">
              Blood Bank
            </div>
          </motion.div>
          
          {/* Desktop Navigation - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
            {/* Home Link */}
            <motion.a 
              href="/"  
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-muted-foreground dark:text-card-foreground/70 hover:text-primary flex items-center space-x-2 transition-colors group"
            >
              <Home size={20} className="group-hover:text-primary" />
              <span>Home</span>
            </motion.a>
          </div>

          {/* User Section - Right Aligned */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 bg-secondary/50 dark:bg-secondary/20 px-3 py-1 rounded-full">
              <User 
                size={16} 
                className="text-muted-foreground dark:text-card-foreground/70"
              />
              <span className="text-sm text-muted-foreground dark:text-card-foreground/70">
                {user.name}
              </span>
            </div>
            
            <div className="hidden md:block">
              <LogOut/>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-muted-foreground dark:text-card-foreground/70 hover:text-primary"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-card border-t border-border/30 dark:border-border/10"
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              {/* Mobile Home Link */}
              <motion.a 
                href="/"
                className="flex items-center space-x-2 text-muted-foreground dark:text-card-foreground/70 hover:text-primary"
                whileTap={{ scale: 0.95 }}
              >
                <Home size={20} />
                <span>Home</span>
              </motion.a>

              {/* Mobile User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User 
                    size={16} 
                    className="text-muted-foreground dark:text-card-foreground/70"
                  />
                  <span className="text-sm text-muted-foreground dark:text-card-foreground/70">
                    {user.name}
                  </span>
                </div>
                
                <LogOut />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar