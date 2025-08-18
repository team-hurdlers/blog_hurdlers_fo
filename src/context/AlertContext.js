'use client'
import { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    action: null,
  })
  const router = useRouter()

  const showAlert = (message) => {
    setAlert({ isOpen: true, message, action: null })
  }

  const showConfirmAlert = (message, confirmAction) => {
    setAlert({ isOpen: true, message, action: confirmAction })
  }

  const closeAlert = () => {
    setAlert({ isOpen: false, message: '', action: null })
  }

  const handleServiceNavigation = (currentService) => {
    showConfirmAlert(
      '해당 서비스는 준비 중입니다. 다른 서비스를 보러 가시겠습니까?',
      () => {
        window.history.replaceState({}, '', '/demo')
        router.push('/demo')
        closeAlert()
      },
    )
  }

  return (
    <AlertContext.Provider
      value={{
        alert,
        showAlert,
        showConfirmAlert,
        closeAlert,
        handleServiceNavigation,
      }}
    >
      {children}
      <AnimatePresence>
        {alert.isOpen && (
          <AlertPopup
            message={alert.message}
            onClose={closeAlert}
            onConfirm={alert.action}
            hasAction={!!alert.action}
          />
        )}
      </AnimatePresence>
    </AlertContext.Provider>
  )
}

// Modify the AlertPopup component to have a white background with black text and no emoji
const AlertPopup = ({ message, onClose, onConfirm, hasAction }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Popup */}
      <motion.div
        className="relative bg-white border border-gray-200 rounded-lg p-6 max-w-sm w-full shadow-lg"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="text-center">
          <p className="text-gray-800 text-base mb-6">{message}</p>

          {hasAction ? (
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 text-sm transition-all duration-200 shadow-sm"
              >
                취소
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-black hover:bg-gray-800 rounded-lg text-white text-sm transition-all duration-200 shadow-sm"
              >
                확인
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-black hover:bg-gray-800 rounded-lg text-white text-sm transition-all duration-200 shadow-sm"
            >
              확인
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}
export const useAlert = () => {
  return useContext(AlertContext)
}
