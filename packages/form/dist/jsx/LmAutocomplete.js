import {
  Button,
  Input,
  ListItem,
  ScrollView,
  XGroup,
  XStack,
  YGroup,
  YStack
} from "tamagui";
import { useDeferredValue, useEffect, useId, useRef, useState } from "react";
import { LmFormFieldContainer } from "./LmFormFieldContainer";
import {
  CaretDownRegular,
  CheckSquareRegular,
  ListPlusRegular,
  LmPopover,
  SquareRegular
} from "@tamagui-extras/core";
import { Platform, useWindowDimensions } from "react-native";
function LmAutocomplete({
  options,
  labelInline,
  labelProps,
  helperText,
  helperTextProps,
  required,
  label,
  value,
  onChange,
  error,
  theme,
  allowNewHook,
  multiple = false,
  popoverProps,
  ...rest
}) {
  const id = useId();
  const [opts, setOpts] = useState(options);
  const { width } = useWindowDimensions();
  const [popoverWidth, setPopoverWidth] = useState(0);
  const inputRef = useRef(null);
  const [selection, setSelection] = useState(
    value ?? (multiple ? [] : null)
  );
  const isSelected = (item) => Array.isArray(selection) ? !!selection?.some((i) => i.value === item.value) : selection?.value === item.value;
  const onChangeSelection = (item) => {
    let newVal = null;
    if (multiple) {
      const has = isSelected(item);
      newVal = has ? selection?.filter((i) => i.value !== item.value) ?? [] : [...selection ?? [], item];
    } else {
      newVal = isSelected(item) ? null : item;
    }
    setSelection(newVal);
    if (typeof onChange === "function") {
      onChange(newVal);
    }
  };
  useEffect(() => {
    const elWidth = inputRef.current?.offsetWidth;
    if (elWidth) {
      setPopoverWidth(elWidth);
    }
  }, [width]);
  const inputValue = Array.isArray(selection) ? selection.map((option) => option?.label).join(", ") : selection?.label || "";
  return <LmFormFieldContainer
    id={id}
    error={error}
    required={required}
    labelProps={labelProps}
    label={label}
    labelInline={labelInline}
    helperText={helperText}
    helperTextProps={helperTextProps}
  ><XGroup ref={inputRef}>
    <XGroup.Item><Input flex={1} value={inputValue} theme={theme} textOverflow="ellipsis" /></XGroup.Item>
    <XGroup.Item><LmPopover
      isBouncy
      {...popoverProps}
      contentProps={{
        minWidth: popoverWidth ? popoverWidth : void 0,
        maxWidth: "100%",
        ...popoverProps?.contentProps
      }}
      trigger={<Button
        icon={<CaretDownRegular />}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
      />}
    ><LmAutocompleteInputContent
      theme={theme}
      options={opts}
      isSelected={isSelected}
      onChangeSelection={onChangeSelection}
      onAddNew={(newVal) => {
        if (newVal) {
          const newItem = typeof allowNewHook === "function" ? allowNewHook(newVal) : {
            value: newVal,
            label: newVal
          };
          setOpts((oldVal) => [newItem, ...oldVal]);
        }
      }}
      {...rest}
    /></LmPopover></XGroup.Item>
  </XGroup></LmFormFieldContainer>;
}
function LmAutocompleteInputContent({
  disableSearch,
  theme,
  placeholderSearch,
  options,
  allowNew,
  onAddNew,
  onChangeSelection,
  isSelected
}) {
  const [searchTerm, setSearchTerm] = useState();
  const deferredTerm = useDeferredValue(searchTerm);
  const filteredOptions = deferredTerm?.length ? options.filter((i) => i.label.toLowerCase().includes(deferredTerm)) : options;
  const showSearch = !disableSearch || allowNew;
  return <>{Platform.OS === "web" ? <>
    {showSearch && <XStack padding="$4" width="100%"><Input
      theme={theme}
      placeholder={placeholderSearch}
      width="100%"
      onChangeText={(text) => {
        setSearchTerm(text.toLowerCase());
      }}
    /></XStack>}
    <ScrollView
      keyboardShouldPersistTaps="always"
      maxHeight={300}
      width="100%"
      marginTop={!showSearch ? "$4" : void 0}
      marginBottom="$4"
    >
      <LmAutocompleteList
        options={filteredOptions}
        onChangeSelection={onChangeSelection}
        isSelected={isSelected}
      />
      {allowNew && !filteredOptions?.length && deferredTerm && <XStack justifyContent="flex-start" marginBottom="$3" marginLeft="$3"><Button
        onPress={() => onAddNew(deferredTerm)}
        chromeless
        icon={<ListPlusRegular />}
      >{deferredTerm}</Button></XStack>}
    </ScrollView>
  </> : <YStack>
    {showSearch && <XStack padding="$4" width="100%"><Input
      theme={theme}
      placeholder={placeholderSearch}
      width="100%"
      onChangeText={(text) => {
        setSearchTerm(text.toLowerCase());
      }}
    /></XStack>}
    <ScrollView><LmAutocompleteList
      options={filteredOptions}
      onChangeSelection={onChangeSelection}
      isSelected={isSelected}
    /></ScrollView>
    {allowNew && !filteredOptions?.length && deferredTerm && <XStack justifyContent="flex-start" marginBottom="$3" marginLeft="$3"><Button onPress={() => onAddNew(deferredTerm)} chromeless icon={<ListPlusRegular />}>{deferredTerm}</Button></XStack>}
  </YStack>}</>;
}
function LmAutocompleteList({ options, isSelected, onChangeSelection }) {
  return <YGroup borderRadius={0}>{options.map((item, i) => {
    return <YGroup.Item key={item.value}><ListItem
      hoverTheme
      icon={isSelected(item) ? <CheckSquareRegular /> : <SquareRegular />}
      title={item.label}
      onPress={() => onChangeSelection(item)}
    /></YGroup.Item>;
  })}</YGroup>;
}
export {
  LmAutocomplete
};
//# sourceMappingURL=LmAutocomplete.js.map
