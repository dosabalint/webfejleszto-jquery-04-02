$(function() {
  // elemek összegyűjtése
  let $contentWrapper = $('#content-wrapper');
  let $pagination = $('#pagination');
  //// ezzel így csak megadjuk, hogy lesz ilyen
  //// eredetileg a HTMLben nincsenek ilyen gombok, majd jQueryvel írjuk be őket
  //// ha most szednénk össze, akkor nem adna nekünk vissza egy gombot sem
  let $pageButtons;

  // konstansok
  const articleCount = 33;
  const pageSize = 5;

  // tartalmak JavaScript tömbként tárolva
  let templateArticle = {
    title: 'Bejegyzés',
    body:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quia exercitationem voluptates architecto perferendis harum esse, dolorum molestiae officia unde qui eveniet, voluptatum itaque! Nulla velit exercitationem quos incidunt dicta earum aperiam, reprehenderit voluptate, placeat iure harum, quas natus fuga ab est! Iste quae exercitationem dignissimos ratione ut soluta perspiciatis laborum molestiae? Quas facere voluptate illo at, corporis fugiat, animi, ad aut ipsum nobis deserunt rerum? Aliquam, tempora ducimus.'
  };
  let articleCollection = [];
  for (let i = 0; i < articleCount; i++) {
    articleCollection.push(templateArticle);
  }

  // init
  RenderPage(1);
  RenderPagination(1);
  SetButtonActive(1);

  //////////////////////////////////////////////////

  function RenderArticle(articleIndex) {
    if (articleIndex >= articleCount) {
      console.log(
        'Ezzel a sorszámmal már nem létezik bejegyzés: ',
        articleIndex
      );
      return;
    }

    // bejegyzés kiszámítása
    let article = articleCollection[articleIndex];
    // bejegyzés HTML kódja
    let html =
      '<div>' +
      '<strong>' +
      article.title +
      '(' +
      articleIndex +
      ')' +
      '</strong>' +
      '<p>' +
      article.body +
      '</p>' +
      '</div>';
    // HTML kód wrapperhez fűzése
    $contentWrapper.append(html);
  }

  // lapozott oldal HTML kódjának beszúrása
  function RenderPage(pageIndex) {
    $contentWrapper.html('');
    for (
      let articleIndex = pageSize * (pageIndex - 1);
      articleIndex < pageSize * pageIndex;
      articleIndex++
    ) {
      RenderArticle(articleIndex);
    }
  }
  
  // lapozó HTML kódjának beszúrása
  function RenderPagination() {
    //// a ceil egy felfelé kerekítés, például ceil(1.4) => 2 értéket kapunk
    for (
      let pageIndex = 1;
      pageIndex <= Math.ceil(articleCount / pageSize);
      pageIndex++
    ) {
      RenderButton(pageIndex);
    }

    // gombok összegyűjtése
    $pageButtons = $('#pagination button');

    // lapozásra reagálás
    $pageButtons.click(function() {
      // kattintott lap gombja
      let $clickedButton = $(this);
      // aktuális lap
      let currentPageIndex = $clickedButton.html();
      RenderPage(currentPageIndex);
      SetButtonActive(currentPageIndex);
    });
  }

  function RenderButton(pageIndex) {
    // elemek összegyűjtése
    $pagination = $('#pagination');

    // lapozóhoz fűzés
    let html =
      '<button type="button" class="btn btn-light">' + pageIndex + '</button>';
    $pagination.append(html);
  }

  function SetButtonActive(pageIndex) {
    // előző aktív gomb kikeresése
    let $oldButton = $('button.btn-secondary');

    // következő aktív gomb kikeresése
    //// itt figyelni kell arra, hogy a pageIndex 1-től kezdődik (0. lap nincs)
    //// viszont a gombok indexelése jQuery lekérésből 0-val kezdődik
    //// emiatt van a pageIndex - 1
    let $newButton = $($('#pagination button')[pageIndex - 1]);

    // állítsuk az előző gombot inaktívra
    $oldButton.removeClass('btn-secondary');
    $oldButton.addClass('btn-light');
    $oldButton.prop('disabled', false);

    // állítsuk az új gombot aktívra
    $newButton.removeClass('btn-light');
    $newButton.addClass('btn-secondary');
    $newButton.prop('disabled', true);
  }
});
