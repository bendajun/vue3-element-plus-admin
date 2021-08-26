export default {
  name: 'autofocus',
  handler(el) {
    const input = el.querySelector('input')
    input && input.focus()
  }
}
