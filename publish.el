(package-initialize)

(require 'htmlize)
(require 'ox-publish)
(require 'ox-rss)

;; Allow babel to run in a script
(setq org-confirm-babel-evaluate nil)
;; make org mode allow eval of some langs
(org-babel-do-load-languages
 'org-babel-load-languages
 '((emacs-lisp . t)
   (shell . t)))

;; TODO https://git.tecosaur.net/tec/this-month-in-org/src/branch/master/publish.el
;; Define the publishing project
(setq org-publish-project-alist
      `(("pages"
         :recursive nil ;; avoid exporting blog twice
         :base-directory "./src"
         :html-validation-link nil             ;; Dont show validation link
         :publishing-directory "./dist"
         :publishing-function org-html-publish-to-html
         :section-numbers nil                  ;; Don't show section numbers
         :with-author nil)                   ;; Don't show author
        ("blog"
         :base-directory "./src/posts"
         :base-extension "org"
         :publishing-directory "./dist/posts"
         :publishing-function org-html-publish-to-html

         :auto-sitemap t
         :sitemap-title "Blog Posts"
         :sitemap-filename "index.org"
         :sitemap-sort-files anti-chronologically)
        ("blog-rss"
         :base-directory "./src/posts/"
         :base-extension "org"
         :rss-image-url "https://en.gravatar.com/userimage/153826413/9a3e00a58a93ddade27bf64873cf8a3c.jpeg?size=256"
         :html-link-home "https://edmundmiller.dev"
         :html-link-use-abs-url t
         :rss-extension "xml"
         :publishing-directory "./dist"
         :publishing-function (org-rss-publish-to-rss)
         :section-numbers nil
         :table-of-contents nil)
        ("edmundmiller.dev" :components ("pages" "blog" "blog-rss"))))

;; Generate the site output
(org-publish-all t)
