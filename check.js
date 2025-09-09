   const categoriesList=document.getElementById("categories-container");
      
   const treeContainer=document.getElementById("tree-container-in-ui")
   // cart box design and code 
   const cartContainer=document.getElementById("cart-container")





const allplants=()=>{
const url="https://openapi.programming-hero.com/api/plants"
fetch(url)
.then((response)=>response.json())
.then((data)=> displayAllTrees(data.plants))

}


const displayAllTrees=(plants)=>{

   
 
    categoriesList.innerHTML="";

  for(let plant of plants){

    console.log(plant)
        const categorieCard=document.createElement("div");
        categorieCard.innerHTML +=`
        
       
        <button  onclick="loadCategoriesdetailsInCard('${plant.id}')" class=" text-[#1F2937] font-semibold p-2 text-lg"> All Plants </button>
      
        `




 categoriesList.append(categorieCard)
 }


}

  
allplants()









const displayallPlants =(plants)=>{

treeContainer.innerHTML="";



plants.forEach(plant => {
  const treeCard=document.createElement("div");
  treeCard.innerHTML=` 
  
  <div class="" >
         <section class="  ">

         <div class="rounded-t-lg-2xl h-[190px]" >
         <img class=" rounded-t-xl h-full w-full object-cover" src="${plant.image}" alt="">
         </div>

         
         <div class="p-5 rounded-b-xl bg-white">
          <h1 class="font-bold"> ${plant.name}</h1>
          <p class="text-sm text-gray-700" >${plant.description}  </p>

          <div class="my-4 flex items-center justify-between">
            <h1 class="text-green-800 rounded px-2 bg-[#DCFCE7]" >${plant.category}</h1>
            <p class="font-bold">$ <span> ${plant.price}</span> </p>
          </div>
      
          <button class="text-white btn bg rounded-full w-full bg-[#15803D]">Add to Cart</button>
         </div>


       </section>
</div>
  
  
  
  `

  treeContainer.append(treeCard)
});
}











// data.categories.addEventListener("click",(e)=>{

// const allbutoon=document.querySelectorAll("button")
// allbutoon.forEach(button=>{
// console.log(button)
 
// button.classList.remove("bg-green-700")


// })

// if(e.target=== "button"){
//   e.target.classList.add("bg-green-700")
// }


// })






// ক্যাটাগরি লোড করার ফাংশন
const loadTreeCategoriesFromApi = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayTheLoadTreeCategories(data.categories);

      // ✅ পেজ লোড হতেই সব প্ল্যান্ট দেখাও
      loadAllPlants();
    });
};

// All Plants ফাংশন
const loadAllPlants = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let allTrees = [];

      // প্রতিটি ক্যাটাগরির জন্য আলাদা ফেচ
      const promises = data.categories.map(categorie => {
        return fetch(`https://openapi.programming-hero.com/api/category/${categorie.id}`)
          .then(res => res.json())
          .then(categoryData => {
            allTrees = allTrees.concat(categoryData.plants);
          });
      });

      // সব ফেচ শেষ হলে UI তে দেখাও
      Promise.all(promises).then(() => {
        displayTheTreeInContainerFromApi(allTrees);
      });


      
    })
    .catch(err => console.error(err));
};
