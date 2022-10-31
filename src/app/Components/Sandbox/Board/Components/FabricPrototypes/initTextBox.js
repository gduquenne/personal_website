import { fabric } from 'fabric';

const _wrapLine = function (_line, lineIndex, desiredWidth, reservedSpace) {
  const splitByGrapheme = this.splitByGrapheme;
  const graphemeLines = [];

  let line = [];
  let lineWidth = 0;
  let words;
  let word = '';
  let offset = 0;
  let infix;
  let wordWidth = 0;
  let infixWidth = 0;
  let largestWordWidth = 0;
  let lineJustStarted = true;
  let additionalSpace;

  if (splitByGrapheme) {
    words = fabric.util.string.graphemeSplit(_line);
    infix = '';
    additionalSpace = 0;
  } else {
    words = _line.split(this._wordJoiners);
    infix = ' ';
    additionalSpace = this._getWidthOfCharSpacing();
  }
  reservedSpace = reservedSpace || 0;
  desiredWidth -= reservedSpace;
  let i;
  for (i = 0; i < words.length; i++) {
    word = fabric.util.string.graphemeSplit(words[i]);
    wordWidth = this._measureWord(word, lineIndex, offset);
    offset += word.length;

    if (this.breakWords && wordWidth >= desiredWidth) {
      if (!lineJustStarted) {
        line.push(infix);
        lineJustStarted = true;
      }

      word.forEach(letter => {
        const letterWidth =
          (this.getMeasuringContext().measureText(letter).width *
            this.fontSize) /
          this.CACHE_FONT_SIZE;
        if (lineWidth + letterWidth > desiredWidth) {
          graphemeLines.push(line);
          line = [];
          lineWidth = 0;
        } else {
          lineWidth += letterWidth;
        }
        line.push(letter);
      });
      word = [];
    } else {
      lineWidth += infixWidth + wordWidth - additionalSpace;
    }

    if (lineWidth >= desiredWidth && !lineJustStarted) {
      graphemeLines.push(line);
      line = [];
      lineWidth = wordWidth;
      lineJustStarted = true;
    } else {
      lineWidth += additionalSpace;
    }

    if (!lineJustStarted) {
      line.push(infix);
    }
    line = line.concat(word);

    infixWidth = this._measureWord([infix], lineIndex, offset);
    offset++;
    lineJustStarted = false;
    if (wordWidth > largestWordWidth && !this.breakWords) {
      largestWordWidth = wordWidth;
    }
  }

  i && graphemeLines.push(line);

  if (largestWordWidth + reservedSpace > this.dynamicMinWidth) {
    this.dynamicMinWidth = largestWordWidth - additionalSpace + reservedSpace;
  }

  return graphemeLines;
};

export { _wrapLine };
