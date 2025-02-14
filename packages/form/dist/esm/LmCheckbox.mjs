import { jsx, jsxs } from "react/jsx-runtime";
import { useId } from "react";
import {
  Checkbox,
  Label,
  Paragraph,
  XStack,
  YStack
} from "tamagui";
import { CheckRegular, MinusRegular } from "@tamagui-extras/core";
function LmCheckbox({
  label,
  onChange,
  error,
  helperText,
  size = "$3",
  value,
  required,
  theme,
  helperTextProps,
  checkboxProps,
  ...stackProps
}) {
  const id = useId();
  return /* @__PURE__ */ jsxs(XStack, { space: true, alignItems: "center", ...stackProps, children: [
    /* @__PURE__ */ jsx(
      Checkbox,
      {
        id,
        theme: error ? "red" : theme,
        ...checkboxProps,
        defaultChecked: value || (checkboxProps == null ? void 0 : checkboxProps.defaultChecked),
        size,
        onCheckedChange: (checked) => {
          if (typeof onChange === "function") {
            onChange(checked);
          }
        },
        borderColor: error ? "$red8" : "$borderColor",
        children: /* @__PURE__ */ jsx(Checkbox.Indicator, { children: (checkboxProps == null ? void 0 : checkboxProps.checked) === "indeterminate" ? /* @__PURE__ */ jsx(MinusRegular, {}) : /* @__PURE__ */ jsx(CheckRegular, {}) })
      }
    ),
    label && /* @__PURE__ */ jsxs(YStack, { children: [
      /* @__PURE__ */ jsxs(Label, { size, htmlFor: id, children: [
        required ? "* " : "",
        label
      ] }),
      helperText && /* @__PURE__ */ jsx(
        Paragraph,
        {
          paddingLeft: "$2",
          marginTop: 0,
          size,
          ...helperTextProps,
          color: error ? "$red10" : helperTextProps == null ? void 0 : helperTextProps.color,
          children: helperText
        }
      )
    ] })
  ] });
}
export {
  LmCheckbox
};
//# sourceMappingURL=LmCheckbox.mjs.map
