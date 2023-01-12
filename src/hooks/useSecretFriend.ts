import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const useSecretFriend = (
  participants: { name: string; exceptions: string[] }[]
) => {
  return useQuery({
    queryKey: ["posts", participants],
    queryFn: async () => {
      console.log("useSecretFriend participants", participants);

      const { data } = await axios.post(
        "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-5c261e50-0b13-4143-a145-2e1b65da730d/default/secret-friend",
        { participants }
      );
      return data;
    },
    refetchOnWindowFocus: false,
    enabled: participants.length > 0,
  });
};

const useSecretFriend2 = () => {
  return useMutation({
    mutationFn: (values: {
      participants: { name: string; exceptions: string[] }[];
    }) => {
      return axios.post(
        "https://faas-lon1-917a94a7.doserverless.co/api/v1/web/fn-5c261e50-0b13-4143-a145-2e1b65da730d/default/secret-friend",
        values
      );
    }
  });
};

export { useSecretFriend, useSecretFriend2 };
