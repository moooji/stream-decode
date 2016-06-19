'use strict';

const fs = require('fs');
const chai = require('chai');
const decodeStream = require('../index');

const expect = chai.expect;

describe('Errors', () => {
  it('should throw TypeError if no valid stream is provided', () => {
    return expect(() => decodeStream(123))
      .to.throw(TypeError);
  });

  it('should not throw TypeError if valid stream is provided', () => {
    const readable = fs.createReadStream('./test.txt');

    return expect(() => decodeStream(readable))
      .to.not.throw(TypeError);
  });
});
