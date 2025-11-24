import { gql } from '@apollo/client';

export const MY_ADDRESSES_QUERY = gql`
  query MyAddresses {
    myAddresses {
      id
      street
      city
      postalCode
      country
      isDefault
    }
  }
`;
