function goto_random(pages) {
  let target_page = pages[Math.floor(Math.random() * pages.length)]
  window.location.href = "/" + target_page.replace(".j2", ".html")
}
