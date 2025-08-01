import {QueryClient} from '@tanstack/react-query'

export const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                staleTime: 30 * 1000 *60,
                retry: 2,
            }
        }
    }
);