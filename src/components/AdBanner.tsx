'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE_ID } from '../lib/constants';

type AdBannerProps = {
  variant?: 'banner' | 'sidebar' | 'inline' | 'sticky';
  className?: string;
};

export default function AdBanner({
  variant = 'banner',
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (
      isAdLoaded.current ||
      !adRef.current ||
      typeof window === 'undefined'
    ) {
      return;
    }

    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>)
        .adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  const formatMap = {
    banner: { format: 'horizontal', height: '90px' },
    sidebar: { format: 'vertical', height: '600px' },
    inline: { format: 'rectangle', height: '250px' },
    sticky: { format: 'horizontal', height: '50px' },
  };

  const { format, height } = formatMap[variant];

  return (
    <div
      ref={adRef}
      className={`flex items-center justify-center overflow-hidden rounded-lg border border-slate-700/30 bg-slate-800/30 ${className}`}
      style={{ minHeight: height }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height }}
        data-ad-client={ADSENSE_ID}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
