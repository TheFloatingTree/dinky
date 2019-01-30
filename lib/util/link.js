const {parse, format} = require("url")

const fetch = require("node-fetch")
const camelCase = require("camelcase-keys")

const right = require("./partialRight")
const waterfall = require("./waterfall")
const partial = require("./partial")

const setProtocol = url => url.replace(/^(https?:\/\/)?/, "https://")

const available = ["trixiebooru.org", "derpibooru.org"]
const joined = available.join(", ")

/**
 * @api private
 */
function link({url, key = null} = {}) {
  url = parse(setProtocol(url.toLowerCase()))

  return async function request(pathname, search) {
    if (!available.includes(url.hostname)) {
      throw new Error(
        `Dinky can sends requests only to these hosts: ${joined}`
      )
    }

    if (key) {
      search.set(["key", key])
    }

    pathname = `${pathname}.json`

    const address = format({...url, pathname, search: search.toString()})

    const send = partial(fetch, address, {method: "get"})

    const read = response => response.json()

    return waterfall([send, read, right(camelCase, {deep: true})])
  }
}

module.exports = link