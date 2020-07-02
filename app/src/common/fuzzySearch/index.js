import Fuse from 'fuse.js'

export default function fuzzySearch (userList, searchString) {
  const fuse = new Fuse(userList, {
    shouldSort: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['userName']
  })
  return fuse.search(searchString).map(({ item }) => item)
}
