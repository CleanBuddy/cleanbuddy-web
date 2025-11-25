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

export type Application = {
  __typename?: 'Application';
  applicationType: ApplicationType;
  companyInfo?: Maybe<CompanyInfo>;
  createdAt: Scalars['Time']['output'];
  documents?: Maybe<ApplicationDocuments>;
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  reviewedAt?: Maybe<Scalars['Time']['output']>;
  reviewedBy?: Maybe<User>;
  status: ApplicationStatus;
  updatedAt: Scalars['Time']['output'];
  user: User;
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

export enum ApplicationStatus {
  Approved = 'approved',
  Pending = 'pending',
  Rejected = 'rejected'
}

export enum ApplicationType {
  Cleaner = 'cleaner',
  CompanyAdmin = 'company_admin'
}

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

export type CleanerProfile = {
  __typename?: 'CleanerProfile';
  availability: Array<Availability>;
  averageRating: Scalars['Float']['output'];
  backgroundCheck: Scalars['Boolean']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  cancelledBookings: Scalars['Int']['output'];
  completedBookings: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  hourlyRate: Scalars['Int']['output'];
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
  maxHourlyRate?: InputMaybe<Scalars['Int']['input']>;
  maxRating?: InputMaybe<Scalars['Float']['input']>;
  minHourlyRate?: InputMaybe<Scalars['Int']['input']>;
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

export type CompanyInfo = {
  __typename?: 'CompanyInfo';
  businessType?: Maybe<Scalars['String']['output']>;
  companyCity: Scalars['String']['output'];
  companyCountry: Scalars['String']['output'];
  companyCounty?: Maybe<Scalars['String']['output']>;
  companyName: Scalars['String']['output'];
  companyPostalCode: Scalars['String']['output'];
  companyStreet: Scalars['String']['output'];
  registrationNumber: Scalars['String']['output'];
  taxId: Scalars['String']['output'];
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

export type CreateCleanerProfileInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  hourlyRate: Scalars['Int']['input'];
  profilePicture?: InputMaybe<Scalars['String']['input']>;
  serviceAreaInputs: Array<CreateServiceAreaInput>;
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
  addCleanerResponse: Review;
  addServiceArea: ServiceArea;
  approveApplication: Application;
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
  createCleanerProfile: CleanerProfile;
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
  rejectApplication: Application;
  setDefaultAddress: Address;
  signOut: Scalars['Void']['output'];
  startBooking: Booking;
  submitApplication: Application;
  updateAddOnDefinition: ServiceAddOnDefinition;
  updateAddress: Address;
  updateAvailability: Availability;
  updateBooking: Booking;
  updateCleanerProfile: CleanerProfile;
  updateCleanerTier: CleanerProfile;
  updateCurrentUser: User;
  updateReview: Review;
  updateServiceArea: ServiceArea;
  updateServiceDefinition: ServiceDefinition;
  updateUserRole: User;
};


export type MutationAddCleanerResponseArgs = {
  input: AddCleanerResponseInput;
};


export type MutationAddServiceAreaArgs = {
  input: CreateServiceAreaInput;
};


export type MutationApproveApplicationArgs = {
  applicationId: Scalars['ID']['input'];
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


export type MutationCreateCleanerProfileArgs = {
  input: CreateCleanerProfileInput;
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


export type MutationRejectApplicationArgs = {
  applicationId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSetDefaultAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationStartBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSubmitApplicationArgs = {
  input: SubmitApplicationInput;
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


export type MutationUpdateUserRoleArgs = {
  role: UserRole;
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
  application?: Maybe<Application>;
  availability?: Maybe<Availability>;
  availabilityForCleaner: Array<Availability>;
  availableCleaners: Array<CleanerProfile>;
  booking?: Maybe<Booking>;
  calculateServicePrice: ServicePriceCalculation;
  cleanerProfile?: Maybe<CleanerProfile>;
  cleanerProfileByUserId?: Maybe<CleanerProfile>;
  cleanersByPostalCode: Array<CleanerProfile>;
  cleanersInArea: Array<CleanerProfile>;
  currentUser?: Maybe<User>;
  generateDocumentSignedUrl: Scalars['String']['output'];
  isCleanerAvailable: Scalars['Boolean']['output'];
  myAddresses: Array<Address>;
  myApplications: Array<Application>;
  myAvailability: Array<Availability>;
  myBookings: BookingConnection;
  myCleanerProfile?: Maybe<CleanerProfile>;
  myDefaultAddress?: Maybe<Address>;
  myEarnings: CleanerEarnings;
  myJobs: BookingConnection;
  myReviews: ReviewConnection;
  myServiceAreas: Array<ServiceArea>;
  myTransactions: TransactionConnection;
  payoutBatch?: Maybe<PayoutBatch>;
  payoutBatches: Array<PayoutBatch>;
  pendingApplications: Array<Application>;
  review?: Maybe<Review>;
  reviewByBooking?: Maybe<Review>;
  reviewsForCleaner: ReviewConnection;
  reviewsPendingModeration: Array<Review>;
  searchCleaners: CleanerProfileConnection;
  serviceArea?: Maybe<ServiceArea>;
  serviceAreasByCleanerProfile: Array<ServiceArea>;
  serviceDefinition?: Maybe<ServiceDefinition>;
  serviceDefinitions: Array<ServiceDefinition>;
  tierRateRanges: Array<TierRateRange>;
  transaction?: Maybe<Transaction>;
  transactionByStripePaymentId?: Maybe<Transaction>;
  transactionsByBooking: Array<Transaction>;
  transactionsDueForPayout: Array<Transaction>;
  upcomingBookings: Array<Booking>;
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


export type QueryApplicationArgs = {
  id: Scalars['ID']['input'];
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

export type SubmitApplicationInput = {
  applicationType: ApplicationType;
  companyInfo?: InputMaybe<CompanyInfoInput>;
  documents?: InputMaybe<ApplicationDocumentsInput>;
  message?: InputMaybe<Scalars['String']['input']>;
};

export type TierRateRange = {
  __typename?: 'TierRateRange';
  maxRate: Scalars['Int']['output'];
  minRate: Scalars['Int']['output'];
  tier: CleanerTier;
};

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
  hourlyRate?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isAvailableToday?: InputMaybe<Scalars['Boolean']['input']>;
  profilePicture?: InputMaybe<Scalars['String']['input']>;
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
  applications: Array<Application>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  pendingCleanerApplication?: Maybe<Application>;
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
  GlobalAdmin = 'GLOBAL_ADMIN',
  PendingApplication = 'PENDING_APPLICATION',
  PendingCleaner = 'PENDING_CLEANER',
  RejectedCleaner = 'REJECTED_CLEANER'
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
  intent?: InputMaybe<Scalars['String']['input']>;
}>;


export type AuthWithIdentityProviderMutation = { __typename?: 'Mutation', authWithIdentityProvider: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type AuthWithRefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type AuthWithRefreshTokenMutation = { __typename?: 'Mutation', authWithRefreshToken: { __typename?: 'AuthResult', accessToken: string, refreshToken: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, displayName: string, role: UserRole, email: string, pendingCleanerApplication?: { __typename?: 'Application', id: string, status: ApplicationStatus, applicationType: ApplicationType, createdAt: string, rejectionReason?: string | null } | null } | null };

export type UpdateUserRoleMutationVariables = Exact<{
  role: UserRole;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'User', id: string, displayName: string, role: UserRole, email: string } };

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
    pendingCleanerApplication {
      id
      status
      applicationType
      createdAt
      rejectionReason
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
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($role: UserRole!) {
  updateUserRole(role: $role) {
    id
    displayName
    role
    email
  }
}
    `;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
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