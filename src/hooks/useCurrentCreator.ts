import { useQuery } from "@tanstack/react-query";
import { getCreatorById, getCreators } from "@/services/creatorService";

const defaultCreatorId = import.meta.env.VITE_DEFAULT_CREATOR_ID as
  | string
  | undefined;

export function useCurrentCreator() {
  if (defaultCreatorId) {
    return useQuery({
      queryKey: ["creator", defaultCreatorId],
      queryFn: () => getCreatorById(defaultCreatorId),
    });
  }

  return useQuery({
    queryKey: ["creator", "default"],
    queryFn: async () => {
      const creators = await getCreators();
      return creators[0] ?? null;
    },
  });
}
