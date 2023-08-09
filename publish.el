(package-initialize)

(require 'htmlize)
(require 'ox-publish)

;; TODO https://git.tecosaur.net/tec/this-month-in-org/src/branch/master/publish.el
;; Define the publishing project
(setq org-publish-project-alist
      `(("pages"
         :recursive nil ;; avoid exporting blog twice
         :base-directory "./src"
         :html-validation-link nil             ;; Dont show validation link
         :publishing-directory "./html"
         :publishing-function org-html-publish-to-html
         :section-numbers nil                  ;; Don't show section numbers
         :with-author nil)                   ;; Don't show author
        ("blog"
         :base-directory "./src/posts"
         :base-extension "org"
         :publishing-directory "./html/posts"
         :publishing-function org-html-publish-to-html)
        ("edmundmiller.dev" :components ("pages" "blog"))))

;; Generate the site output
(org-publish-all t)
