const { count, insert, update, findById, find, findAll, del } = require('in-mem')

const matches = (r, attrs) => {
  return Object.keys(attrs).every(attr => r[attr] === attrs[attr])
}

module.exports = class Base {
  constructor (attrs = {}) {
    this._persisted = attrs._persisted || false
    if (attrs.id) this.id = attrs.id
    if (attrs.dateCreated) this.dateCreated = attrs.dateCreated

    this.constructor.attrs.forEach(key => this[key] = attrs[key])
  }
  static get attrs () {
    return []
  }
  static new (attrs) {
    return new this(attrs)
  }
  static create (attrs) {
    const created = new this(attrs)
    created.save()
    return created
  }
  static all () {
    const all = findAll(this.name)
    return all.reduce((arr, f) => {
      arr.push(this.new(f))
      return arr
    }, [])
  }
  static find (id) {
    const found = findById(this.name, id)
    return found ? this.new(found) : undefined
  }
  static findBy (args) {
    const found = find(this.name, record => matches(record, args))
    return found ? this.new(found) : undefined
  }
  static get count () {
    return count(this.name)
  }
  static deleteAll () {
    return del(this.name)
  }
  get _name () {
    return this.constructor.name
  }
  get values () {
    return Object.keys(this).reduce((attrs, attr) => {
      attrs[attr] = this[attr]
      return attrs
    }, {})
  }
  save () {
    if (this._persisted) return this._update()
    return this._insert()
  }
  delete () {
    if (!this._persisted) return true
    return del(this._name, r => r.id === this.id)
  }
  _insert () {
    this._persisted = true
    const inserted = insert(this._name, this.values)
    this.id = inserted.id
    this.dateCreated = inserted.dateCreated
    return true
  }
  _update () {
    update(this._name, this.id, this.values)
    return true
  }
}
