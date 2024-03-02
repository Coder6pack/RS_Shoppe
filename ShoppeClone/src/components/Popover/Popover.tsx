import React, { type ElementType, useId } from 'react'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
  FloatingPortal,
  arrow,
  type Placement
} from '@floating-ui/react'
import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  placement?: Placement
}

export default function Popover({ children, renderPopover, className, as: Element = 'div', placement }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const arrowRef = useRef<HTMLElement>(null)

  const { x, y, refs, context, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(15),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate,
    placement: placement
  })
  const hover = useHover(context, { handleClose: safePolygon() })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    role: 'tooltip'
  })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])
  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: 'absolute',
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                className='border-x-transparent border-t-transparent border-b-white border-[11px] z-10 translate-y-[-95%]'
                style={{
                  position: 'absolute',
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
