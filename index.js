let item_name = document.getElementById('item_name')
let start_date = document.getElementById('start_date')
let exp_date = document.getElementById('exp_date')
let slack_name = document.getElementById('slack_name')
const storage_id = document.getElementById('storage_id')
const show_slack = document.getElementById('slack_show_name')
let usersItems;

document.addEventListener('DOMContentLoaded', function() {

    $('.modal').modal();
    $('#modal1').modal('open');
    $('#modal1').modal('close');
    $('select').material_select();
})

document.getElementById('shw_btn').addEventListener("click", ()=>{
  document.getElementById('shw_list').innerHTML = ""

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
  item_name.value = ""
  start_date.value = ""
  exp_date.value = ""
  storage_id.value = 0
  slack_name.value = ""
})
document.getElementById('fs_items_show').addEventListener("submit", (e)=>{
  e.preventDefault();
  fetch(`http://localhost:3000/api/v1/items/${show_slack.value}`).then(res => res.json()).then(res => usersItems = res).then(display_items_in_fridge)
  show_slack.value = ""
})

var display_items_in_fridge = () => {
  document.getElementById('shw_list').innerHTML = ""
  usersItems.forEach((itm) =>{
    li = document.createElement('li')
    li.id = `list_itm_${itm.id}`
    li.innerHTML = `<button id=x_btn_${itm.id} >X</button><p>${itm.name} - ${itm.exp_date}</p>`
    document.getElementById('shw_list').appendChild(li)
    document.getElementById(`x_btn_${itm.id}`).addEventListener("click", (e)=>{
      e.preventDefault()
      delete_from_db(itm.id)
    })

  })
}
document.getElementById('keg1').addEventListener("mouseover", () => {
  fetch('http://localhost:3000/api/v1/kegs/1').then(res=>res.json()).then(json => console.log(json))
})

document.getElementById('keg2').addEventListener("mouseover", () => {
  fetch('http://localhost:3000/api/v1/kegs/2').then(res=>res.json()).then(json => console.log(json))
})

var delete_from_db = (id) => {

    fetch(`http://localhost:3000/api/v1/items/delete/${id}`).then(res => res.json()).then(res => {
    console.log(res);
    document.getElementById(`list_itm_${id}`).innerHTML = ""
  })

}

document.getElementsByName("img_hover_name").forEach((img) => {
  img.addEventListener("mouseover", ()=>{img.style.opacity = 0.75})

  // img.addEventListener("mouseover", ()=>{img.setAttribute('style','-webkit-filter: brightness(1.2)')})
  img.addEventListener("mouseout", ()=>{img.setAttribute('style','-webkit-filter: brightness(1.0)')})

})
// .addEventListener("mouseover", ()=>{a.setAttribute('style','-webkit-filter: brightness(1.1)')})
