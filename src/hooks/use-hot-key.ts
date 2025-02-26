import { useCallback, useEffect } from 'react';

export type UseHotKey = (x: {
  key: string;
  handler: () => void;
  canUse: boolean;
}) => void;

export const useHotKey: UseHotKey = ({ key, handler, canUse }) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) handler();
    },
    [handler, key]
  );

  useEffect(() => {
    if (canUse) document.addEventListener('keyup', handleKeyDown);
    return () => {
      if (canUse) document.removeEventListener('keyup', handleKeyDown);
    };
  }, [canUse, handleKeyDown]);
};
