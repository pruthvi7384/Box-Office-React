import React from 'react'
import { DetailsWrapper } from './Details.styled'

function Detailes({ status, premiered, network }) {
    return (
      <DetailsWrapper>
        <p>
          Status: <span>{status}</span>
        </p>
        <p>
          Premiered {premiered} {network ? `on ${network.name}` : null}
        </p>
      </DetailsWrapper>
    );
  };

export default Detailes
