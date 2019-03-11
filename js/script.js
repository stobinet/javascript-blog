'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  //console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  //console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

// const settings
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post-author',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

  console.log('wywołano funkcję generateTitleLinks');
  console.log(customSelector);

  /* [DONE] remove content of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find and get the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into html variable */
    html = html + linkHTML;
    console.log(html);

    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    //titleList.insertAdjacentHTML('beforebegin', linkHTML);
    //console.log(titleList);

  }

  /* insert links into titleList */
  titleList.innerHTML = html;
  console.log(titleList);

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  console.log('wywołano funkcję generateTags');

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(linkHTML);

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;
      console.log(html);

    }/* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log(tagsWrapper);

  } /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event) {
  console.log('wywołano funkcję tagClickHandler');
  /* prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#tag-"]'); //??? NodeList [], length: 0;
  console.log(links);

  /* START LOOP: for each active tag link */
  for (let tag of links) {

    /* remove class active */
    tag.classList.remove('active');
    console.log(tag);

  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll(href);
  console.log(allTagLinks); //??? NodeList [], length: 0;

  /* START LOOP: for each found tag link */
  for (let tag of allTagLinks) {

    /* add class active */
    tag.classList.add('active');
    console.log(tag);

  }/* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  console.log('wywołano funkcję addClickListenersToTags');

  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags ul a');
  console.log(links);

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    console.log(link);

  }/* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  console.log('wywołano funkcję generateAuthors');

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tag wrapper */
    const tagWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute */
    const author = article.getAttribute("data-author");
    console.log(author);

    /* [DONE] generate HTML of the link */
    const linkHTML = 'by ' + '<a href="#' + author + '">' + author + '</a>';
    console.log(linkHTML);

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    console.log(tagWrapper);

  } /* END LOOP: for every article: */

}

generateAuthors();

function authorClickHandler(event) {
  console.log('wywołano funkcję authorClickHandler');

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  //[ALL DONE]

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#"]');
  console.log(links);

  /* START LOOP: for each active tag link */
  for (let tag of links) {

    /* remove class active */
    tag.classList.remove('active');
    console.log(tag);

  }/* END LOOP: for each active tag link */

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll(href);
  console.log(allAuthorLinks);

  /* START LOOP: for each found tag link */
  for (let tag of allAuthorLinks) {

    /* add class active */
    tag.classList.add('active');
    console.log(tag);

  }/* END LOOP: for each found tag link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {
  console.log('wywołano funkcję addClickListenersToAuthors');

  /* [DONE] find all links to authors */
  const links = document.querySelectorAll('.post-author a');
  console.log(links);

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    console.log(link);

  }/* END LOOP: for each link */
}

addClickListenersToAuthors();
