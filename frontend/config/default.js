export default Object.freeze({
  API_BASE: import.meta.env.VITE_API_BASE,
  API_VERSION: import.meta.env.VITE_API_VERSION,
  API_URI: `${import.meta.env.VITE_API_BASE}/${
    import.meta.env.VITE_API_VERSION
  }`,
})
