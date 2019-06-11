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
var prevwarrow = document.getElementById('prevwarrow')
var nextwarrow = document.getElementById('nextwarrow')
var datespan = document.getElementById('datespan')
var weekspan = document.getElementById('weekspan')
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

function nextweek() {
    var curDateStr = localStorage.getItem('date')
    var curDate = new Date(curDateStr)
    var nextDay = new Date(curDate)
    nextDay.setDate(nextDay.getDate() + 6)
    weekspan.textContent = curDate.toDateString() + " - " + nextDay.toDateString()
    localStorage.setItem('date', nextDay.toISOString())
    $.ajax({
        url: "/weeklycalories",
        type: 'post',
        data: {
            date: localStorage.getItem('date'),
            email: localStorage.getItem('email')
        },
        success: (res) => {
            config.data.datasets[0].data = res.values
            config.data.labels = res.labels
            config.data.datasets[0].label = 'Weekly Calories'
            config.options.scales.yAxes[0].scaleLabel.labelString = 'Calories'
            window.weeklyGraph.update();
        }
    })
    $("#weekly-pills-calories-tab").trigger('click')
}

function prevweek() {
    var curDateStr = localStorage.getItem('date')
    var curDate = new Date(curDateStr)
    var prevDay = new Date(curDate)
    var prevprevday = new Date(curDate)
    prevDay.setDate(prevDay.getDate() - 6)
    prevprevday.setDate(prevDay.getDate() - 6)
    weekspan.textContent = prevprevday.toDateString() + " - " + prevDay.toDateString()
    localStorage.setItem('date', prevDay.toISOString())
    $.ajax({
        url: "/weeklycalories",
        type: 'post',
        data: {
            date: localStorage.getItem('date'),
            email: localStorage.getItem('email')
        },
        success: (res) => {
            config.data.datasets[0].data = res.values
            config.data.labels = res.labels
            config.data.datasets[0].label = 'Weekly Calories'
            config.options.scales.yAxes[0].scaleLabel.labelString = 'Calories'
            window.weeklyGraph.update();
        }
    })

    $("#weekly-pills-calories-tab").trigger('click')
}
prevarrow.onclick = prevdate
prevwarrow.onclick = prevweek
nextarrow.onclick = nextdate
nextwarrow.onclick = nextweek




