import {useCallback, useEffect} from 'react';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {DEFAULT_ITEM_HEIGHT} from '../../Accordion/types';

export const useHandleSectionHeight = (
  section: any,
  isActive: number,
  height: number,
) => {
  const heightAnimated = useSharedValue(0);

  const handleHeigth = useCallback(
    (height: number) => {
      heightAnimated.value = withTiming(height, {
        duration: 400,
      });
    },
    [heightAnimated],
  );

  const measureItem = useCallback(
    (callback) => {
      if (height === 0) {
        callback(DEFAULT_ITEM_HEIGHT * section.values.length);
      } else {
        callback(height);
      }
    },
    [height],
  );

  useEffect(() => {
    if (isActive) {
      measureItem((height: number) => handleHeigth(height));
    } else {
      handleHeigth(0);
    }
    return () => {};
  }, [isActive, height]);

  return {
    heightAnimated,
  };
};
