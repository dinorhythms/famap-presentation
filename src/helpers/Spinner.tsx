import React from 'react'

export default function Spinner() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col text-center">
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
