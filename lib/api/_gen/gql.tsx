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
  JSON: { input: any; output: any; }
  Time: { input: string; output: string; }
  TimeInterval: { input: string; output: string; }
  Upload: { input: File; output: File; }
  Void: { input: null; output: null; }
};

export type Application = {
  __typename?: 'Application';
  applicationType: ApplicationType;
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  reviewedAt?: Maybe<Scalars['Time']['output']>;
  reviewedBy?: Maybe<User>;
  status: ApplicationStatus;
  updatedAt: Scalars['Time']['output'];
  user: User;
};

export enum ApplicationStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum ApplicationType {
  Cleaner = 'CLEANER',
  CompanyAdmin = 'COMPANY_ADMIN'
}

export enum AuthIdentityKind {
  GoogleOAuth2 = 'GoogleOAuth2'
}

export type AuthResult = {
  __typename?: 'AuthResult';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type ForwardPaginationInput = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  approveApplication: Application;
  authWithIdentityProvider: AuthResult;
  authWithRefreshToken: AuthResult;
  deleteCurrentUser: Scalars['Void']['output'];
  rejectApplication: Application;
  signOut: Scalars['Void']['output'];
  submitApplication: Application;
  updateCurrentUser: User;
};


export type MutationApproveApplicationArgs = {
  applicationId: Scalars['ID']['input'];
};


export type MutationAuthWithIdentityProviderArgs = {
  code: Scalars['String']['input'];
  kind: AuthIdentityKind;
};


export type MutationAuthWithRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationRejectApplicationArgs = {
  applicationId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSubmitApplicationArgs = {
  input: SubmitApplicationInput;
};


export type MutationUpdateCurrentUserArgs = {
  input: UpdateCurrentUserInput;
};

export type Query = {
  __typename?: 'Query';
  application?: Maybe<Application>;
  currentUser?: Maybe<User>;
  myApplications: Array<Application>;
  pendingApplications: Array<Application>;
};


export type QueryApplicationArgs = {
  id: Scalars['ID']['input'];
};

export type SubmitApplicationInput = {
  applicationType: ApplicationType;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCurrentUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  applications: Array<Application>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: UserRole;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  totalCount: Scalars['Int']['output'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['ID']['output'];
  node: User;
};

export enum UserRole {
  Cleaner = 'CLEANER',
  Client = 'CLIENT',
  CompanyAdmin = 'COMPANY_ADMIN',
  GlobalAdmin = 'GLOBAL_ADMIN'
}

export type SubmitApplicationMutationVariables = Exact<{
  input: SubmitApplicationInput;
}>;


export type SubmitApplicationMutation = { __typename?: 'Mutation', submitApplication: { __typename?: 'Application', id: string, applicationType: ApplicationType, status: ApplicationStatus, message?: string | null, createdAt: string, user: { __typename?: 'User', id: string, displayName: string, email: string } } };

export type ApproveApplicationMutationVariables = Exact<{
  applicationId: Scalars['ID']['input'];
}>;


export type ApproveApplicationMutation = { __typename?: 'Mutation', approveApplication: { __typename?: 'Application', id: string, applicationType: ApplicationType, status: ApplicationStatus, reviewedAt?: string | null, reviewedBy?: { __typename?: 'User', id: string, displayName: string, email: string } | null } };

export type RejectApplicationMutationVariables = Exact<{
  applicationId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectApplicationMutation = { __typename?: 'Mutation', rejectApplication: { __typename?: 'Application', id: string, applicationType: ApplicationType, status: ApplicationStatus, reviewedAt?: string | null, reviewedBy?: { __typename?: 'User', id: string, displayName: string, email: string } | null } };

export type MyApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyApplicationsQuery = { __typename?: 'Query', myApplications: Array<{ __typename?: 'Application', id: string, applicationType: ApplicationType, status: ApplicationStatus, message?: string | null, createdAt: string, updatedAt: string, reviewedAt?: string | null, reviewedBy?: { __typename?: 'User', id: string, displayName: string, email: string } | null }> };

export type PendingApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingApplicationsQuery = { __typename?: 'Query', pendingApplications: Array<{ __typename?: 'Application', id: string, applicationType: ApplicationType, status: ApplicationStatus, message?: string | null, createdAt: string, user: { __typename?: 'User', id: string, displayName: string, email: string } }> };

export type ApplicationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ApplicationQuery = { __typename?: 'Query', application?: { __typename?: 'Application', id: string, applicationType: ApplicationType, status: ApplicationStatus, message?: string | null, createdAt: string, updatedAt: string, reviewedAt?: string | null, user: { __typename?: 'User', id: string, displayName: string, email: string }, reviewedBy?: { __typename?: 'User', id: string, displayName: string, email: string } | null } | null };

export type AuthWithIdentityProviderMutationVariables = Exact<{
  code: Scalars['String']['input'];
  kind: AuthIdentityKind;
}>;


export type AuthWithIdentityProviderMutation = { __typename?: 'Mutation', authWithIdentityProvider: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type AuthWithRefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type AuthWithRefreshTokenMutation = { __typename?: 'Mutation', authWithRefreshToken: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, displayName: string, role: UserRole, email: string } | null };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: null };

export type DeleteCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCurrentUserMutation = { __typename?: 'Mutation', deleteCurrentUser: null };

export type UpdateCurrentUserMutationVariables = Exact<{
  input: UpdateCurrentUserInput;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser: { __typename?: 'User', id: string, displayName: string, email: string, role: UserRole } };


export const SubmitApplicationDocument = gql`
    mutation SubmitApplication($input: SubmitApplicationInput!) {
  submitApplication(input: $input) {
    id
    applicationType
    status
    message
    createdAt
    user {
      id
      displayName
      email
    }
  }
}
    `;
export type SubmitApplicationMutationFn = Apollo.MutationFunction<SubmitApplicationMutation, SubmitApplicationMutationVariables>;

/**
 * __useSubmitApplicationMutation__
 *
 * To run a mutation, you first call `useSubmitApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitApplicationMutation, { data, loading, error }] = useSubmitApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitApplicationMutation(baseOptions?: Apollo.MutationHookOptions<SubmitApplicationMutation, SubmitApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitApplicationMutation, SubmitApplicationMutationVariables>(SubmitApplicationDocument, options);
      }
export type SubmitApplicationMutationHookResult = ReturnType<typeof useSubmitApplicationMutation>;
export type SubmitApplicationMutationResult = Apollo.MutationResult<SubmitApplicationMutation>;
export type SubmitApplicationMutationOptions = Apollo.BaseMutationOptions<SubmitApplicationMutation, SubmitApplicationMutationVariables>;
export const ApproveApplicationDocument = gql`
    mutation ApproveApplication($applicationId: ID!) {
  approveApplication(applicationId: $applicationId) {
    id
    applicationType
    status
    reviewedAt
    reviewedBy {
      id
      displayName
      email
    }
  }
}
    `;
export type ApproveApplicationMutationFn = Apollo.MutationFunction<ApproveApplicationMutation, ApproveApplicationMutationVariables>;

/**
 * __useApproveApplicationMutation__
 *
 * To run a mutation, you first call `useApproveApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveApplicationMutation, { data, loading, error }] = useApproveApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useApproveApplicationMutation(baseOptions?: Apollo.MutationHookOptions<ApproveApplicationMutation, ApproveApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveApplicationMutation, ApproveApplicationMutationVariables>(ApproveApplicationDocument, options);
      }
export type ApproveApplicationMutationHookResult = ReturnType<typeof useApproveApplicationMutation>;
export type ApproveApplicationMutationResult = Apollo.MutationResult<ApproveApplicationMutation>;
export type ApproveApplicationMutationOptions = Apollo.BaseMutationOptions<ApproveApplicationMutation, ApproveApplicationMutationVariables>;
export const RejectApplicationDocument = gql`
    mutation RejectApplication($applicationId: ID!, $reason: String) {
  rejectApplication(applicationId: $applicationId, reason: $reason) {
    id
    applicationType
    status
    reviewedAt
    reviewedBy {
      id
      displayName
      email
    }
  }
}
    `;
export type RejectApplicationMutationFn = Apollo.MutationFunction<RejectApplicationMutation, RejectApplicationMutationVariables>;

/**
 * __useRejectApplicationMutation__
 *
 * To run a mutation, you first call `useRejectApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectApplicationMutation, { data, loading, error }] = useRejectApplicationMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectApplicationMutation(baseOptions?: Apollo.MutationHookOptions<RejectApplicationMutation, RejectApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectApplicationMutation, RejectApplicationMutationVariables>(RejectApplicationDocument, options);
      }
export type RejectApplicationMutationHookResult = ReturnType<typeof useRejectApplicationMutation>;
export type RejectApplicationMutationResult = Apollo.MutationResult<RejectApplicationMutation>;
export type RejectApplicationMutationOptions = Apollo.BaseMutationOptions<RejectApplicationMutation, RejectApplicationMutationVariables>;
export const MyApplicationsDocument = gql`
    query MyApplications {
  myApplications {
    id
    applicationType
    status
    message
    createdAt
    updatedAt
    reviewedAt
    reviewedBy {
      id
      displayName
      email
    }
  }
}
    `;

/**
 * __useMyApplicationsQuery__
 *
 * To run a query within a React component, call `useMyApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<MyApplicationsQuery, MyApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyApplicationsQuery, MyApplicationsQueryVariables>(MyApplicationsDocument, options);
      }
export function useMyApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyApplicationsQuery, MyApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyApplicationsQuery, MyApplicationsQueryVariables>(MyApplicationsDocument, options);
        }
export function useMyApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyApplicationsQuery, MyApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyApplicationsQuery, MyApplicationsQueryVariables>(MyApplicationsDocument, options);
        }
export type MyApplicationsQueryHookResult = ReturnType<typeof useMyApplicationsQuery>;
export type MyApplicationsLazyQueryHookResult = ReturnType<typeof useMyApplicationsLazyQuery>;
export type MyApplicationsSuspenseQueryHookResult = ReturnType<typeof useMyApplicationsSuspenseQuery>;
export type MyApplicationsQueryResult = Apollo.QueryResult<MyApplicationsQuery, MyApplicationsQueryVariables>;
export const PendingApplicationsDocument = gql`
    query PendingApplications {
  pendingApplications {
    id
    applicationType
    status
    message
    createdAt
    user {
      id
      displayName
      email
    }
  }
}
    `;

/**
 * __usePendingApplicationsQuery__
 *
 * To run a query within a React component, call `usePendingApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingApplicationsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<PendingApplicationsQuery, PendingApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingApplicationsQuery, PendingApplicationsQueryVariables>(PendingApplicationsDocument, options);
      }
export function usePendingApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingApplicationsQuery, PendingApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingApplicationsQuery, PendingApplicationsQueryVariables>(PendingApplicationsDocument, options);
        }
export function usePendingApplicationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PendingApplicationsQuery, PendingApplicationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PendingApplicationsQuery, PendingApplicationsQueryVariables>(PendingApplicationsDocument, options);
        }
export type PendingApplicationsQueryHookResult = ReturnType<typeof usePendingApplicationsQuery>;
export type PendingApplicationsLazyQueryHookResult = ReturnType<typeof usePendingApplicationsLazyQuery>;
export type PendingApplicationsSuspenseQueryHookResult = ReturnType<typeof usePendingApplicationsSuspenseQuery>;
export type PendingApplicationsQueryResult = Apollo.QueryResult<PendingApplicationsQuery, PendingApplicationsQueryVariables>;
export const ApplicationDocument = gql`
    query Application($id: ID!) {
  application(id: $id) {
    id
    applicationType
    status
    message
    createdAt
    updatedAt
    reviewedAt
    user {
      id
      displayName
      email
    }
    reviewedBy {
      id
      displayName
      email
    }
  }
}
    `;

/**
 * __useApplicationQuery__
 *
 * To run a query within a React component, call `useApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApplicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApplicationQuery(baseOptions: Apollo.QueryHookOptions<ApplicationQuery, ApplicationQueryVariables> & ({ variables: ApplicationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, options);
      }
export function useApplicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApplicationQuery, ApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, options);
        }
export function useApplicationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ApplicationQuery, ApplicationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ApplicationQuery, ApplicationQueryVariables>(ApplicationDocument, options);
        }
export type ApplicationQueryHookResult = ReturnType<typeof useApplicationQuery>;
export type ApplicationLazyQueryHookResult = ReturnType<typeof useApplicationLazyQuery>;
export type ApplicationSuspenseQueryHookResult = ReturnType<typeof useApplicationSuspenseQuery>;
export type ApplicationQueryResult = Apollo.QueryResult<ApplicationQuery, ApplicationQueryVariables>;
export const AuthWithIdentityProviderDocument = gql`
    mutation AuthWithIdentityProvider($code: String!, $kind: AuthIdentityKind!) {
  authWithIdentityProvider(code: $code, kind: $kind) {
    accessToken
    refreshToken
  }
}
    `;
export type AuthWithIdentityProviderMutationFn = Apollo.MutationFunction<AuthWithIdentityProviderMutation, AuthWithIdentityProviderMutationVariables>;

/**
 * __useAuthWithIdentityProviderMutation__
 *
 * To run a mutation, you first call `useAuthWithIdentityProviderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthWithIdentityProviderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authWithIdentityProviderMutation, { data, loading, error }] = useAuthWithIdentityProviderMutation({
 *   variables: {
 *      code: // value for 'code'
 *      kind: // value for 'kind'
 *   },
 * });
 */
export function useAuthWithIdentityProviderMutation(baseOptions?: Apollo.MutationHookOptions<AuthWithIdentityProviderMutation, AuthWithIdentityProviderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthWithIdentityProviderMutation, AuthWithIdentityProviderMutationVariables>(AuthWithIdentityProviderDocument, options);
      }
export type AuthWithIdentityProviderMutationHookResult = ReturnType<typeof useAuthWithIdentityProviderMutation>;
export type AuthWithIdentityProviderMutationResult = Apollo.MutationResult<AuthWithIdentityProviderMutation>;
export type AuthWithIdentityProviderMutationOptions = Apollo.BaseMutationOptions<AuthWithIdentityProviderMutation, AuthWithIdentityProviderMutationVariables>;
export const AuthWithRefreshTokenDocument = gql`
    mutation AuthWithRefreshToken($token: String!) {
  authWithRefreshToken(token: $token) {
    accessToken
    refreshToken
  }
}
    `;
export type AuthWithRefreshTokenMutationFn = Apollo.MutationFunction<AuthWithRefreshTokenMutation, AuthWithRefreshTokenMutationVariables>;

/**
 * __useAuthWithRefreshTokenMutation__
 *
 * To run a mutation, you first call `useAuthWithRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthWithRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authWithRefreshTokenMutation, { data, loading, error }] = useAuthWithRefreshTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAuthWithRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<AuthWithRefreshTokenMutation, AuthWithRefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthWithRefreshTokenMutation, AuthWithRefreshTokenMutationVariables>(AuthWithRefreshTokenDocument, options);
      }
export type AuthWithRefreshTokenMutationHookResult = ReturnType<typeof useAuthWithRefreshTokenMutation>;
export type AuthWithRefreshTokenMutationResult = Apollo.MutationResult<AuthWithRefreshTokenMutation>;
export type AuthWithRefreshTokenMutationOptions = Apollo.BaseMutationOptions<AuthWithRefreshTokenMutation, AuthWithRefreshTokenMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    id
    displayName
    role
    email
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export function useCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserSuspenseQueryHookResult = ReturnType<typeof useCurrentUserSuspenseQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const DeleteCurrentUserDocument = gql`
    mutation DeleteCurrentUser {
  deleteCurrentUser
}
    `;
export type DeleteCurrentUserMutationFn = Apollo.MutationFunction<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>;

/**
 * __useDeleteCurrentUserMutation__
 *
 * To run a mutation, you first call `useDeleteCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCurrentUserMutation, { data, loading, error }] = useDeleteCurrentUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>(DeleteCurrentUserDocument, options);
      }
export type DeleteCurrentUserMutationHookResult = ReturnType<typeof useDeleteCurrentUserMutation>;
export type DeleteCurrentUserMutationResult = Apollo.MutationResult<DeleteCurrentUserMutation>;
export type DeleteCurrentUserMutationOptions = Apollo.BaseMutationOptions<DeleteCurrentUserMutation, DeleteCurrentUserMutationVariables>;
export const UpdateCurrentUserDocument = gql`
    mutation UpdateCurrentUser($input: UpdateCurrentUserInput!) {
  updateCurrentUser(input: $input) {
    id
    displayName
    email
    role
  }
}
    `;
export type UpdateCurrentUserMutationFn = Apollo.MutationFunction<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;

/**
 * __useUpdateCurrentUserMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCurrentUserMutation, { data, loading, error }] = useUpdateCurrentUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCurrentUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>(UpdateCurrentUserDocument, options);
      }
export type UpdateCurrentUserMutationHookResult = ReturnType<typeof useUpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationResult = Apollo.MutationResult<UpdateCurrentUserMutation>;
export type UpdateCurrentUserMutationOptions = Apollo.BaseMutationOptions<UpdateCurrentUserMutation, UpdateCurrentUserMutationVariables>;