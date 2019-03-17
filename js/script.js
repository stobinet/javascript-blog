'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags',
  optAuthorsListSelector = '.list.authors',
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;



  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }


  clickedElement.classList.add('active');


  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }


  const articleSelector = clickedElement.getAttribute('href');

  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {



  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';


  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {

  const params = { max: 0, min: 999999 };

  for (let tag in tags) {

    //console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    params.min = Math.min(tags[tag], params.min);
    params.max = Math.max(tags[tag], params.max);

  }

  return params;

}

function calculateTagClass(count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;

}

function generateTags() {

  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray) {

      const linkHTMLData = { id: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      html = html + linkHTML;

      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    }

    tagsWrapper.innerHTML = html;

  }

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);

  const allTagsData = { tags: [] };

  for (let tag in allTags) {

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });

  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const tag = href.replace('#tag-', '');
  const links = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let tag of links) {

    tag.classList.remove('active');

  }

  const allTagLinks = document.querySelectorAll(href);


  for (let tag of allTagLinks) {
    tag.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll('a[href^="#tag-"]');

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }

}

addClickListenersToTags();

function generateAuthors() {

  const articles = document.querySelectorAll(optArticleSelector);

  let allAuthors = {};

  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    let html = '';
    const author = article.getAttribute('data-author');
    const linkHTMLData = { id: author };
    const linkHTML = templates.authorLink(linkHTMLData);

    html = html + linkHTML;

    authorWrapper.innerHTML = html;

    if (!allAuthors.hasOwnProperty(author)) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }
  const authorsList = document.querySelector(optAuthorsListSelector);

  const allAuthorsData = { tags: [] };

  for (let author in allAuthors) {
    allAuthorsData.tags.push({
      id: author,
      count: allAuthors[author],
    });
  }

  authorsList.innerHTML = templates.authorListLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#', '');

  const links = document.querySelectorAll('a.active[href^="#"]');

  for (let tag of links) {
    tag.classList.remove('active');
  }

  const allAuthorLinks = document.querySelectorAll(href);


  for (let tag of allAuthorLinks) {
    tag.classList.add('active');
  }

  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {

  const links = document.querySelectorAll('.post-author a, .list.authors a');

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
