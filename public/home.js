var todayDate = new Date()

localStorage.setItem('date', todayDate.toISOString())
console.log(localStorage.getItem('date'))

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


