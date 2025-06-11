import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/"
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    /* typePolicies: {
      Query: {
        fields: {
          launches: {
            keyArgs: false,
          },
        },
      },
    }, */
  }),
});