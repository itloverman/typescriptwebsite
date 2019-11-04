// @ts-check
// Data-dump all the TSConfig options

/** Run with:
     node --inspect-brk ./node_modules/.bin/ts-node --project packages/tsconfig-reference/tsconfig.json packages/tsconfig-reference/scripts/generateMarkdown.ts
     yarn ts-node --project packages/tsconfig-reference/tsconfig.json packages/tsconfig-reference/scripts/generateMarkdown.ts 
*/

import { writeFileSync, readdirSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import * as assert from 'assert'
import { read as readMarkdownFile } from 'gray-matter'
import * as prettier from 'prettier'

const options = require('../data/tsconfigOpts.json') as typeof import('../data/tsconfigOpts.json')
const categories = require('../data/tsconfigCategories.json') as typeof import('../data/tsconfigCategories.json')

const orderedCategories = [
  'Basic_Options_6172',
  'Strict_Type_Checking_Options_6173',
  'Module_Resolution_Options_6174',
  'Source_Map_Options_6175',
  'Additional_Checks_6176',
  'Experimental_Options_6177',
  'Advanced_Options_6178',
  'Command_line_Options_6171',
]

// Makes sure all categories are accounted for in ^
assert.deepEqual(Object.keys(categories).sort(), orderedCategories.map(c => c.split('_').pop()).sort())

const languages = readdirSync(join(__dirname, '..', 'copy'))

languages.forEach(lang => {
  const locale = join(__dirname, '..', 'copy', lang)
  const fallbackLocale = join(__dirname, '..', 'copy', 'en')

  const markdownChunks: string[] = []

  const getPathInLocale = (path: string) => {
    if (existsSync(join(locale, path))) return join(locale, path)
    if (existsSync(join(fallbackLocale, path))) return join(fallbackLocale, path)
    throw new Error('Could not find a path for ' + path)
  }

  // Make a JSON dump of the category anchors someone wrapping the markdown
  const allCategories = [] as { display: string; anchor: string }[]

  orderedCategories.forEach(categoryID => {
    const category = Object.values(categories).find((c: any) => c.key === categoryID)
    assert.ok(category)

    const categoryPath = getPathInLocale(join('categories', categoryID + '.md'))
    const categoryFile = readMarkdownFile(categoryPath)

    assert.ok(categoryFile.data.display) // Must have a display title in the front-matter

    // Let the title change it's display but keep the same ID
    const title = `<a href='#${categoryID}'>#</a><h2 id='${categoryID}'>${categoryFile.data.display}</h2>`
    markdownChunks.push(title)
    allCategories.push({ display: categoryFile.data.display, anchor: categoryID })

    // Push the category copy
    markdownChunks.push(categoryFile.content)

    // Loop through their options
    const optionsForCategory = options.filter(o => o.category === category.code)
    optionsForCategory.forEach(option => {
      const optionPath = getPathInLocale(join('options', option.name + '.md'))
      const optionFile = readMarkdownFile(optionPath)

      // Must have a display title in the front-matter
      assert.ok(optionFile.data.display, 'Could not get a display for option: ' + option.name + ' in ' + lang)

      // Let the title change it's display but keep the same ID
      const title = `<a href='#${option.name}'>#</a><h2 id='${option.name}'>${optionFile.data.display}</h2>`

      markdownChunks.push(title)
      markdownChunks.push(optionFile.content)

      // Make a markdown table of the important metadata
      const mdTableRows = [] as [string, string][]

      mdTableRows.push(['Value', '`' + option.name + '`'])
      if (option.deprecated) mdTableRows.push(['Status', 'Deprecated'])

      if (option.defaultValue) {
        const value = option.defaultValue.includes(' ') ? option.defaultValue : '`' + option.defaultValue + '`'
        mdTableRows.push(['Default', value])
      }

      if (option.related) {
        const optionValue = option.related.map(r => `[\`${r}\`](#${r})`).join(', ')
        mdTableRows.push(['Related', optionValue])
      }

      const table = ` |   |   |\n | ---- | --- | \n` + mdTableRows.map(r => `${r[0]} | ${r[1]}`).join('\n')
      markdownChunks.push(table)

      markdownChunks.push('---')
    })
  })

  // Write the Markdown and JSON
  const markdown = prettier.format(markdownChunks.join('\n'), { filepath: 'index.md' })
  const mdPath = join(__dirname, '..', 'output', lang + '.md')
  writeFileSync(mdPath, markdown)
  console.log(mdPath)

  writeFileSync(join(__dirname, '..', 'output', lang + '.json'), JSON.stringify({ categories: allCategories }))

  // Do a quick linter at the end
  const unfound = options.filter(o => markdown.includes(o))
  if (unfound.length) throw new Error(`Could not find these options in ${lang}: ${unfound.map(u => u.name).join(', ')}`)
})
