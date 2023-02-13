import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Portal } from '@gorhom/portal';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import type { Bounds } from '../../shared-types';

export type NightModeIndicatorProps = {
  // 是否为夜间模式
  defaultIsNight: boolean;
  // 当动画执行完成, isNight: 是否是夜间模式
  onAnimationFinish?: (isNight: boolean) => void;
  // 当动画开始执行, isNight: 是否是夜间模式
  onAnimationStart?: (isNight: boolean) => void;
  // 当状态改变
  onChanged?: (isNight: boolean) => void;
};

const styles = StyleSheet.create({
  NightModeIndicatorContainer: {},
  NightModeIndicator: {
    width: 60,
    height: 60,
  },
});

// https://lottiefiles.com/32532-day-night
export const NightModeIndicator = forwardRef<View, NightModeIndicatorProps>(
  (props: NightModeIndicatorProps, ref) => {
    const [isNight, setIsNight] = useState(props.defaultIsNight);
    const animationRef = useRef<LottieView | null>(null);
    const isFirstAnimation = useRef({
      start: true,
      finish: true,
    });

    useEffect(() => {
      if (isNight) {
        animationRef.current?.play(60, 0);
      } else {
        animationRef.current?.play(0, 60);
      }
      if (isFirstAnimation.current.start) {
        isFirstAnimation.current.start = false;
      } else {
        props.onAnimationStart?.(isNight);
      }
    }, [isNight]);

    const onAnimationFinish = (isCancelled: boolean) => {
      if (!isCancelled) {
        return;
      }
      if (isFirstAnimation.current.finish) {
        isFirstAnimation.current.finish = false;
      } else {
        props.onAnimationFinish?.(isNight);
      }
    };

    const handleChange = () => {
      const newState = !isNight;
      setIsNight(newState);
      props.onChanged?.(newState);
    };

    return (
      <Pressable ref={ref} onPress={handleChange}>
        <LottieView
          ref={animationRef}
          onAnimationFinish={onAnimationFinish}
          autoPlay={false}
          loop={false}
          style={styles.NightModeIndicator}
          source={require('./day-night.json')}
        />
      </Pressable>
    );
  }
);

export const NightModeIndicatorRipple = (props: NightModeIndicatorProps) => {
  const [isNight, setIsNight] = useState(props.defaultIsNight);
  const nightModeIndicatorRef = useRef<View | null>(null);
  const [nightModeIndicatorBounds, setNightModeIndicatorBounds] = useState<Bounds>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  });

  const onChanged = (newState: boolean) => {
    console.log('onChanged');
    setIsNight(newState);
    props.onChanged?.(newState);
  };

  const style = useAnimatedStyle(() => {
    return {
      borderRadius: 9999,
      backgroundColor: '#121212',
      transform: [
        {
          scale: withTiming(isNight ? 20 : 0.2),
        },
      ],
    } as ViewStyle;
  }, [isNight]);

  const onLayout = () => {
    nightModeIndicatorRef.current!.measure((x, y, width, height, pageX, pageY) => {
      setNightModeIndicatorBounds({
        w: width,
        h: height,
        x: pageX,
        y: pageY,
      });
    });
  };

  return (
    <>
      <Portal>
        <View
          style={{
            left: nightModeIndicatorBounds.x,
            top: nightModeIndicatorBounds.y,
            position: 'absolute',
          }}
        >
          <Animated.View
            style={[
              style,
              {
                width: nightModeIndicatorBounds.w,
                height: nightModeIndicatorBounds.h,
                zIndex: 0,
                position: 'absolute',
              },
            ]}
          />
          <View
            style={[
              {
                width: nightModeIndicatorBounds.w,
                height: nightModeIndicatorBounds.h,
                zIndex: 1,
                position: 'absolute',
              },
            ]}
          >
            <NightModeIndicator {...props} onChanged={onChanged} />
          </View>
        </View>
      </Portal>
      <View onLayout={onLayout} style={styles.NightModeIndicator} ref={nightModeIndicatorRef} />
    </>
  );
};
