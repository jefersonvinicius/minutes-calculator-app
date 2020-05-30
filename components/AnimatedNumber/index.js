import React, {useRef, useEffect, useState} from 'react';
import {Animated} from 'react-native';

export default function AnimatedNumber({from, to}) {
  const value = useRef(new Animated.Value(from)).current;
  const [valueText, setValueText] = useState('');

  useEffect(() => {
    value.addListener(state => {
      setValueText(Math.floor(state.value));
    });
    Animated.timing(value, {
      toValue: to,
      duration: 2000,
      delay: 100,
      useNativeDriver: true,
    }).start(() => {
      value.removeAllListeners();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);

  return <Animated.Text>{valueText}</Animated.Text>;
}
