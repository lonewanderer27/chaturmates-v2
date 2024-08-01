import { useAtom, useSetAtom } from 'jotai';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { StudentType } from '../../types';
import client from '../../client';
import { studentsResultsAtom } from '../../atoms/search';

export default function useStudentSearch() {
  const [studentsResults, setStudentsResults] = useAtom(studentsResultsAtom);
  const queryClient = useQueryClient();

  const fetchStudents = async () => {
    const response = await client
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    setStudentsResults(response.data as StudentType[]);
    return response.data as StudentType[];
  };

  // Initial fetch
  const { data, isLoading, error } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  })

  const searchStudents = async (query: string) => {
    const response = await client
      .from('students')
      .select('*')
      .ilike('full_name', `%${query}%`)
      .order('created_at', { ascending: false });
    return response.data as StudentType[];
  };

  const handleStudentsSearch = async (query: string) => {
    if (query.length === 0) {
      queryClient.invalidateQueries({
        queryKey: ['students'],
      })
    } else {
      const data = await searchStudents(query);
      setStudentsResults(data ?? []);
    }
  };

  return {
    handleStudentsSearch,
    studentsResults: studentsResults ?? [],
    isLoading,
    error,
  };
}
