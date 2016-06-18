const iconv = require('iconv-lite');
const charset = require('charset');

function decode(stream) {
  if (!stream) {
    throw new TypeError('Invalid stream');
  }

  const encoding = charset(stream.headers['content-type']);

  if (!encoding || encoding === 'utf8') {
    return stream;
  }

  return stream.pipe(iconv.decodeStream(encoding));
}

module.exports = decode;
