# Mind to Machine integration

The current standalone MTM site replaces the previous static event site and React event page.

- `/mtm`: landing page
- `/mtm/handbook`: participant handbook
- `/mtm/register`: official Tally registration embed
- `/events/mtm`: compatibility entry point to the same landing page

Next.js beforeFiles rewrites serve the independent event documents without the GDG application navbar, global CSS, or footer. All local asset and page links are namespaced beneath `/mtm`. Other application routes are unchanged. The event assets use revalidation rather than immutable caching because filenames can be updated between deployments.

Helping hands: Muhammad Yousaf, Muhammad Haseeb, Mohsin Shakeel, Rida Fatima, Hiba Zafar, Zahra Saleem.

Registration is hosted on Tally: https://tally.so/r/gba96K. Manage questions and uploads there. No new backend, environment variables, or package dependencies are required.
