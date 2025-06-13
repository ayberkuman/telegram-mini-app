import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addTask: Task;
  deleteTask: Scalars['ID']['output'];
  updateTask: Task;
};


export type MutationAddTaskArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  tasks: TasksResult;
};


export type QueryTasksArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  taskAdded: Task;
  taskDeleted: Scalars['ID']['output'];
  taskUpdated: Task;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type TasksResult = {
  __typename?: 'TasksResult';
  hasMore: Scalars['Boolean']['output'];
  tasks: Array<Task>;
  totalCount: Scalars['Int']['output'];
};

export type AddTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type AddTaskMutation = { __typename?: 'Mutation', addTask: { __typename?: 'Task', id: string, title: string, status: string } };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: string };

export type TaskAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskAddedSubscription = { __typename?: 'Subscription', taskAdded: { __typename?: 'Task', id: string, title: string, status: string } };

export type TaskDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskDeletedSubscription = { __typename?: 'Subscription', taskDeleted: string };

export type TaskUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskUpdatedSubscription = { __typename?: 'Subscription', taskUpdated: { __typename?: 'Task', id: string, title: string, status: string } };

export type TasksQueryQueryVariables = Exact<{
  status?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TasksQueryQuery = { __typename?: 'Query', tasks: { __typename?: 'TasksResult', totalCount: number, hasMore: boolean, tasks: Array<{ __typename?: 'Task', id: string, title: string, status: string }> } };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string, title: string, status: string } };


export const AddTaskDocument = gql`
    mutation AddTask($title: String!) {
  addTask(title: $title) {
    id
    title
    status
  }
}
    `;
export type AddTaskMutationFn = Apollo.MutationFunction<AddTaskMutation, AddTaskMutationVariables>;

/**
 * __useAddTaskMutation__
 *
 * To run a mutation, you first call `useAddTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTaskMutation, { data, loading, error }] = useAddTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddTaskMutation(baseOptions?: Apollo.MutationHookOptions<AddTaskMutation, AddTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTaskMutation, AddTaskMutationVariables>(AddTaskDocument, options);
      }
export type AddTaskMutationHookResult = ReturnType<typeof useAddTaskMutation>;
export type AddTaskMutationResult = Apollo.MutationResult<AddTaskMutation>;
export type AddTaskMutationOptions = Apollo.BaseMutationOptions<AddTaskMutation, AddTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: ID!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const TaskAddedDocument = gql`
    subscription TaskAdded {
  taskAdded {
    id
    title
    status
  }
}
    `;

/**
 * __useTaskAddedSubscription__
 *
 * To run a query within a React component, call `useTaskAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskAddedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTaskAddedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TaskAddedSubscription, TaskAddedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskAddedSubscription, TaskAddedSubscriptionVariables>(TaskAddedDocument, options);
      }
export type TaskAddedSubscriptionHookResult = ReturnType<typeof useTaskAddedSubscription>;
export type TaskAddedSubscriptionResult = Apollo.SubscriptionResult<TaskAddedSubscription>;
export const TaskDeletedDocument = gql`
    subscription TaskDeleted {
  taskDeleted
}
    `;

/**
 * __useTaskDeletedSubscription__
 *
 * To run a query within a React component, call `useTaskDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTaskDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TaskDeletedSubscription, TaskDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskDeletedSubscription, TaskDeletedSubscriptionVariables>(TaskDeletedDocument, options);
      }
export type TaskDeletedSubscriptionHookResult = ReturnType<typeof useTaskDeletedSubscription>;
export type TaskDeletedSubscriptionResult = Apollo.SubscriptionResult<TaskDeletedSubscription>;
export const TaskUpdatedDocument = gql`
    subscription TaskUpdated {
  taskUpdated {
    id
    title
    status
  }
}
    `;

/**
 * __useTaskUpdatedSubscription__
 *
 * To run a query within a React component, call `useTaskUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useTaskUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useTaskUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>(TaskUpdatedDocument, options);
      }
export type TaskUpdatedSubscriptionHookResult = ReturnType<typeof useTaskUpdatedSubscription>;
export type TaskUpdatedSubscriptionResult = Apollo.SubscriptionResult<TaskUpdatedSubscription>;
export const TasksQueryDocument = gql`
    query TasksQuery($status: String, $sortBy: String, $limit: Int, $offset: Int) {
  tasks(status: $status, sortBy: $sortBy, limit: $limit, offset: $offset) {
    tasks {
      id
      title
      status
    }
    totalCount
    hasMore
  }
}
    `;

/**
 * __useTasksQueryQuery__
 *
 * To run a query within a React component, call `useTasksQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQueryQuery({
 *   variables: {
 *      status: // value for 'status'
 *      sortBy: // value for 'sortBy'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTasksQueryQuery(baseOptions?: Apollo.QueryHookOptions<TasksQueryQuery, TasksQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQueryQuery, TasksQueryQueryVariables>(TasksQueryDocument, options);
      }
export function useTasksQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQueryQuery, TasksQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQueryQuery, TasksQueryQueryVariables>(TasksQueryDocument, options);
        }
export function useTasksQuerySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TasksQueryQuery, TasksQueryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TasksQueryQuery, TasksQueryQueryVariables>(TasksQueryDocument, options);
        }
export type TasksQueryQueryHookResult = ReturnType<typeof useTasksQueryQuery>;
export type TasksQueryLazyQueryHookResult = ReturnType<typeof useTasksQueryLazyQuery>;
export type TasksQuerySuspenseQueryHookResult = ReturnType<typeof useTasksQuerySuspenseQuery>;
export type TasksQueryQueryResult = Apollo.QueryResult<TasksQueryQuery, TasksQueryQueryVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: ID!, $status: String!) {
  updateTask(id: $id, status: $status) {
    id
    title
    status
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;