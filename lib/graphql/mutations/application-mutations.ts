import { gql } from '@apollo/client';

export const SUBMIT_APPLICATION = gql`
  mutation SubmitApplication($input: SubmitApplicationInput!) {
    submitApplication(input: $input) {
      id
      applicationType
      status
      message
      companyInfo {
        companyName
        registrationNumber
        taxId
        companyStreet
        companyCity
        companyPostalCode
        companyCounty
        companyCountry
        businessType
      }
      documents {
        identityDocumentUrl
        businessRegistrationUrl
        insuranceCertificateUrl
        additionalDocuments
      }
      createdAt
    }
  }
`;

export const APPROVE_APPLICATION = gql`
  mutation ApproveApplication($applicationId: ID!) {
    approveApplication(applicationId: $applicationId) {
      id
      status
      reviewedAt
      reviewedBy {
        id
        displayName
      }
    }
  }
`;

export const REJECT_APPLICATION = gql`
  mutation RejectApplication($applicationId: ID!, $reason: String) {
    rejectApplication(applicationId: $applicationId, reason: $reason) {
      id
      status
      rejectionReason
      reviewedAt
      reviewedBy {
        id
        displayName
      }
    }
  }
`;
