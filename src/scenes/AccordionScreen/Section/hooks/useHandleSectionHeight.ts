import {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {GoatPlayers, ITEM_HEIGHT} from '../../types';

export const useHandleSectionHeight = (
  itemRef: React.RefObject<View>,
  section: {title: string; values: GoatPlayers[]},
  isActive: number,
) => {
  const [measured, setMeasured] = useState(false);
  const [measuring, setMeasuring] = useState(false);
  const heightAnimated = useSharedValue(0);

  const handleHeigth = useCallback(
    (height: number) => {
      heightAnimated.value = withTiming(height, {
        duration: 400,
      });
    },
    [heightAnimated],
  );

  const measureItem = useCallback((callback) => {
    setMeasuring(true);
    requestAnimationFrame(() => {
      if (!itemRef) {
        setMeasuring(false);
        callback(ITEM_HEIGHT * section.values.length);
      } else {
        itemRef.current?.measure((_x, _y, _width, height) => {
          // console.log({height});
          setMeasured(true);
          setMeasuring(false);
          //This should be something like this: callback(height * section.values.length);
          callback(ITEM_HEIGHT * section.values.length);
        });
      }
    });
  }, []);

  useEffect(() => {
    setMeasured(false);
    if (!!isActive) {
      measureItem((height: number) => handleHeigth(height));
    } else {
      handleHeigth(0);
    }
    return () => {};
  }, [isActive]);

  return {
    heightAnimated,
  };
};
