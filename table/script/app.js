import data from './data.json' assert { type: 'json' }

const tableHead = Object.keys(data.users[0])
const root = document.getElementsByTagName('root')[0] // getelementByTags returns array => HTMLCollection [root]  [0] => 'root'
root.setAttribute('id', 'root')
const table = document.createElement('table')
const main = document.createElement('main')

main.className = 'main container-fluid mx-auto p-2'
table.className =
  'table table-dark table-hover font-monospace table-bordered my-4'

const thead = document.createElement('thead')
const theadRow = document.createElement('tr')
theadRow.className = 'table-success'

tableHead.map((head) => {
  const th = document.createElement('th') //tag
  th.className = 'text-capitalize fs-5 fw-semibold p-3 '
  th.setAttribute('scope', 'col')
  th.innerText = head
  theadRow.appendChild(th)
})

thead.appendChild(theadRow)
table.appendChild(thead)

const tbody = document.createElement('tbody')

for (let i = 0; i < data.users.length; i++) {
  const user = data.users[i]
  const tr = document.createElement('tr')

  tableHead.map((key) => {
    const td = document.createElement('td')
    td.className = 'text-center'
    if (key === 'image') {
      const div = document.createElement('div')
      const img = document.createElement('img')

      div.style.width = '100px '
      div.style.height = '100px'

      img.setAttribute('src', user[key])
      img.setAttribute('alt', 'User Image')

      img.className = 'user-image w-100 h-100 img-thumbnail'
      div.className = 'image'

      div.appendChild(img)
      td.appendChild(div)
    } else {
      td.innerText = user[key]
    }

    tr.appendChild(td)
  })

  tbody.appendChild(tr)
}

table.appendChild(tbody)
root.appendChild(main)
main.appendChild(table)
