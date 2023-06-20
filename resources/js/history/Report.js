import React from 'react'

import ReportTable from './historyComponent/ReportTable'

export default function Report() {
  return (
    <div>
        <ReportTable 
        student = {student} 
        allHistory = {allHistory}
        />
    </div>
  )
}
