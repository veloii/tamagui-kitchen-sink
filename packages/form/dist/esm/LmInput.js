import { jsx, jsxs } from "react/jsx-runtime";
import { Input, Stack, TextArea } from "tamagui";
import { useId, useState } from "react";
import { LmFormFieldContainer } from "./LmFormFieldContainer";
import { Pressable } from "react-native";
import { EyeRegular, EyeSlashRegular } from "@tamagui-extras/core";
function LmInput({
  required,
  error,
  helperText,
  helperTextProps,
  label,
  labelProps,
  labelInline,
  multiline,
  containerProps,
  isPassword,
  passwordIconProps,
  fullWidth,
  ...rest
}) {
  const genId = useId();
  const [show, setShow] = useState(false);
  const id = rest.id || genId;
  const currentInputProps = {
    ...rest
  };
  if (error) {
    currentInputProps.theme = "red";
    currentInputProps.borderColor = error ? "$red8" : void 0;
  }
  if (fullWidth) {
    currentInputProps.minWidth = "100%";
  }
  let secureTextEntry = !!(rest.secureTextEntry || isPassword);
  return /* @__PURE__ */ jsx(
    LmFormFieldContainer,
    {
      id,
      error,
      required,
      labelProps,
      label,
      fullWidth,
      size: rest.size,
      labelInline,
      helperText,
      helperTextProps,
      ...containerProps,
      children: multiline ? /* @__PURE__ */ jsx(TextArea, { ...currentInputProps, placeholderTextColor: rest.placeholderTextColor }) : secureTextEntry ? /* @__PURE__ */ jsxs(Stack, { position: "relative", width: fullWidth ? "100%" : currentInputProps == null ? void 0 : currentInputProps.width, children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            ...currentInputProps,
            secureTextEntry: !show,
            autoCapitalize: "none",
            placeholderTextColor: rest.placeholderTextColor
          }
        ),
        /* @__PURE__ */ jsx(
          Pressable,
          {
            style: {
              position: "absolute",
              top: "50%",
              transform: [{ translateY: -0.5 * 20 }],
              height: 20,
              ...(rest == null ? void 0 : rest.direction) === "rtl" ? {
                left: 15
              } : {
                right: 15
              }
            },
            onPress: () => {
              setShow((state) => !state);
            },
            children: show ? /* @__PURE__ */ jsx(EyeSlashRegular, { ...passwordIconProps }) : /* @__PURE__ */ jsx(EyeRegular, { ...passwordIconProps })
          }
        )
      ] }) : /* @__PURE__ */ jsx(Input, { ...currentInputProps, autoCapitalize: "none" })
    }
  );
}
export {
  LmInput
};
//# sourceMappingURL=LmInput.js.map
