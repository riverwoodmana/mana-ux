import React from 'react'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate( -50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 5
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0,0,0,.7)',
    zIndex: 5

}

export const Modal = ({open, children, onClose}) => {
    if(!open) return null
  return (
    <>
        <div style={OVERLAY_STYLE} onClick={onClose}/>
        <div style={MODAL_STYLES}>
            <div className='modalCancel'>
                <button className='modalCancelButton' onClick={onClose}>X</button>
            </div>
            {children}
        </div>
    </>
  )
}
