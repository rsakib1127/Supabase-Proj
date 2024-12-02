

read -p 'Commit comment: ' Commit
read -p 'Commit description: ' Description
git add .
git commit -m "$Commit" -m "$Description"
git push


# git rm --cached oops.iso
# git commit --amend -C HEAD
# git rebase --continue

