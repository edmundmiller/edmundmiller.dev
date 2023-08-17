(package-initialize)

(require 'htmlize)
(require 'ox-publish)
(require 'ox-rss)
(require 'f)

;; Allow babel to run in a script
(setq org-confirm-babel-evaluate nil)
;; make org mode allow eval of some langs
(org-babel-do-load-languages
 'org-babel-load-languages
 '((emacs-lisp . t)
   (shell . t)))

;; Customize the HTML output
(setq org-html-validation-link nil            ;; Don't show validation link
      org-html-head-include-scripts nil       ;; Use our own scripts
      org-html-head-include-default-style nil ;; Use our own styles
      org-html-htmlize-output-type 'css
      org-html-doctype "html5"
      org-html-html5-fancy t
      org-html-head (f-read-text "./src/html/head.html"))

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
