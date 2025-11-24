import { gql } from '@apollo/client';

export const AVAILABLE_CLEANERS_QUERY = gql`
  query AvailableCleaners(
    $date: Time!
    $startTime: String!
    $duration: Float!
    $city: String!
    $postalCode: String
  ) {
    availableCleaners(
      date: $date
      startTime: $startTime
      duration: $duration
      city: $city
      postalCode: $postalCode
    ) {
      id
      tier
      user {
        id
        displayName
        avatarUrl
      }
      hourlyRate
      averageRating
      totalReviews
    }
  }
`;
