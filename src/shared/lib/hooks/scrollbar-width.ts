import * as React from 'react';
import { useUser } from 'entities/user/model/hooks';
import { useAppSelector } from 'app/store';

export const useScrollbarWidth = () => {
  const hasScrollBar = window.innerWidth > document.body.clientWidth;
  const didCompute = React.useRef(false);
  const widthRef = React.useRef(0);

  if (didCompute.current) return {
    hasScrollBar,
    scrollbarWidth: widthRef.current,
  };

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);

  didCompute.current = true;
  widthRef.current = scrollbarWidth;

  return {
    hasScrollBar,
    scrollbarWidth,
  };
};

export const useNoScrollFit = () => {
  const { isHeaderMenuOpened } = useUser();
  const { hasScrollBar, scrollbarWidth } = useScrollbarWidth();
  const { show: isAuthModalShowed } = useAppSelector((state) => state.authModal);

  return {
    scrollbarWidth,
    isNoScrollFit: (isHeaderMenuOpened || isAuthModalShowed) && hasScrollBar,
  }
}