'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;


  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

// const settings
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags',
  //optTagsListSelector = '.tags.list',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {


  /* [DONE] remove content of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find and get the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* [DONE] insert link into html variable */
    html = html + linkHTML;

    // titleList.innerHTML = titleList.innerHTML + linkHTML;
    //titleList.insertAdjacentHTML('beforebegin', linkHTML);
    //console.log(titleList);

  }

  /* insert links into titleList */
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {

  const params = { max: 0, min: 999999 };

  /* START LOOP: for each tag */
  for (let tag in tags) {

    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    /* [DONE] find min and max values of the params */
    params.min = Math.min(tags[tag], params.min);
    params.max = Math.max(tags[tag], params.max);

  } /* END LOOP: for each tag */

  return params;

}

function calculateTagClass(count, params) {

  /* [DONE] set the correct class for the tag */
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return optCloudClassPrefix + classNumber;

}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty array */
  //let allTags = [];

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* [DONE] generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

      /* [DONE] add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      //if (allTags.indexOf(linkHTML) == -1) {
      /* [NEW] add generated code to allTags array */
      //  allTags.push(linkHTML); }

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    }/* END LOOP: for each tag */

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

  } /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  //const tagList = document.querySelector('.tags');
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  console.log(allTags);

  /* [NEW] find min and max values of the tags instances */
  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    //allTagsHTML += '<li><a href="#' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ') </li>';

    //const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    //console.log('tagLinkHTML:', tagLinkHTML);

    /* [NEW] add html code to tagLinkHTML */
    //const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"' + 'href="#' + tag + '">' + tag + '</a>' + ' (' + allTags[tag] + ') </li>';
    //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '"' + 'href="#tag' + tag + '">' + tag + '</a></li>';
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';

    allTagsHTML += tagLinkHTML;

  } /* [NEW] END LOOP: for each tag in allTags */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let tag of links) {

    /* remove class active */
    tag.classList.remove('active');

  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allTagLinks = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for (let tag of allTagLinks) {

    /* add class active */
    tag.classList.add('active');

  }/* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  //const links = document.querySelectorAll('.post-tags ul a');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  }/* END LOOP: for each link */

}

addClickListenersToTags();

function generateAuthors() {

  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* [DONE] find tag wrapper */
    const tagWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get author from data-author attribute */
    const author = article.getAttribute('data-author');

    /* [DONE] generate HTML of the link */
    const linkHTML = 'by ' + '<a href="#' + author + '">' + author + '</a>';

    /* [DONE] add generated code to html variable */
    html = html + linkHTML;

    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  } /* END LOOP: for every article: */

}

generateAuthors();

function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  //[ALL DONE]

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');

  /* [DONE] find all tag links with class active */
  const links = document.querySelectorAll('a.active[href^="#"]');

  /* START LOOP: for each active tag link */
  for (let tag of links) {

    /* remove class active */
    tag.classList.remove('active');

  }/* END LOOP: for each active tag link */

  /* [DONE] find all author links with "href" attribute equal to the "href" constant */
  const allAuthorLinks = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */
  for (let tag of allAuthorLinks) {

    /* add class active */
    tag.classList.add('active');

  }/* END LOOP: for each found tag link */

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {

  /* [DONE] find all links to authors */
  const links = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  }/* END LOOP: for each link */
}

addClickListenersToAuthors();
