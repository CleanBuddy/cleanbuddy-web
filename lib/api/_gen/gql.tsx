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

export type AcceptCleanerInviteResult = {
  __typename?: 'AcceptCleanerInviteResult';
  company: Company;
  success: Scalars['Boolean']['output'];
  user: User;
};

export type AddCleanerResponseInput = {
  response: Scalars['String']['input'];
  reviewId: Scalars['ID']['input'];
};

export type Address = {
  __typename?: 'Address';
  accessInstructions?: Maybe<Scalars['String']['output']>;
  apartment?: Maybe<Scalars['String']['output']>;
  building?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  county?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Time']['output'];
  floor?: Maybe<Scalars['Int']['output']>;
  googlePlaceId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  label?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  neighborhood?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  street: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type ApplicationDocuments = {
  __typename?: 'ApplicationDocuments';
  additionalDocuments?: Maybe<Array<Scalars['String']['output']>>;
  businessRegistrationUrl?: Maybe<Scalars['String']['output']>;
  identityDocumentUrl: Scalars['String']['output'];
  insuranceCertificateUrl?: Maybe<Scalars['String']['output']>;
};

export type ApplicationDocumentsInput = {
  additionalDocuments?: InputMaybe<Array<Scalars['Upload']['input']>>;
  businessRegistration?: InputMaybe<Scalars['Upload']['input']>;
  identityDocument: Scalars['Upload']['input'];
  insuranceCertificate?: InputMaybe<Scalars['Upload']['input']>;
};

export enum AuthIdentityKind {
  GoogleOAuth2 = 'GoogleOAuth2'
}

export type AuthResult = {
  __typename?: 'AuthResult';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Availability = {
  __typename?: 'Availability';
  cleanerProfile: CleanerProfile;
  cleanerProfileId: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  date: Scalars['Time']['output'];
  endTime: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isRecurring: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  recurrenceEnd?: Maybe<Scalars['Time']['output']>;
  recurrencePattern?: Maybe<RecurrencePattern>;
  startTime: Scalars['String']['output'];
  type: AvailabilityType;
  updatedAt: Scalars['Time']['output'];
};

export type AvailabilityFiltersInput = {
  endDate?: InputMaybe<Scalars['Time']['input']>;
  startDate?: InputMaybe<Scalars['Time']['input']>;
  type?: InputMaybe<AvailabilityType>;
};

export enum AvailabilityType {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE'
}

export type Booking = {
  __typename?: 'Booking';
  addOnsPrice: Scalars['Int']['output'];
  address: Address;
  addressId: Scalars['ID']['output'];
  cancellationNote?: Maybe<Scalars['String']['output']>;
  cancellationReason?: Maybe<CancellationReason>;
  cancelledAt?: Maybe<Scalars['Time']['output']>;
  cancelledBy?: Maybe<User>;
  cancelledById?: Maybe<Scalars['ID']['output']>;
  cleaner: User;
  cleanerHourlyRate: Scalars['Int']['output'];
  cleanerId: Scalars['ID']['output'];
  cleanerNotes?: Maybe<Scalars['String']['output']>;
  cleanerPayout: Scalars['Int']['output'];
  cleanerProfile: CleanerProfile;
  cleanerProfileId: Scalars['ID']['output'];
  completedAt?: Maybe<Scalars['Time']['output']>;
  confirmedAt?: Maybe<Scalars['Time']['output']>;
  createdAt: Scalars['Time']['output'];
  customer: User;
  customerId: Scalars['ID']['output'];
  customerNotes?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  isRecurring: Scalars['Boolean']['output'];
  nextBookingId?: Maybe<Scalars['ID']['output']>;
  parentBookingId?: Maybe<Scalars['ID']['output']>;
  platformFee: Scalars['Int']['output'];
  review?: Maybe<Review>;
  scheduledDate: Scalars['Time']['output'];
  scheduledTime: Scalars['String']['output'];
  serviceAddOns: Array<ServiceAddOn>;
  serviceFrequency: ServiceFrequency;
  servicePrice: Scalars['Int']['output'];
  serviceType: ServiceType;
  startedAt?: Maybe<Scalars['Time']['output']>;
  status: BookingStatus;
  totalPrice: Scalars['Int']['output'];
  transaction?: Maybe<Transaction>;
  travelFee: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type BookingConnection = {
  __typename?: 'BookingConnection';
  edges: Array<BookingEdge>;
  totalCount: Scalars['Int']['output'];
};

export type BookingEdge = {
  __typename?: 'BookingEdge';
  cursor: Scalars['ID']['output'];
  node: Booking;
};

export type BookingFiltersInput = {
  endDate?: InputMaybe<Scalars['Time']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  maxPrice?: InputMaybe<Scalars['Int']['input']>;
  minPrice?: InputMaybe<Scalars['Int']['input']>;
  serviceType?: InputMaybe<ServiceType>;
  startDate?: InputMaybe<Scalars['Time']['input']>;
  status?: InputMaybe<BookingStatus>;
};

export enum BookingStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  InProgress = 'IN_PROGRESS',
  NoShow = 'NO_SHOW',
  Pending = 'PENDING'
}

export type CalculateServicePriceInput = {
  addOns?: InputMaybe<Array<ServiceAddOn>>;
  addressId: Scalars['ID']['input'];
  cleanerProfileId: Scalars['ID']['input'];
  serviceType: ServiceType;
};

export type CancelBookingInput = {
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  reason: CancellationReason;
};

export enum CancellationReason {
  CleanerRequest = 'CLEANER_REQUEST',
  CustomerRequest = 'CUSTOMER_REQUEST',
  Emergency = 'EMERGENCY',
  Other = 'OTHER',
  Weather = 'WEATHER'
}

export type CheckAvailabilityInput = {
  cleanerProfileId: Scalars['ID']['input'];
  date: Scalars['Time']['input'];
  endTime: Scalars['String']['input'];
  startTime: Scalars['String']['input'];
};

export type CleanerEarnings = {
  __typename?: 'CleanerEarnings';
  averageEarningsPerBooking: Scalars['Int']['output'];
  cleanerId: Scalars['ID']['output'];
  completedBookings: Scalars['Int']['output'];
  pendingPayouts: Scalars['Int']['output'];
  totalEarnings: Scalars['Int']['output'];
};

export type CleanerInvite = {
  __typename?: 'CleanerInvite';
  acceptedAt?: Maybe<Scalars['Time']['output']>;
  acceptedBy?: Maybe<User>;
  company: Company;
  createdAt: Scalars['Time']['output'];
  createdBy: User;
  email?: Maybe<Scalars['String']['output']>;
  expiresAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  status: CleanerInviteStatus;
  token: Scalars['String']['output'];
};

export type CleanerInviteResult = {
  __typename?: 'CleanerInviteResult';
  invite: CleanerInvite;
  inviteUrl: Scalars['String']['output'];
};

export enum CleanerInviteStatus {
  Accepted = 'ACCEPTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING',
  Revoked = 'REVOKED'
}

export type CleanerProfile = {
  __typename?: 'CleanerProfile';
  availability: Array<Availability>;
  averageRating: Scalars['Float']['output'];
  backgroundCheck: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  cancelledBookings: Scalars['Int']['output'];
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['ID']['output']>;
  completedBookings: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  identityVerified: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  isAvailableToday: Scalars['Boolean']['output'];
  isVerified: Scalars['Boolean']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
  reviews: Array<Review>;
  serviceAreas: Array<ServiceArea>;
  tier: CleanerTier;
  totalBookings: Scalars['Int']['output'];
  totalEarnings: Scalars['Int']['output'];
  totalReviews: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
  user: User;
  userId: Scalars['ID']['output'];
  verifiedAt?: Maybe<Scalars['Time']['output']>;
};

export type CleanerProfileConnection = {
  __typename?: 'CleanerProfileConnection';
  edges: Array<CleanerProfileEdge>;
  totalCount: Scalars['Int']['output'];
};

export type CleanerProfileEdge = {
  __typename?: 'CleanerProfileEdge';
  cursor: Scalars['ID']['output'];
  node: CleanerProfile;
};

export type CleanerProfileFiltersInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAvailableToday?: InputMaybe<Scalars['Boolean']['input']>;
  isVerified?: InputMaybe<Scalars['Boolean']['input']>;
  maxRating?: InputMaybe<Scalars['Float']['input']>;
  minRating?: InputMaybe<Scalars['Float']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  serviceAreaIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  tier?: InputMaybe<CleanerTier>;
};

export enum CleanerTier {
  New = 'NEW',
  Premium = 'PREMIUM',
  Pro = 'PRO',
  Standard = 'STANDARD'
}

export type Company = {
  __typename?: 'Company';
  activeCleaners: Scalars['Int']['output'];
  adminUser: User;
  businessType?: Maybe<Scalars['String']['output']>;
  cleaners: Array<CleanerProfile>;
  companyCity: Scalars['String']['output'];
  companyCountry: Scalars['String']['output'];
  companyCounty?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  companyPostalCode: Scalars['String']['output'];
  companyStreet: Scalars['String']['output'];
  companyType: CompanyType;
  createdAt: Scalars['Time']['output'];
  documents?: Maybe<ApplicationDocuments>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  registrationNumber: Scalars['String']['output'];
  rejectionReason?: Maybe<Scalars['String']['output']>;
  status: CompanyStatus;
  taxId: Scalars['String']['output'];
  totalCleaners: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type CompanyInfoInput = {
  businessType?: InputMaybe<Scalars['String']['input']>;
  companyCity: Scalars['String']['input'];
  companyCountry: Scalars['String']['input'];
  companyCounty?: InputMaybe<Scalars['String']['input']>;
  companyName: Scalars['String']['input'];
  companyPostalCode: Scalars['String']['input'];
  companyStreet: Scalars['String']['input'];
  registrationNumber: Scalars['String']['input'];
  taxId: Scalars['String']['input'];
};

export enum CompanyStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum CompanyType {
  Business = 'BUSINESS',
  Individual = 'INDIVIDUAL'
}

export type CreateAddOnDefinitionInput = {
  addOn: ServiceAddOn;
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedHours: Scalars['Float']['input'];
  fixedPrice: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type CreateAddressInput = {
  accessInstructions?: InputMaybe<Scalars['String']['input']>;
  apartment?: InputMaybe<Scalars['String']['input']>;
  building?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  county?: InputMaybe<Scalars['String']['input']>;
  floor?: InputMaybe<Scalars['Int']['input']>;
  googlePlaceId: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type CreateAvailabilityInput = {
  date: Scalars['Time']['input'];
  endTime: Scalars['String']['input'];
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recurrenceEnd?: InputMaybe<Scalars['Time']['input']>;
  recurrencePattern?: InputMaybe<RecurrencePattern>;
  startTime: Scalars['String']['input'];
  type: AvailabilityType;
};

export type CreateBookingAddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  county?: InputMaybe<Scalars['String']['input']>;
  googlePlaceId?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  postalCode: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type CreateBookingInput = {
  address?: InputMaybe<CreateBookingAddressInput>;
  addressId?: InputMaybe<Scalars['ID']['input']>;
  cleanerProfileId: Scalars['ID']['input'];
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  scheduledDate: Scalars['Time']['input'];
  scheduledTime: Scalars['String']['input'];
  serviceAddOns?: InputMaybe<Array<ServiceAddOn>>;
  serviceFrequency: ServiceFrequency;
  serviceType: ServiceType;
  user?: InputMaybe<CreateBookingUserInput>;
};

export type CreateBookingUserInput = {
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type CreateCleanerInviteInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  expiresInDays?: InputMaybe<Scalars['Int']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCleanerProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  serviceAreaInputs: Array<CreateServiceAreaInput>;
};

export type CreateCompanyInput = {
  companyInfo: CompanyInfoInput;
  companyType: CompanyType;
  documents: ApplicationDocumentsInput;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePayoutBatchInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  periodEnd: Scalars['Time']['input'];
  periodStart: Scalars['Time']['input'];
};

export type CreateReviewInput = {
  bookingId: Scalars['ID']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  professionalismRating?: InputMaybe<Scalars['Int']['input']>;
  punctualityRating?: InputMaybe<Scalars['Int']['input']>;
  qualityRating?: InputMaybe<Scalars['Int']['input']>;
  rating: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  valueRating?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateServiceAreaInput = {
  city: Scalars['String']['input'];
  isPreferred?: InputMaybe<Scalars['Boolean']['input']>;
  neighborhood: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  travelFee?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateServiceDefinitionInput = {
  baseHours: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priceMultiplier: Scalars['Float']['input'];
  type: ServiceType;
};

export type FlagReviewInput = {
  reason: Scalars['String']['input'];
  reviewId: Scalars['ID']['input'];
};

export type ForwardPaginationInput = {
  after?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type ModerateReviewInput = {
  note?: InputMaybe<Scalars['String']['input']>;
  reviewId: Scalars['ID']['input'];
  status: ReviewStatus;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptCleanerInvite: AcceptCleanerInviteResult;
  addCleanerResponse: Review;
  addServiceArea: ServiceArea;
  approveCompany: Company;
  authWithIdentityProvider: AuthResult;
  authWithRefreshToken: AuthResult;
  bulkCreateAvailability: Array<Availability>;
  cancelBooking: Booking;
  completeBooking: Booking;
  confirmBooking: Booking;
  createAddOnDefinition: ServiceAddOnDefinition;
  createAddress: Address;
  createAvailability: Availability;
  createBooking: Booking;
  createCleanerInvite: CleanerInviteResult;
  createCleanerProfile: CleanerProfile;
  createCompany: Company;
  createPayoutBatch: PayoutBatch;
  createReview: Review;
  createServiceDefinition: ServiceDefinition;
  deleteAddress: Scalars['Void']['output'];
  deleteAvailability: Scalars['Void']['output'];
  deleteCleanerProfile: Scalars['Void']['output'];
  deleteCurrentUser: Scalars['Void']['output'];
  deleteReview: Scalars['Void']['output'];
  deleteServiceArea: Scalars['Void']['output'];
  flagReview: Review;
  markNoShow: Booking;
  markReviewHelpful: Review;
  moderateReview: Review;
  processPayoutBatch: PayoutBatch;
  rejectCompany: Company;
  revokeCleanerInvite: CleanerInvite;
  setDefaultAddress: Address;
  signOut: Scalars['Void']['output'];
  startBooking: Booking;
  updateAddOnDefinition: ServiceAddOnDefinition;
  updateAddress: Address;
  updateAvailability: Availability;
  updateBooking: Booking;
  updateCleanerProfile: CleanerProfile;
  updateCleanerTier: CleanerProfile;
  updateCompany: Company;
  updateCurrentUser: User;
  updateReview: Review;
  updateServiceArea: ServiceArea;
  updateServiceDefinition: ServiceDefinition;
};


export type MutationAcceptCleanerInviteArgs = {
  token: Scalars['String']['input'];
};


export type MutationAddCleanerResponseArgs = {
  input: AddCleanerResponseInput;
};


export type MutationAddServiceAreaArgs = {
  input: CreateServiceAreaInput;
};


export type MutationApproveCompanyArgs = {
  companyId: Scalars['ID']['input'];
};


export type MutationAuthWithIdentityProviderArgs = {
  code: Scalars['String']['input'];
  intent?: InputMaybe<Scalars['String']['input']>;
  kind: AuthIdentityKind;
};


export type MutationAuthWithRefreshTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationBulkCreateAvailabilityArgs = {
  inputs: Array<CreateAvailabilityInput>;
};


export type MutationCancelBookingArgs = {
  input: CancelBookingInput;
};


export type MutationCompleteBookingArgs = {
  cleanerNotes?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationConfirmBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateAddOnDefinitionArgs = {
  input: CreateAddOnDefinitionInput;
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateAvailabilityArgs = {
  input: CreateAvailabilityInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateCleanerInviteArgs = {
  input?: InputMaybe<CreateCleanerInviteInput>;
};


export type MutationCreateCleanerProfileArgs = {
  input: CreateCleanerProfileInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreatePayoutBatchArgs = {
  input: CreatePayoutBatchInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateServiceDefinitionArgs = {
  input: CreateServiceDefinitionInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAvailabilityArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteServiceAreaArgs = {
  id: Scalars['ID']['input'];
};


export type MutationFlagReviewArgs = {
  input: FlagReviewInput;
};


export type MutationMarkNoShowArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkReviewHelpfulArgs = {
  helpful: Scalars['Boolean']['input'];
  reviewId: Scalars['ID']['input'];
};


export type MutationModerateReviewArgs = {
  input: ModerateReviewInput;
};


export type MutationProcessPayoutBatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRejectCompanyArgs = {
  companyId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRevokeCleanerInviteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSetDefaultAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStartBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAddOnDefinitionArgs = {
  input: UpdateAddOnDefinitionInput;
};


export type MutationUpdateAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateAvailabilityArgs = {
  input: UpdateAvailabilityInput;
};


export type MutationUpdateBookingArgs = {
  input: UpdateBookingInput;
};


export type MutationUpdateCleanerProfileArgs = {
  input: UpdateCleanerProfileInput;
};


export type MutationUpdateCleanerTierArgs = {
  profileId: Scalars['ID']['input'];
  tier: CleanerTier;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateCurrentUserArgs = {
  input: UpdateCurrentUserInput;
};


export type MutationUpdateReviewArgs = {
  input: UpdateReviewInput;
};


export type MutationUpdateServiceAreaArgs = {
  input: UpdateServiceAreaInput;
};


export type MutationUpdateServiceDefinitionArgs = {
  input: UpdateServiceDefinitionInput;
};

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Card = 'CARD',
  Cash = 'CASH'
}

export type PayoutBatch = {
  __typename?: 'PayoutBatch';
  completedAt?: Maybe<Scalars['Time']['output']>;
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  initiatedBy: User;
  initiatedById: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  periodEnd: Scalars['Time']['output'];
  periodStart: Scalars['Time']['output'];
  processedAt?: Maybe<Scalars['Time']['output']>;
  status: TransactionStatus;
  totalAmount: Scalars['Int']['output'];
  totalPayouts: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type Query = {
  __typename?: 'Query';
  addOnDefinition?: Maybe<ServiceAddOnDefinition>;
  addOnDefinitions: Array<ServiceAddOnDefinition>;
  address?: Maybe<Address>;
  allBookings: BookingConnection;
  allTransactions: TransactionConnection;
  availability?: Maybe<Availability>;
  availabilityForCleaner: Array<Availability>;
  availableCleaners: Array<CleanerProfile>;
  booking?: Maybe<Booking>;
  calculateServicePrice: ServicePriceCalculation;
  cleanerInvite?: Maybe<CleanerInvite>;
  cleanerProfile?: Maybe<CleanerProfile>;
  cleanerProfileByUserId?: Maybe<CleanerProfile>;
  cleanersByPostalCode: Array<CleanerProfile>;
  cleanersInArea: Array<CleanerProfile>;
  companies: Array<Company>;
  company?: Maybe<Company>;
  currentUser?: Maybe<User>;
  generateDocumentSignedUrl: Scalars['String']['output'];
  isCleanerAvailable: Scalars['Boolean']['output'];
  myAddresses: Array<Address>;
  myAvailability: Array<Availability>;
  myBookings: BookingConnection;
  myCleanerProfile?: Maybe<CleanerProfile>;
  myCompany?: Maybe<Company>;
  myCompanyCleaners: Array<CleanerProfile>;
  myCompanyInvites: Array<CleanerInvite>;
  myDefaultAddress?: Maybe<Address>;
  myEarnings: CleanerEarnings;
  myJobs: BookingConnection;
  myReviews: ReviewConnection;
  myServiceAreas: Array<ServiceArea>;
  myTransactions: TransactionConnection;
  payoutBatch?: Maybe<PayoutBatch>;
  payoutBatches: Array<PayoutBatch>;
  pendingCompanies: Array<Company>;
  review?: Maybe<Review>;
  reviewByBooking?: Maybe<Review>;
  reviewsForCleaner: ReviewConnection;
  reviewsPendingModeration: Array<Review>;
  searchCleaners: CleanerProfileConnection;
  serviceArea?: Maybe<ServiceArea>;
  serviceAreasByCleanerProfile: Array<ServiceArea>;
  serviceDefinition?: Maybe<ServiceDefinition>;
  serviceDefinitions: Array<ServiceDefinition>;
  transaction?: Maybe<Transaction>;
  transactionByStripePaymentId?: Maybe<Transaction>;
  transactionsByBooking: Array<Transaction>;
  transactionsDueForPayout: Array<Transaction>;
  upcomingBookings: Array<Booking>;
  validateCleanerInviteToken: ValidateCleanerInviteResult;
};


export type QueryAddOnDefinitionArgs = {
  addOn: ServiceAddOn;
};


export type QueryAddOnDefinitionsArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAddressArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAllBookingsArgs = {
  filters?: InputMaybe<BookingFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAllTransactionsArgs = {
  filters?: InputMaybe<TransactionFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAvailabilityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAvailabilityForCleanerArgs = {
  cleanerProfileId: Scalars['ID']['input'];
  filters?: InputMaybe<AvailabilityFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAvailableCleanersArgs = {
  city: Scalars['String']['input'];
  date: Scalars['Time']['input'];
  duration: Scalars['Float']['input'];
  filters?: InputMaybe<CleanerProfileFiltersInput>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['String']['input'];
};


export type QueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCalculateServicePriceArgs = {
  input: CalculateServicePriceInput;
};


export type QueryCleanerInviteArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCleanerProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCleanerProfileByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryCleanersByPostalCodeArgs = {
  postalCode: Scalars['String']['input'];
};


export type QueryCleanersInAreaArgs = {
  city: Scalars['String']['input'];
  neighborhood: Scalars['String']['input'];
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGenerateDocumentSignedUrlArgs = {
  documentUrl: Scalars['String']['input'];
};


export type QueryIsCleanerAvailableArgs = {
  input: CheckAvailabilityInput;
};


export type QueryMyAvailabilityArgs = {
  filters?: InputMaybe<AvailabilityFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyBookingsArgs = {
  filters?: InputMaybe<BookingFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyEarningsArgs = {
  endDate?: InputMaybe<Scalars['Time']['input']>;
  startDate?: InputMaybe<Scalars['Time']['input']>;
};


export type QueryMyJobsArgs = {
  filters?: InputMaybe<BookingFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyReviewsArgs = {
  filters?: InputMaybe<ReviewFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMyTransactionsArgs = {
  filters?: InputMaybe<TransactionFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPayoutBatchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPayoutBatchesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReviewByBookingArgs = {
  bookingId: Scalars['ID']['input'];
};


export type QueryReviewsForCleanerArgs = {
  cleanerProfileId: Scalars['ID']['input'];
  filters?: InputMaybe<ReviewFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryReviewsPendingModerationArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchCleanersArgs = {
  filters?: InputMaybe<CleanerProfileFiltersInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
};


export type QueryServiceAreaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServiceAreasByCleanerProfileArgs = {
  cleanerProfileId: Scalars['ID']['input'];
};


export type QueryServiceDefinitionArgs = {
  type: ServiceType;
};


export type QueryServiceDefinitionsArgs = {
  activeOnly?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransactionByStripePaymentIdArgs = {
  stripePaymentId: Scalars['String']['input'];
};


export type QueryTransactionsByBookingArgs = {
  bookingId: Scalars['ID']['input'];
};


export type QueryTransactionsDueForPayoutArgs = {
  beforeDate: Scalars['Time']['input'];
};


export type QueryUpcomingBookingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryValidateCleanerInviteTokenArgs = {
  token: Scalars['String']['input'];
};

export enum RecurrencePattern {
  None = 'NONE',
  Weekly = 'WEEKLY'
}

export type Review = {
  __typename?: 'Review';
  booking: Booking;
  bookingId: Scalars['ID']['output'];
  cleaner: User;
  cleanerId: Scalars['ID']['output'];
  cleanerProfile: CleanerProfile;
  cleanerProfileId: Scalars['ID']['output'];
  cleanerResponse?: Maybe<Scalars['String']['output']>;
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Time']['output'];
  customer: User;
  customerId: Scalars['ID']['output'];
  flagReason?: Maybe<Scalars['String']['output']>;
  helpfulCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  moderatedAt?: Maybe<Scalars['Time']['output']>;
  moderatedBy?: Maybe<User>;
  moderatedById?: Maybe<Scalars['ID']['output']>;
  moderationNote?: Maybe<Scalars['String']['output']>;
  notHelpfulCount: Scalars['Int']['output'];
  professionalismRating?: Maybe<Scalars['Int']['output']>;
  punctualityRating?: Maybe<Scalars['Int']['output']>;
  qualityRating?: Maybe<Scalars['Int']['output']>;
  rating: Scalars['Int']['output'];
  respondedAt?: Maybe<Scalars['Time']['output']>;
  status: ReviewStatus;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Time']['output'];
  valueRating?: Maybe<Scalars['Int']['output']>;
};

export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  averageRating: Scalars['Float']['output'];
  edges: Array<ReviewEdge>;
  totalCount: Scalars['Int']['output'];
};

export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  cursor: Scalars['ID']['output'];
  node: Review;
};

export type ReviewFiltersInput = {
  hasComment?: InputMaybe<Scalars['Boolean']['input']>;
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  minRating?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ReviewStatus>;
};

export enum ReviewStatus {
  Approved = 'APPROVED',
  Flagged = 'FLAGGED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum ServiceAddOn {
  Fridge = 'FRIDGE',
  Garage = 'GARAGE',
  Oven = 'OVEN',
  Windows = 'WINDOWS'
}

export type ServiceAddOnDefinition = {
  __typename?: 'ServiceAddOnDefinition';
  addOn: ServiceAddOn;
  createdAt: Scalars['Time']['output'];
  description?: Maybe<Scalars['String']['output']>;
  estimatedHours: Scalars['Float']['output'];
  fixedPrice: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type ServiceArea = {
  __typename?: 'ServiceArea';
  city: Scalars['String']['output'];
  cleanerProfile: CleanerProfile;
  cleanerProfileId: Scalars['ID']['output'];
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  isPreferred: Scalars['Boolean']['output'];
  neighborhood: Scalars['String']['output'];
  postalCode: Scalars['String']['output'];
  travelFee: Scalars['Int']['output'];
  updatedAt: Scalars['Time']['output'];
};

export type ServiceDefinition = {
  __typename?: 'ServiceDefinition';
  baseHours: Scalars['Float']['output'];
  createdAt: Scalars['Time']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  priceMultiplier: Scalars['Float']['output'];
  type: ServiceType;
  updatedAt: Scalars['Time']['output'];
};

export enum ServiceFrequency {
  BiMonthly = 'BI_MONTHLY',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Weekly = 'WEEKLY'
}

export type ServicePriceCalculation = {
  __typename?: 'ServicePriceCalculation';
  addOnsPrice: Scalars['Int']['output'];
  cleanerPayout: Scalars['Int']['output'];
  estimatedDuration: Scalars['Float']['output'];
  platformFee: Scalars['Int']['output'];
  servicePrice: Scalars['Int']['output'];
  totalPrice: Scalars['Int']['output'];
  travelFee: Scalars['Int']['output'];
};

export enum ServiceType {
  Deep = 'DEEP',
  General = 'GENERAL',
  MoveInOut = 'MOVE_IN_OUT'
}

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Int']['output'];
  booking?: Maybe<Booking>;
  bookingId?: Maybe<Scalars['ID']['output']>;
  completedAt?: Maybe<Scalars['Time']['output']>;
  createdAt: Scalars['Time']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  failedAt?: Maybe<Scalars['Time']['output']>;
  failureCode?: Maybe<Scalars['String']['output']>;
  failureReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  netAmount: Scalars['Int']['output'];
  payee: User;
  payeeId: Scalars['ID']['output'];
  payer: User;
  payerId: Scalars['ID']['output'];
  paymentMethod: PaymentMethod;
  platformFee: Scalars['Int']['output'];
  processedAt: Scalars['Time']['output'];
  status: TransactionStatus;
  stripePaymentId?: Maybe<Scalars['String']['output']>;
  stripeRefundId?: Maybe<Scalars['String']['output']>;
  stripeTransferId?: Maybe<Scalars['String']['output']>;
  type: TransactionType;
  updatedAt: Scalars['Time']['output'];
};

export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  edges: Array<TransactionEdge>;
  totalAmount: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  cursor: Scalars['ID']['output'];
  node: Transaction;
};

export type TransactionFiltersInput = {
  endDate?: InputMaybe<Scalars['Time']['input']>;
  maxAmount?: InputMaybe<Scalars['Int']['input']>;
  minAmount?: InputMaybe<Scalars['Int']['input']>;
  paymentMethod?: InputMaybe<PaymentMethod>;
  startDate?: InputMaybe<Scalars['Time']['input']>;
  status?: InputMaybe<TransactionStatus>;
  type?: InputMaybe<TransactionType>;
};

export enum TransactionStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING'
}

export enum TransactionType {
  Payment = 'PAYMENT',
  Payout = 'PAYOUT',
  Refund = 'REFUND'
}

export type UpdateAddOnDefinitionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  estimatedHours?: InputMaybe<Scalars['Float']['input']>;
  fixedPrice?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAddressInput = {
  accessInstructions?: InputMaybe<Scalars['String']['input']>;
  apartment?: InputMaybe<Scalars['String']['input']>;
  building?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  county?: InputMaybe<Scalars['String']['input']>;
  floor?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAvailabilityInput = {
  date?: InputMaybe<Scalars['Time']['input']>;
  endTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isRecurring?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  recurrenceEnd?: InputMaybe<Scalars['Time']['input']>;
  recurrencePattern?: InputMaybe<RecurrencePattern>;
  startTime?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AvailabilityType>;
};

export type UpdateBookingInput = {
  cleanerNotes?: InputMaybe<Scalars['String']['input']>;
  customerNotes?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  scheduledDate?: InputMaybe<Scalars['Time']['input']>;
  scheduledTime?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCleanerProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAvailableToday?: InputMaybe<Scalars['Boolean']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompanyInput = {
  businessType?: InputMaybe<Scalars['String']['input']>;
  companyCity?: InputMaybe<Scalars['String']['input']>;
  companyCounty?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companyPostalCode?: InputMaybe<Scalars['String']['input']>;
  companyStreet?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCurrentUserInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReviewInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  professionalismRating?: InputMaybe<Scalars['Int']['input']>;
  punctualityRating?: InputMaybe<Scalars['Int']['input']>;
  qualityRating?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  valueRating?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateServiceAreaInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPreferred?: InputMaybe<Scalars['Boolean']['input']>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  travelFee?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateServiceDefinitionInput = {
  baseHours?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priceMultiplier?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  cleanerProfile?: Maybe<CleanerProfile>;
  company?: Maybe<Company>;
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
  CleanerAdmin = 'CLEANER_ADMIN',
  Client = 'CLIENT',
  GlobalAdmin = 'GLOBAL_ADMIN'
}

export type ValidateCleanerInviteResult = {
  __typename?: 'ValidateCleanerInviteResult';
  company?: Maybe<Company>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  invite?: Maybe<CleanerInvite>;
  valid: Scalars['Boolean']['output'];
};

export type AuthWithIdentityProviderMutationVariables = Exact<{
  code: Scalars['String']['input'];
  kind: AuthIdentityKind;
  intent?: InputMaybe<Scalars['String']['input']>;
}>;


export type AuthWithIdentityProviderMutation = { __typename?: 'Mutation', authWithIdentityProvider: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type AuthWithRefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type AuthWithRefreshTokenMutation = { __typename?: 'Mutation', authWithRefreshToken: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, displayName: string, role: UserRole, email: string, company?: { __typename?: 'Company', id: string, status: CompanyStatus, companyName: string, rejectionReason?: string | null } | null, cleanerProfile?: { __typename?: 'CleanerProfile', id: string, tier: CleanerTier, isActive: boolean, isVerified: boolean } | null } | null };

export type ValidateCleanerInviteTokenQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type ValidateCleanerInviteTokenQuery = { __typename?: 'Query', validateCleanerInviteToken: { __typename?: 'ValidateCleanerInviteResult', valid: boolean, errorMessage?: string | null, invite?: { __typename?: 'CleanerInvite', id: string, token: string, email?: string | null, message?: string | null, status: CleanerInviteStatus, expiresAt: string, createdAt: string } | null, company?: { __typename?: 'Company', id: string, companyName: string, companyCity: string, businessType?: string | null } | null } };

export type MyCompanyInvitesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCompanyInvitesQuery = { __typename?: 'Query', myCompanyInvites: Array<{ __typename?: 'CleanerInvite', id: string, token: string, email?: string | null, message?: string | null, status: CleanerInviteStatus, acceptedAt?: string | null, expiresAt: string, createdAt: string, acceptedBy?: { __typename?: 'User', id: string, displayName: string, email: string } | null }> };

export type MyCompanyCleanersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCompanyCleanersQuery = { __typename?: 'Query', myCompanyCleaners: Array<{ __typename?: 'CleanerProfile', id: string, bio?: string | null, profilePicture?: string | null, tier: CleanerTier, totalBookings: number, completedBookings: number, averageRating: number, totalReviews: number, isActive: boolean, isVerified: boolean, createdAt: string, user: { __typename?: 'User', id: string, displayName: string, email: string } }> };

export type CleanerInviteQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CleanerInviteQuery = { __typename?: 'Query', cleanerInvite?: { __typename?: 'CleanerInvite', id: string, token: string, email?: string | null, message?: string | null, status: CleanerInviteStatus, acceptedAt?: string | null, expiresAt: string, createdAt: string, company: { __typename?: 'Company', id: string, companyName: string }, createdBy: { __typename?: 'User', id: string, displayName: string }, acceptedBy?: { __typename?: 'User', id: string, displayName: string, email: string } | null } | null };

export type CreateCleanerInviteMutationVariables = Exact<{
  input?: InputMaybe<CreateCleanerInviteInput>;
}>;


export type CreateCleanerInviteMutation = { __typename?: 'Mutation', createCleanerInvite: { __typename?: 'CleanerInviteResult', inviteUrl: string, invite: { __typename?: 'CleanerInvite', id: string, token: string, email?: string | null, message?: string | null, status: CleanerInviteStatus, expiresAt: string, createdAt: string } } };

export type AcceptCleanerInviteMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type AcceptCleanerInviteMutation = { __typename?: 'Mutation', acceptCleanerInvite: { __typename?: 'AcceptCleanerInviteResult', success: boolean, user: { __typename?: 'User', id: string, displayName: string, email: string, role: UserRole }, company: { __typename?: 'Company', id: string, companyName: string } } };

export type RevokeCleanerInviteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RevokeCleanerInviteMutation = { __typename?: 'Mutation', revokeCleanerInvite: { __typename?: 'CleanerInvite', id: string, status: CleanerInviteStatus } };

export type MyCleanerProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCleanerProfileQuery = { __typename?: 'Query', myCleanerProfile?: { __typename?: 'CleanerProfile', id: string, userId: string, companyId?: string | null, bio?: string | null, profilePicture?: string | null, tier: CleanerTier, isActive: boolean, isVerified: boolean, isAvailableToday: boolean, averageRating: number, totalReviews: number, totalBookings: number, completedBookings: number, createdAt: string, company?: { __typename?: 'Company', id: string, companyName: string } | null, serviceAreas: Array<{ __typename?: 'ServiceArea', id: string, city: string, neighborhood: string, postalCode: string, travelFee: number, isPreferred: boolean }> } | null };

export type CreateCleanerProfileMutationVariables = Exact<{
  input: CreateCleanerProfileInput;
}>;


export type CreateCleanerProfileMutation = { __typename?: 'Mutation', createCleanerProfile: { __typename?: 'CleanerProfile', id: string, userId: string, companyId?: string | null, bio?: string | null, tier: CleanerTier, isActive: boolean, createdAt: string, company?: { __typename?: 'Company', id: string, companyName: string } | null, serviceAreas: Array<{ __typename?: 'ServiceArea', id: string, city: string, neighborhood: string, postalCode: string }> } };

export type UpdateCleanerProfileMutationVariables = Exact<{
  input: UpdateCleanerProfileInput;
}>;


export type UpdateCleanerProfileMutation = { __typename?: 'Mutation', updateCleanerProfile: { __typename?: 'CleanerProfile', id: string, bio?: string | null, profilePicture?: string | null, isActive: boolean, isAvailableToday: boolean } };

export type MyCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCompanyQuery = { __typename?: 'Query', myCompany?: { __typename?: 'Company', id: string, companyType: CompanyType, status: CompanyStatus, rejectionReason?: string | null, companyName: string, registrationNumber: string, taxId: string, companyStreet: string, companyCity: string, companyPostalCode: string, companyCounty?: string | null, companyCountry: string, businessType?: string | null, message?: string | null, isActive: boolean, totalCleaners: number, activeCleaners: number, createdAt: string, updatedAt: string, documents?: { __typename?: 'ApplicationDocuments', identityDocumentUrl: string, businessRegistrationUrl?: string | null, insuranceCertificateUrl?: string | null, additionalDocuments?: Array<string> | null } | null } | null };

export type CompanyQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompanyQuery = { __typename?: 'Query', company?: { __typename?: 'Company', id: string, companyType: CompanyType, status: CompanyStatus, rejectionReason?: string | null, companyName: string, registrationNumber: string, taxId: string, companyStreet: string, companyCity: string, companyPostalCode: string, companyCounty?: string | null, companyCountry: string, businessType?: string | null, message?: string | null, isActive: boolean, totalCleaners: number, activeCleaners: number, createdAt: string, updatedAt: string, documents?: { __typename?: 'ApplicationDocuments', identityDocumentUrl: string, businessRegistrationUrl?: string | null, insuranceCertificateUrl?: string | null, additionalDocuments?: Array<string> | null } | null, adminUser: { __typename?: 'User', id: string, displayName: string, email: string } } | null };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies: Array<{ __typename?: 'Company', id: string, companyType: CompanyType, status: CompanyStatus, companyName: string, registrationNumber: string, taxId: string, companyCity: string, businessType?: string | null, isActive: boolean, totalCleaners: number, activeCleaners: number, createdAt: string, adminUser: { __typename?: 'User', id: string, displayName: string, email: string } }> };

export type PendingCompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingCompaniesQuery = { __typename?: 'Query', pendingCompanies: Array<{ __typename?: 'Company', id: string, companyType: CompanyType, status: CompanyStatus, companyName: string, registrationNumber: string, taxId: string, companyStreet: string, companyCity: string, companyPostalCode: string, companyCounty?: string | null, companyCountry: string, businessType?: string | null, message?: string | null, createdAt: string, documents?: { __typename?: 'ApplicationDocuments', identityDocumentUrl: string, businessRegistrationUrl?: string | null, insuranceCertificateUrl?: string | null, additionalDocuments?: Array<string> | null } | null, adminUser: { __typename?: 'User', id: string, displayName: string, email: string } }> };

export type GenerateDocumentSignedUrlQueryVariables = Exact<{
  documentUrl: Scalars['String']['input'];
}>;


export type GenerateDocumentSignedUrlQuery = { __typename?: 'Query', generateDocumentSignedUrl: string };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: string, companyType: CompanyType, status: CompanyStatus, companyName: string, registrationNumber: string, taxId: string, companyStreet: string, companyCity: string, companyPostalCode: string, companyCounty?: string | null, companyCountry: string, businessType?: string | null, message?: string | null, createdAt: string, documents?: { __typename?: 'ApplicationDocuments', identityDocumentUrl: string, businessRegistrationUrl?: string | null, insuranceCertificateUrl?: string | null, additionalDocuments?: Array<string> | null } | null } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string, companyName: string, companyStreet: string, companyCity: string, companyPostalCode: string, companyCounty?: string | null, businessType?: string | null, isActive: boolean, updatedAt: string } };

export type ApproveCompanyMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type ApproveCompanyMutation = { __typename?: 'Mutation', approveCompany: { __typename?: 'Company', id: string, status: CompanyStatus, companyName: string } };

export type RejectCompanyMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type RejectCompanyMutation = { __typename?: 'Mutation', rejectCompany: { __typename?: 'Company', id: string, status: CompanyStatus, rejectionReason?: string | null, companyName: string } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: null };

export type DeleteCurrentUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteCurrentUserMutation = { __typename?: 'Mutation', deleteCurrentUser: null };

export type UpdateCurrentUserMutationVariables = Exact<{
  input: UpdateCurrentUserInput;
}>;


export type UpdateCurrentUserMutation = { __typename?: 'Mutation', updateCurrentUser: { __typename?: 'User', id: string, displayName: string, email: string, role: UserRole } };


export const AuthWithIdentityProviderDocument = gql`
    mutation AuthWithIdentityProvider($code: String!, $kind: AuthIdentityKind!, $intent: String) {
  authWithIdentityProvider(code: $code, kind: $kind, intent: $intent) {
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
 *      intent: // value for 'intent'
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
    company {
      id
      status
      companyName
      rejectionReason
    }
    cleanerProfile {
      id
      tier
      isActive
      isVerified
    }
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
export const ValidateCleanerInviteTokenDocument = gql`
    query ValidateCleanerInviteToken($token: String!) {
  validateCleanerInviteToken(token: $token) {
    valid
    invite {
      id
      token
      email
      message
      status
      expiresAt
      createdAt
    }
    company {
      id
      companyName
      companyCity
      businessType
    }
    errorMessage
  }
}
    `;

/**
 * __useValidateCleanerInviteTokenQuery__
 *
 * To run a query within a React component, call `useValidateCleanerInviteTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateCleanerInviteTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateCleanerInviteTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useValidateCleanerInviteTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables> & ({ variables: ValidateCleanerInviteTokenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables>(ValidateCleanerInviteTokenDocument, options);
      }
export function useValidateCleanerInviteTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables>(ValidateCleanerInviteTokenDocument, options);
        }
export function useValidateCleanerInviteTokenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables>(ValidateCleanerInviteTokenDocument, options);
        }
export type ValidateCleanerInviteTokenQueryHookResult = ReturnType<typeof useValidateCleanerInviteTokenQuery>;
export type ValidateCleanerInviteTokenLazyQueryHookResult = ReturnType<typeof useValidateCleanerInviteTokenLazyQuery>;
export type ValidateCleanerInviteTokenSuspenseQueryHookResult = ReturnType<typeof useValidateCleanerInviteTokenSuspenseQuery>;
export type ValidateCleanerInviteTokenQueryResult = Apollo.QueryResult<ValidateCleanerInviteTokenQuery, ValidateCleanerInviteTokenQueryVariables>;
export const MyCompanyInvitesDocument = gql`
    query MyCompanyInvites {
  myCompanyInvites {
    id
    token
    email
    message
    status
    acceptedBy {
      id
      displayName
      email
    }
    acceptedAt
    expiresAt
    createdAt
  }
}
    `;

/**
 * __useMyCompanyInvitesQuery__
 *
 * To run a query within a React component, call `useMyCompanyInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCompanyInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCompanyInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCompanyInvitesQuery(baseOptions?: Apollo.QueryHookOptions<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>(MyCompanyInvitesDocument, options);
      }
export function useMyCompanyInvitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>(MyCompanyInvitesDocument, options);
        }
export function useMyCompanyInvitesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>(MyCompanyInvitesDocument, options);
        }
export type MyCompanyInvitesQueryHookResult = ReturnType<typeof useMyCompanyInvitesQuery>;
export type MyCompanyInvitesLazyQueryHookResult = ReturnType<typeof useMyCompanyInvitesLazyQuery>;
export type MyCompanyInvitesSuspenseQueryHookResult = ReturnType<typeof useMyCompanyInvitesSuspenseQuery>;
export type MyCompanyInvitesQueryResult = Apollo.QueryResult<MyCompanyInvitesQuery, MyCompanyInvitesQueryVariables>;
export const MyCompanyCleanersDocument = gql`
    query MyCompanyCleaners {
  myCompanyCleaners {
    id
    bio
    profilePicture
    tier
    totalBookings
    completedBookings
    averageRating
    totalReviews
    isActive
    isVerified
    user {
      id
      displayName
      email
    }
    createdAt
  }
}
    `;

/**
 * __useMyCompanyCleanersQuery__
 *
 * To run a query within a React component, call `useMyCompanyCleanersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCompanyCleanersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCompanyCleanersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCompanyCleanersQuery(baseOptions?: Apollo.QueryHookOptions<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>(MyCompanyCleanersDocument, options);
      }
export function useMyCompanyCleanersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>(MyCompanyCleanersDocument, options);
        }
export function useMyCompanyCleanersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>(MyCompanyCleanersDocument, options);
        }
export type MyCompanyCleanersQueryHookResult = ReturnType<typeof useMyCompanyCleanersQuery>;
export type MyCompanyCleanersLazyQueryHookResult = ReturnType<typeof useMyCompanyCleanersLazyQuery>;
export type MyCompanyCleanersSuspenseQueryHookResult = ReturnType<typeof useMyCompanyCleanersSuspenseQuery>;
export type MyCompanyCleanersQueryResult = Apollo.QueryResult<MyCompanyCleanersQuery, MyCompanyCleanersQueryVariables>;
export const CleanerInviteDocument = gql`
    query CleanerInvite($id: ID!) {
  cleanerInvite(id: $id) {
    id
    token
    email
    message
    status
    company {
      id
      companyName
    }
    createdBy {
      id
      displayName
    }
    acceptedBy {
      id
      displayName
      email
    }
    acceptedAt
    expiresAt
    createdAt
  }
}
    `;

/**
 * __useCleanerInviteQuery__
 *
 * To run a query within a React component, call `useCleanerInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useCleanerInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCleanerInviteQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCleanerInviteQuery(baseOptions: Apollo.QueryHookOptions<CleanerInviteQuery, CleanerInviteQueryVariables> & ({ variables: CleanerInviteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CleanerInviteQuery, CleanerInviteQueryVariables>(CleanerInviteDocument, options);
      }
export function useCleanerInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CleanerInviteQuery, CleanerInviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CleanerInviteQuery, CleanerInviteQueryVariables>(CleanerInviteDocument, options);
        }
export function useCleanerInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CleanerInviteQuery, CleanerInviteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CleanerInviteQuery, CleanerInviteQueryVariables>(CleanerInviteDocument, options);
        }
export type CleanerInviteQueryHookResult = ReturnType<typeof useCleanerInviteQuery>;
export type CleanerInviteLazyQueryHookResult = ReturnType<typeof useCleanerInviteLazyQuery>;
export type CleanerInviteSuspenseQueryHookResult = ReturnType<typeof useCleanerInviteSuspenseQuery>;
export type CleanerInviteQueryResult = Apollo.QueryResult<CleanerInviteQuery, CleanerInviteQueryVariables>;
export const CreateCleanerInviteDocument = gql`
    mutation CreateCleanerInvite($input: CreateCleanerInviteInput) {
  createCleanerInvite(input: $input) {
    invite {
      id
      token
      email
      message
      status
      expiresAt
      createdAt
    }
    inviteUrl
  }
}
    `;
export type CreateCleanerInviteMutationFn = Apollo.MutationFunction<CreateCleanerInviteMutation, CreateCleanerInviteMutationVariables>;

/**
 * __useCreateCleanerInviteMutation__
 *
 * To run a mutation, you first call `useCreateCleanerInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCleanerInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCleanerInviteMutation, { data, loading, error }] = useCreateCleanerInviteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCleanerInviteMutation(baseOptions?: Apollo.MutationHookOptions<CreateCleanerInviteMutation, CreateCleanerInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCleanerInviteMutation, CreateCleanerInviteMutationVariables>(CreateCleanerInviteDocument, options);
      }
export type CreateCleanerInviteMutationHookResult = ReturnType<typeof useCreateCleanerInviteMutation>;
export type CreateCleanerInviteMutationResult = Apollo.MutationResult<CreateCleanerInviteMutation>;
export type CreateCleanerInviteMutationOptions = Apollo.BaseMutationOptions<CreateCleanerInviteMutation, CreateCleanerInviteMutationVariables>;
export const AcceptCleanerInviteDocument = gql`
    mutation AcceptCleanerInvite($token: String!) {
  acceptCleanerInvite(token: $token) {
    success
    user {
      id
      displayName
      email
      role
    }
    company {
      id
      companyName
    }
  }
}
    `;
export type AcceptCleanerInviteMutationFn = Apollo.MutationFunction<AcceptCleanerInviteMutation, AcceptCleanerInviteMutationVariables>;

/**
 * __useAcceptCleanerInviteMutation__
 *
 * To run a mutation, you first call `useAcceptCleanerInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptCleanerInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptCleanerInviteMutation, { data, loading, error }] = useAcceptCleanerInviteMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAcceptCleanerInviteMutation(baseOptions?: Apollo.MutationHookOptions<AcceptCleanerInviteMutation, AcceptCleanerInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptCleanerInviteMutation, AcceptCleanerInviteMutationVariables>(AcceptCleanerInviteDocument, options);
      }
export type AcceptCleanerInviteMutationHookResult = ReturnType<typeof useAcceptCleanerInviteMutation>;
export type AcceptCleanerInviteMutationResult = Apollo.MutationResult<AcceptCleanerInviteMutation>;
export type AcceptCleanerInviteMutationOptions = Apollo.BaseMutationOptions<AcceptCleanerInviteMutation, AcceptCleanerInviteMutationVariables>;
export const RevokeCleanerInviteDocument = gql`
    mutation RevokeCleanerInvite($id: ID!) {
  revokeCleanerInvite(id: $id) {
    id
    status
  }
}
    `;
export type RevokeCleanerInviteMutationFn = Apollo.MutationFunction<RevokeCleanerInviteMutation, RevokeCleanerInviteMutationVariables>;

/**
 * __useRevokeCleanerInviteMutation__
 *
 * To run a mutation, you first call `useRevokeCleanerInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeCleanerInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeCleanerInviteMutation, { data, loading, error }] = useRevokeCleanerInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRevokeCleanerInviteMutation(baseOptions?: Apollo.MutationHookOptions<RevokeCleanerInviteMutation, RevokeCleanerInviteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeCleanerInviteMutation, RevokeCleanerInviteMutationVariables>(RevokeCleanerInviteDocument, options);
      }
export type RevokeCleanerInviteMutationHookResult = ReturnType<typeof useRevokeCleanerInviteMutation>;
export type RevokeCleanerInviteMutationResult = Apollo.MutationResult<RevokeCleanerInviteMutation>;
export type RevokeCleanerInviteMutationOptions = Apollo.BaseMutationOptions<RevokeCleanerInviteMutation, RevokeCleanerInviteMutationVariables>;
export const MyCleanerProfileDocument = gql`
    query MyCleanerProfile {
  myCleanerProfile {
    id
    userId
    companyId
    bio
    profilePicture
    tier
    isActive
    isVerified
    isAvailableToday
    averageRating
    totalReviews
    totalBookings
    completedBookings
    createdAt
    company {
      id
      companyName
    }
    serviceAreas {
      id
      city
      neighborhood
      postalCode
      travelFee
      isPreferred
    }
  }
}
    `;

/**
 * __useMyCleanerProfileQuery__
 *
 * To run a query within a React component, call `useMyCleanerProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCleanerProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCleanerProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCleanerProfileQuery(baseOptions?: Apollo.QueryHookOptions<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>(MyCleanerProfileDocument, options);
      }
export function useMyCleanerProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>(MyCleanerProfileDocument, options);
        }
export function useMyCleanerProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>(MyCleanerProfileDocument, options);
        }
export type MyCleanerProfileQueryHookResult = ReturnType<typeof useMyCleanerProfileQuery>;
export type MyCleanerProfileLazyQueryHookResult = ReturnType<typeof useMyCleanerProfileLazyQuery>;
export type MyCleanerProfileSuspenseQueryHookResult = ReturnType<typeof useMyCleanerProfileSuspenseQuery>;
export type MyCleanerProfileQueryResult = Apollo.QueryResult<MyCleanerProfileQuery, MyCleanerProfileQueryVariables>;
export const CreateCleanerProfileDocument = gql`
    mutation CreateCleanerProfile($input: CreateCleanerProfileInput!) {
  createCleanerProfile(input: $input) {
    id
    userId
    companyId
    bio
    tier
    isActive
    createdAt
    company {
      id
      companyName
    }
    serviceAreas {
      id
      city
      neighborhood
      postalCode
    }
  }
}
    `;
export type CreateCleanerProfileMutationFn = Apollo.MutationFunction<CreateCleanerProfileMutation, CreateCleanerProfileMutationVariables>;

/**
 * __useCreateCleanerProfileMutation__
 *
 * To run a mutation, you first call `useCreateCleanerProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCleanerProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCleanerProfileMutation, { data, loading, error }] = useCreateCleanerProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCleanerProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateCleanerProfileMutation, CreateCleanerProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCleanerProfileMutation, CreateCleanerProfileMutationVariables>(CreateCleanerProfileDocument, options);
      }
export type CreateCleanerProfileMutationHookResult = ReturnType<typeof useCreateCleanerProfileMutation>;
export type CreateCleanerProfileMutationResult = Apollo.MutationResult<CreateCleanerProfileMutation>;
export type CreateCleanerProfileMutationOptions = Apollo.BaseMutationOptions<CreateCleanerProfileMutation, CreateCleanerProfileMutationVariables>;
export const UpdateCleanerProfileDocument = gql`
    mutation UpdateCleanerProfile($input: UpdateCleanerProfileInput!) {
  updateCleanerProfile(input: $input) {
    id
    bio
    profilePicture
    isActive
    isAvailableToday
  }
}
    `;
export type UpdateCleanerProfileMutationFn = Apollo.MutationFunction<UpdateCleanerProfileMutation, UpdateCleanerProfileMutationVariables>;

/**
 * __useUpdateCleanerProfileMutation__
 *
 * To run a mutation, you first call `useUpdateCleanerProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCleanerProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCleanerProfileMutation, { data, loading, error }] = useUpdateCleanerProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCleanerProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCleanerProfileMutation, UpdateCleanerProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCleanerProfileMutation, UpdateCleanerProfileMutationVariables>(UpdateCleanerProfileDocument, options);
      }
export type UpdateCleanerProfileMutationHookResult = ReturnType<typeof useUpdateCleanerProfileMutation>;
export type UpdateCleanerProfileMutationResult = Apollo.MutationResult<UpdateCleanerProfileMutation>;
export type UpdateCleanerProfileMutationOptions = Apollo.BaseMutationOptions<UpdateCleanerProfileMutation, UpdateCleanerProfileMutationVariables>;
export const MyCompanyDocument = gql`
    query MyCompany {
  myCompany {
    id
    companyType
    status
    rejectionReason
    companyName
    registrationNumber
    taxId
    companyStreet
    companyCity
    companyPostalCode
    companyCounty
    companyCountry
    businessType
    documents {
      identityDocumentUrl
      businessRegistrationUrl
      insuranceCertificateUrl
      additionalDocuments
    }
    message
    isActive
    totalCleaners
    activeCleaners
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMyCompanyQuery__
 *
 * To run a query within a React component, call `useMyCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCompanyQuery(baseOptions?: Apollo.QueryHookOptions<MyCompanyQuery, MyCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCompanyQuery, MyCompanyQueryVariables>(MyCompanyDocument, options);
      }
export function useMyCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCompanyQuery, MyCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCompanyQuery, MyCompanyQueryVariables>(MyCompanyDocument, options);
        }
export function useMyCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyCompanyQuery, MyCompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyCompanyQuery, MyCompanyQueryVariables>(MyCompanyDocument, options);
        }
export type MyCompanyQueryHookResult = ReturnType<typeof useMyCompanyQuery>;
export type MyCompanyLazyQueryHookResult = ReturnType<typeof useMyCompanyLazyQuery>;
export type MyCompanySuspenseQueryHookResult = ReturnType<typeof useMyCompanySuspenseQuery>;
export type MyCompanyQueryResult = Apollo.QueryResult<MyCompanyQuery, MyCompanyQueryVariables>;
export const CompanyDocument = gql`
    query Company($id: ID!) {
  company(id: $id) {
    id
    companyType
    status
    rejectionReason
    companyName
    registrationNumber
    taxId
    companyStreet
    companyCity
    companyPostalCode
    companyCounty
    companyCountry
    businessType
    documents {
      identityDocumentUrl
      businessRegistrationUrl
      insuranceCertificateUrl
      additionalDocuments
    }
    message
    isActive
    totalCleaners
    activeCleaners
    adminUser {
      id
      displayName
      email
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCompanyQuery__
 *
 * To run a query within a React component, call `useCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompanyQuery(baseOptions: Apollo.QueryHookOptions<CompanyQuery, CompanyQueryVariables> & ({ variables: CompanyQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, options);
      }
export function useCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, options);
        }
export function useCompanySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompanyQuery, CompanyQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompanyQuery, CompanyQueryVariables>(CompanyDocument, options);
        }
export type CompanyQueryHookResult = ReturnType<typeof useCompanyQuery>;
export type CompanyLazyQueryHookResult = ReturnType<typeof useCompanyLazyQuery>;
export type CompanySuspenseQueryHookResult = ReturnType<typeof useCompanySuspenseQuery>;
export type CompanyQueryResult = Apollo.QueryResult<CompanyQuery, CompanyQueryVariables>;
export const CompaniesDocument = gql`
    query Companies {
  companies {
    id
    companyType
    status
    companyName
    registrationNumber
    taxId
    companyCity
    businessType
    isActive
    totalCleaners
    activeCleaners
    adminUser {
      id
      displayName
      email
    }
    createdAt
  }
}
    `;

/**
 * __useCompaniesQuery__
 *
 * To run a query within a React component, call `useCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
      }
export function useCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
        }
export function useCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompaniesQuery, CompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompaniesQuery, CompaniesQueryVariables>(CompaniesDocument, options);
        }
export type CompaniesQueryHookResult = ReturnType<typeof useCompaniesQuery>;
export type CompaniesLazyQueryHookResult = ReturnType<typeof useCompaniesLazyQuery>;
export type CompaniesSuspenseQueryHookResult = ReturnType<typeof useCompaniesSuspenseQuery>;
export type CompaniesQueryResult = Apollo.QueryResult<CompaniesQuery, CompaniesQueryVariables>;
export const PendingCompaniesDocument = gql`
    query PendingCompanies {
  pendingCompanies {
    id
    companyType
    status
    companyName
    registrationNumber
    taxId
    companyStreet
    companyCity
    companyPostalCode
    companyCounty
    companyCountry
    businessType
    documents {
      identityDocumentUrl
      businessRegistrationUrl
      insuranceCertificateUrl
      additionalDocuments
    }
    message
    adminUser {
      id
      displayName
      email
    }
    createdAt
  }
}
    `;

/**
 * __usePendingCompaniesQuery__
 *
 * To run a query within a React component, call `usePendingCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingCompaniesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingCompaniesQuery(baseOptions?: Apollo.QueryHookOptions<PendingCompaniesQuery, PendingCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingCompaniesQuery, PendingCompaniesQueryVariables>(PendingCompaniesDocument, options);
      }
export function usePendingCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingCompaniesQuery, PendingCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingCompaniesQuery, PendingCompaniesQueryVariables>(PendingCompaniesDocument, options);
        }
export function usePendingCompaniesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PendingCompaniesQuery, PendingCompaniesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PendingCompaniesQuery, PendingCompaniesQueryVariables>(PendingCompaniesDocument, options);
        }
export type PendingCompaniesQueryHookResult = ReturnType<typeof usePendingCompaniesQuery>;
export type PendingCompaniesLazyQueryHookResult = ReturnType<typeof usePendingCompaniesLazyQuery>;
export type PendingCompaniesSuspenseQueryHookResult = ReturnType<typeof usePendingCompaniesSuspenseQuery>;
export type PendingCompaniesQueryResult = Apollo.QueryResult<PendingCompaniesQuery, PendingCompaniesQueryVariables>;
export const GenerateDocumentSignedUrlDocument = gql`
    query GenerateDocumentSignedUrl($documentUrl: String!) {
  generateDocumentSignedUrl(documentUrl: $documentUrl)
}
    `;

/**
 * __useGenerateDocumentSignedUrlQuery__
 *
 * To run a query within a React component, call `useGenerateDocumentSignedUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGenerateDocumentSignedUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGenerateDocumentSignedUrlQuery({
 *   variables: {
 *      documentUrl: // value for 'documentUrl'
 *   },
 * });
 */
export function useGenerateDocumentSignedUrlQuery(baseOptions: Apollo.QueryHookOptions<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables> & ({ variables: GenerateDocumentSignedUrlQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables>(GenerateDocumentSignedUrlDocument, options);
      }
export function useGenerateDocumentSignedUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables>(GenerateDocumentSignedUrlDocument, options);
        }
export function useGenerateDocumentSignedUrlSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables>(GenerateDocumentSignedUrlDocument, options);
        }
export type GenerateDocumentSignedUrlQueryHookResult = ReturnType<typeof useGenerateDocumentSignedUrlQuery>;
export type GenerateDocumentSignedUrlLazyQueryHookResult = ReturnType<typeof useGenerateDocumentSignedUrlLazyQuery>;
export type GenerateDocumentSignedUrlSuspenseQueryHookResult = ReturnType<typeof useGenerateDocumentSignedUrlSuspenseQuery>;
export type GenerateDocumentSignedUrlQueryResult = Apollo.QueryResult<GenerateDocumentSignedUrlQuery, GenerateDocumentSignedUrlQueryVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    id
    companyType
    status
    companyName
    registrationNumber
    taxId
    companyStreet
    companyCity
    companyPostalCode
    companyCounty
    companyCountry
    businessType
    documents {
      identityDocumentUrl
      businessRegistrationUrl
      insuranceCertificateUrl
      additionalDocuments
    }
    message
    createdAt
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const UpdateCompanyDocument = gql`
    mutation UpdateCompany($input: UpdateCompanyInput!) {
  updateCompany(input: $input) {
    id
    companyName
    companyStreet
    companyCity
    companyPostalCode
    companyCounty
    businessType
    isActive
    updatedAt
  }
}
    `;
export type UpdateCompanyMutationFn = Apollo.MutationFunction<UpdateCompanyMutation, UpdateCompanyMutationVariables>;

/**
 * __useUpdateCompanyMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyMutation, { data, loading, error }] = useUpdateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument, options);
      }
export type UpdateCompanyMutationHookResult = ReturnType<typeof useUpdateCompanyMutation>;
export type UpdateCompanyMutationResult = Apollo.MutationResult<UpdateCompanyMutation>;
export type UpdateCompanyMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const ApproveCompanyDocument = gql`
    mutation ApproveCompany($companyId: ID!) {
  approveCompany(companyId: $companyId) {
    id
    status
    companyName
  }
}
    `;
export type ApproveCompanyMutationFn = Apollo.MutationFunction<ApproveCompanyMutation, ApproveCompanyMutationVariables>;

/**
 * __useApproveCompanyMutation__
 *
 * To run a mutation, you first call `useApproveCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveCompanyMutation, { data, loading, error }] = useApproveCompanyMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useApproveCompanyMutation(baseOptions?: Apollo.MutationHookOptions<ApproveCompanyMutation, ApproveCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveCompanyMutation, ApproveCompanyMutationVariables>(ApproveCompanyDocument, options);
      }
export type ApproveCompanyMutationHookResult = ReturnType<typeof useApproveCompanyMutation>;
export type ApproveCompanyMutationResult = Apollo.MutationResult<ApproveCompanyMutation>;
export type ApproveCompanyMutationOptions = Apollo.BaseMutationOptions<ApproveCompanyMutation, ApproveCompanyMutationVariables>;
export const RejectCompanyDocument = gql`
    mutation RejectCompany($companyId: ID!, $reason: String) {
  rejectCompany(companyId: $companyId, reason: $reason) {
    id
    status
    rejectionReason
    companyName
  }
}
    `;
export type RejectCompanyMutationFn = Apollo.MutationFunction<RejectCompanyMutation, RejectCompanyMutationVariables>;

/**
 * __useRejectCompanyMutation__
 *
 * To run a mutation, you first call `useRejectCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectCompanyMutation, { data, loading, error }] = useRejectCompanyMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRejectCompanyMutation(baseOptions?: Apollo.MutationHookOptions<RejectCompanyMutation, RejectCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectCompanyMutation, RejectCompanyMutationVariables>(RejectCompanyDocument, options);
      }
export type RejectCompanyMutationHookResult = ReturnType<typeof useRejectCompanyMutation>;
export type RejectCompanyMutationResult = Apollo.MutationResult<RejectCompanyMutation>;
export type RejectCompanyMutationOptions = Apollo.BaseMutationOptions<RejectCompanyMutation, RejectCompanyMutationVariables>;
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