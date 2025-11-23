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
  addTeamMember: User;
  addTeamMemberInvite: TeamMemberInvite;
  authWithIdentityProvider: AuthResult;
  authWithRefreshToken: AuthResult;
  createProject: Project;
  createTeam: Team;
  deleteCurrentUser: Scalars['Void']['output'];
  deleteProject: Scalars['Void']['output'];
  deleteTeam: Scalars['Void']['output'];
  redeemInvitationCode: Scalars['Boolean']['output'];
  removeTeamMember: Scalars['Void']['output'];
  removeTeamMemberInvite: Scalars['Void']['output'];
  signOut: Scalars['Void']['output'];
  updateCurrentUser: User;
  updateProject: Project;
  updateTeam: Team;
  updateTeamMember: TeamMember;
};


export type MutationAddTeamMemberArgs = {
  email: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
};


export type MutationAddTeamMemberInviteArgs = {
  email: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
};


export type MutationAuthWithIdentityProviderArgs = {
  code: Scalars['String']['input'];
  kind: AuthIdentityKind;
};


export type MutationAuthWithRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationCreateProjectArgs = {
  displayName: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
};


export type MutationCreateTeamArgs = {
  displayName: Scalars['String']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRedeemInvitationCodeArgs = {
  code: Scalars['String']['input'];
};


export type MutationRemoveTeamMemberArgs = {
  teamID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};


export type MutationRemoveTeamMemberInviteArgs = {
  inviteID: Scalars['ID']['input'];
  inviteeEmail: Scalars['String']['input'];
};


export type MutationUpdateCurrentUserArgs = {
  input: UpdateCurrentUserInput;
};


export type MutationUpdateProjectArgs = {
  displayName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  subdomain?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTeamArgs = {
  displayName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationUpdateTeamMemberArgs = {
  roles: Array<TeamMemberRole>;
  teamID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
};

export type Project = {
  __typename?: 'Project';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  subdomain: Scalars['String']['output'];
  team: Team;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  edges: Array<ProjectEdge>;
  totalCount: Scalars['Int']['output'];
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['ID']['output'];
  node: Project;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  project: Project;
  projectBySubdomain: Project;
  team: Team;
};


export type QueryProjectArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProjectBySubdomainArgs = {
  subdomain: Scalars['String']['input'];
};


export type QueryTeamArgs = {
  id: Scalars['ID']['input'];
};

export type Team = {
  __typename?: 'Team';
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  memberInvitesConnection: TeamMemberInviteConnection;
  membersConnection: TeamMemberConnection;
  owner: User;
  projectsConnection: ProjectConnection;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  edges: Array<TeamEdge>;
  totalCount: Scalars['Int']['output'];
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['ID']['output'];
  node: Team;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  roles: Array<TeamMemberRole>;
  user: User;
};

export type TeamMemberConnection = {
  __typename?: 'TeamMemberConnection';
  edges: Array<TeamMemberEdge>;
  totalCount: Scalars['Int']['output'];
};

export type TeamMemberEdge = {
  __typename?: 'TeamMemberEdge';
  cursor: Scalars['ID']['output'];
  node: TeamMember;
};

export type TeamMemberInvite = {
  __typename?: 'TeamMemberInvite';
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  invitedBy: User;
  inviteeEmail: Scalars['String']['output'];
};

export type TeamMemberInviteConnection = {
  __typename?: 'TeamMemberInviteConnection';
  edges: Array<TeamMemberInviteEdge>;
  totalCount: Scalars['Int']['output'];
};

export type TeamMemberInviteEdge = {
  __typename?: 'TeamMemberInviteEdge';
  cursor: Scalars['ID']['output'];
  node: TeamMemberInvite;
};

export enum TeamMemberRole {
  Billing = 'BILLING'
}

export type UpdateCurrentUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatus>;
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invitationCodes?: Maybe<Array<Scalars['String']['output']>>;
  memberTeamsConnection: TeamConnection;
  ownedTeamsConnection: TeamConnection;
  status: UserStatus;
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

export enum UserStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

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


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, displayName: string, status: UserStatus, email: string } | null };

export type TeamFieldsFragment = { __typename?: 'Team', id: string, displayName: string };

export type ProjectFieldsFragment = { __typename?: 'Project', id: string, displayName: string };

export type TeamMemberFieldsFragment = { __typename?: 'TeamMember', id: string, roles: Array<TeamMemberRole>, createdAt: string, user: { __typename?: 'User', id: string, displayName: string, email: string, status: UserStatus } };

export type TeamMemberInviteFieldsFragment = { __typename?: 'TeamMemberInvite', id: string, inviteeEmail: string, createdAt: string, invitedBy: { __typename?: 'User', id: string, displayName: string, email: string } };

export type CreateProjectMutationVariables = Exact<{
  displayName: Scalars['String']['input'];
  teamID: Scalars['ID']['input'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, displayName: string, team: { __typename?: 'Team', id: string, displayName: string } } };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  displayName: Scalars['String']['input'];
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, displayName: string, team: { __typename?: 'Team', id: string, displayName: string } } };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: null };

export type TeamProjectsQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamProjectsQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, displayName: string, projectsConnection: { __typename?: 'ProjectConnection', totalCount: number, edges: Array<{ __typename?: 'ProjectEdge', cursor: string, node: { __typename?: 'Project', id: string, displayName: string } }> } } };

export type ProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, displayName: string, team: { __typename?: 'Team', id: string, displayName: string } } };

export type CreateTeamMutationVariables = Exact<{
  displayName: Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: { __typename?: 'Team', id: string, displayName: string } };

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  displayName: Scalars['String']['input'];
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam: { __typename?: 'Team', id: string, displayName: string } };

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: null };

export type AddTeamMemberMutationVariables = Exact<{
  teamID: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type AddTeamMemberMutation = { __typename?: 'Mutation', addTeamMember: { __typename?: 'User', id: string, displayName: string, email: string } };

export type UpdateTeamMemberMutationVariables = Exact<{
  teamID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
  roles: Array<TeamMemberRole> | TeamMemberRole;
}>;


export type UpdateTeamMemberMutation = { __typename?: 'Mutation', updateTeamMember: { __typename?: 'TeamMember', id: string, roles: Array<TeamMemberRole>, createdAt: string, user: { __typename?: 'User', id: string, displayName: string, email: string, status: UserStatus } } };

export type AddTeamMemberInviteMutationVariables = Exact<{
  teamID: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type AddTeamMemberInviteMutation = { __typename?: 'Mutation', addTeamMemberInvite: { __typename?: 'TeamMemberInvite', id: string, inviteeEmail: string, createdAt: string, invitedBy: { __typename?: 'User', id: string, displayName: string, email: string } } };

export type RemoveTeamMemberInviteMutationVariables = Exact<{
  inviteID: Scalars['ID']['input'];
  inviteeEmail: Scalars['String']['input'];
}>;


export type RemoveTeamMemberInviteMutation = { __typename?: 'Mutation', removeTeamMemberInvite: null };

export type RemoveTeamMemberMutationVariables = Exact<{
  teamID: Scalars['ID']['input'];
  userID: Scalars['ID']['input'];
}>;


export type RemoveTeamMemberMutation = { __typename?: 'Mutation', removeTeamMember: null };

export type TeamMembersQueryVariables = Exact<{
  teamID: Scalars['ID']['input'];
}>;


export type TeamMembersQuery = { __typename?: 'Query', team: { __typename?: 'Team', id: string, displayName: string, owner: { __typename?: 'User', id: string, displayName: string, email: string }, membersConnection: { __typename?: 'TeamMemberConnection', totalCount: number, edges: Array<{ __typename?: 'TeamMemberEdge', cursor: string, node: { __typename?: 'TeamMember', id: string, roles: Array<TeamMemberRole>, createdAt: string, user: { __typename?: 'User', id: string, displayName: string, email: string, status: UserStatus } } }> }, memberInvitesConnection: { __typename?: 'TeamMemberInviteConnection', totalCount: number, edges: Array<{ __typename?: 'TeamMemberInviteEdge', cursor: string, node: { __typename?: 'TeamMemberInvite', id: string, inviteeEmail: string, createdAt: string, invitedBy: { __typename?: 'User', id: string, displayName: string, email: string } } }> } } };

export type CurrentUserTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserTeamsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, displayName: string, email: string, ownedTeamsConnection: { __typename?: 'TeamConnection', totalCount: number, edges: Array<{ __typename?: 'TeamEdge', cursor: string, node: { __typename?: 'Team', id: string, displayName: string } }> }, memberTeamsConnection: { __typename?: 'TeamConnection', totalCount: number, edges: Array<{ __typename?: 'TeamEdge', cursor: string, node: { __typename?: 'Team', id: string, displayName: string } }> } } | null };

export type CurrentUserTeamsWithProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserTeamsWithProjectsQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, displayName: string, email: string, ownedTeamsConnection: { __typename?: 'TeamConnection', totalCount: number, edges: Array<{ __typename?: 'TeamEdge', cursor: string, node: { __typename?: 'Team', id: string, displayName: string, projectsConnection: { __typename?: 'ProjectConnection', totalCount: number, edges: Array<{ __typename?: 'ProjectEdge', cursor: string, node: { __typename?: 'Project', id: string, displayName: string } }> } } }> }, memberTeamsConnection: { __typename?: 'TeamConnection', totalCount: number, edges: Array<{ __typename?: 'TeamEdge', cursor: string, node: { __typename?: 'Team', id: string, displayName: string, projectsConnection: { __typename?: 'ProjectConnection', totalCount: number, edges: Array<{ __typename?: 'ProjectEdge', cursor: string, node: { __typename?: 'Project', id: string, displayName: string } }> } } }> } } | null };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: null };

export type DeleteCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCurrentUserMutation = { __typename?: 'Mutation', deleteCurrentUser: null };

export type UpdateCurrentUserMutationVariables = Exact<{
  input: UpdateCurrentUserInput;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser: { __typename?: 'User', id: string, displayName: string, email: string, status: UserStatus } };

export const TeamFieldsFragmentDoc = gql`
    fragment TeamFields on Team {
  id
  displayName
}
    `;
export const ProjectFieldsFragmentDoc = gql`
    fragment ProjectFields on Project {
  id
  displayName
}
    `;
export const TeamMemberFieldsFragmentDoc = gql`
    fragment TeamMemberFields on TeamMember {
  id
  roles
  createdAt
  user {
    id
    displayName
    email
    status
  }
}
    `;
export const TeamMemberInviteFieldsFragmentDoc = gql`
    fragment TeamMemberInviteFields on TeamMemberInvite {
  id
  inviteeEmail
  createdAt
  invitedBy {
    id
    displayName
    email
  }
}
    `;
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
    status
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
export const CreateProjectDocument = gql`
    mutation CreateProject($displayName: String!, $teamID: ID!) {
  createProject(displayName: $displayName, teamID: $teamID) {
    id
    displayName
    team {
      id
      displayName
    }
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($id: ID!, $displayName: String!) {
  updateProject(id: $id, displayName: $displayName) {
    id
    displayName
    team {
      id
      displayName
    }
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: ID!) {
  deleteProject(id: $id)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const TeamProjectsDocument = gql`
    query TeamProjects($teamID: ID!) {
  team(id: $teamID) {
    id
    displayName
    projectsConnection {
      edges {
        node {
          id
          displayName
        }
        cursor
      }
      totalCount
    }
  }
}
    `;

/**
 * __useTeamProjectsQuery__
 *
 * To run a query within a React component, call `useTeamProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamProjectsQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useTeamProjectsQuery(baseOptions: Apollo.QueryHookOptions<TeamProjectsQuery, TeamProjectsQueryVariables> & ({ variables: TeamProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamProjectsQuery, TeamProjectsQueryVariables>(TeamProjectsDocument, options);
      }
export function useTeamProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamProjectsQuery, TeamProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamProjectsQuery, TeamProjectsQueryVariables>(TeamProjectsDocument, options);
        }
export function useTeamProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamProjectsQuery, TeamProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamProjectsQuery, TeamProjectsQueryVariables>(TeamProjectsDocument, options);
        }
export type TeamProjectsQueryHookResult = ReturnType<typeof useTeamProjectsQuery>;
export type TeamProjectsLazyQueryHookResult = ReturnType<typeof useTeamProjectsLazyQuery>;
export type TeamProjectsSuspenseQueryHookResult = ReturnType<typeof useTeamProjectsSuspenseQuery>;
export type TeamProjectsQueryResult = Apollo.QueryResult<TeamProjectsQuery, TeamProjectsQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: ID!) {
  project(id: $id) {
    id
    displayName
    team {
      id
      displayName
    }
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables> & ({ variables: ProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export function useProjectSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectSuspenseQueryHookResult = ReturnType<typeof useProjectSuspenseQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($displayName: String!) {
  createTeam(displayName: $displayName) {
    ...TeamFields
  }
}
    ${TeamFieldsFragmentDoc}`;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: ID!, $displayName: String!) {
  updateTeam(id: $id, displayName: $displayName) {
    ...TeamFields
  }
}
    ${TeamFieldsFragmentDoc}`;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: ID!) {
  deleteTeam(id: $id)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const AddTeamMemberDocument = gql`
    mutation AddTeamMember($teamID: ID!, $email: String!) {
  addTeamMember(teamID: $teamID, email: $email) {
    id
    displayName
    email
  }
}
    `;
export type AddTeamMemberMutationFn = Apollo.MutationFunction<AddTeamMemberMutation, AddTeamMemberMutationVariables>;

/**
 * __useAddTeamMemberMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberMutation, { data, loading, error }] = useAddTeamMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamMemberMutation, AddTeamMemberMutationVariables>(AddTeamMemberDocument, options);
      }
export type AddTeamMemberMutationHookResult = ReturnType<typeof useAddTeamMemberMutation>;
export type AddTeamMemberMutationResult = Apollo.MutationResult<AddTeamMemberMutation>;
export type AddTeamMemberMutationOptions = Apollo.BaseMutationOptions<AddTeamMemberMutation, AddTeamMemberMutationVariables>;
export const UpdateTeamMemberDocument = gql`
    mutation UpdateTeamMember($teamID: ID!, $userID: ID!, $roles: [TeamMemberRole!]!) {
  updateTeamMember(teamID: $teamID, userID: $userID, roles: $roles) {
    id
    user {
      id
      displayName
      email
      status
    }
    roles
    createdAt
  }
}
    `;
export type UpdateTeamMemberMutationFn = Apollo.MutationFunction<UpdateTeamMemberMutation, UpdateTeamMemberMutationVariables>;

/**
 * __useUpdateTeamMemberMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMemberMutation, { data, loading, error }] = useUpdateTeamMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useUpdateTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMemberMutation, UpdateTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMemberMutation, UpdateTeamMemberMutationVariables>(UpdateTeamMemberDocument, options);
      }
export type UpdateTeamMemberMutationHookResult = ReturnType<typeof useUpdateTeamMemberMutation>;
export type UpdateTeamMemberMutationResult = Apollo.MutationResult<UpdateTeamMemberMutation>;
export type UpdateTeamMemberMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMemberMutation, UpdateTeamMemberMutationVariables>;
export const AddTeamMemberInviteDocument = gql`
    mutation AddTeamMemberInvite($teamID: ID!, $email: String!) {
  addTeamMemberInvite(teamID: $teamID, email: $email) {
    ...TeamMemberInviteFields
  }
}
    ${TeamMemberInviteFieldsFragmentDoc}`;
export type AddTeamMemberInviteMutationFn = Apollo.MutationFunction<AddTeamMemberInviteMutation, AddTeamMemberInviteMutationVariables>;

/**
 * __useAddTeamMemberInviteMutation__
 *
 * To run a mutation, you first call `useAddTeamMemberInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMemberInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMemberInviteMutation, { data, loading, error }] = useAddTeamMemberInviteMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddTeamMemberInviteMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMemberInviteMutation, AddTeamMemberInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamMemberInviteMutation, AddTeamMemberInviteMutationVariables>(AddTeamMemberInviteDocument, options);
      }
export type AddTeamMemberInviteMutationHookResult = ReturnType<typeof useAddTeamMemberInviteMutation>;
export type AddTeamMemberInviteMutationResult = Apollo.MutationResult<AddTeamMemberInviteMutation>;
export type AddTeamMemberInviteMutationOptions = Apollo.BaseMutationOptions<AddTeamMemberInviteMutation, AddTeamMemberInviteMutationVariables>;
export const RemoveTeamMemberInviteDocument = gql`
    mutation RemoveTeamMemberInvite($inviteID: ID!, $inviteeEmail: String!) {
  removeTeamMemberInvite(inviteID: $inviteID, inviteeEmail: $inviteeEmail)
}
    `;
export type RemoveTeamMemberInviteMutationFn = Apollo.MutationFunction<RemoveTeamMemberInviteMutation, RemoveTeamMemberInviteMutationVariables>;

/**
 * __useRemoveTeamMemberInviteMutation__
 *
 * To run a mutation, you first call `useRemoveTeamMemberInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTeamMemberInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTeamMemberInviteMutation, { data, loading, error }] = useRemoveTeamMemberInviteMutation({
 *   variables: {
 *      inviteID: // value for 'inviteID'
 *      inviteeEmail: // value for 'inviteeEmail'
 *   },
 * });
 */
export function useRemoveTeamMemberInviteMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTeamMemberInviteMutation, RemoveTeamMemberInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTeamMemberInviteMutation, RemoveTeamMemberInviteMutationVariables>(RemoveTeamMemberInviteDocument, options);
      }
export type RemoveTeamMemberInviteMutationHookResult = ReturnType<typeof useRemoveTeamMemberInviteMutation>;
export type RemoveTeamMemberInviteMutationResult = Apollo.MutationResult<RemoveTeamMemberInviteMutation>;
export type RemoveTeamMemberInviteMutationOptions = Apollo.BaseMutationOptions<RemoveTeamMemberInviteMutation, RemoveTeamMemberInviteMutationVariables>;
export const RemoveTeamMemberDocument = gql`
    mutation RemoveTeamMember($teamID: ID!, $userID: ID!) {
  removeTeamMember(teamID: $teamID, userID: $userID)
}
    `;
export type RemoveTeamMemberMutationFn = Apollo.MutationFunction<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>;

/**
 * __useRemoveTeamMemberMutation__
 *
 * To run a mutation, you first call `useRemoveTeamMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTeamMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTeamMemberMutation, { data, loading, error }] = useRemoveTeamMemberMutation({
 *   variables: {
 *      teamID: // value for 'teamID'
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useRemoveTeamMemberMutation(baseOptions?: Apollo.MutationHookOptions<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>(RemoveTeamMemberDocument, options);
      }
export type RemoveTeamMemberMutationHookResult = ReturnType<typeof useRemoveTeamMemberMutation>;
export type RemoveTeamMemberMutationResult = Apollo.MutationResult<RemoveTeamMemberMutation>;
export type RemoveTeamMemberMutationOptions = Apollo.BaseMutationOptions<RemoveTeamMemberMutation, RemoveTeamMemberMutationVariables>;
export const TeamMembersDocument = gql`
    query TeamMembers($teamID: ID!) {
  team(id: $teamID) {
    id
    displayName
    owner {
      id
      displayName
      email
    }
    membersConnection {
      edges {
        node {
          id
          user {
            id
            displayName
            email
            status
          }
          roles
          createdAt
        }
        cursor
      }
      totalCount
    }
    memberInvitesConnection {
      edges {
        node {
          id
          inviteeEmail
          invitedBy {
            id
            displayName
            email
          }
          createdAt
        }
        cursor
      }
      totalCount
    }
  }
}
    `;

/**
 * __useTeamMembersQuery__
 *
 * To run a query within a React component, call `useTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamMembersQuery({
 *   variables: {
 *      teamID: // value for 'teamID'
 *   },
 * });
 */
export function useTeamMembersQuery(baseOptions: Apollo.QueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables> & ({ variables: TeamMembersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
      }
export function useTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
        }
export function useTeamMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TeamMembersQuery, TeamMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamMembersQuery, TeamMembersQueryVariables>(TeamMembersDocument, options);
        }
export type TeamMembersQueryHookResult = ReturnType<typeof useTeamMembersQuery>;
export type TeamMembersLazyQueryHookResult = ReturnType<typeof useTeamMembersLazyQuery>;
export type TeamMembersSuspenseQueryHookResult = ReturnType<typeof useTeamMembersSuspenseQuery>;
export type TeamMembersQueryResult = Apollo.QueryResult<TeamMembersQuery, TeamMembersQueryVariables>;
export const CurrentUserTeamsDocument = gql`
    query CurrentUserTeams {
  currentUser {
    id
    displayName
    email
    ownedTeamsConnection {
      edges {
        node {
          id
          displayName
        }
        cursor
      }
      totalCount
    }
    memberTeamsConnection {
      edges {
        node {
          id
          displayName
        }
        cursor
      }
      totalCount
    }
  }
}
    `;

/**
 * __useCurrentUserTeamsQuery__
 *
 * To run a query within a React component, call `useCurrentUserTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserTeamsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>(CurrentUserTeamsDocument, options);
      }
export function useCurrentUserTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>(CurrentUserTeamsDocument, options);
        }
export function useCurrentUserTeamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>(CurrentUserTeamsDocument, options);
        }
export type CurrentUserTeamsQueryHookResult = ReturnType<typeof useCurrentUserTeamsQuery>;
export type CurrentUserTeamsLazyQueryHookResult = ReturnType<typeof useCurrentUserTeamsLazyQuery>;
export type CurrentUserTeamsSuspenseQueryHookResult = ReturnType<typeof useCurrentUserTeamsSuspenseQuery>;
export type CurrentUserTeamsQueryResult = Apollo.QueryResult<CurrentUserTeamsQuery, CurrentUserTeamsQueryVariables>;
export const CurrentUserTeamsWithProjectsDocument = gql`
    query CurrentUserTeamsWithProjects {
  currentUser {
    id
    displayName
    email
    ownedTeamsConnection {
      edges {
        node {
          id
          displayName
          projectsConnection {
            edges {
              node {
                id
                displayName
              }
              cursor
            }
            totalCount
          }
        }
        cursor
      }
      totalCount
    }
    memberTeamsConnection {
      edges {
        node {
          id
          displayName
          projectsConnection {
            edges {
              node {
                id
                displayName
              }
              cursor
            }
            totalCount
          }
        }
        cursor
      }
      totalCount
    }
  }
}
    `;

/**
 * __useCurrentUserTeamsWithProjectsQuery__
 *
 * To run a query within a React component, call `useCurrentUserTeamsWithProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserTeamsWithProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserTeamsWithProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserTeamsWithProjectsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>(CurrentUserTeamsWithProjectsDocument, options);
      }
export function useCurrentUserTeamsWithProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>(CurrentUserTeamsWithProjectsDocument, options);
        }
export function useCurrentUserTeamsWithProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>(CurrentUserTeamsWithProjectsDocument, options);
        }
export type CurrentUserTeamsWithProjectsQueryHookResult = ReturnType<typeof useCurrentUserTeamsWithProjectsQuery>;
export type CurrentUserTeamsWithProjectsLazyQueryHookResult = ReturnType<typeof useCurrentUserTeamsWithProjectsLazyQuery>;
export type CurrentUserTeamsWithProjectsSuspenseQueryHookResult = ReturnType<typeof useCurrentUserTeamsWithProjectsSuspenseQuery>;
export type CurrentUserTeamsWithProjectsQueryResult = Apollo.QueryResult<CurrentUserTeamsWithProjectsQuery, CurrentUserTeamsWithProjectsQueryVariables>;
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
    status
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