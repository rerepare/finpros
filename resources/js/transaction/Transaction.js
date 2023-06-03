import React from 'react'

import StudentTable from './StudentTable';

export default function Transaction() {
  const [searchName, setSearchName] = React.useState("")
  return (
    <div>      
      <StudentTable student = {student} />
    </div>
  )
}
