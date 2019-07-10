const opn = require('opn')
const superagent = require('superagent')
const render = document.getElementById('render')

document.addEventListener('keypress', (e) => {
  if (e.code === 'Slash') window.location.replace('./nsfw.html')
})

function start () {
  render.innerHTML = ''
  let choice = document.getElementById('select').value
  for (let c = 0; c < 100; c++) {
    superagent.get('https://nekobot.xyz/api/image?type=' + choice, (err, res) => {
      if (err) console.error(err)
  
      render.innerHTML += renderer(res.body.message)
    })
  }
}

function renderer (url) {
  return `<div class="card mb-3">
<div class="row no-gutters">
  <div class="col-md-4">
    <img src="${url}" class="card-img" alt="${url}">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${url}</h5>
      <button class="btn btn-primary" onclick="opn('${url}')">Open With Browser</button>
      <p class="card-text"><small class="text-muted">Powered By NekoBot.xyz</small></p>
    </div>
  </div>
</div>
</div>`
}


