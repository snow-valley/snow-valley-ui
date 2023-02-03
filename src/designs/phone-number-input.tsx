import { Text, TextInput, View } from 'react-native';
import { FloatingInput } from '../base/floating-input';
import { useRef, useState } from 'react';
import { useSnowValley } from '../context/snow-valley.context';

export type PhoneNumberInputProps = {
  code: string;
  phoneNumber: string;
  onCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
};

export const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  const codeInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState({
    codeInput: false,
    phoneNumberInput: true,
  });
  const { component } = useSnowValley();

  const onCodeChange = (value: string) => {
    if (value.length >= 3) {
      phoneNumberInputRef.current?.focus();
    }
    props.onCodeChange(value);
  };

  const onFocus = (key: keyof typeof focused) => {
    setFocused((state) => ({ ...state, [key]: true }));
  };

  const onBlur = (key: keyof typeof focused) => {
    setFocused((state) => ({ ...state, [key]: false }));
  };

  const _focused = focused.phoneNumberInput || focused.codeInput;

  return (
    <FloatingInput
      focused={_focused}
      label={'Phone number'}
      labelStyle={[
        _focused
          ? { color: component.FloatingInput.focused.labelColor }
          : { color: component.FloatingInput.unFocused.labelColor },
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>+</Text>
        <TextInput
          keyboardType={'number-pad'}
          style={{ minWidth: 60, paddingLeft: 5 }}
          ref={codeInputRef}
          autoFocus
          value={props.code}
          onChangeText={onCodeChange}
          onFocus={() => onFocus('codeInput')}
          onBlur={() => onBlur('codeInput')}
          placeholder={'Country'}
        />
      </View>
      <View style={{ marginHorizontal: 8 }}>
        <Text>|</Text>
      </View>
      <TextInput
        placeholder={'Phone number'}
        style={{ flex: 1 }}
        ref={phoneNumberInputRef}
        value={props.phoneNumber}
        onChangeText={props.onPhoneNumberChange}
        onFocus={() => onFocus('phoneNumberInput')}
        onBlur={() => onBlur('phoneNumberInput')}
      />
    </FloatingInput>
  );
};