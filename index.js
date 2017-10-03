let item_name = document.getElementById('item_name')
let start_date = document.getElementById('start_date')
let exp_date = document.getElementById('exp_date')
let slack_name = document.getElementById('slack_name')
const storage_id = document.getElementById('storage_id')
const show_slack = document.getElementById('slack_show_name')


document.addEventListener('DOMContentLoaded', function() {

    $('.modal').modal();
    $('#modal1').modal('open');
    $('#modal1').modal('close');
    $('select').material_select();
})

document.getElementById('fridge1').addEventListener("click", () => {
  fetch('http://localhost:3000/api/v1/items').then(res=>res.json()).then(json => console.log(json))
})

// fetch("http://localhost:3000/api/v1/items/", {
//     method: "POST",
//     headers: {'Accept': 'application/json',
//         'Content-Type': 'application/json'},
//     body: JSON.stringify({name: 'Turkey', student_id: '1', start_date: '2017-01-01', exp_date: '2017-01-02', storage_id: '1'})
//     }).then(res => res.json()).then(res => console.log(res))

document.getElementById('fs_item_form').addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/api/v1/items/", {
      method: "POST",
      headers: {'Accept': 'application/json',
          'Content-Type': 'application/json'},
      body: JSON.stringify({name: item_name.value, start_date: start_date.value, exp_date: exp_date.value, storage_id: storage_id.value, slack_name: slack_name.value})
      }).then(res => res.json()).then(res => console.log(res))


  console.log("on the way")

})
document.getElementById('fs_items_show').addEventListener("submit", (e)=>{
  e.preventDefault();
  fetch(`http://localhost:3000/api/v1/items/${show_slack.value}`).then(res => res.json()).then(res => console.log(res))
})
