import axios from 'axios';
import useSWR from 'swr';
import { SpecificationType } from '../../types/index';

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: { Authorization: 'Bearer ' + token },
    })
    .then((res) => res.data);

export function useAdminSpecification(
  id: string | string[] | undefined,
  token?: string
) {
  const { data, error, isValidating, mutate } = useSWR<SpecificationType>(
    id && token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/specifications/${id}`, token]
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
export type specificationState = ReturnType<typeof useAdminSpecification>;
