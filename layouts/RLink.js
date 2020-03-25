import NextLink from 'next/link';
import React, { forwardRef } from 'react';

const RLink = forwardRef(({ children, href, ...rest }, ref) => (
  <NextLink href={href}>
    <a ref={ref} {...rest}>
      {children}
      <style jsx>
        {`
          a {
            text-decoration: none;
          }
        `}
      </style>
    </a>
  </NextLink>
));

export default RLink;
