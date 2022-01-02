import { createClient } from "./node_modules/@supabase/supabase-js";
// Remplace les constantes par les tienne
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM5NTg3NzY5LCJleHAiOjE5NTUxNjM3Njl9.UN1MoxDyGImGKfDdi5BJMTF85vEKCY2RzhgG12aF9Uo";
const SUPABASE_URL = "https://ixiwdzxiyrsjgjnrkqvi.supabase.co/rest/v1/apprenants";
const nomRepertoireSupabase = "photo-profil"
const supabase = createClient('https://ixiwdzxiyrsjgjnrkqvi.supabase.co', SUPABASE_KEY)
const inputFile = document.getElementById('image')
const inputNom = document.getElementById('nom')
const inputPrenom = document.getElementById('prenom')
const bouttonsubmit = document.querySelector("#submit")

bouttonsubmit.addEventListener('click', function (e) {
   e.preventDefault()
   console.log(inputFile.files[0]);

   // Upload une image 
   uploadImage(inputFile.files[0])
   .then((response) => {

      // response.data.key ?? console.log(response)

      //recuperer l'url de l'image une fois saisie
      let urlImage = (supabase.storage.from(nomRepertoireSupabase).getPublicUrl(response.nomImageUpload).publicURL);

      // creation de notre apprenant
      const apprenant = { nom: "", prenom: "", url: "" }
      apprenant.nom = inputNom.value
      apprenant.prenom = inputPrenom.value
      apprenant.url = urlImage

      //Inserer dans la base donnee
      fetch(SUPABASE_URL, {
         method: "POST",
         headers: {
            apiKey: SUPABASE_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: "return=representation"
         },
         body: JSON.stringify(apprenant)
      }).then((response) => response.json()).
         then((data) => {
            console.log(data);
            alert("✔✔✔succes")
         })
   })
})

//fonction pour uploader une image
const uploadImage = async (input) => {
   //try catch pour nous signiler une erreur en cas d'erreur
   const nomImageUpload = input.name
   try {
      const { data, error } = await supabase.storage.from(nomRepertoireSupabase).upload(nomImageUpload, input)
      return { data, nomImageUpload }
   } catch (error) {
      alert("🤷‍♀️🤷‍♀️🤷‍♀️", error)
      console.log(error);
      return error
   }
}
