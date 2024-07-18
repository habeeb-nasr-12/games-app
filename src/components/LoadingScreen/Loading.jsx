import React from 'react'
import "./loading.css"

export const Loading = () => {
















  return (
    <div className="loader__wrap" role="alertdialog" aria-busy="true" aria-live="polite" aria-label="Loading…">
    <div className="loader" aria-hidden="true">
      <div className="loader__sq"></div>
      <div className="loader__sq"></div>
    </div>
  </div>
  )
}
