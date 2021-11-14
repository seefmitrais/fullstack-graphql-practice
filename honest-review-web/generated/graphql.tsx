import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginUser = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  description: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type Movies = {
  __typename?: 'Movies';
  movies: Array<Movie>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  register: AuthResponse;
};


export type MutationLoginArgs = {
  input: LoginUser;
};


export type MutationRegisterArgs = {
  input: RegisterUser;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  count: Scalars['Float'];
  users: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  searchMovies: Movies;
  users: PaginatedUsers;
};


export type QuerySearchMoviesArgs = {
  keyword: Scalars['String'];
};


export type QueryUsersArgs = {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type RegisterUser = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, username: string } | null | undefined } };


export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!) {
  register(input: {username: $username, email: $email, password: $password}) {
    errors {
      message
      field
    }
    user {
      id
      email
      username
    }
    token
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};