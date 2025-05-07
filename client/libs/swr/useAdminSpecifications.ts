import axios from 'axios';
import useSWR from 'swr';
import { SpecificationType } from '../../types/index';

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .then((res) => res.data);

export function useAdminSpecifications(
  query: string | null,
  token?: string
) {
  const { data, error, isValidating, mutate } = useSWR<SpecificationType[]>(
    token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/specifications/thong-ke/me`, token]
      : null,
    fetcher
  );

  return {
    data,
    error,
    mutate,
    isValidating,
  };
}
export type specificationsState = ReturnType<typeof useAdminSpecifications>;
