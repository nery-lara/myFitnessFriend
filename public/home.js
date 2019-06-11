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
              var tr = document.createElement('tr');
              var ta = document.createElement('td');
              ta.appendChild(document.createTextNode(data.foods[i].time));
              tr.appendChild(ta);
              var tb = document.createElement('td');
              tb.appendChild(document.createTextNode(data.foods[i].name));
              tr.appendChild(tb);
              var tc = document.createElement('td');
              tc.appendChild(document.createTextNode(data.foods[i].calories));
              tr.appendChild(tc);
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(data.foods[i].protein));
              tr.appendChild(td);
              var te = document.createElement('td');
              te.appendChild(document.createTextNode(data.foods[i].carbs));
              tr.appendChild(te);
              var tf = document.createElement('td');
              tf.appendChild(document.createTextNode(data.foods[i].fats));
              tr.appendChild(tf);
              foodlist.appendChild(tr);
            }

            for (var i = 0; i < data.cardio.length; i++) {
              var tr = document.createElement('tr');
              var ta = document.createElement('td');
              ta.appendChild(document.createTextNode(data.cardio[i].time));
              tr.appendChild(ta);
              var tb = document.createElement('td');
              tb.appendChild(document.createTextNode(data.cardio[i].name));
              tr.appendChild(tb);
              var tc = document.createElement('td');
              tc.appendChild(document.createTextNode(data.cardio[i].duration));
              tr.appendChild(tc);
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(data.foods[i].distance));
              tr.appendChild(td);
              cardiolist.appendChild(tr);
            }

            for (var i = 0; i < data.strength.length; i++) {
              var tr = document.createElement('tr');
              var ta = document.createElement('td');
              ta.appendChild(document.createTextNode(data.strength[i].time));
              tr.appendChild(ta);
              var tb = document.createElement('td');
              tb.appendChild(document.createTextNode(data.strength[i].name));
              tr.appendChild(tb);
              var tc = document.createElement('td');
              tc.appendChild(document.createTextNode(data.strength[i].weight));
              tr.appendChild(tc);
              var td = document.createElement('td');
              td.appendChild(document.createTextNode(data.strength[i].sets));
              tr.appendChild(td);
              var te = document.createElement('td');
              te.appendChild(document.createTextNode(data.strength[i].reps));
              tr.appendChild(te);
              strengthlist.appendChild(tr);
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
    $("tbody").empty()
    loadData()
}

function prevdate() {
    var curDateStr = localStorage.getItem('date')
    var curDate = new Date(curDateStr)
    var prevDay = new Date(curDate)
    prevDay.setDate(prevDay.getDate() - 1)
    datespan.textContent = prevDay.toDateString()
    localStorage.setItem('date', prevDay.toISOString())
    $("tbody").empty()
    loadData()
}
