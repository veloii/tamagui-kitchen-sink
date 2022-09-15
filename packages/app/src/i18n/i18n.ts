import { I18n, TranslateOptions, Scope } from 'i18n-js';

import de from './de.json'
import en from './en.json'


const translations = { en, de }
const i18n = new I18n(translations);

i18n.locale = 'en';
i18n.enableFallback = true;

/**
 * @see https://github.com/infinitered/ignite/blob/master/boilerplate/app/i18n/i18n.ts
 */
/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
    [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
        TObj[TKey],
        `['${TKey}']` | `.${TKey}`
        >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
    ? Text
    : TValue extends object
        ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
        : Text

export default (key: TxKeyPath, options?: TranslateOptions) =>  key ? i18n.t(key, options) : undefined

