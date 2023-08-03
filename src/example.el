(setq org-publish-project-alist
      (list
       (list "org-files"
             :recursive t
             :base-directory "~/src/personal/edmundmiller-dev/src/"
             :html-validation-link nil             ;; Dont show validation link
             :publishing-directory "~/src/personal/edmundmiller-dev/output/"
             :publishing-function 'org-html-publish-to-html
             :section-numbers nil                  ;; Don't show section numbers
             :with-author nil)))                   ;; Don't show author
