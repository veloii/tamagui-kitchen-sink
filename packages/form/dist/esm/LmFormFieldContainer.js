import { jsx, jsxs } from "react/jsx-runtime";
import {
  Label,
  Paragraph,
  styled,
  ThemeableStack,
  YStack
} from "tamagui";
const StackContainer = styled(ThemeableStack, {
  variants: {
    fullWidth: {
      true: {
        width: "100%"
      }
    },
    labelInline: {
      true: {
        flexDirection: "row",
        space: true,
        alignItems: "center"
      }
    }
  }
});
function LmFormFieldContainer({
  label,
  children,
  helperText,
  id,
  size,
  labelProps,
  required,
  error,
  helperTextProps,
  ...rest
}) {
  return /* @__PURE__ */ jsxs(StackContainer, { space: !!rest.labelInline, ...rest, children: [
    label && /* @__PURE__ */ jsxs(
      Label,
      {
        htmlFor: id,
        size: size || "$3",
        ...labelProps,
        color: error ? "$red10" : void 0,
        width: rest.labelInline ? 150 : void 0,
        justifyContent: rest.labelInline ? "flex-end" : void 0,
        children: [
          label,
          " ",
          required && ` *`
        ]
      }
    ),
    /* @__PURE__ */ jsxs(YStack, { children: [
      children,
      helperText && /* @__PURE__ */ jsx(
        Paragraph,
        {
          paddingLeft: "$2",
          marginTop: "$2",
          size,
          ...helperTextProps,
          color: error ? "$red10" : void 0,
          children: helperText
        }
      )
    ] })
  ] });
}
export {
  LmFormFieldContainer
};
//# sourceMappingURL=LmFormFieldContainer.js.map
