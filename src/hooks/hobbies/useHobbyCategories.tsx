import { useQuery } from '@tanstack/react-query'
import React from 'react'
import client from '../../client'

const useHobbyCategories = () => {
  const hcq = useQuery({
    queryKey: ["hobbies_category"],
    queryFn: async () => {
      const hobbiesCategoryRes = await client
        .from("hobbies_category")
        .select("*")
        .order("created_at", { ascending: false });

      return hobbiesCategoryRes.data;
    }
  })
  return hcq;
}

export default useHobbyCategories