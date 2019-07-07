const test = require("ava")

const flat = require("../../../lib/util/flat")

test("Returns given empty array as-is", t => {
  t.deepEqual(flat([]), [])
})

test("Returns flatten array", t => {
  t.deepEqual(
    flat([
      ["Testing", "Testing"],
      1,
      [2, 3]
    ]),

    ["Testing", "Testing", 1, 2, 3]
  )
})

test("Returns 1-level flatten array by default", t => {
  t.deepEqual(
    flat([
      [
        ["value"]
      ]
    ]),

    [
      ["value"]
    ]
  )
})

test("Flattens array deeply when second argument is set", t => {
  t.deepEqual(
    flat(
      [
        [
          ["value"]
        ],
        ["another value"]
      ],

      Infinity
    ),

    ["value", "another value"]
  )
})

test("Flattens array on given depth level", t => {
  t.deepEqual(
    flat(
      [
        [
          ["value"]
        ],
        [
          [
            ["another value"]
          ]
        ]
      ],

      2
    ),

    ["value", ["another value"]]
  )
})
