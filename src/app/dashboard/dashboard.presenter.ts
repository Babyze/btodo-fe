import { getQueryClient } from "@/lib/query/query-client.query";
import { QueryKey } from "@/utils/constants/query-key.constant";
import { getTodoListModel } from "./dashboard.model";

export async function useDashboardPresenter() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKey.GET_TODO_LIST],
    queryFn: getTodoListModel,
  });

  return { queryClient };
}
