# Hozzáadható featurek

- Admin blog post szerkesztésnél felugorhatna a form-hoz (window.scrollTo)
- Ha újra töltöm az oldalt, akkor maradjon bejelentkezve a felhasznalo - localStorage - accessToken
- Képkezelése feltöltés, mentés, vissza megjelenítés
- Lapozhatóság
- CSS framework
- night and day mode (dark mode) - contexes dolog, ujratoltes eseten: localStorage


# Észrevételek
 - editModeId !== null ? (handleEditArticle) : (handleNewArticle)
   - a handler-ben lekezelni, hogy módtól függően mit csináljon 



# post adat + kep 

- ha van kép,
   akkor feltöltjük a képet a fb-re (async)
    then-ben a kép url getDownloadUrl el, (async)
    then-ben a végen eltárjuk a post adatok + kép urljet
     savePostData(formData, imageUrl)

- ha nincs kép
   akkor eltaroljuk a post adatok
   savePostData(formData, null)


  function savePostData(formData, imageUrl) {
    // menti a vegleges adatok
  }