import { useEffect, RefObject } from 'react';

type CallbackFunction = () => void;

function useOutSideClick(ref: RefObject<HTMLElement>, callback?: CallbackFunction) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback?.();
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
}

export default useOutSideClick;
