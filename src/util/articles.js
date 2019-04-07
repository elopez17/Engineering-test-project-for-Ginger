import $ from 'jquery';

export const getArticles = () => {
  let deferred = $.Deferred();
  $.ajax({
    url: "http://export.arxiv.org/api/query?search_query=all:psychiatry+OR+all:therapy+OR+all:%22data+science%22+OR+cat:stat.ML&sortBy=submittedDate&sortOrder=descending&max_results=200",
    type: "get",
    dataType: "xml",
    success: function (xml) {
      let articles = [];
      $(xml).find('entry').each(function (index) {
        let id = $(this).find('id').text();
        let date = $(this).find('published').text();
        let title = $(this).find('title').text();
        let summary = $(this).find('summary').text();
        let authors = [];
        $(this).find('author').each(function (index) {
          authors.push($(this).text());
        });

        articles.push({
          id: id,
          title: title,
          summary: summary,
          date: date,
          authors: authors
        });
      });

      deferred.resolve(articles);
    },
    error: function (status) {
      console.log("request error " + status);
    }
  });
  return deferred.promise();
};


export const getArticlesByAuthor = (author) => {
  author = author.replace(/ /g, "+");
  let deferred = $.Deferred();
  $.ajax({
    url: `http://export.arxiv.org/api/query?search_query=au:%22${author}%22&sortBy=submittedDate&sortOrder=descending&max_results=200`,
    type: "get",
    dataType: "xml",
    success: function (xml) {
      let articles = [];
      $(xml).find('entry').each(function (index) {
        let id = $(this).find('id').text();
        let date = $(this).find('published').text();
        let title = $(this).find('title').text();
        let summary = $(this).find('summary').text();
        let authors = [];
        $(this).find('author').each(function (index) {
          authors.push($(this).text());
        });

        articles.push({
          id: id,
          title: title,
          summary: summary,
          date: date,
          authors: authors
        });
      });

      deferred.resolve(articles);
    },
    error: function (status) {
      console.log("request error " + status);
    }
  });
  return deferred.promise();
};

export const getRecent = (current, nDays, articles) => {
  let recentDays = new Date(current.getTime() - (86400000 * nDays));
  let recentArticles = articles.filter(article => {
    let date = new Date(article.date);
    return date < current && date > recentDays;
  });
  return recentArticles;
}