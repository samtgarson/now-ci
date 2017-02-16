import test from 'ava'
import { findById, del } from 'in-mem'
import Base from '../../models/base'

class Test extends Base {
  static get attrs () {
    return ['a', 'b']
  }
}

test.afterEach.always(() => {
  del('Test')
})

test('assigns the attributes', t => {
  const attrs = { a: 1, b: 2, c: 2 }
  const base = new Test(attrs)

  t.is(base.a, attrs.a)
  t.is(base.b, attrs.b)
  t.is(base.c, undefined)
})

test('has a name', t => {
  const base = new Test()

  t.is(base._name, 'Test')
})

test('has values', t => {
  const attrs = { a: 1, b: 2 }
  const base = new Test(attrs)
  t.deepEqual(base.values, { ...attrs, _persisted: false })
})

test('can save and update', t => {
  const base = new Test({ a: 1, b: 2 })

  t.false(base._persisted)
  base.save()

  t.true(base._persisted)
  t.truthy(base.id)
  let found = findById('Test', base.id)
  t.deepEqual(base.values, found)

  base.a = 3
  base.save()
  found = findById('Test', base.id)

  t.deepEqual(found.a, 3)
})

test('can find all', t => {
  t.deepEqual(Test.all(), [])
  const base = new Test({ a: 1, b: 2 })
  base.save()

  const all = Test.all()
  t.deepEqual(all, [base])
})

test('can find by ID', t => {
  t.is(Test.find('abc'), undefined)
  const base = new Test({ a: 1, b: 2 })
  base.save()

  t.deepEqual(Test.find(base.id), base)
})

test('can find by attribute', t => {
  t.is(Test.find('abc'), undefined)
  const base = new Test({ a: 1, b: 2 })
  base.save()

  t.deepEqual(Test.findBy({ b: 2 }), base)
})

test('can count', t => {
  t.is(0, Test.count)
  const base = new Test({ a: 1, b: 2 })
  base.save()

  t.is(1, Test.count)
})

test('can new and create', t => {
  const base = Test.new({ a: 1, b: 2 })
  const base2 = Test.create({ a: 1, b: 2 })

  t.false(base._persisted)
  t.true(base2._persisted)
  t.is(1, Test.count)
})
