import React, { useEffect, useState } from 'react'
import MarkdownIt from 'markdown-it'

import styles from './index.module.css'

const { shell } = window.require('electron')
const openUrl = url => shell.openExternal(url)

export default function News () {
  const [content, setContent] = useState()

  /**
   * Download the News Markdown file from GitHub
   */
  useEffect(() => {
    const githubApiMarkdownNewsUrl =
      'https://api.github.com/repos/desko27/zoomcommander/contents/news/es/index.md'
    const headers = new window.Headers({ Accept: 'application/vnd.github.v3+json' })

    window
      .fetch(githubApiMarkdownNewsUrl, headers)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`GitHub API returned ${res.status} status code!`)
        }
        return res.json()
      })
      .then(responseObject => {
        const { encoding, content: encodedContent } = responseObject
        const buff = Buffer.from(encodedContent, encoding)
        const contentMd = buff.toString('utf8')
        const md = new MarkdownIt()
        const contentHtml = md.render(contentMd)
        setContent(contentHtml)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  /**
   * Open markdown links on a browser
   */
  const handleClick = event => {
    const { target } = event
    if (target.localName !== 'a') return
    event.preventDefault()
    openUrl(target.href)
  }

  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{ __html: content }}
      onClick={handleClick}
    />
  )
}
