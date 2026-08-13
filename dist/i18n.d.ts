import { Labels, Locale } from './types';
export declare const DEFAULT_LOCALE: Locale;
export declare const localeLabels: Record<Locale, Required<Labels>>;
export declare const resolveLabels: (locale?: Locale, labels?: Labels) => Required<Labels>;
