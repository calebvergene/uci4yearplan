import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const MajorSkeleton = () => {
    return (
        <div className="px-4 pt-4">

            <div className="ml-4 space-y-3">
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-7/12" />
            </div>

        </div>
    )
}

export default MajorSkeleton