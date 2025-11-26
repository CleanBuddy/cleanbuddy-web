import { gql } from '@apollo/client';

// Client Dashboard Statistics
export const DASHBOARD_STATS_CLIENT = gql`
  query DashboardStatsClient {
    myBookings(limit: 100) {
      edges {
        node {
          id
          status
          totalPrice
          scheduledDate
          cleaner {
            id
            displayName
          }
        }
      }
      totalCount
    }
    upcomingBookings(limit: 3) {
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
        tier
        averageRating
      }
      address {
        street
        city
      }
    }
  }
`;

// Cleaner Dashboard Statistics
export const DASHBOARD_STATS_CLEANER = gql`
  query DashboardStatsCleaner {
    myJobs(limit: 100) {
      edges {
        node {
          id
          status
          scheduledDate
          scheduledTime
          duration
          cleanerPayout
          serviceType
          customer {
            id
            displayName
          }
          address {
            street
            city
          }
        }
      }
      totalCount
    }
    upcomingBookings(limit: 3) {
      id
      scheduledDate
      scheduledTime
      duration
      status
      serviceType
      cleanerPayout
      customer {
        id
        displayName
      }
      address {
        street
        city
      }
    }
    myCleanerProfile {
      id
      tier
      averageRating
      totalReviews
      totalBookings
    }
  }
`;

// Today's Jobs for Cleaner
export const TODAYS_JOBS = gql`
  query TodaysJobs($date: Time!) {
    myJobs(filters: { scheduledDate: $date }, limit: 20) {
      edges {
        node {
          id
          scheduledDate
          scheduledTime
          duration
          status
          serviceType
          cleanerPayout
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
            building
            apartment
            floor
            accessInstructions
          }
        }
      }
    }
  }
`;

// Upcoming Jobs for Cleaner
export const UPCOMING_JOBS = gql`
  query UpcomingJobs($limit: Int) {
    myJobs(
      filters: { status: CONFIRMED }
      limit: $limit
    ) {
      edges {
        node {
          id
          scheduledDate
          scheduledTime
          duration
          status
          serviceType
          cleanerPayout
          customer {
            id
            displayName
          }
          address {
            street
            city
          }
        }
      }
    }
  }
`;

// Admin Dashboard Statistics
export const DASHBOARD_STATS_ADMIN = gql`
  query DashboardStatsAdmin {
    allBookings(limit: 1000) {
      edges {
        node {
          id
          status
          totalPrice
          platformFee
          scheduledDate
        }
      }
      totalCount
    }
    pendingCompanies {
      id
      companyType
      createdAt
    }
  }
`;

// Recent Platform Activity (Admin)
export const RECENT_PLATFORM_ACTIVITY = gql`
  query RecentPlatformActivity {
    allBookings(limit: 10) {
      edges {
        node {
          id
          status
          serviceType
          totalPrice
          scheduledDate
          createdAt
          customer {
            id
            displayName
          }
          cleaner {
            id
            displayName
          }
        }
      }
    }
  }
`;

// Sidebar Badge Counts
export const SIDEBAR_BADGE_COUNTS = gql`
  query SidebarBadgeCounts {
    currentUser {
      id
      role
    }
    pendingCompanies {
      id
    }
  }
`;
