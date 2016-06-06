const iconv = require('iconv-lite');
const charset = require('charset');
const inflate = require('inflation');

function decode(stream) {
  if (!stream) {
    throw new TypeError('Invalid stream');
  }

  const encoding = charset(stream.headers['content-type']);
  const decompressedStream = inflate(stream);

  if (!encoding || encoding === 'utf8') {
    return decompressedStream;
  }

  return decompressedStream.pipe(iconv.decodeStream(encoding));
}

module.exports = decode;
