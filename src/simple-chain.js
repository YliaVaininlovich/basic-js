const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 * npm test --g test/simple-chain.test.js
 */
const chainMaker = {
  top: null,
  tail: null,
  ChainLink: function (value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  },

  addLink(value) {
    if (!this.top) {
      this.top = new this.ChainLink(value, null, null);
      this.tail = this.top;
    } else {
      const newLink = new this.ChainLink(value, this.top, null);
      this.top.prev = newLink;
      this.top = newLink;
    }
    return this;
  },

  getLink(position) {
    if (
      !this.top ||
      !Number.isFinite(position) ||
      !Number.isInteger(position) ||
      position < 1
    ) {
      return null;
    }

    let tmpLink = this.tail;
    let findedLink = null;
    let count = 0;

    while (tmpLink) {
      count++;
      if (count === position) {
        findedLink = tmpLink;
        break;
      }
      tmpLink = tmpLink.prev;
    }
    return findedLink;
  },

  removeLink(position) {
    let linkToRemove = this.getLink(position);
    if (!linkToRemove) {
      this.top = null;
      throw Error("You can't remove incorrect link!");
    }
    // first(tail) link
    if (linkToRemove === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
      return this;
    }
    // last(top) link
    if (linkToRemove === this.top) {
      this.top = this.top.next;
      this.top.prev = null;
      return this;
    }
    // inner link
    linkToRemove.prev.next = linkToRemove.next;
    linkToRemove.next.prev = linkToRemove.prev;
    return this;
  },

  getLength() {
    if (!this.top) {
      return 0;
    }

    let tmpLink = this.top;
    let count = 0;

    while (tmpLink) {
      count++;
      tmpLink = tmpLink.next;
    }

    return count;
  },

  reverseChain() {
    if (!this.top) {
      return this;
    }

    const length = this.getLength();
    if (length === 1) {
      return this;
    }

    this.tail = this.top;
    let firstLink = null;
    for (let i = 0; i < length - 1; i++) {
      let linkToMove = this.top.next;
      if (linkToMove.prev) {
        linkToMove.prev.next = linkToMove.next;
      }
      if (linkToMove.next) {
        linkToMove.next.prev = linkToMove.prev;
      }
      linkToMove.next = firstLink || linkToMove.prev;
      linkToMove.prev = null;
      linkToMove.next.prev = linkToMove;
      firstLink = linkToMove;
    }
    this.top = firstLink;
    return this;
  },

  toString(link) {
    let str = `( ${link.value} )`;
    str += link.prev ? "~~" : "";
    return str;
  },

  finishChain() {
    if (!this.top) {
      return this.top;
    }

    let tmpLink = this.tail;
    let strChain = "";
    while (tmpLink) {
      strChain += this.toString(tmpLink);
      tmpLink = tmpLink.prev;
    }
    this.top = null;
    return strChain;
  },
};

module.exports = {
  chainMaker,
};
