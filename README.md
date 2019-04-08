## Objective
Create a web app that interacts with a [repository](https://arxiv.org) of freely accessible scholarly work.

### Requirements for Web App Interface
Create a web app with a page that links to 2 other pages.
* First Page: display a list of new articles containing information relevant to psychiatry, therapy, data science or machine learning.
  * Clicking an article opens a page that displays a short summary of the article's content and names of all the authors.
  * Clicking on an author opens a page that displays the author name and the titles of articles they've submitted to arXiv over the past 30 days.
* Second Page: display a list of authors and how many articles they’ve written over the last 30 days, sorted with the newest, most prolific ones first.
  * Clicking on an author should open the author page mentioned above.

### Technical Notes
* Choose either frontend or backend:
  * Option 1 (frontend): a client-side app built in the javascript framework of your choice.
  * Option 2 (backend): a server-side app that serves up static pages in Django / Python.
* You should use the [arXiv bulk data access API](https://arxiv.org/help/bulk_data) to obtain the data you need.
* If 30 days of data is not available, your web app should be able to incrementally gather the data over time in order to eventually have at least 30 days of data.
*  Make dynamic requests to the arXiv API (Do not hardcode response).


## My Design Choices
After considering the technical details of this project, I decided to use React.

__How I came to this conclusion:__
- This project has many redirects to various pages. React has a tool that simplifies all these redirects while also having the added benefit of maintaining a single-page web app for a seamless user experience. This tool is `<Link>` from React Router.
- Data sharing across pages. I noticed some pages require data that has already been retrieved from arXiv bulk data access API. For example, the page that displays one article needs to have the data about that one article. This data has already been fetched from the previous page that allowed the user to get to this article page. React provides tools that make it easy to share data from one page to another via `<Link>` and `withRouter()` from React Router.
- Asynchronous API calls. React will re-render components when their local state has changed with `setState()`. This functionality allows me to render components quickly, then immediately update them once data has been retrieved from the Asynchronous API calls.
