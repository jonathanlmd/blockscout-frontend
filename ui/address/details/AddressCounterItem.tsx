import { Skeleton } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { AddressCounters } from 'types/api/address';

import link from 'lib/link/link';
import LinkInternal from 'ui/shared/LinkInternal';

interface Props {
  prop: keyof AddressCounters;
  query: UseQueryResult<AddressCounters>;
  address: string;
  onClick: () => void;
}

const PROP_TO_TAB = {
  transactions_count: 'txs',
  token_transfers_count: 'token_transfers',
  validations_count: 'blocks_validated',
};

const AddressCounterItem = ({ prop, query, address, onClick }: Props) => {
  if (query.isLoading) {
    return <Skeleton h={ 5 } w="80px" borderRadius="full"/>;
  }

  const data = query.data?.[prop];

  if (query.isError || data === null || data === undefined) {
    return <span>0</span>;
  }

  switch (prop) {
    case 'gas_usage_count':
      return <span>{ BigNumber(data).toFormat() }</span>;
    case 'transactions_count':
    case 'token_transfers_count':
    case 'validations_count': {
      if (data === '0') {
        return <span>0</span>;
      }
      return (
        <LinkInternal href={ link('address_index', { id: address }, { tab: PROP_TO_TAB[prop] }) } onClick={ onClick }>
          { Number(data).toLocaleString() }
        </LinkInternal>
      );
    }
  }
};

export default React.memo(AddressCounterItem);