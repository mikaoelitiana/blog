import Image from 'next/image';
import { siteMetadata } from '@/lib/config';

export default function Bio() {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: '4.375rem',
        alignItems: 'center',
      }}
    >
      <Image
        src="/content/assets/mikaoelitiana.png"
        alt={siteMetadata.author}
        width={50}
        height={50}
        style={{
          marginRight: '0.875rem',
          marginBottom: 0,
          minWidth: 50,
          borderRadius: '100%',
        }}
      />
      <p style={{ margin: 0 }}>
        Written by <strong>{siteMetadata.author}</strong> who lives and works
        in Paris, building useful things with React, Typescript and more.
        {` Follow me on `}
        <a href={`https://twitter.com/${siteMetadata.social.twitter}`}>
          Twitter
        </a>
        {` or `}
        <a href={`https://github.com/${siteMetadata.social.github}`}>Github</a>
      </p>
    </div>
  );
}
