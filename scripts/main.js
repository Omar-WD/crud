let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let tmp


// console.log(title, price, taxes, ads, discount, total,count,category,submit);

//get Total

function getTotal() {
    if (price.value != "") {
        total.innerText = (+price.value + +taxes.value + +ads.value - +discount.value)
        total.style.backgroundColor = "#040"
    } else {
        total.innerText = "";
        total.style.backgroundColor = "rgb(185, 24, 24)";
    }
}

//Create Product

let dataProduct
let mode= "create"

if (localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product)
} else {
    dataProduct = []
}

submit.onclick = function () {

    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if(title.value != "" && price.value != "" && category.value !="" && count.value <= 100 ){
    if(mode === "create"){
        if (newProduct.count > 1){
            for (i=0; i< newProduct.count; i++){
                dataProduct.push(newProduct)
            }
        }else{
            dataProduct.push(newProduct)
        }
    }else{
        dataProduct[tmp]=newProduct
        mode="create"
        submit.innerHTML="create"
        count.style.display="block"

    }
    clearData()
    }else{

        alert("Get sure that the title, price and category fields are not empty and that the count value doesn't exceed 100.")
    }



    localStorage.setItem("product", JSON.stringify(dataProduct))
    // console.log(dataProduct);

   
   showData()
}

 //Create Product
 function clearData() {
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value=""
}

//read

function showData(){
    let table=""
 
    for(i=0; i < dataProduct.length; i++){
        table +=`
        <tr>
              <td>${i+1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
        `
        // console.log(table);
        
    }
    document.getElementById("tbody").innerHTML=table  
    let deleteAll= document.getElementById("deleteAll")
    if (dataProduct.length > 0){
        deleteAll.innerHTML=`<button onclick ="deleteAllFn()">Delete All (${dataProduct.length})</button>`
    }else{
        deleteAll.innerHTML=""
    }
}

showData()


function deleteData(i){
dataProduct.splice(i,1)
localStorage.product=JSON.stringify(dataProduct)
showData()
}

//delete All

function deleteAllFn(){
    dataProduct.splice(0)
    localStorage.clear()
    showData()
}

//updateDATA

function updateData(i){
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price
    taxes.value=dataProduct[i].taxes
    ads.value=dataProduct[i].ads
    discount.value=dataProduct[i].discount
    total.innerHTML=dataProduct[i].total
    category.value=dataProduct[i].category
    count.style.display="none"
    submit.innerHTML="update"
    mode="update"
    tmp=i
    scroll({
        top:0,
        behavior:"smooth",
    })
}

//search

let searchMood="title"



function getSearchMood(id){
    let search=document.getElementById("searchBox")
if (id == "searchTitle"){
    searchMood="title"
    search.placeholder="search by title"
}else{
    searchMood="category"
    search.placeholder="search by category"
}
search.focus()
search.value=""
showData()
}


function searchData(value){
    let table=""

    if (searchMood == "title"){
   for (i=0; i<dataProduct.length; i++){
    if(dataProduct[i].title.includes(value.toLowerCase())){
        table +=`
        <tr>
              <td>${i+1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
        `
        
    }} 


   }else {
    for (i=0; i<dataProduct.length; i++){
    if(dataProduct[i].category.includes(value.toLowerCase())){
        table +=`
        <tr>
              <td>${i+1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxes}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
          </tr>
        `
        
    }
    
}}
document.getElementById("tbody").innerHTML=table
    
}