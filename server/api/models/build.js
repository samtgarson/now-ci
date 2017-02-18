import Base from './base'

class Build extends Base {
  static attrs = [
    'headCommit',
    'sender',
    'repo',
    'ref',
    'status'
  ]

  get branch () {
    const split = this.ref.split('/')
    return split[split.length - 1]
  }
  get sha () {
    return this.headCommit.id
  }
  run () {
    console.log('Building!', this.branch)
  }
}

export default Build
