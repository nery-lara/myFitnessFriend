var todayDate = new Date()

localStorage.setItem('date', todayDate.toISOString())
console.log(localStorage.getItem('date'))
function loadData() {
    $.ajax({
        url: '/load',
        type: 'post',
        data: {
            date: localStorage.getItem('date'),
            email: localStorage.getItem('email')
        },
        success: (data) => {
            console.log(data)
            var foodlist = document.getElementById('foodlist')
            var strengthlist = document.getElementById('strengthlist')
            var cardiolist = document.getElementById('cardiolist')

            for (var i = 0; i < data.foods.length; i++) {
                var item = document.createElement('li')
                item.className += " list-group-item"
                item.appendChild(document.createTextNode(data.foods[i].name))
                foodlist.appendChild(item)
            }

            for (var i = 0; i < data.cardio.length; i++) {
                var item = document.createElement('li')
                item.className += " list-group-item"
                item.appendChild(document.createTextNode(data.cardio[i].name))
                cardiolist.appendChild(item)
            }


            for (var i = 0; i < data.strength.length; i++) {
                var item = document.createElement('li')
                item.className += " list-group-item"
                item.appendChild(document.createTextNode(data.strength[i].name))
                strengthlist.appendChild(item)
            }


        }
    })
}

loadData()

var prevarrow = document.getElementById('prevarrow')
var nextarrow = document.getElementById('nextarrow')
var datespan = document.getElementById('datespan')
function nextdate() {
    var curDateStr = localStorage.getItem('date')
    var curDate = new Date(curDateStr)
    var nextDay = new Date(curDate)
    nextDay.setDate(nextDay.getDate() + 1)
    datespan.textContent = nextDay.toDateString()
    localStorage.setItem('date', nextDay.toISOString())
    $("ul").empty()
    loadData()
}

function prevdate() {
    var curDateStr = localStorage.getItem('date')
    var curDate = new Date(curDateStr)
    var prevDay = new Date(curDate)
    prevDay.setDate(prevDay.getDate() - 1)
    datespan.textContent = prevDay.toDateString()
    localStorage.setItem('date', prevDay.toISOString())
    $("ul").empty()
    loadData()
}




