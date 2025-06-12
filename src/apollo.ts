import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  type NormalizedCacheObject,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql", // Update to your server's HTTP endpoint
});

// WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3000/graphql", // Update to your server's WS endpoint
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
  cache: new InMemoryCache(),
});