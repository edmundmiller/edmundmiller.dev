(package-initialize)

(require 'htmlize)
(require 'ox-publish)

;; TODO https://git.tecosaur.net/tec/this-month-in-org/src/branch/master/publish.el
;; Define the publishing project
(setq org-publish-project-alist
      (list
       (list "org-files"
             :recursive t
             :base-directory "./src"
             :html-validation-link nil             ;; Dont show validation link
             :publishing-directory "./html"
             :publishing-function 'org-html-publish-to-html
             :section-numbers nil                  ;; Don't show section numbers
             :with-author nil)))                   ;; Don't show author

;; Generate the site output
(org-publish-all t)
