import { get } from 'object-path';

const translationMap = new Map();

/**
 * Factory function for creating translation helpers
 *
 * @example <caption>Creating, and using, a translation helper</caption>
 * export class Foo extends Component {
 *   renderCallback() {
 *     const { locale } = props(this);
 *     const t = createTranslationHelper(locale);
 *
 *     return [
 *       <p>
 *         {t('text.first_paragraph')}
 *       </p>,
 *       <p>
 *         {t('text.second_paragraph')}
 *       </p>
 *     ];
 *   }
 * }
 *
 * @param {string} locale the locale to create a factory for
 * @return {translationHelper} the translation helper
 * @throws {TypeError} thrown when no locale is provided
 */
export default function createTranslationHelper(locale) {
  if (!locale) {
    throw new TypeError('No locale provided');
  }

  const translationFile = translationMap.get(locale);

  return function translationHelper(translationKey) {
    const value = get(translationFile, translationKey);

    return value ? value : `MISSING TRANSLATION: ${translationKey} for ${locale}`;
  };
}
