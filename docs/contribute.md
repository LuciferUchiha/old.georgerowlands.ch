---
sidebar_position: 3
title: Want to contribute?
description: Want to contribute?
tags: [Digital Garden]
---

Do you enjoy the content and want to contribute to the garden by adding some new plants or watering the existing ones?

Then this is the place to find out how to do so. There are however some prerequisites and rules.

- You will need a Github account and basic knowledge of git.
- You will need basic knowledge of how to write Markdown.
- To add or change interactive things knowledge of [React](https://reactjs.org/docs/getting-started.html) and [MDX](https://mdxjs.com/docs/getting-started/).

## Changing and Adding Pages

If you have found a mistake, be it a spelling mistake or something related to the content. Or maybe you just want to add more content to an existing page or even add a new page. Then you can follow these simple steps.

1. Go to the page to change.
2. Scroll to the bottom and press "Edit this page". If you have a Github account this will then create a fork of this repo and you can change or add the markdown files.
3. Once you have written all the changes, push them to the remote fork and create a pull request into the main repository.

:::note

If the file ends in `.mdx` then there can and probably will have some JSX in the file.

:::

## Style Guide

There are some rules that need to be adhered to.

- Markdown filenames are written in camelCase.
- If there needs to be a certain order of the pages because it would make more sense then you can prefix the file name with `n-filename`.
- The title (used in the sidebar etc.) and description should be set using frontmatter for every page at the beginning.
- Use the [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) extension to make sure the formatting and markdown rules are followed.
