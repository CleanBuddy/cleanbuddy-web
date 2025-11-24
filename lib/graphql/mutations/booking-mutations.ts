import { gql } from '@apollo/client';

export const CONFIRM_BOOKING = gql`
  mutation ConfirmBooking($id: ID!) {
    confirmBooking(id: $id) {
      id
      status
      confirmedAt
    }
  }
`;

export const START_BOOKING = gql`
  mutation StartBooking($id: ID!) {
    startBooking(id: $id) {
      id
      status
      startedAt
    }
  }
`;

export const COMPLETE_BOOKING = gql`
  mutation CompleteBooking($id: ID!, $cleanerNotes: String) {
    completeBooking(id: $id, cleanerNotes: $cleanerNotes) {
      id
      status
      completedAt
      cleanerNotes
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($input: CancelBookingInput!) {
    cancelBooking(input: $input) {
      id
      status
      cancelledAt
      cancellationReason
      cancellationNote
      cancelledById
    }
  }
`;

export const MARK_NO_SHOW = gql`
  mutation MarkNoShow($id: ID!) {
    markNoShow(id: $id) {
      id
      status
    }
  }
`;

export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($input: UpdateBookingInput!) {
    updateBooking(input: $input) {
      id
      scheduledDate
      scheduledTime
      customerNotes
      updatedAt
    }
  }
`;
