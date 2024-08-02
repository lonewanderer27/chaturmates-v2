import React from 'react'
import { useQuery } from '@tanstack/react-query'
import client from '../../client'

const useFetchCourses = () => {
  const query = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const res = await client
        .from("courses")
        .select('*')
        .order("title")

      return res.data
    },
  })

  return query;
}

export default useFetchCourses