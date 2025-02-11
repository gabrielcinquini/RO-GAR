'use client'

import React, { useState } from 'react'
import { OfficerCard } from './officer-card'
import { useOfficers } from '@/hooks'
import { Pagination } from '../../_components'

export function OfficersList() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const { data: officers } = useOfficers({ currentPage, itemsPerPage })
  return (
    <div className='flex flex-col gap-4'>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {officers?.data.map((officer) => (
          <OfficerCard key={officer.id} officer={officer} />
        ))}
      </div>
      <Pagination
        lastPage={officers?.totalPages}
        currentPage={currentPage}
        siblingsCount={1}
        onPageChange={(page) => setCurrentPage(page)}
        pageSize={itemsPerPage}
        totalCount={officers?.totalCount}
      />
    </div>
  )
}
