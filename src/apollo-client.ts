import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  type NormalizedCacheObject,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";


const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_HTTP,
});


const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_GRAPHQL_WS,
  })
);

// Split links: send data to each link depending on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Task: {
        keyFields: ["id"],
      },
      Query: {
        fields: {
          tasks: {
            keyArgs: ["status", "sortBy"],
          },
        },

      },
    },

  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: "all",
      fetchPolicy: "cache-first",
    },
    mutate: {
      errorPolicy: "all",
      fetchPolicy: "no-cache",
    },
  },

});