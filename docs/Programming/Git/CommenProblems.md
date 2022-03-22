# Common Problems

## Undo unstaged local changes

To overwrite local changes:  

```shell
git checkout -- <file>
```

To discard local changes to all files, permanently:

```shell
git reset --hard
```

## Undo staged local changes

To unstage the file but keep your changes:

```shell
git restore --staged <file>
```

To unstage everything but keep your changes:

```shell
git reset
```

To discard local changes to all files, permanently:

```shell
git reset --hard
```

## Undo committed local changes

This is a always a bit harder...
To undo last two commits, but keep your changes:

```shell
git reset HEAD~2       
```

To undo last two commits, discard changes:

```shell
git reset --hard HEAD~2 
```

## Change commit

To change the message of the last commit:

```shell
git commit --amend -m "New message"
```

Did you forget to add a file? Just add it and amend the previous commit :)

```shell
git add forgotten_file
git commit --amend
```
