import { useQuery, useQueryClient } from "@tanstack/react-query";
import { KimLongService } from './kim-long.service';
import { KimLongPriceRes } from './types';

const enum KimLongQueryKey {
  GetPriceById = 'kimlong-get-price-by-id',
  GetPricesByIds = 'kimlong-get-prices-by-ids',
}

const useKimLongPriceQuery = (id: string) => {
  return useQuery<KimLongPriceRes>({
    enabled: !!id,
    queryKey: [KimLongQueryKey.GetPriceById, id],
    queryFn: () => KimLongService.getById(id),
  });
};

const useKimLongPriceMultiQuery = (ids: string[]) => {
  return useQuery({
    queryKey: [KimLongQueryKey.GetPricesByIds, ids],
    queryFn: async () => {
      const results = await Promise.all(ids.map(id => KimLongService.getById(id)));
      return results;
    },
  });
};

export const useKimLong = () => {
    const client = useQueryClient();
    const invalidateQuery = (queryKeys: KimLongQueryKey[]) =>
        client.invalidateQueries({
        queryKey: queryKeys,
        });
    return {
        invalidateQuery,
        useKimLongPriceQuery,
        useKimLongPriceMultiQuery,
    };
};