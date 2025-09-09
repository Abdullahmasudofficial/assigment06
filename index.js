// load https://openapi.programming-hero.com/api/categories from api

  const container=document.getElementById("container")

   const categoriesList=document.getElementById("categories-container");
      
   const treeContainer=document.getElementById("tree-container-in-ui")
   // cart box design and code 
   const cartContainer=document.getElementById("cart-container")


let cartBox= []
let sum= 0;




const loadTreeCategoriesFromApi=()=>{
    const url="https://openapi.programming-hero.com/api/categories"
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{

      displayTheLoadTreeCategories(data.categories)





loadallplantsData();




   }  )   ;

}



const loadallplantsData=()=>{
manageSpinner(true)

const url="https://openapi.programming-hero.com/api/categories"
fetch(url)
.then((response)=>response.json())
.then((data)=>{

  let allPlantsFromThisFunction=[];

      const promisesfordata = data.categories.map(categorie => {
        return fetch(`https://openapi.programming-hero.com/api/category/${categorie.id}`)
          .then(res => res.json())
          .then(categoryData => {
            allPlantsFromThisFunction = allPlantsFromThisFunction.concat(categoryData.plants);
          });
      });

      
      Promise.all(promisesfordata).then(() => {
        displayTheTreeInContainerFromApi(allPlantsFromThisFunction);
      });


})

removeActiveClassmeansection()
}


const displayTheLoadTreeCategories=(categories)=>{

  for(let categorie of categories){

        const categorieCard=document.createElement("div");
        categorieCard.innerHTML +=`
      
        
      <button id="cetegorie-btn-${categorie.id}" onclick="loadCategoriesdetailsInCard('${categorie.id}')" class=" hover:bg-green-100 rounded-lg w-1/2 text-left  text-[#1F2937] ctgry-button p-2 text-lg"> ${categorie.category_name} </button>

        `


 categoriesList.append(categorieCard)
 }


}

const removeActiveClass=()=>{
  const ctgrybutton=document.querySelectorAll(".ctgry-button")
  ctgrybutton.forEach(btn=>btn.classList.remove("activeee"))
}

const removeActiveClassmeansection=()=>{
  const ctgrybuttonn=document.querySelector(".ctgrybuttonnn")
  ctgrybuttonn.classList.remove("activeee")
}



const loadCategoriesdetailsInCard=(id)=>{
  manageSpinnerForCetegory(true)
    const url=`https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      removeActiveClass();
      const clickbtn=document.getElementById(`cetegorie-btn-${id}`);
      clickbtn.classList.add("activeee")
    
       displayTheTreeInContainerFromApi(data.plants)
    }
  
  
  )
  }

const displayTheTreeInContainerFromApi =(trees)=>{

treeContainer.innerHTML="";


trees.forEach(tree => {
  const treeCard=document.createElement("div");
  treeCard.innerHTML=` 
  
  <div onclick="loadModalfromApi(${tree.id})" class="" >
         <section class="  ">

         <div class="rounded-t-lg-2xl h-[190px]" >
         <img class=" rounded-t-xl h-full w-full object-cover" src="${tree.image}" alt="">
         </div>

         
         <div class=" p-5 rounded-b-xl bg-white">
          <h1 class="font-bold"> ${tree.name}</h1>
          <p class="text-sm text-gray-700" >${tree.description}  </p>

          <div class="my-4 flex items-center justify-between">
            <h1 class="text-green-800 rounded px-2 bg-[#DCFCE7]" >${tree.category}</h1>
            <p class="font-bold">$ <span> ${tree.price}</span> </p>
          </div>
      
          <button class="text-white btn bg rounded-full w-full bg-[#15803D]">Add to Cart</button>
         </div>


       </section>
</div>
  
  
  
  `

  treeContainer.append(treeCard)
});
manageSpinnerForCetegory(false)
manageSpinner(false)

}



treeContainer.addEventListener("click",(e)=>{

 if(e.target.innerText === 'Add to Cart'){
   handalecartBox(e)




 }

})

const handalecartBox=(e)=>{
  const nameofTree= e.target.parentNode.children[0].innerText;
const price = e.target.parentNode.children[2].children[1].children[0].innerText;




cartBox.push({
  nameofTree:nameofTree,
  price:price
});



showCartBoxInUi(cartBox)
}


const showCartBoxInUi = (cartBox) => {
  cartContainer.innerHTML= "";



let totalamount= 0;

  cartBox.forEach(cart => {

    totalamount += parseFloat(cart.price); 
    cartContainer.innerHTML+=`
      <div class="my-3 items-center p-2 flex justify-between rounded-md bg-[#F0FDF4]" id="cart">
        <div>
          <h1 class="font-semibold text-[#1F2937]">${cart.nameofTree}</h1>
          <p class="text-start text-[#8C8C8C]">$ <span id="cart-amount">${cart.price}</span></p>
        </div>
        <div>
          <button onclick="deleteCart('${cart.nameofTree}')" class="text-[#8C8C8C]">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `

  })


document.getElementById("totalamount").innerText=totalamount

}

const deleteCart = (deletedItemName)=>{
  cartBox = cartBox.filter(cart => cart.nameofTree !== deletedItemName)
  showCartBoxInUi(cartBox)
}




const manageSpinner=(status)=>{

    if(status== true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("container").classList.add("hidden");
        

    }

    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("container").classList.remove("hidden");
    }

}


const manageSpinnerForCetegory=(status)=>{

    if(status== true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("categories-container").classList.add("hidden");
        

    }

    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("categories-container").classList.remove("hidden");
    }

}





const loadModalfromApi=(id)=>{

const url =`https://openapi.programming-hero.com/api/plant/${id}`
console.log(url)
fetch(url)
.then(response=>response.json())
.then((data)=>displayModalFromApi(data.plants))

}



const displayModalFromApi=(plant)=>{
console.log(plant)
const aboutModal=document.getElementById("modal-container");

aboutModal.innerHTML=`  
<div class="rounded-t-lg-2xl h-[190px]" >
         <img class=" rounded-t-xl h-full w-full object-cover" src="${plant.image}" alt="">
         </div>

         
         <div class=" p-5 rounded-b-xl bg-white">
          <h1 class="font-bold"> ${plant.name}</h1>
          <p class="text-sm text-gray-700" >${plant.description}  </p>

          <div class="my-4 flex items-center justify-between">
            <h1 class="text-green-800 rounded px-2 bg-[#DCFCE7]" >${plant.category}</h1>
            <p class="font-bold">$ <span> ${plant.price}</span> </p>
          </div>



`;




document.getElementById("myModal").showModal()
}


 loadTreeCategoriesFromApi()



