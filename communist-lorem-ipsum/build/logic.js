var app = {
  data: shallowCopyArrayObjs(quotes)
};

//changes quotes text to fit user specifications
app.updateQuotes = function (pars, lines, chars, p, br, authorIndex) {

  chars = parseInt(chars);
  lines = parseInt(lines);
  pars = parseInt(pars);
  var alteredText = quotes[authorIndex].text;
  //remove existing newlines
  //  alteredText = alteredText.replace(/\n|<p>|<br>/g, "");
  var reChars = new RegExp("([\\s\\S]{" + chars + "})", "g");
  alteredText = alteredText.replace(reChars, "$1\n");
  var reLines = new RegExp("([\\s\\S]{" + (chars + 1) * lines + "})", "g");
  alteredText = alteredText.replace(reLines, "$1\n");
  alteredText = returnNParagraphs(alteredText, pars);
  if (br) {
    alteredText = alteredText.replace(/\n(?!\n)/g, "<br>\n");
    if (p) {
      alteredText = alteredText.replace(/\n<br>\n/g, "\n<p>\n");
    } else {
      alteredText = alteredText.replace(/\n<br>\n/g, "\n\n");
    }
  }
  if (p) {
    alteredText = alteredText.replace(/\n\n/g, "\n<p>\n");
  }
  this.data[authorIndex].text = alteredText;
};

function returnNParagraphs(string, n) {
  string = string.split('\n\n');
  string = string.slice(0, n);
  return string.join('\n\n');
};

function shallowCopy(oldObj) {
  var newObj = {};
  for (var i in oldObj) {
    if (oldObj.hasOwnProperty(i)) {
      newObj[i] = oldObj[i];
    }
  }
  return newObj;
}

//return shallow copy of objects inside an array
function shallowCopyArrayObjs(array) {
  var newArr = [];
  array.forEach(function (cur) {
    newArr.push(shallowCopy(cur));
  });
  return newArr;
}