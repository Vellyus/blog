# Hozzáadható featurek

- Admin blog post szerkesztésnél felugorhatna a form-hoz (window.scrollTo)
KÉSZ
- Ha újra töltöm az oldalt, akkor maradjon bejelentkezve a felhasznalo - localStorage - accessToken
- Képkezelése feltöltés, mentés, vissza megjelenítés
- Lapozhatóság
KÉSZ
- CSS framework
- night and day mode (dark mode) - contexes dolog, ujratoltes eseten: localStorage


# Észrevételek
 - editModeId !== null ? (handleEditArticle) : (handleNewArticle)
   - a handler-ben lekezelni, hogy módtól függően mit csináljon 
KÉSZ



# post adat + kep 

- ha van kép,
   akkor feltöltjük a képet a fb-re (async)
    then-ben a kép url getDownloadUrl el, (async)
    then-ben a végen eltárjuk a post adatok + kép urljet
     savePostData(formData, imageUrl)
KÉSZ

- ha nincs kép
   akkor eltaroljuk a post adatok
   savePostData(formData, null)
KÉSZ


  function savePostData(formData, imageUrl) {
    // menti a vegleges adatok
  }

  # Extra

  - Törléskor vagy szerkesztéskor a storage-ból nem törlődnek a képek, ezt meg lehetne oldani.
  - Át kéne írni a blogPosts statet, hogy rögtön array formátumban legyen