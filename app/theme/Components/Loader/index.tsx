'use client';

import { Overlay } from './Styled';

interface IOverlayLoaderProps {
  size?: number;
}

// eslint-disable-next-line no-empty-pattern
export default function OverlayLoader({}: IOverlayLoaderProps) {
  return <Overlay></Overlay>;
}
