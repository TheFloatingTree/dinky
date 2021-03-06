const Request = require("./Request")

/**
 * @api private
 */
class Entities extends Request {
  /**
   * Creates a new Search request for given query
   *
   * @param {string | string[]} [query = []] – query params
   *
   * @return {Search}
   *
   * @public
   */
  search(...query) {
    return this._dinky.search(...query)
  }

  /**
   * Get one entity by its ID
   *
   * @param {number} id
   * @param {object} [options = {}]
   *
   * @return {Promise<object>}
   *
   * @public
   */
  getById(id, options) {
    this._path.push(id)

    return this.exec(options)
  }
}

module.exports = Entities
