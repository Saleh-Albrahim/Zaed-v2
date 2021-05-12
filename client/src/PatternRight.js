import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import pattern from './images/pattern-Right.png';

export const PatternRight = props => {
  return <Image src={pattern} {...props} />;
};
