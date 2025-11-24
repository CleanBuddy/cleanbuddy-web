import { gql } from '@apollo/client';

export const MY_BOOKINGS = gql`
  query MyBookings($filters: BookingFiltersInput, $limit: Int, $offset: Int) {
    myBookings(filters: $filters, limit: $limit, offset: $offset) {
      edges {
        node {
          id
          scheduledDate
          scheduledTime
          duration
          status
          serviceType
          serviceFrequency
          totalPrice
          platformFee
          cleanerPayout
          customerNotes
          cleanerNotes
          confirmedAt
          startedAt
          completedAt
          cancelledAt
          cancellationReason
          cancellationNote
          createdAt
          cleaner {
            id
            displayName
            email
          }
          cleanerProfile {
            id
            bio
            hourlyRate
            tier
            averageRating
            totalReviews
          }
          address {
            id
            street
            city
            postalCode
            county
            country
            building
            apartment
            floor
            accessInstructions
          }
          review {
            id
            rating
            comment
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export const MY_JOBS = gql`
  query MyJobs($filters: BookingFiltersInput, $limit: Int, $offset: Int) {
    myJobs(filters: $filters, limit: $limit, offset: $offset) {
      edges {
        node {
          id
          scheduledDate
          scheduledTime
          duration
          status
          serviceType
          serviceFrequency
          totalPrice
          platformFee
          cleanerPayout
          customerNotes
          cleanerNotes
          confirmedAt
          startedAt
          completedAt
          cancelledAt
          cancellationReason
          cancellationNote
          createdAt
          customer {
            id
            displayName
            email
          }
          address {
            id
            street
            city
            postalCode
            county
            country
            building
            apartment
            floor
            accessInstructions
          }
          review {
            id
            rating
            comment
          }
        }
        cursor
      }
      totalCount
    }
  }
`;

export const UPCOMING_BOOKINGS = gql`
  query UpcomingBookings($limit: Int) {
    upcomingBookings(limit: $limit) {
      id
      scheduledDate
      scheduledTime
      duration
      status
      serviceType
      totalPrice
      cleaner {
        id
        displayName
      }
      cleanerProfile {
        id
        tier
        averageRating
      }
      address {
        id
        street
        city
      }
    }
  }
`;

export const BOOKING = gql`
  query Booking($id: ID!) {
    booking(id: $id) {
      id
      scheduledDate
      scheduledTime
      duration
      status
      serviceType
      serviceFrequency
      serviceAddOns
      totalPrice
      servicePrice
      addOnsPrice
      travelFee
      platformFee
      cleanerPayout
      cleanerHourlyRate
      customerNotes
      cleanerNotes
      isRecurring
      confirmedAt
      startedAt
      completedAt
      cancelledAt
      cancellationReason
      cancellationNote
      createdAt
      updatedAt
      customer {
        id
        displayName
        email
      }
      cleaner {
        id
        displayName
        email
      }
      cleanerProfile {
        id
        bio
        hourlyRate
        tier
        averageRating
        totalReviews
        totalBookings
        isActive
        isIdentityVerified
        isBackgroundCheckCompleted
      }
      address {
        id
        label
        street
        city
        postalCode
        county
        country
        building
        apartment
        floor
        neighborhood
        accessInstructions
        latitude
        longitude
      }
      review {
        id
        rating
        title
        comment
        qualityRating
        punctualityRating
        professionalismRating
        valueRating
        createdAt
      }
      transaction {
        id
        amount
        status
        stripePaymentIntentId
        createdAt
      }
    }
  }
`;
