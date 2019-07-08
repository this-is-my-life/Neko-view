const electron = require('electron').remote
const superagent = require('superagent')

function start () {
  document.getElementById('go').disabled = true
  let choice = document.getElementById('select').value
  superagent.get('https://nekobot.xyz/api/image?type=' + choice, (err, res) => {
    if (err) console.log(err)
    let n = new electron.BrowserWindow({
      frame: false,
    })
    n.setMenu(null)
    n.loadURL(res.body.message)
    copyTextToClipboard(res.body.message)
    document.getElementById('go').disabled = false
  })
}

function copyTextToClipboard (text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(() => {
    console.log('Async: Copying to clipboard was successful!')
  }, (err) => {
    console.error('Async: Could not copy text: ', err)
  });
}
