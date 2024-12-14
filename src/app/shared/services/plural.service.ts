import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PluralService {
  private uncountableWords = [
    'audio',
    'bison',
    'chassis',
    'compensation',
    'coreopsis',
    'data',
    'deer',
    'education',
    'emoji',
    'equipment',
    'fish',
    'furniture',
    'gold',
    'information',
    'knowledge',
    'love',
    'rain',
    'money',
    'moose',
    'nutrition',
    'offspring',
    'plankton',
    'pokemon',
    'police',
    'rice',
    'series',
    'sheep',
    'species',
    'swine',
    'traffic',
    'wheat'
  ];

  private pluralRules = [
    { rule: /(quiz)$/, replacement: '$1zes' },
    { rule: /^(ox)$/, replacement: '$1en' },
    { rule: /([m|l])ouse$/, replacement: '$1ice' },
    { rule: /(matr|vert|ind)ix|ex$/, replacement: '$1ices' },
    { rule: /(x|ch|ss|sh)$/, replacement: '$1es' },
    { rule: /([^aeiouy]|qu)y$/, replacement: '$1ies' },
    { rule: /(hive)$/, replacement: '$1s' },
    { rule: /(?:([^f])fe|([lr])f)$/, replacement: '$1$2ves' },
    { rule: /sis$/, replacement: 'ses' },
    { rule: /([ti])um$/, replacement: '$1a' },
    { rule: /(p)erson$/, replacement: '$1eople' },
    { rule: /(m)an$/, replacement: '$1en' },
    { rule: /(c)hild$/, replacement: '$1hildren' },
    { rule: /(buffal|tomat)o$/, replacement: '$1oes' },
    { rule: /(bu|campu)s$/, replacement: '$1ses' },
    { rule: /(alias|status|virus)$/, replacement: '$1es' },
    { rule: /(octop)us$/, replacement: '$1i' },
    { rule: /(ax|cris|test)is$/, replacement: '$1es' },
    { rule: /s$/, replacement: 's' },
    { rule: /$/, replacement: 's' }
  ];

  private isCountable(word: string): boolean {
    return !this.uncountableWords.includes(word.toLowerCase());
  }

  pluralize(word: string): string {
    if (!this.isCountable(word)) {
      return word;
    }

    let result = word;
    for (const { rule, replacement } of this.pluralRules) {
      if (rule.test(result)) {
        result = result.replace(rule, replacement);
        break;
      }
    }

    return result;
  }
}