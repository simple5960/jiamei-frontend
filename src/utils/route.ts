import { useRouter } from '@tarojs/taro';

export function useQuery() {
    const router = useRouter();
    return router.params || {};
}
