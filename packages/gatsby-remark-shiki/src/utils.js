function createHighlightedString(ranges, text) {
  var flatRanges = flattenRanges(ranges)
  var inflatedRanges = inflateRanges(flatRanges, text.length)
  var filledRanges = fillRanges(inflatedRanges, text)
  var str = ''
  var index = 0
  for (var i in filledRanges) {
    var range = filledRanges[i]
    var begin = range.begin,
      end = range.end
    if (range.count > 0) {
      if (range.tooltip) {
        str +=
          "<span class='highlight-" +
          range.count +
          " tooltip'>" +
          range.text +
          "<span class='tooltiptext tooltip-bottom'>" +
          range.tooltip.join('<br/>') +
          '</span></span>'
      } else {
        str += "<span class='highlight-" + range.count + "'>" + range.text + '</span>'
      }
    } else {
      str += range.text
    }
  }
  return str
}

function flattenRanges(ranges) {
  var points = []
  var flattened = []
  for (var i in ranges) {
    if (ranges[i].end < ranges[i].begin) {
      //RE-ORDER THIS ITEM (BEGIN/END)
      var tmp = ranges[i].end + 1 //RE-ORDER BY SWAPPING
      ranges[i].end = ranges[i].begin
      ranges[i].begin = tmp
    }
    points.push(ranges[i].begin)
    points.push(ranges[i].end)
  }
  //MAKE SURE OUR LIST OF POINTS IS IN ORDER
  points.sort(function(a, b) {
    return a - b
  })
  //FIND THE INTERSECTING SPANS FOR EACH PAIR OF POINTS (IF ANY)
  //ALSO MERGE THE ATTRIBUTES OF EACH INTERSECTING SPAN, AND INCREASE THE COUNT FOR EACH INTERSECTION
  for (var i in points) {
    if (i == 0 || points[i] == points[i - 1]) continue
    var includedRanges = ranges.filter(function(x) {
      return Math.max(x.begin, points[i - 1]) < Math.min(x.end, points[i])
    })
    if (includedRanges.length > 0) {
      var flattenedRange = {
        begin: points[i - 1],
        end: points[i],
        count: 0,
      }
      for (var j in includedRanges) {
        var includedRange = includedRanges[j]
        for (var prop in includedRange) {
          if (prop != 'begin' && prop != 'end') {
            if (!flattenedRange[prop]) flattenedRange[prop] = []
            flattenedRange[prop].push(includedRange[prop])
          }
        }
        flattenedRange.count++
      }
      flattened.push(flattenedRange)
    }
  }
  return flattened
}

function inflateRanges(ranges, length = 0) {
  var inflated = []
  var lastIndex
  for (var i in ranges) {
    if (i == 0) {
      //IF THERE IS EMPTY TEXT IN THE BEGINNING, CREATE AN EMOTY RANGE
      if (ranges[i].begin > 0) {
        inflated.push({
          begin: 0,
          end: ranges[i].begin - 1,
          count: 0,
        })
      }
      inflated.push(ranges[i])
    } else {
      if (ranges[i].begin == ranges[i - 1].end) {
        ranges[i - 1].end--
      }
      if (ranges[i].begin - ranges[i - 1].end > 1) {
        inflated.push({
          begin: ranges[i - 1].end + 1,
          end: ranges[i].begin - 1,
          count: 0,
        })
      }
      inflated.push(ranges[i])
    }
    lastIndex = ranges[i].end
  }
  //FOR SIMPLICITY, ADD ANY REMAINING TEXT AS AN EMPTY RANGE
  if (lastIndex + 1 < length - 1) {
    inflated.push({
      begin: lastIndex + 1,
      end: length - 1,
      count: 0,
    })
  }
  return inflated
}

function fillRanges(ranges, text) {
  for (var i in ranges) {
    ranges[i].text = text.slice(ranges[i].begin, ranges[i].end + 1)
  }
  return ranges
}

module.exports = {
  createHighlightedString,
}

/**
 
// A TypeScript port of https://stackoverflow.com/questions/40117156/creating-overlapping-text-spans-in-javascript
type Range = { begin: number; end: number; text?: string; count?: number; tooltip?: string[] }

function createHighlightedString(ranges: Range[], text: string) {
  var flatRanges = flattenRanges(ranges)
  var inflatedRanges = inflateRanges(flatRanges, text.length)
  var filledRanges = fillRanges(inflatedRanges, text)
  var str = ''

  for (var i in filledRanges) {
    var range = filledRanges[i]

    if (range.count && range.count > 0) {
      if (range.tooltip) {
        str +=
          "<span class='highlight-" +
          range.count +
          " tooltip'>" +
          range.text +
          "<span class='tooltiptext tooltip-bottom'>" +
          range.tooltip.join('<br/>') +
          '</span></span>'
      } else {
        str += "<span class='highlight-" + range.count + "'>" + range.text + '</span>'
      }
    } else {
      str += range.text
    }
  }
  return str
}

function flattenRanges(ranges: Range[]) {
  var points: number[] = []
  var flattened = []
  for (let i in ranges) {
    if (ranges[i].end < ranges[i].begin) {
      //RE-ORDER THIS ITEM (BEGIN/END)
      var tmp = ranges[i].end + 1 //RE-ORDER BY SWAPPING
      ranges[i].end = ranges[i].begin
      ranges[i].begin = tmp
    }
    points.push(ranges[i].begin)
    points.push(ranges[i].end)
  }
  //MAKE SURE OUR LIST OF POINTS IS IN ORDER
  points.sort(function(a, b) {
    return a - b
  })
  //FIND THE INTERSECTING SPANS FOR EACH PAIR OF POINTS (IF ANY)
  //ALSO MERGE THE ATTRIBUTES OF EACH INTERSECTING SPAN, AND INCREASE THE COUNT FOR EACH INTERSECTION
  for (const indexString in points) {
    let i = Number(indexString)
    if (i === 0 || points[i] == points[i - 1]) continue
    let includedRanges = ranges.filter(function(x) {
      return Math.max(x.begin, points[i - 1]) < Math.min(x.end, points[i])
    })
    if (includedRanges.length > 0) {
      var flattenedRange = {
        begin: points[i - 1],
        end: points[i],
        count: 0,
      }
      for (let j in includedRanges) {
        let includedRange = includedRanges[j]

        for (let prop in includedRange) {
          if (prop != 'begin' && prop != 'end') {
            // @ts-ignore
            if (!flattenedRange[prop]) flattenedRange[prop] = []
            // @ts-ignore
            flattenedRange[prop].push(includedRange[prop])
          }
        }
        flattenedRange.count++
      }
      flattened.push(flattenedRange)
    }
  }
  return flattened
}

function inflateRanges(ranges: Range[], length = 0) {
  var inflated = []
  var lastIndex
  for (const indexString in ranges) {
    let i = Number(indexString)
    if (i === 0) {
      //IF THERE IS EMPTY TEXT IN THE BEGINNING, CREATE AN EMPTY RANGE
      if (ranges[i].begin > 0) {
        inflated.push({
          begin: 0,
          end: ranges[i].begin - 1,
          count: 0,
        })
      }
      inflated.push(ranges[i])
    } else {
      if (ranges[i].begin == ranges[i - 1].end) {
        ranges[i - 1].end--
      }
      if (ranges[i].begin - ranges[i - 1].end > 1) {
        inflated.push({
          begin: ranges[i - 1].end + 1,
          end: ranges[i].begin - 1,
          count: 0,
        })
      }
      inflated.push(ranges[i])
    }
    lastIndex = ranges[i].end
  }
  //FOR SIMPLICITY, ADD ANY REMAINING TEXT AS AN EMPTY RANGE
  if (lastIndex && lastIndex + 1 < length - 1) {
    inflated.push({
      begin: lastIndex + 1,
      end: length - 1,
      count: 0,
    })
  }
  return inflated
}

function fillRanges(ranges: Range[], text: string) {
  for (let i in ranges) {
    ranges[i].text = text.slice(ranges[i].begin, ranges[i].end + 1)
  }
  return ranges
}

 */
