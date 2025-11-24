import { gql } from '@apollo/client';

export const MY_APPLICATIONS = gql`
  query MyApplications {
    myApplications {
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
      rejectionReason
      reviewedAt
      reviewedBy {
        id
        displayName
      }
      createdAt
    }
  }
`;

export const PENDING_APPLICATIONS = gql`
  query PendingApplications {
    pendingApplications {
      id
      user {
        id
        displayName
        email
      }
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

export const APPLICATION = gql`
  query Application($id: ID!) {
    application(id: $id) {
      id
      user {
        id
        displayName
        email
      }
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
      rejectionReason
      reviewedAt
      reviewedBy {
        id
        displayName
      }
      createdAt
      updatedAt
    }
  }
`;
