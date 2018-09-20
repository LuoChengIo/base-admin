export default{
  inserted(el) {
    const cheight = document.body.clientHeight
    const offsetTop = el.offsetTop + 20
    el.style.minHeight = (cheight - offsetTop) + 'px'
  },
  bind(el, binding) {

  },
  unbind(el) {

  }
}
