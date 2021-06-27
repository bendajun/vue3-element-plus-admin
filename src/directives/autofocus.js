export default {
  name: 'autofocus',
  mounted(el) {
    const input = el.querySelector('input')
    input && input.focus()
  }
}
