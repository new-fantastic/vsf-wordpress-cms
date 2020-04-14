export default {
  methods: {
    srcsetImage (sizes) {
      let srcSets = []
      if (sizes) {
        for (const [key, value] of Object.entries(sizes)) {
          if (key.endsWith('-width')) {
            srcSets.push(`${sizes[key.replace('-width', '')]} ${value}w`)
          }
        }
      }
      return srcSets.join(', ')
    }
  }
}