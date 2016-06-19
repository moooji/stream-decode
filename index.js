'use strict';

const is = require('valido');
const iconv = require('iconv-lite');
const charset = require('charset');
const inflate = require('inflation');

function decode(stream) {
  if (!is.stream(stream)) {
    throw new TypeError('Invalid stream');
  }

  // Gzip decompression
  const decompressedStream = inflate(stream);

  if (!stream.headers) {
    return decompressedStream;
  }

  // Character decoding
  const encoding = charset(stream.headers['content-type']);

  if (!encoding || encoding === 'utf8') {
    return decompressedStream;
  }

  return decompressedStream.pipe(iconv.decodeStream(encoding));
}

module.exports = decode;
