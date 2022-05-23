import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  open?: boolean
  onClose?: () => void
}

const Modal: React.FC<ModalProps> = (props) => {
  const { open = false, onClose, children } = props
  const [isMounted, setIsMounted] = useState(false)
  const [isPortalReady, setIsPortalReady] = useState(false)

  const modalRootElementRef = useRef<HTMLDivElement | null>()

  useEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
      setIsPortalReady(false)
    }
  }, [])

  useEffect(() => {
    if (open && isMounted) {
      const element = document?.createElement('div')
      element.className = 'modal'

      modalRootElementRef.current = element
      document?.body.appendChild(modalRootElementRef.current)
      setIsPortalReady(true)
    }

    return () => {
      modalRootElementRef.current?.remove()
      setIsPortalReady(false)
    }
  }, [open, isMounted])

  function escHandler({ key }: KeyboardEvent) {
    if (key === 'Escape') {
      onClose?.()
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', escHandler)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', escHandler)
      }
    }
  }, [])

  function handleClose() {
    if (onClose) {
      onClose()
    }
  }

  const comp = (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className={`fixed inset-0 bg-black ${
          open ? 'opacity-50' : 'pointer-events-none opacity-0'
        } transition-opacity duration-300 ease-in-out`}
        onClick={handleClose}
      />
      {children}
    </div>
  )

  return modalRootElementRef?.current && isPortalReady
    ? createPortal(comp, modalRootElementRef?.current)
    : null
}

export default Modal
