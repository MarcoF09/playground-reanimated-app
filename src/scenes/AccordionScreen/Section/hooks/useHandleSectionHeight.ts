import {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {GoatPlayers, ITEM_HEIGHT} from '../../types';

export const useHandleSectionHeight = (
  contentRef: React.RefObject<View>,
  section: {title: string; values: GoatPlayers[]},
  isActive: number,
  maxHeight: number,
  minHeight: number,
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

  const measureItem = useCallback(
    (callback) => {
      setMeasuring(true);

      if (!contentRef) {
        setMeasuring(false);
        callback(ITEM_HEIGHT * section.values.length);
      } else {
        console.log('measure type: ', typeof contentRef.current?.measure);
        contentRef.current?.measure((_x, _y, _width, height) => {
          console.log({height});
        });
      }
    },
    [contentRef],
  );

  useEffect(() => {
    setMeasured(false);
    if (!!isActive) {
      measureItem((height: number) => handleHeigth(height));
    } else {
      handleHeigth(0);
    }
    return () => {};
  }, [isActive, contentRef]);

  return {
    heightAnimated,
  };
};
